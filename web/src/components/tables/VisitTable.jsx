import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ContainerTitle from '../ContainerTitle';
import TableSkeleton from '../skeletons/TableSkeleton';
import WebsiteInfo from '../modals/WebsiteInfo';
import Modal from '../modals/Modal';

const VisitTable = () => {
  const [visits, setVisits] = useState(null);
  const [pageCount, setPageCount] = useState(null);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('visit_time');
  const [direction, setDirection] = useState('asc');

  const [isSeeMoreActive, setIsSeeMoreActive] = useState(false);
  const [websiteID, setWebsiteID] = useState(null);

  const getVisits = async () => {
    const res = await axios.get(`/visits?page=${page}`, { params: { sortBy, direction } });
    setPageCount(res.data.visits.links.length - 2);
    setVisits(res.data.visits.data);
  }

  useEffect(() => {
    getVisits();
  },[page, sortBy, direction]);

  if (!visits) return <TableSkeleton colCount={4} />

  return (
    <div>
    <ContainerTitle title='Login History' />

    <div className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8'>
      <div className='flex gap-4 text-slate-400 justify-end'>
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

      <table className='w-full table-fixed text-left border-separate border-spacing-y-2 text-slate-600'>
        <thead>
          <tr className='shadow-sm shadow-slate-300 rounded-md'>
            <th className='bg-slate-100 p-2 rounded-l-md'>ID</th>
            <th className='bg-slate-100 p-2'>user</th>
            <th className='bg-slate-100 p-2'>website</th>
            <th className='bg-slate-100 p-2'>time</th>
            <th className='bg-slate-100 p-2 rounded-r-md'></th>
          </tr>
        </thead>

        <tbody>
          {visits.map(visit => (
            <tr className='shadow-sm shadow-slate-300 rounded-md' key={visit.id}>
              <td className='bg-slate-100 p-2 rounded-l-md'>{visit.id}</td>
              <td className='bg-slate-100 p-2'>{visit.user.name}</td>
              <td className='bg-slate-100 p-2'><a target='_blank' href={visit.website.page_url}>{visit.website.host}</a></td>
              <td className='bg-slate-100 p-2'>{visit.visit_time}</td>
              <td className='bg-slate-100 p-2 rounded-r-md flex justify-end'>
                <button onClick={() => {setIsSeeMoreActive(true); setWebsiteID(visit.website_id)}} className='bg-slate-200 py-1 px-6 rounded-md shadow-sm hover:shadow-md hover:cursor-pointer transition duration-100'>See More</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='flex gap-2'>
        <button 
          className={`bg-indigo-200 rounded-md py-2 px-4 shadow-lg font-semibold
            ${page-1 < 1 ? 'bg-slate-400 text-slate-600' : 'hover:cursor-pointer hover:bg-indigo-300'}
          `}          
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page-1 < 1}
        >
          <span>previous</span>
        </button>

        <button 
          className={`bg-indigo-200 rounded-md py-2 px-4 shadow-lg font-semibold
            ${page+1 > pageCount ? 'bg-slate-400 text-slate-600' : 'hover:cursor-pointer hover:bg-indigo-300'}
          `}
          onClick={() => setPage(prev => Math.min(prev + 1, pageCount))}
          disabled={page+1 > pageCount}
        >
          <span>next</span>
        </button>
      </div>
    </div>
    
    <Modal setIsActive={setIsSeeMoreActive} isActive={isSeeMoreActive}>
      <WebsiteInfo websiteID={websiteID} />
    </Modal>

    </div>
  )
}

export default VisitTable