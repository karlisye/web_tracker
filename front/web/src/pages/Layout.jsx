import React, { useContext } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Layout = () => {
  const { user, token, setUser, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault()

    const response = await fetch('/api/logout', {
      method: 'post',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (response.ok) {
      setUser(null);
      setToken(null);
      localStorage.removeItem('token');
      navigate('/')
    }
  }

  return (
    <>
      <header>
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