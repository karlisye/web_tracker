import React, { useContext, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { logout } from '../services/auth';
import ExtensionStatus from '../components/ExtensionStatus';
import Menu from '../components/Menu';

const Layout = () => {
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const [isMenuClicked, setIsMenuClicked] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      await logout(setUser);
      setIsLinked(false);
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <header>
          <nav className='bg-indigo-100 flex p-2 gap-2 justify-between font-bold text-slate-600 items-center'>
            <div className='flex gap-2 items-center'>
              <button onClick={() => setIsMenuClicked(prev => !prev)} className='h-12 w-12 hover:scale-105 hover:cursor-pointer'>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.5" d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22Z" fill="#1C274C"></path> <path d="M18.75 8C18.75 8.41421 18.4142 8.75 18 8.75H6C5.58579 8.75 5.25 8.41421 5.25 8C5.25 7.58579 5.58579 7.25 6 7.25H18C18.4142 7.25 18.75 7.58579 18.75 8Z" fill="#1C274C"></path> <path d="M18.75 12C18.75 12.4142 18.4142 12.75 18 12.75H6C5.58579 12.75 5.25 12.4142 5.25 12C5.25 11.5858 5.58579 11.25 6 11.25H18C18.4142 11.25 18.75 11.5858 18.75 12Z" fill="#1C274C"></path> <path d="M18.75 16C18.75 16.4142 18.4142 16.75 18 16.75H6C5.58579 16.75 5.25 16.4142 5.25 16C5.25 15.5858 5.58579 15.25 6 15.25H18C18.4142 15.25 18.75 15.5858 18.75 16Z" fill="#1C274C"></path> </g></svg>
              </button>
              <Link className='text-2xl hover:scale-105' to='/'>WT</Link>
            </div>
              {user ? (
                <div className='flex gap-2'>
                  <form onSubmit={handleLogout}>
                    <button className='hover:cursor-pointer hover:scale-105'>Logout</button>
                  </form>
                  <span className=''>{user.name}</span>
                </div>
              ) : (
                <div className='flex gap-2'>
                  <Link className='hover:scale-105' to='/register'>Register</Link>
                  <Link className='hover:scale-105' to='/login'>Login</Link>
                </div>
              )             
              }
          </nav>
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