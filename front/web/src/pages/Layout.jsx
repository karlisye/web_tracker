import React, { useContext } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.baseURL = "http://localhost:8000";

const extensionId = import.meta.env.VITE_CHROME_EXTENSION_ID;

const Layout = () => {
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();

    const response = await axios.post('/logout')

    if (response.data.errors) {
      console.log(response.data.errors)
      return;
    }

    setUser(null);
    navigate('/')

    if (window.chrome && chrome.runtime) {
      chrome.runtime.sendMessage(
        extensionId,
        { type: 'remove-token' },
        (response) => {
          console.log("Message sent to Chrome extension:", response);
        }
      );
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