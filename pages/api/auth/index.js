import { withIronSession } from "next-iron-session";
import bcrypt from 'bcrypt';
import User from "../../../models/user";

async function handler(req, res) {
  if (req.method === "POST") {
    User.findOne({login: req.body.login}, async function(err, user) {
      if (err) res.status(500).send({error: err});
      else if (!user) res.status(401).send({error: "user does not exist"});
      else if (!(await bcrypt.compare(req.body.password, user.password))) res.status(401).send({error: "wrong password"});
      else {
        const {password, ...rest} = user.toJSON();
        req.session.set("user", rest);
        await req.session.save();
        res.send({user: rest});
      }
    });
  }
  else if (req.method === "DELETE") {
    req.session.destroy();
    res.send({});
  }
}

export default withIronSession(handler, {
  password: "complex_password_at_least_32_characters_long",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production"
  },
  cookieName: "session"
});