import React, { useState } from 'react'
import Modal from '../../components/modals/Modal';
import ResetAccountModal from '../../components/modals/ResetAccountModal';
import axios from 'axios';
import { toggleWebsiteReader, updateRetention } from '../../services/auth';

const ProfilePrivacy = () => {
  const [isResetModalActive, setIsResetModalActive] = useState(false);
  const [retentionMessage, setRetentionMessage] = useState('');

  const handleRetentionChange = async (e) => {
    try {
      const res = await updateRetention(e.target.value);
      setRetentionMessage(res.message);
      setTimeout(() => setRetentionMessage(''), 5000);
    } catch (error) {
      setRetentionMessage('Failed to update retention setting');
      setTimeout(() => setRetentionMessage(''), 5000);
    }
  }

  const handleTrackVisitsToggle = (e) => {
    toggleWebsiteReader(e.target.checked);


  }

  return (
    <>
      <div className='pt-20'>
        <h2 className='text-3xl font-bold text-white mb-2'>Privacy</h2>
        <p className='text-slate-400 mb-8'>Manage your data and privacy preferences</p>

        <div className='space-y-6'>
          <div className='bg-neutral-800 p-6 rounded-xl'>
            <h3 className='text-xl font-semibold text-yellow-100 mb-2'>Visit History</h3>
            <p className='text-slate-400 mb-4'>
              Remove all your browsing visit history from our servers. This action cannot be undone.
            </p>
            <button 
              onClick={() => setIsResetModalActive(true)}
              className='bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition font-semibold'
            >
              Clear All Visit Data
            </button>
          </div>

          {/* later */}
          <div className='bg-neutral-800 p-6 rounded-xl'>
            <h3 className='text-xl font-semibold text-yellow-100 mb-2'>Export Your Data</h3>
            <p className='text-slate-400 mb-4'>
              Download a copy of all your visit data, including websites and timestamps.
            </p>
            <button className='bg-teal-700 hover:bg-teal-600 text-yellow-100 py-2 px-4 rounded-lg transition font-semibold'>
              Download Data
            </button>
          </div>

          {/* later */}
          <div className='bg-neutral-800 p-6 rounded-xl'>
            <h3 className='text-xl font-semibold text-yellow-100 mb-2'>Chrome Extension</h3>
            <p className='text-slate-400'>
              Manage what data your Chrome extension can collect and send to our servers.
            </p>
            <p className='text-slate-400 mb-4'>
              *These settings can also be changed in the extension.
            </p>
            <div className='flex justify-between'>
              <label className='flex items-center justify-between text-white'>Track visited websites</label>
              <input 
                type='checkbox'
                defaultChecked
                className='w-5 h-5 accent-teal-700'
                onChange={handleTrackVisitsToggle}
              />
            </div>
          </div>

          <div className='bg-neutral-800 p-6 rounded-xl'>
            <h3 className='text-xl font-semibold text-yellow-100 mb-2'>Data Retention</h3>
            <p className='text-slate-400 mb-4'>
              Choose how long we keep your visit history before automatically deleting it.
            </p>
            <select 
              className='bg-neutral-700 text-white py-2 px-4 rounded-lg w-full border-2 border-transparent focus:border-teal-700 outline-none'
              onChange={handleRetentionChange}
            >
              <option value='forever'>Keep forever</option>
              <option value='1year'>Delete after 1 year</option>
              <option value='6months'>Delete after 6 months</option>
              <option value='3months'>Delete after 3 months</option>
              <option value='1month'>Delete after 1 month</option>
            </select>
            {retentionMessage && <p className='mb-4 mt-2 p-3 bg-teal-900 border border-teal-700 text-yellow-100 rounded-lg'>{retentionMessage}</p>}
          </div>
        </div>
      </div>

      {isResetModalActive &&
        <Modal setIsActive={setIsResetModalActive} isActive={isResetModalActive} >
          <ResetAccountModal setIsActive={setIsResetModalActive} />
        </Modal>
      }
    </>
  )
}

export default ProfilePrivacy
