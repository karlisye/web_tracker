import React from 'react'
import ContainerTitle from '../ContainerTitle'

const DashboardNavigation = ({ onNavigate }) => {
  return (
    <section>
      <ContainerTitle title="See what you've been up to" />

      <div className='bg-secondary rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8'>
        <div className='flex gap-2 justify-between font-bold items-center my-1 h-full'>
          <button
            className='bg-primary-light text-secondary py-5 rounded-md grow shadow-md hover:bg-primary hover:shadow-lg hover:cursor-pointer transition duration-200'
            onClick={() => onNavigate('visits')}
          >
            Login history
          </button>

          <button
            className='bg-primary-light text-secondary py-5 rounded-md grow shadow-md hover:bg-primary hover:shadow-lg hover:cursor-pointer transition duration-200'
            onClick={() => onNavigate('mostVisits')}
          >
            Visit count
          </button>

          <button
            className='bg-primary-light text-secondary py-5 rounded-md grow shadow-md hover:bg-primary hover:shadow-lg hover:cursor-pointer transition duration-200'
            onClick={() => onNavigate('inactive')}
          >
            Inactive websites
          </button>

          <button
            className='bg-primary-light text-secondary py-5 rounded-md grow shadow-md hover:bg-primary hover:shadow-lg hover:cursor-pointer transition duration-200'
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