import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { useUser } from '../../../lib/hooks';
import Layout from '../../../components/layout';

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


  const getBooked = async () => {
    axios.get(`/api/bookings?userId=${user._id}&clubId=${clubId}`)
      .then(res => {
        console.log(res.data.bookings);
        setBooked(res.data.bookings)
      });
  }

  React.useEffect(() => {
    const date = moment().add(72, "hours").format("YYYY-MM-DD");
    axios.get(`/api/clubs/${clubId}/slots?date=${date}`)
      .then(res => {
        console.log(res.data.map.response);
        setData(res.data.map.response);
      });
  }, []);

  React.useEffect(() => {
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
      <h1 className="text-2xl font-bold">Slots</h1>
      <table>
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
              const alreadyBooked = booked.find(({timeSlotId}) => row && timeSlotId === row.identifier);
              if (alreadyBooked) {
                colour = "bg-gray-500 cursor-pointer";  
              } else {
                colour = row && ((row.availableSlots && unopened) ? "bg-green-500 hover:bg-green-700 cursor-pointer":"bg-red-500 cursor-not-allowed");
              }

              return (
                <td key={`${r}-${col}`} >
                {row && 
                <div 
                  onClick={() => unopened && (alreadyBooked ? cancel(alreadyBooked._id) : reserve(row))} 
                  className={`p-2 m-1 rounded-lg ${colour}`}
                >
                  <p>{moment(row.startAt).format("h:mm a") + " - " + moment(row.endAt).format("h:mm a")}</p>
                  <p>{row.availableSlots} spots</p>
                </div>
                }
                </td>
              );
            })}
          </tr>
        ))}
        </tbody>
      </table>
    </Layout>
  );
}