import axios from 'axios';

export default function handler(req, res) {
  if (req.method === "GET") {
    const {clubId} = req.query;
    axios.get(`https://www.goodlifefitness.com/content/experience-fragments/goodlife/header/master/jcr:content/root/responsivegrid/header.GetClubsWithDetails.${clubId}.false.true.2021219.json`)
      .then(response => {
        res.send(response.data);
      })
      .catch(error => {
        res.status(500).send({error});
      });
  }
  
}