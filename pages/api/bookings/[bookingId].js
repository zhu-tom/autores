import { withIronSession } from 'next-iron-session';
import Booking from '../../../models/booking';
import { connectToDatabase } from '../../../util/mongodb';
import { BOOKING_STATE } from '../../../util/types';
import child_process from 'child_process';
import path from 'path';

async function handler(req, res) {
  await connectToDatabase();
  const { bookingId } = req.query;
  if (req.method === "DELETE") {
    Booking.findById(bookingId, (err, doc) => {
      const id = req.session.get("user")._id;
      if (err) res.status(500).send({error: err});
      else if (doc.userId == id) {
        doc.state = BOOKING_STATE.CANCELLED;
        child_process.exec(`python3 ${path.resolve("./cancel.py")} ${id} ${doc.clubId} ${doc.timeSlotId}`, (e, stdout, stderr) => {
          if (err) {
            console.log(err);
            res.status(500).send({error: err});
          } else if (stderr) {
            console.log(stderr);
            res.status(500).send({error: stderr});
          } else {
            doc.save(error => {
              if (error) res.status(500).json({error});
              else res.status(200).send();
            }); 
          }
        });

      } else {
        res.status(401).send({error: "unauthorized"});
      }
    });
  }
}

export default withIronSession(handler, {
  password: "complex_password_at_least_32_characters_long",
  cookieOptions: {
    secure: false,
  },
  cookieName: "session"
});