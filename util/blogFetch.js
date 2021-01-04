import { connectToDatabase } from "./mongodb";
export default async function getBlogIndex() {
  try {
    const { db } = await connectToDatabase();
    const data = await db
      .collection("movies")
      .find({}).sort({ _id: -1 }).limit(50)
      .project({ dateCreated: 1, title: 1, author: 1, _id: 0, slug: 1 ,category:1})
      .toArray();
    return data;
  } catch (e) {
    return [];
  }
}
