#!/usr/bin/python3
import requests
import sys
import pymongo
from bson.objectid import ObjectId
from crontab import CronTab
session = requests.Session()
session.post("https://www.goodlifefitness.com/content/experience-fragments/goodlife/header/master/jcr:content/root/responsivegrid/header.AuthenticateMember.json", data={"login": "aabra018@uottawa.ca", "passwordParameter": "Aidana69"}).json()
response = session.post("https://www.goodlifefitness.com/content/goodlife/en/book-workout/jcr:content/root/responsivegrid/workoutbooking.CreateWorkoutBooking.json", data={"clubId": sys.argv[1], "timeSlotId": sys.argv[2]})
state = 1 if response.status_code == 200 else 2
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["autores"]
col = db["bookings"]
print(sys.argv[0][:-3])
query = {"userId": ObjectId(sys.argv[0][:-3]), "timeSlotId": str(sys.argv[2]), "clubId": str(sys.argv[1])}
values ={ "$set": {"state": state}}
col.update_one(query, values)
for x in col.find():
  print(x)