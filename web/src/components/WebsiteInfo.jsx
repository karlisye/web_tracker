import axios from 'axios';
import React, { useEffect, useState } from 'react'
import TableSkeleton from './skeletons/TableSkeleton';
import ContainerTitle from './ContainerTitle';

const WebsiteInfo = ({ websiteID }) => {
  const [visits, setVisits] = useState(null);
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`visits/${websiteID}`);
      setVisits(res.data.visits);
      setVisitCount(res.data.visitCount);
    }
    getData();
  },[]);

  return (
    <>
      {visits ? (
        <>
        <div>
          <ContainerTitle title={`${visits[0]?.website?.host} visits`} />

          <div className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 overflow-scroll max-h-50'>
            <table className='w-full table-fixed text-left border-separate border-spacing-y-2 text-slate-600'>
              <thead>
                <tr className='shadow-sm shadow-slate-300 rounded-md'>
                  <th className='bg-slate-100 p-2 rounded-l-md'>website</th>
                  <th className='bg-slate-100 p-2 rounded-r-md'>time</th>
                </tr>
              </thead>

              <tbody>
                {visits.map(visit => (
                  <tr key={visit.id} className='shadow-sm shadow-slate-300 rounded-md'>
                    <td className='bg-slate-100 p-2 rounded-l-md'>{visit.website.host}</td>
                    <td className='bg-slate-100 p-2 rounded-r-md'>{visit.visit_time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 max-h-1/3 grow p-2 flex gap-4'>
          <div className='flex-1 bg-white shadow-lg rounded-xl h-full w-full hover:shadow-xl transition-shadow duration-300 p-4 flex flex-col justify-center gap-1'>
            <span className='text-slate-600'>Last time visited: <span className='text-indigo-400 font-semibold'>{visits[0]?.visit_time}</span></span>
            <span className='text-slate-600'>First time visited: <span className='text-indigo-400 font-semibold'>{visits[visits.length - 1]?.visit_time}</span></span>
          </div>
          <div className='flex-1 bg-white shadow-lg rounded-xl h-full w-full hover:shadow-xl transition-shadow duration-300 p-4 flex flex-col justify-center gap-1'>
            <a target='_blank' href={visits[0]?.website.page_url} className='bg-indigo-100 py-4 shadow-sm hover:shadow-md hover:cursor-pointer rounded-md text-slate-600 text-center'>Go to website</a>
          </div>
          <div className='flex-1 bg-white shadow-lg rounded-xl h-full w-full hover:shadow-xl transition-shadow duration-300 p-4 flex flex-col justify-center gap-1'>
            <span className='text-slate-600'>Visits in past month: <span className='text-indigo-400 font-semibold'>{visitCount}</span></span>
          </div>
        </div>
        </>
      ) : (
        <TableSkeleton />
      )}
    </>
  )
}

export default WebsiteInfo