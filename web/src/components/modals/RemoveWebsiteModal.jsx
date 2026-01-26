import axios from 'axios'
import React from 'react'

const RemoveWebsiteModal = ({ website, setMessage }) => {
  const removeWebsite = async () => {
    const res = await axios.post(`/remove-website/${website.id}`);
    setMessage(res.data.message);
  }

  return (
    <>
      <div className='h-full flex flex-col justify-center items-center gap-6 text-center my-5'>
        <h3 className='font-bold text-3xl text-white'>Are you sure you want to remove all data from {website.host}?</h3>
        <div className='flex gap-4 w-1/2'>
          <button 
            onClick={removeWebsite}
            className='flex-1 bg-danger px-4 py-2 rounded-lg font-semibold text-xl text-white shadow-md hover:shadow-lg hover:cursor-pointer transition-shadow duration-300'
          >
            Yes, remove it!
          </button>
          <button className='flex-1 bg-secondary px-4 py-2 rounded-lg font-semibold text-xl text-primary shadow-md hover:shadow-lg hover:cursor-pointer transition-shadow duration-300'>No, take me back</button>
        </div>
      </div>
    </>
  )
}

export default RemoveWebsiteModal