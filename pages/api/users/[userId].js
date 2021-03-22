import User from "../../../models/user";
import { connectToDatabase } from "../../../util/mongodb";

export default async function handler(req, res) {
  await connectToDatabase();
  const { userId } = req.query;
  User.findById(userId, (err, doc) => {

  });
}