import User from "../../../models/user";

export default function handler(req, res) {
  const { userId } = req.query;
  User.findById(userId, (err, doc) => {
    
  });
}