import child_process from 'child_process';
import path from 'path';
import moment from 'moment';
import Booking from '../../../models/booking';
import authorize from '../../../util/authorize';
import { ACCOUNT_TYPE, BOOKING_STATE } from '../../../util/types';
import { connectToDatabase } from '../../../util/mongodb';
import { withIronSession } from 'next-iron-session';

async function handler(req, res) {
  await connectToDatabase();

  if (req.method === "POST") {
    if (authorize(req, [ACCOUNT_TYPE.PAID, ACCOUNT_TYPE.ADMIN])) {
      Booking.findOne({
        userId: req.session.get("user")._id, 
        timeSlotId: req.body.timeSlotId
      }, (err, doc) => {
        if (err) res.status(500).send({error: err});
        else if (doc && (doc.state === BOOKING_STATE.PENDING || doc.state === BOOKING_STATE.BOOKED)) {
          return res.status(403).send({error: "already booked"});
        }
        else {
          const time = moment(req.body.time);
          child_process.exec(`python3 ${path.resolve("./setup.py")} ${req.session.get("user")._id} ${req.body.clubId} ${req.body.timeSlotId} ${time.minute()} ${time.hour()} ${time.subtract(3, "days").date()}`, (err, stdout, stderr) => {
            if (err) {
              console.log(err);
              res.status(500).send({error: err});
            } else if (stderr) {
              console.log(stderr);
              res.status(500).send({error: stderr});
            } else {
              if (doc) {
                doc.state = BOOKING_STATE.PENDING;
              } else {
                doc = new Booking({
                  userId: req.session.get("user")._id,
                  clubId: req.body.clubId,
                  timeSlotId: req.body.timeSlotId
                });
              }
              doc.save(error => {
                if (error) res.status(500).json({error});
                else res.status(200).send();
              });
            }
          });
        }
      });
    } else {
      res.status(401).send({error: "unauthorized"});
    }
  }
  else if (req.method === "GET") {
    const user = req.session.get("user");
    if (!user || user.type === ACCOUNT_TYPE.UNPAID) {
      res.status(401).send({error: "unauthorized"});
    } else {
      let query = {};
      
      if (req.query.userId) {
        if ((user.type === ACCOUNT_TYPE.PAID && req.query.userId === user._id) || user.type === ACCOUNT_TYPE.ADMIN) {
          query = {
            userId: req.query.userId, 
            state: {$not: {$eq: BOOKING_STATE.CANCELLED}}
            };
        } else {
          return res.status(401).send({error: "unauthorized"});
        }
      }

      if (req.query.clubId) {
        query.clubId = req.query.clubId;
      }

      Booking.find(query, (err, docs) => {
        if (err) res.status(500).send({error: err});
        else {
          res.json({bookings: docs.map(doc => doc.toJSON())});
        }
      });
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