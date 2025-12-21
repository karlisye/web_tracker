import axios from 'axios';
import React, { useEffect, useState } from 'react'

const VisitTable = () => {
  const [visits, setVisits] = useState(null);
  const [pageCount, setPageCount] = useState(null);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('visit_time');
  const [direction, setDirection] = useState('asc');

  const getVisits = async () => {
    const res = await axios.get(`/visits?page=${page}`, { params: { sortBy, direction } });
    setPageCount(res.data.visits.links.length - 2);
    setVisits(res.data.visits.data);
  }

  useEffect(() => {
    getVisits();
  },[page, sortBy, direction]);

  if (!visits) return <p>Loading...</p>

  return (
    <div className='p-2 rounded-md m-4 bg-indigo-100'>
      <div className='flex gap-4 text-slate-600 justify-end'>
        <div>
          <label htmlFor="sortBy">Sort by: </label>
          <select onChange={(e) => setSortBy(e.target.value)} id='sortBy'>
            <option value='visit_time'>Time</option>
            <option value='website_id'>Website</option>
          </select>
        </div>

        <div>
          <label htmlFor="direction">Direction: </label>
          <select onChange={(e) => setDirection(e.target.value)} id='direction'>
            <option value='asc'>Ascending</option>
            <option value='desc'>Descending</option>
          </select>
        </div>
      </div>

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
        <button 
          className={`bg-indigo-200 rounded-md py-2 px-4
            ${page-1 < 1 ? 'bg-slate-400 text-slate-600' : 'hover:cursor-pointer hover:bg-indigo-300'}
          `}          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page-1 < 1}
        >
          <span>previous</span>
        </button>

        <button 
          className={`bg-indigo-200 rounded-md py-2 px-4
            ${page+1 > pageCount ? 'bg-slate-400 text-slate-600' : 'hover:cursor-pointer hover:bg-indigo-300'}
          `}
          onClick={() => setPage(prev => Math.min(prev + 1, pageCount))}
          disabled={page+1 > pageCount}
        >
          <span>next</span>
        </button>
      </div>
    </div>
  )
}

export default VisitTable