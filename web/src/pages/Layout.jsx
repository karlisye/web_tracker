import React, { useContext } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios';
import { logout } from '../services/auth';

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.baseURL = "http://localhost:8000";

const extensionId = import.meta.env.VITE_CHROME_EXTENSION_ID;

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
      <header className='border'>
          <nav>
              <Link to='/'>Home</Link>
              {user ? (
                <div>
                  <div>{user.name}</div>
                  <form onSubmit={handleLogout}>
                    <button>Logout</button>
                  </form>
                </div>
              ) : (
              <div>
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