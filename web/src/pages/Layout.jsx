import React, { useContext } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { logout } from '../services/auth';

const Layout = () => {
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      await logout(setUser);
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <header>
          <nav className='bg-indigo-100 flex p-4 gap-2 justify-between font-bold text-slate-600'>
              <Link to='/'>Home</Link>
              {user ? (
                <div className='flex gap-2'>
                  <form onSubmit={handleLogout}>
                    <button className='hover:cursor-pointer'>Logout</button>
                  </form>
                  <span className=''>{user.name}</span>
                </div>
              ) : (
                <div className='flex gap-2'>
                  <Link to='/register'>Register</Link>
                  <Link to='/login'>Login</Link>
                </div>
              )             
              }
          </nav>
      </header>

      <main>
          <Outlet/>
      </main>
    </>
  )
}

export default Layout