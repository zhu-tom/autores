import child_process from 'child_process';
import path from 'path';
import fs from 'fs';
import moment from 'moment';

export default async function handler(req, res) {
  // create python reservation file with userId, register cron job using setup.py
  child_process.exec(`python ${path.join(__dirname, "../../setup.py")} ${} ${} ${} ${}`, (err, stdout, stderr) => {
    if (err) {
      res.status(500).send({error: error.message});
    } else if (stderr) {
      res.status(500).send({error: stderr});
    } else {
      res.status(200).send();
    }
  });
}