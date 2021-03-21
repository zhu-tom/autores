import axios from 'axios';
import React from 'react';
import Link from 'next/link';

export function getServerSideProps(context) {
  return {
    props: {params: context.params}
  }
}

export default function ClubId({params}) {
  const { clubId } = params;
  const [data, setData] = React.useState({});

  React.useEffect(() => {
    axios.get(`https://www.goodlifefitness.com/content/experience-fragments/goodlife/header/master/jcr:content/root/responsivegrid/header.GetClubsWithDetails.${clubId}.false.true.2021219.json`)
      .then(res => {
        console.log(res.data.map.response[0]);
        setData(res.data.map.response[0]);
      })
  }, []);

  return (
    <div>
      <h1>{data.ClubName}</h1>
      <Link href={`/clubs/${clubId}/slots`}>Slots</Link>
    </div>
  );
}