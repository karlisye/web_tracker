import axios from 'axios';
import React, { useEffect, useState } from 'react'
import TableSkeleton from '../skeletons/TableSkeleton';
import ContainerTitle from '../ContainerTitle';
import Modal from '../modals/Modal';

const WebsitesTable = () => {
  const [websites, setWebsites] = useState(null);
  const [isModalActive, setIsModalActive] = useState(false);

  useEffect(() => {
    const getUsersWebsites = async () => {
      const res = await axios.get('/websites');
      setWebsites(res.data.websites);
    }
    getUsersWebsites();
  },[]);

  if (!websites) return <TableSkeleton />

  return (
    <div>
      <ContainerTitle title="Your Websites" text="All the websites you have visited before" />
      <div className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8'>
        <table className='w-full text-left border-separate border-spacing-y-2 text-slate-600'>
          <thead>
            <tr className='shadow-sm shadow-slate-300 rounded-md'>
              <th className='bg-slate-100 p-2 rounded-l-md'>Website</th>
              <th className='bg-slate-100 p-2 rounded-r-md'></th>
            </tr>
          </thead>
          <tbody>
            {websites.map(website => (
              <tr key={website.id} className='shadow-sm shadow-slate-300 rounded-md'>
                <td className='bg-slate-100 p-2 rounded-l-md'>{website.host}</td>
                <td className='bg-slate-100 p-2 rounded-r-md flex justify-end'>
                  <button onClick={() => setIsModalActive(true)} className='py-1 px-4 bg-slate-200 rounded-md shadow-sm hover:shadow-md hover:cursor-pointer'>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal setIsActive={setIsModalActive} isActive={isModalActive}>
        
      </Modal>
    </div>
  )
}

export default WebsitesTable