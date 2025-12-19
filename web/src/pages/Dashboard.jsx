import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { name, user } = useContext(AppContext);

  const [visits, setVisits] = useState(null);
  const [pageCount, setPageCount] = useState(null);
  const [page, setPage] = useState(1);

  const getVisits = async () => {
    const res = await axios.get(`/visits?page=${page}`);
    setPageCount(res.data.visits.links.length - 2);
    setVisits(res.data.visits.data);
  }

  useEffect(() => {
    getVisits();
  },[page]);

  if (!visits) return <p>Loading...</p>

  return (
    <>
      <div className='text-2xl font-bold text-center my-4'>Dashboard {name}</div>
      <div className='p-2 rounded-md m-4 bg-indigo-100'>
        <table className='w-full table-fixed text-left border-separate border-spacing-y-2'>
          <thead>
            <tr>
              <th className='bg-indigo-200 p-2 rounded-l-md'>ID</th>
              <th className='bg-indigo-200 p-2'>user</th>
              <th className='bg-indigo-200 p-2'>website</th>
              <th className='bg-indigo-200 p-2 rounded-r-md'>time</th>
            </tr>
          </thead>

          <tbody>
            {visits.map(visit => (
              <tr key={visit.id}>
                <td className='bg-indigo-200 p-2 rounded-l-md'>{visit.id}</td>
                <td className='bg-indigo-200 p-2'>{visit.user.name}</td>
                <td className='bg-indigo-200 p-2'>{visit.website.host}</td>
                <td className='bg-indigo-200 p-2 rounded-r-md'>{visit.visit_time}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='flex gap-2'>
          <button className='bg-indigo-200 rounded-md py-2 px-4 hover:bg-indigo-300 hover:cursor-pointer' onClick={() => setPage(prev => Math.max(prev - 1, 1))}>previous</button>
          <button className='bg-indigo-200 rounded-md py-2 px-4 hover:bg-indigo-300 hover:cursor-pointer' onClick={() => setPage(prev => Math.min(prev + 1, pageCount))}>next</button>
        </div>
      </div>
    </>
  )
}

export default Dashboard