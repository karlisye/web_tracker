import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const MostVisitsGraph = () => {
  const [mostVisits, setMostVisits] = useState(null);

  const getMostVisits = async () => {
    // const res = await axios.get(`/visits?page=${page}`, { params: { sortBy, direction } });
    const res = await axios.get('/most-visits');
    setMostVisits(res.data.mostVisits);
  }
  useEffect(() => {
    getMostVisits();
  },[]);
  return (
    <>
      {mostVisits && (
        <div>
        <h2 className='text-2xl my-2 font-bold ml-2'>Visit Count</h2>
        <div className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 md:p-10'>
          <ResponsiveContainer width='100%' height={300}>
            <BarChart data={mostVisits}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="host" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        </div>
      )}
    </>
  )
}

export default MostVisitsGraph