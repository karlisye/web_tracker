import axios from 'axios';
import React, { useEffect, useState } from 'react'
import TableSkeleton from '../skeletons/TableSkeleton';
import ContainerTitle from '../ContainerTitle';
import Modal from '../modals/Modal';
import RemoveWebsiteModal from '../modals/RemoveWebsiteModal';
import PopupMsg from '../PopupMsg';

const WebsitesTable = () => {
  const [websites, setWebsites] = useState(null);
  const [isModalActive, setIsModalActive] = useState(false);
  const [selectedWebsite, setSelectedWebsite] = useState(null); 

  const [message, setMessage] = useState('');

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
      <div className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 h-100 flex justify-center items-center'>
        <div className='h-full w-full overflow-scroll overscroll-contain'>
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
                    <button onClick={() => {setIsModalActive(true); setSelectedWebsite(website)}} className='py-1 px-4 bg-slate-200 rounded-md shadow-sm hover:shadow-md hover:cursor-pointer'>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal setIsActive={setIsModalActive} isActive={isModalActive}>
        <RemoveWebsiteModal setMessage={setMessage} setIsActive={setIsModalActive} website={selectedWebsite} />
      </Modal>

      <PopupMsg message={message} onClose={() => setMessage('')} />
    </div>
  )
}

export default WebsitesTable