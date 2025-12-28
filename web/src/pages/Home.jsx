import React from 'react'

const Home = () => {
  return (
    <div className='min-h-screen bg-linear-to-br from-slate-50 to-blue-50 py-16 px-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='text-center my-4 flex flex-col gap-4'>
          <div className='text-center mb-16'>
            <h1 className='text-5xl md:text-6xl font-bold text-slate-900 mb-4'>
              Welcome to your Web Tracker!
            </h1>
            <p className='text-slate-600 mb-2'>Start tracking your accounts usage through out the web.</p>
            <div className='w-24 h-1 bg-indigo-500 mx-auto rounded-full'></div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Home