import { connectToDatabase } from "../../../util/mongodb";
export default async function handler(req, res) {
    try {
        const { method } = req;
        const { db } = await connectToDatabase();
        if (method == 'GET') {
            const { q } = req.query;
            const datas = await db.collection("movies").aggregate([
                {
                  $search: {
                    "text": {
                      "query": q,
                      "path": "title"
                    }
                  }
                },
                {
                  $project: {
                    "_id": 0,
                    "title": 1,
                    "slug": 1
                  }
                }
              ]).toArray();
            
            if(datas.length===0) res.status(200).json({ data: datas,success:false });
            res.status(200).json({ data: datas,success:true });
        } else throw new Error("Unautharized");
    } catch (e) {
        res.status(401).end();
    }
}