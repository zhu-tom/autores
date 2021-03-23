import sys
import os
from crontab import CronTab

cron = CronTab(True)

command=f"cd {os.path.dirname(os.path.realpath(__file__))} && /usr/bin/python3 {sys.argv[1]}.py {sys.argv[2]} {sys.argv[3]}"
job = cron.new(command=command)
job.minute.on(sys.argv[4])
job.hour.on(sys.argv[5])
job.dom.on(sys.argv[6])

cron.write()
