import sys
import os
from crontab import CronTab

cron = CronTab(True)
sys.argv[1] = sys.argv[1] + ".py"
toDel = " ".join(sys.argv[1:])

for job in cron:
  if toDel in job.command: 
    cron.remove(job)
    break

cron.write()