import React from 'react'
import ContainerTitle from '../ContainerTitle'

const DashboardNavigation = ({ onNavigate }) => {
  return (
    <section>
      <ContainerTitle title="See what you've been up to" />

      <div className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8'>
        <div className='flex gap-2 justify-between text-slate-800 font-bold items-center my-1 h-full'>
          <button
            className='bg-indigo-200 py-5 rounded-md grow shadow-md hover:bg-indigo-300 hover:shadow-lg hover:cursor-pointer'
            onClick={() => onNavigate('visits')}
          >
            Login history
          </button>

          <button
            className='bg-indigo-200 py-5 rounded-md grow shadow-md hover:bg-indigo-300 hover:shadow-lg hover:cursor-pointer'
            onClick={() => onNavigate('mostVisits')}
          >
            Visit count
          </button>

          <button
            className='bg-indigo-200 py-5 rounded-md grow shadow-md hover:bg-indigo-300 hover:shadow-lg hover:cursor-pointer'
            onClick={() => onNavigate('inactive')}
          >
            Inactive websites
          </button>

          <button
            className='bg-indigo-200 py-5 rounded-md grow shadow-md hover:bg-indigo-300 hover:shadow-lg hover:cursor-pointer'
            onClick={() => onNavigate('websites')}
          >
            Your websites
          </button>
        </div>
      </div>
    </section>
  )
}

export default DashboardNavigation