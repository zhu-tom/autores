import {withIronSession} from 'next-iron-session';
import { connectToDatabase } from '../../util/mongodb';
import User from '../../models/user';
import { ACCOUNT_TYPE } from '../../util/types';

async function handler(req, res) {
  await connectToDatabase();

  if (req.method === "POST") {
    const user = req.session.get("user");
    if (user) {
      User.updateOne({id: user._id}, {$set: {type: ACCOUNT_TYPE.PAID}}, (err, doc) => {
        if (err) res.status(500).send({error: err});
        else {
          req.session.set("user", doc.toJSON());
          res.send();
        }
      })
    } else {
      res.status(401).send({error: "not logged in"});
    }
  }
}

export default withIronSession(handler, {
  password: "complex_password_at_least_32_characters_long",
  cookieOptions: {
    secure: false,
  },
  cookieName: "session"
});