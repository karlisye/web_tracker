import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import ExtensionStatus from '../components/ExtensionStatus';
import NavBar from '../components/navbar/NavBar';

const Layout = () => {
  const { user } = useContext(AppContext);
  return (
    <>
      <header>
        <NavBar />
      </header>

      <main className='h-screen overflow-hidden flex flex-col'>
          <Outlet/>
      </main>
      
      {user && <ExtensionStatus />}
    </>
  )
}

export default Layout