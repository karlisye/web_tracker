import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';

const Dashboard = () => {
  const {name} = useContext(AppContext);
  return (
    <div>Dashboard {name}</div>
  )
}

export default Dashboard