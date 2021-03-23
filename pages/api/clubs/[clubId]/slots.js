import axios from 'axios';

export default function handler(req, res) {
  if (req.method === "GET") {
    let { date, clubId } = req.query;
    axios.get(`https://www.goodlifefitness.com/content/goodlife/en/book-workout/jcr:content/root/responsivegrid/workoutbooking.GetWorkoutSlots.${clubId}.${date}.json`)
      .then(response => {
        res.send(response.data);
      })
      .catch(err => {
        res.status(500).send({error: err});
      });
  }
}