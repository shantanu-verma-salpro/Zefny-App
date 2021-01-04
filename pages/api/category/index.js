import { connectToDatabase } from "../../../util/mongodb";
export default async function handler(req, res) {
    try {
        const { method } = req;
        const { db } = await connectToDatabase();
        if (method == 'GET') {
            const { limit, page, category } = req.query;
            const l = Number(limit);
            const n = Number(page);
            const datas = await db.collection("movies").find({ category: category }).sort({ _id: -1 }).skip(l * (n - 1)).limit(l).toArray();
            if(datas.length===0) res.status(200).json({ data: datas,success:false });
            res.status(200).json({ data: datas,success:true });
        } else throw new Error("Unautharized");
    } catch (e) {
    	console.log(e);
        res.status(401).end();
    }
}