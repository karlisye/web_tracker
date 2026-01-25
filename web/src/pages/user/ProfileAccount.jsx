import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { authorize } from '../../services/auth';
import Modal from '../../components/modals/Modal';
import DeleteAccountModal from '../../components/modals/DeleteAccountModal';

const ProfileAccount = () => {
  const { user, getUser } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
  });
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState('');
  const [websiteCount, setWebsiteCount] = useState(0);
  const [inactiveWebsiteCount, setInactiveWebsiteCount] = useState(0);
  const [visitCount, setVisitCount] = useState(0);
  const [isDeleteModalActive, setIsDeleteModalActive] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors('');

    try {
      await authorize('user/update', formData, getUser);
      setMessage('Account updated!')
      setTimeout(() => setMessage(''), 5000);
    } catch (error) {
      setErrors(error.response?.data?.errors || "Updating account failed");
      setMessage('Failed to update account');
      setTimeout(() => setMessage(''), 5000);
    } 
  };

  const getInactiveWebsites = async () => {
    const res = await axios.get('/inactive-websites');
    setInactiveWebsiteCount(res.data.count);
  }

  const getUsersWebsites = async () => {
    const res = await axios.get('/websites');
    setWebsiteCount(res.data.count);
  }

  const getVisits = async () => {
    const res = await axios.get('/visits', { params: { sortBy: 'visit_time', direction: 'asc'}});
    setVisitCount(res.data.visits.total);
  }

  useEffect(() => {
    getInactiveWebsites();
    getUsersWebsites();
    getVisits();
  },[]);

  return (
    <>
    <div className='pt-20'>
      <h2 className='text-3xl font-bold text-white mb-2'>Account Settings</h2>
      <p className='text-slate-400 mb-8'>Manage your personal information and account preferences</p>

      {message && (
        <div className='mb-6 p-4 bg-teal-900 border border-teal-700 text-yellow-100 rounded-lg'>
          {message}
        </div>
      )}

      <div className='bg-neutral-800 rounded-xl p-6 mb-6'>
        <div className='flex items-center justify-between mb-6'>
          <h3 className='text-xl font-bold text-yellow-100'>Profile Information</h3>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className='px-4 py-2 bg-teal-700 text-yellow-100 rounded-lg hover:bg-teal-600 transition font-semibold'
            >
              Edit
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className='flex flex-col gap-4'>
            <div>
              <label className='block text-yellow-100 font-semibold mb-2'>Name</label>
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={!isEditing}
                className='w-full px-4 py-3 bg-neutral-700 text-white rounded-lg border-2 border-transparent focus:border-teal-700 outline-none transition disabled:opacity-50'
              />
              {errors.name && <p className='font-bold text-pink-400 mt-1'>{errors.name}</p>}
            </div>

            <div>
              <label className='block text-yellow-100 font-semibold mb-2'>Email Address</label>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={!isEditing}
                className='w-full px-4 py-3 bg-neutral-700 text-white rounded-lg border-2 border-transparent focus:border-teal-700 outline-none transition disabled:opacity-50'
              />
              {errors.email && <p className='font-bold text-pink-400 mt-1'>{errors.email}</p>}
            </div>

            <div>
              <label className='block text-yellow-100 font-semibold mb-2'>Member Since</label>
              <input
                type='text'
                value={new Date(user.created_at).toLocaleDateString()}
                disabled
                className='w-full px-4 py-3 bg-neutral-700 text-slate-400 rounded-lg opacity-50'
              />
            </div>
          </div>

          {isEditing && (
            <div className='flex gap-3 mt-6'>
              <button
                type='submit'
                className='px-6 py-2 bg-teal-700 text-yellow-100 rounded-lg hover:bg-teal-600 transition font-semibold'
              >
                Save Changes
              </button>
              <button
                type='button'
                onClick={() => {
                  setIsEditing(false);
                  setFormData({ name: user.name, email: user.email });
                  setErrors('');
                }}
                className='px-6 py-2 bg-neutral-700 text-white rounded-lg hover:bg-neutral-600 transition font-semibold'
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>

      <div className='bg-neutral-800 rounded-xl p-6 mb-6'>
        <h3 className='text-xl font-bold text-yellow-100 mb-4'>Account Activity</h3>
        <div className='grid grid-cols-3 gap-4'>
          <div className='bg-teal-900 border border-teal-700 rounded-lg p-4 text-center'>
            <div className='text-3xl font-bold text-teal-400 mb-1'>{websiteCount}</div>
            <div className='text-slate-300 text-sm'>Websites Tracked</div>
          </div>
          <div className='bg-pink-900 border border-pink-700 rounded-lg p-4 text-center'>
            <div className='text-3xl font-bold text-pink-400 mb-1'>{visitCount}</div>
            <div className='text-slate-300 text-sm'>Total Visits</div>
          </div>
          <div className='bg-yellow-900 border border-yellow-700 rounded-lg p-4 text-center'>
            <div className='text-3xl font-bold text-yellow-300 mb-1'>{inactiveWebsiteCount}</div>
            <div className='text-slate-300 text-sm'>Inactive Sites</div>
          </div>
        </div>
      </div>

      <div className='bg-neutral-800 border-2 border-red-500 rounded-xl p-6'>
        <h3 className='text-xl font-bold text-red-400 mb-2'>Danger Zone</h3>
        <p className='text-slate-400 mb-4'>These actions are permanent and cannot be undone</p>
        <button 
          className='px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold'
          onClick={() => setIsDeleteModalActive(true)}
        >
          Delete Account
        </button>
      </div>
    </div>

    {isDeleteModalActive &&
      <Modal setIsActive={setIsDeleteModalActive} isActive={isDeleteModalActive} >
        <DeleteAccountModal setIsActive={setIsDeleteModalActive} />
      </Modal>
    }
    </>
  )
}

export default ProfileAccount
