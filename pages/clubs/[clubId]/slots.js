import React from 'react';
import axios from 'axios';
import moment from 'moment';

export function getServerSideProps(context) {
  return {
    props: {params: context.params}
  }
}

export default function Slots({ params }) {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const date = moment().add(72, "hours").format("YYYY-MM-DD");
    axios.get(`https://www.goodlifefitness.com/content/goodlife/en/book-workout/jcr:content/root/responsivegrid/workoutbooking.GetWorkoutSlots.${params.clubId}.${date}.json`)
      .then(res => {
        setData(res.data.map.response);
        console.log(res.data.map.response);
      });
    
  }, []);

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

  return (
    <div>
      <h1>Slots</h1>
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
            {arr.map((row, col) => (
              <td key={`${r}-${col}`} className={row && ((row.availableSlots && moment(row.startAt).isAfter(moment().add(72, "hours"))) ? "bg-green-500":"bg-red-500")}>
              {row && 
              <div >
                <p>{moment(row.startAt).format("h:mm a") + " - " + moment(row.endAt).format("h:mm a")}</p>
                <p>{row.availableSlots} spots left</p>
                <p>{row.identifier}</p>
              </div>
              }
              </td>
            ))}
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}