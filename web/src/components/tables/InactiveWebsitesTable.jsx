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
    <>
    <ContainerTitle title='Inactive Websites' text="See all websites that you haven't visited in over a month." />

    <div className='bg-primary rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8'>
      <table className='w-full table-fixed text-left border-separate border-spacing-y-2'>
        <thead>
          <tr className='shadow-sm rounded-md'>
            <th className='bg-secondary p-2 rounded-l-md'>Website</th>
            <th className='bg-secondary p-2 rounded-r-md'>Last Visit</th>
          </tr>
        </thead>
        <tbody>
          {inactiveWebsites.map(inactiveWebsite => (
            <tr className='shadow-sm rounded-md' key={inactiveWebsite.host}>
              <td className='bg-secondary p-2 rounded-l-md'><a target='_blank' href={`https://${inactiveWebsite.host}`}>{inactiveWebsite.host}</a></td>
              <td className='bg-secondary p-2 rounded-r-md'>
                <span className='bg-danger text-white py-1 px-4 rounded-2xl'>{inactiveWebsite.last_visit}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  )
}

export default InactiveWebsitesTable