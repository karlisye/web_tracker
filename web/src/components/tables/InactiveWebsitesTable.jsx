import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ContainerTitle from '../ContainerTitle';
import TableSkeleton from '../skeletons/TableSkeleton';

const InactiveWebsitesTable = () => {
  const [inactiveWebsites, setInactiveWebsites] = useState(null);

  const getInactiveWebsites = async () => {
    const res = await axios.get('/inactive-websites');
    setInactiveWebsites(res.data.inactiveWebsites);
  }

  useEffect(() => {
    getInactiveWebsites();
  },[]);

  if (!inactiveWebsites) return <TableSkeleton />

  return (
    <div>
    <ContainerTitle title='Inactive Websites' text="See all websites that you haven't visited in over a month." />

    <div className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 md:p-10'>
      <table className='w-full table-fixed text-left border-separate border-spacing-y-2 text-slate-600'>
        <thead>
          <tr className='shadow-sm shadow-slate-300 rounded-md'>
            <th className='bg-slate-100 p-2 rounded-l-md'>Website</th>
            <th className='bg-slate-100 p-2 rounded-r-md'>Last Visit</th>
          </tr>
        </thead>
        <tbody>
          {inactiveWebsites.map(inactiveWebsite => (
            <tr className='shadow-sm shadow-slate-300 rounded-md' key={inactiveWebsite.host}>
              <td className='bg-slate-100 p-2 rounded-l-md'>{inactiveWebsite.host}</td>
              <td className='bg-slate-100 p-2 rounded-r-md'>
                <span className='bg-red-500 text-white py-1 px-4 rounded-2xl'>{inactiveWebsite.last_visit}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default InactiveWebsitesTable