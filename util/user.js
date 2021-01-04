import { connectToDatabase } from "./mongodb";
export default async function userDB(user) {
  const {email} = user;
  try {
    const { db } = await connectToDatabase();
    const data = await db
      .collection("users")
      .find({email:email})
      .toArray();
    if(data.length===0){
      console.log("-----------------\n")
      console.log("inside insertion;")
      let y = (({ name,email,image }) => ({name,email,image}))(user);
     const p = await db.collection("users").insertOne(y);
    }
    return {success:true};
  } catch (e) {
    return {success:false};
  }
}
