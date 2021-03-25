import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { useUser } from '../../../lib/hooks';
import Layout from '../../../components/layout';
import { BOOKING_STATE } from '../../../util/types';

export function getServerSideProps(context) {
  return {
    props: {params: context.params}
  }
}

export default function Slots({ params }) {
  const [data, setData] = React.useState([]);
  const [booked, setBooked] = React.useState([]);
  const {clubId} = params;
  const { user } = useUser();
  const [date, setDate] = React.useState(moment().add(72, "hours"));


  const getBooked = async () => {
    axios.get(`/api/bookings?userId=${user._id}&clubId=${clubId}&state=booked,pending,failed`)
      .then(res => {
        console.log(res.data.bookings);
        setBooked(res.data.bookings)
      });
  }

  React.useEffect(() => {
    axios.get(`/api/clubs/${clubId}/slots?date=${date.format("YYYY-MM-DD")}`)
      .then(res => {
        console.log(res.data.map.response);
        setData(res.data.map.response);
      });
  }, [date]);

  React.useEffect(() => {
    console.log(user);
    if (user) getBooked();
  }, [user])

  const maxRows = data.reduce((prev, {workouts}) => {
    return Math.max(prev, workouts.length);
  }, 0);

  let byRow = [];

  for (let i = 0; i < maxRows; i++) {
    byRow.push([]);
    data.forEach(({workouts}) => {
      byRow[i].push(workouts[i]);
    });
  }

  const reserve = ({identifier: timeSlotId, startAt: time}) => {
    axios.post("/api/bookings", {timeSlotId, clubId, time: moment(time).utc().toISOString()})
      .then(res => {
        console.log(res);
      })
  }

  const cancel = (id) => {
    axios.delete(`/api/bookings/${id}`)
      .then(res => {
        console.log(res);
        getBooked();
      })
  }

  return (
    <Layout>
      <div className="flex flex-col justify-center"> 
        <div className="flex justify-center items-center">
          <span 
            className="cursor-pointer" 
            style={{height: "24px", width: "24px"}} 
            onClick={() => setDate(old => moment(old.subtract(1, "day")))}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </span>  
          <h1 className="text-2xl font-bold mx-4">Slots</h1>
          <span 
            className="cursor-pointer" 
            style={{height: "24px", width: "24px"}} 
            onClick={() => setDate(old => moment(old.add(1, "day")))}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
        <div className="flex justify-center max-w-full">
          <table className="table-auto">
            <thead>
              <tr>
                {data.map((obj, index) => {
                  return (
                    <th key={`head-${index}`}>{moment(obj.weekday).format("ddd MMM Do")}</th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
            {byRow.map((arr, r) => (
              <tr key={`body-${r}`}>
                {arr.map((row, col) => {
                  const unopened = row && moment(row.startAt).isAfter(moment().add(72, "hours"));
                  let colour;
                  let text;
                  const existing = booked.find(({timeSlotId}) => row && timeSlotId === row.identifier);
                  if (existing) {
                    if (existing.state === BOOKING_STATE.PENDING) {
                      colour = "bg-gray-500 hover:bg-gray-700 cursor-pointer";  
                      text = "Pending";
                    }
                    else if (existing.state === BOOKING_STATE.BOOKED) {
                      colour = "bg-blue-500 cursor-default";
                      text = "Booked";
                    }
                    else if (existing.state === BOOKING_STATE.FAILED) {
                      colour = "bg-orange-500 hover:bg-orange-700 cursor-pointer";
                      text = "Failed"
                    }
                  }
                  else if (row) {
                    if (row.availableSlots && unopened) {
                      colour = "bg-green-500 hover:bg-green-700 cursor-pointer";
                      text = "Open"
                    } else {
                      colour = "bg-red-500 cursor-not-allowed";
                      text = "Closed";
                    }
                  }

                  return (
                    <td key={`${r}-${col}`} >
                    {row && 
                    <div 
                      onClick={() => unopened && ((existing && existing.state === BOOKING_STATE.PENDING) ? cancel(existing._id) : reserve(row))} 
                      className={`p-2 m-1 rounded-lg ${colour}`}
                    >
                      <p>{moment(row.startAt).format("h:mm a") + " - " + moment(row.endAt).format("h:mm a")}</p>
                      <p>{text}</p>
                    </div>
                    }
                    </td>
                  );
                })}
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}