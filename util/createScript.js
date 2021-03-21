import path from 'path';
import fs from 'fs';

export default function createScript(id, login, password) {
  const scriptPath = path.join(__dirname, "../../scripts", `${id}.py`);
  fs.writeFileSync(scriptPath, 
    `#!/usr/bin/python3\n
    import requests\n
    import sys\n
    from crontab import CronTab\n
    session = requests.Session()\n
    session.post("https://www.goodlifefitness.com/content/experience-fragments/goodlife/header/master/jcr:content/root/responsivegrid/header.AuthenticateMember.json", data={"login": "${login}", "passwordParameter": "${password}"}).json()\n
    response = session.post("https://www.goodlifefitness.com/content/goodlife/en/book-workout/jcr:content/root/responsivegrid/workoutbooking.CreateWorkoutBooking.json", data={"clubId": sys.argv[1], "timeSlotId": sys.argv[2]})\n
    state = 1 if response.status_code == 200 else 2\n
    client = pymongo.MongoClient("mongodb://localhost:27017/")\n
    db = client["autores"]\n
    col = db["bookings"]\n
    query = {"userId": sys.argv[0][:-3], "timeSlotId": sys.argv[2], "clubId": sys.argv[1]}\n
    values ={ "$set": {"state": state}}\n
    col.update_one(query, values)`);
}