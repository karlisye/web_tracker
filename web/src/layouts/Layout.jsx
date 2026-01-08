import React, { useContext, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import ExtensionStatus from '../components/ExtensionStatus';
import Menu from '../components/Menu';
import NavBar from '../components/navbar/NavBar';

const Layout = () => {
  const { user, setUser } = useContext(AppContext);
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  return (
    <>
      <header>
        <NavBar setIsMenuClicked={setIsMenuClicked} />
      </header>

      <main>
          <Outlet/>
      </main>

      {isMenuClicked && <Menu setIsMenuClicked={setIsMenuClicked} />}
      
      {user && <ExtensionStatus />}
    </>
  )
}

export default Layout