import axios from 'axios'
import React, { useEffect, useState } from 'react'

const InactiveWebsitesTable = () => {
  const [inactiveWebsites, setInactiveWebsites] = useState(null);

  const getInactiveWebsites = async () => {
    const res = await axios.get('/inactive-websites');
    setInactiveWebsites(res.data.inactiveWebsites);
  }

  useEffect(() => {
    getInactiveWebsites();
  },[]);

  if (!inactiveWebsites) return <p>Loading...</p>

  return (
    <div>
      <h2 className='text-2xl my-2 font-bold ml-2'>Inactive Websites</h2>
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
                <td className='bg-slate-100 p-2 rounded-r-md'>{inactiveWebsite.last_visit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default InactiveWebsitesTable