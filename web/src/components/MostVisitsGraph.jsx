import axios from 'axios';
import React, { useEffect, useState } from 'react'

const MostVisitsGraph = () => {
  const [mostVisits, setMostVisits] = useState(null);

  const getMostVisits = async () => {
    // const res = await axios.get(`/visits?page=${page}`, { params: { sortBy, direction } });
    const res = await axios.get('/most-visits');
    setMostVisits(res.data.mostVisits);
    console.log(res.data.mostVisits);
  }
  useEffect(() => {
    getMostVisits();
  },[]);
  return (
    <div>MostVisitsGraph</div>
  )
}

export default MostVisitsGraph