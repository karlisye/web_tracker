import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';
import VisitTable from '../components/VisitTable';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useContext(AppContext);

  return (
    <div className='text-center my-4 flex flex-col gap-4'>
      <h1 className='text-4xl font-bold'>Dashboard</h1>

      {user ? (
        <VisitTable />
      ) : (
        <p className='text-slate-600'><Link className='text-blue-500 underline' to='/login'>Log in</Link> to see your web history statistics</p>
      )}

    </div>
  )
}

export default Dashboard