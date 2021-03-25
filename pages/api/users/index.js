import User from "../../../models/user";
import createScript from "../../../util/createScript";
import bcrypt from "bcrypt";
import { ACCOUNT_TYPE } from "../../../util/types";
import { connectToDatabase } from "../../../util/mongodb";
import { withIronSession } from 'next-iron-session';
import axios from "axios";
import querystring from 'querystring';

async function handler(req, res) {
  await connectToDatabase();

  if (req.method === "POST") {
    User.findOne({login: req.body.login}, (err, doc) => {
      if (err) return res.status(500).send({error: err});
      else if (doc) return res.status(403).send({error: "User already exists."});
      else {
        axios.post("https://www.goodlifefitness.com/content/experience-fragments/goodlife/header/master/jcr:content/root/responsivegrid/header.AuthenticateMember.json", 
          querystring.stringify({
            "login": req.body.login, 
            "passwordParameter": req.body.password,
          }), {
            headers: {
              "Content-type": "application/x-www-form-urlencoded",
            }
          })
          .then(result => {
            bcrypt.hash(req.body.password, 10, (error, hash) => {
              if (error) return res.status(500).send({error});
              else {
                new User({login: req.body.login, password: hash}).save((errors, user) => {
                  if (errors) return res.status(500).send({error: errors});
                  else {
                    createScript(user.id, req.body.login, req.body.password, async e => {
                      if (e) return res.status(500).send({error: e});
                      else {
                        const {password, ...rest} = user.toJSON();
                        req.session.set("user", rest);
                        await req.session.save();
                        return res.json(rest);
                      }
                    });
                  }
                });
              }
            });
          })
          .catch(error => {
            res.status(500).send({error});
          });
      }
    });
  }
  else if (req.method === "GET") {
    if (req.session.get("user").type === ACCOUNT_TYPE.ADMIN) {
      User.find({}, (err, docs) => {
         if (err) res.status(500).json({error: err});
         else res.json({users: docs});
      });
    } else {
      res.status(401).json({error: "Insufficient privileges."});
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