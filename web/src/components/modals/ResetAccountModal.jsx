import React, { useState } from 'react'
import { removeHistory } from '../../services/auth';

const ResetAccountModal = ({ setIsActive }) => {
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isReseting, setIsReseting] = useState(false);

  const handleReset = async () => {
    setIsReseting(true);
    setError('');

    try {
      await removeHistory();
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.response?.data?.message || 'History reset failed');
      setIsReseting(false);
      setTimeout(() => setError(''), 5000);
    }
  }
  

  return (
    <div className='space-y-4'>
      <div className='text-center'>
        <h3 className='text-white text-3xl font-semibold'>Are you sure you want to reset all your account history?</h3>
        <p className='text-red-500'>This action will remove all of your history from web tracker and it cannot be undone</p>
        {error && 
          <div className='py-2 px-6 bg-red-500 rounded-md text-white border'>
            <p>{error}</p>
          </div>
        }
      </div>

      <div className='flex flex-col gap-1'>
        <label className='text-white' htmlFor="confirmation">Please type in the words <span className='text-yellow-100'>reset-my-data</span> to confirm</label>
        <input 
          className='bg-yellow-100 p-2 rounded-lg text-red-500' 
          type="text" 
          id='confirmation'
          onChange={(e) => setIsValid(e.target.value === 'reset-my-data' ? true : false)}
        />
      </div>

      <div className='flex gap-4'>
        <button 
          className='bg-red-500 py-1 px-6 text-lg rounded-md text-white font-semibold hover:bg-red-600 enabled:hover:cursor-pointer transition disabled:bg-gray-400'
          disabled={!isValid || isReseting}
          onClick={handleReset}
        >
          {isReseting ? 'Reseting...' : 'Confirm'}
        </button>

        <button
          className='py-1 px-6 bg-yellow-100 text-teal-700 rounded-md font-semibold hover:cursor-pointer text-lg hover:bg-amber-100 transition'
          onClick={() => setIsActive(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default ResetAccountModal