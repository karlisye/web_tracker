import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';
import VisitTable from '../components/VisitTable';
import { Link } from 'react-router-dom';
import MostVisitsGraph from '../components/MostVisitsGraph';

const Dashboard = () => {
  const { user } = useContext(AppContext);

  return (
    <div className='min-h-screen bg-linear-to-br from-slate-50 to-blue-50 py-16 px-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='text-center mb-16'>
          <h1 className='text-5xl md:text-6xl font-bold text-slate-900 mb-4'>
            Dashboard
          </h1>
          <div className='w-24 h-1 bg-indigo-500 mx-auto rounded-full'></div>
        </div>

        {user ? (
          <>
            <VisitTable />
            <MostVisitsGraph />
          </>
        ) : (
          <p className='text-slate-600 text-center'><Link className='text-blue-500 underline' to='/login'>Log in</Link> to see your web history statistics</p>
        )}
      </div>
    </div>
  )
}

export default Dashboard