import axios from 'axios';
import React, { useEffect, useState } from 'react'
import TableSkeleton from '../skeletons/TableSkeleton';
import ContainerTitle from '../ContainerTitle';

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

          <div className='bg-primary rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 overflow-scroll max-h-50'>
            <table className='w-full table-fixed text-left border-separate border-spacing-y-2 text-background-light'>
              <thead>
                <tr className='shadow-sm shadow-muted rounded-md'>
                  <th className='bg-secondary p-2 rounded-l-md'>website</th>
                  <th className='bg-secondary p-2 rounded-r-md'>time</th>
                </tr>
              </thead>

              <tbody>
                {visits.map(visit => (
                  <tr key={visit.id} className='shadow-sm shadow-muted rounded-md'>
                    <td className='bg-secondary p-2 rounded-l-md'>{visit.website.host}</td>
                    <td className='bg-secondary p-2 rounded-r-md'>{visit.visit_time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className='bg-primary rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 max-h-1/3 grow p-2 flex gap-4'>
          <div className='flex-1 bg-secondary shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300 p-4 flex flex-col justify-center gap-1'>
            <span className='text-background-light'>Last time visited: <span className='text-primary font-semibold'>{visits[0]?.visit_time}</span></span>
            <span className='text-background-light'>First time visited: <span className='text-primary font-semibold'>{visits[visits.length - 1]?.visit_time}</span></span>
          </div>

          <div className='flex-1 bg-secondary shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300 p-4 flex flex-col justify-center gap-1'>
            <a target='_blank' href={visits[0]?.website.page_url} className='bg-primary py-4 shadow-sm hover:shadow-md hover:cursor-pointer rounded-md text-secondary-light text-center hover:bg-primary-dark transition'>Go to website</a>
          </div>

          <div className='flex-1 bg-secondary shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300 p-4 flex flex-col justify-center gap-1'>
            <span className='text-background-light'>Visits in past month: <span className='text-primary font-semibold'>{visitCount}</span></span>
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