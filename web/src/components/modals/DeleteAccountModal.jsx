import axios from 'axios';
import React, { useContext, useState } from 'react'
import { deleteAccount } from '../../services/auth';
import { AppContext } from '../../context/AppContext';

const DeleteAccountModal = ({ setIsActive }) => {
  const { setUser } = useContext(AppContext);

  const [isValid, setIsValid] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    console.log('a')
    setIsDeleting(true);
    setError('');

    try {
      await deleteAccount(setUser);
      window.location.href = '/';
    } catch (err) {
      setError(err.response?.data?.message || 'Account deletion failed');
      setIsDeleting(false);
      setTimeout(() => setError(''), 5000);
    }
  }

  return (
    <div className='space-y-4 my-4'>
      <div className='text-center'>
        <h3 className='text-white text-3xl font-semibold'>Are you sure you want to delete your account?</h3>
        <p className='text-danger'>This action is permanent and cannot be undone</p>
        {error && 
          <div className='py-2 px-6 bg-danger rounded-md text-white border'>
            <p>{error}</p>
          </div>
        }
      </div>

      <div className='flex flex-col gap-1'>
        <label className='text-white' htmlFor="confirmation">Please type in the words <span className='text-secondary'>delete-my-account</span> to confirm</label>
        <input 
          className='bg-secondary p-2 rounded-lg text-danger' 
          type="text" 
          id='confirmation'
          onChange={(e) => setIsValid(e.target.value === 'delete-my-account' ? true : false)}
        />
      </div>

      <div className='flex gap-4'>
        <button 
          className='bg-danger py-1 px-6 text-lg rounded-md text-white font-semibold hover:bg-danger-dark enabled:hover:cursor-pointer transition disabled:bg-muted'
          disabled={!isValid || isDeleting}
          onClick={handleDelete}
        >
          {isDeleting ? 'Deleting...' : 'Confirm'}
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

export default DeleteAccountModal