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
        <p className='text-danger'>This action will remove all of your history from web tracker and it cannot be undone</p>
        {error && 
          <div className='py-2 px-6 bg-danger rounded-md text-white border'>
            <p>{error}</p>
          </div>
        }
      </div>

      <div className='flex flex-col gap-1'>
        <label className='text-white' htmlFor="confirmation">Please type in the words <span className='text-secondary'>reset-my-data</span> to confirm</label>
        <input 
          className='bg-secondary p-2 rounded-lg text-danger' 
          type="text" 
          id='confirmation'
          onChange={(e) => setIsValid(e.target.value === 'reset-my-data' ? true : false)}
        />
      </div>

      <div className='flex gap-4'>
        <button 
          className='bg-danger py-1 px-6 text-lg rounded-md text-white font-semibold hover:bg-danger-dark enabled:hover:cursor-pointer transition disabled:bg-muted'
          disabled={!isValid || isReseting}
          onClick={handleReset}
        >
          {isReseting ? 'Reseting...' : 'Confirm'}
        </button>

        <button
          className='py-1 px-6 bg-secondary text-primary rounded-md font-semibold hover:cursor-pointer text-lg hover:bg-secondary-light transition'
          onClick={() => setIsActive(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default ResetAccountModal