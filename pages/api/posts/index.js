import { connectToDatabase } from "../../../util/mongodb";
import { getSession } from "next-auth/client";
import hexoid from "hexoid";
import slug from "limax";

export default async function handler(req, res) {
 try{
  const session = await getSession({ req });
  if (session) {
    const { method } = req;
    const { db } = await connectToDatabase();

    switch (method) {
      case "GET":
        try {
          let l = 20,
            n = 1;

          if (req.query.lim) l = Number(req.query.lim);
          if (req.query.num) n = Number(req.query.num);
          const p = await db
            .collection("movies")
            .find()
            .skip(l * (n - 1))
            .limit(l)
            .toArray();

          res.status(200).json({ success: true, data: p });
        } catch (error) {
          res.status(400).json({ success: false });
        }
        break;
      case "POST":
        try {
          if (req.body.title.length > 60 || req.body.title.length < 10)
            throw new Error("");
          if (req.body.content.lengh > 500) throw new Error("");

          let y = (({ title, content, author,category }) => ({
            title,
            content,
            author,
            category
          }))(req.body);
          let dd = new Date();
          dd = dd.toUTCString();
          const toID = hexoid();
          const mySlug = slug(req.body.title) + "-" + toID();
          y["dateCreated"] = dd;
          y["slug"] = mySlug;
          const p = await db.collection("movies").insertOne(y);
          res.status(201).json({ success: true });
        } catch (e) {
          res.status(400).json({ success: false });
        }
        break;
      default:
        res.status(400).json({ success: false });
        break;
    }
  } else {
    res.status(401);
  }
  res.end();
}
catch(e){
  res.status(401);
  res.end();
}
}
