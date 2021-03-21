import User from "../../../models/user";
import createScript from "../../../util/createScript";
import database from "../../../middleware/database";
import bcrypt from "bcrypt";



function handler(req, res) {
  if (req.method === "POST") {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        res.send(500).json({error: err});
      } else {
        new User({login: req.body.login, password: hash}).save()
          .then(doc => {
            createScript(doc.id, req.body.login, req.body.password);
            res.send();
          })
          .catch(error => {
            res.status(500).json({error});
          });
      }
    });
  }
  else if (req.method === "GET") {
    User.find({}, (err, docs) => {
      
    });
  }
}

export default handler;