import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { authorize } from '../../services/auth';

const ProfileAccount = () => {
  const { user, getUser } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
  });
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState('');

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

  return (
    <div>
      <h2 className='text-3xl font-bold text-slate-200 mb-2'>Account Settings</h2>
      <p className='text-slate-400 mb-8'>Manage your personal information and account preferences</p>

      {message && (
        <div className='mb-6 p-4 bg-pink-200 text-teal-700 rounded-lg shadow-sm'>
          {message}
        </div>
      )}

      <div className='bg-white rounded-xl shadow-md p-6 mb-6'>
        <div className='flex items-center justify-between mb-6'>
          <h3 className='text-xl font-bold text-teal-700'>Profile Information</h3>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className='px-4 py-2 bg-teal-700 text-yellow-100 rounded-lg hover:bg-teal-800 transition hover:cursor-pointer shadow-md hover:shadow-lg'
            >
              Edit
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className='flex flex-col gap-2'>
            <div>
              <label className='block text-teal-700 font-semibold'>Name</label>
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={!isEditing}
                className='w-full px-4 py-3 border-l-8 border-teal-700 rounded-lg outline-teal-700 bg-white transition shadow-md hover:shadow-lg'
              />
              {errors.name && <p className='font-bold text-red-500'>{errors.name}</p>}
            </div>

            <div>
              <label className='block text-teal-700 font-semibold'>Email Address</label>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={!isEditing}
                className='w-full px-4 py-3 border-l-8 border-teal-700 rounded-lg outline-teal-700 bg-white transition shadow-md hover:shadow-lg'
              />
              {errors.email && <p className='font-bold text-red-500'>{errors.email}</p>}
            </div>

            <div>
              <label className='block text-teal-700 font-semibold'>Member Since</label>
              <input
                type='text'
                value={new Date(user.created_at).toLocaleDateString()}
                disabled
                className='w-full px-4 py-3 border-l-8 border-teal-700 rounded-lg bg-gray-100 shadow-md'
              />
            </div>
          </div>

          {isEditing && (
            <div className='flex gap-3 mt-6'>
              <button
                type='submit'
                className='px-6 py-2 bg-teal-700 text-yellow-100 rounded-lg hover:bg-teal-800 transition font-semibold hover:cursor-pointer'
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
                className='px-6 py-2 bg-gray-300 text-teal-700 rounded-lg hover:bg-gray-400 transition font-semibold hover:cursor-pointer'
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>

      <div className='bg-white rounded-xl shadow-md p-6 mb-6'>
        <h3 className='text-xl font-bold text-teal-700 mb-4'>Account Activity</h3>
        <div className='grid grid-cols-3 gap-4'>
          <div className='bg-teal-50 rounded-lg p-4 text-center'>
            <div className='text-3xl font-bold text-teal-700 mb-1'>24</div>
            <div className='text-teal-600 text-sm'>Websites Tracked</div>
          </div>
          <div className='bg-pink-50 rounded-lg p-4 text-center'>
            <div className='text-3xl font-bold text-teal-700 mb-1'>156</div>
            <div className='text-teal-600 text-sm'>Total Visits</div>
          </div>
          <div className='bg-yellow-50 rounded-lg p-4 text-center'>
            <div className='text-3xl font-bold text-teal-700 mb-1'>8</div>
            <div className='text-teal-600 text-sm'>Inactive Sites</div>
          </div>
        </div>
      </div>

      <div className='bg-red-50 border-2 border-red-200 rounded-xl shadow-md p-6'>
        <h3 className='text-xl font-bold text-red-700 mb-2'>Danger Zone</h3>
        <p className='text-red-600 mb-4'>These actions are permanent and cannot be undone</p>
        <button className='px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold hover:cursor-pointer shadow-md hover:shadow-lg'>
          Delete Account
        </button>
      </div>
    </div>
  )
}

export default ProfileAccount
