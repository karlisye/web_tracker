import React, { useContext } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { logout } from '../services/auth';
import { useEffect } from 'react';
import { useState } from 'react';

const extensionId = import.meta.env.VITE_CHROME_EXTENSION_ID;

const Layout = () => {
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const [isLinked, setIsLinked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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

  const isExtensionLinked = () => {
    if (window.chrome && chrome.runtime) {
      chrome.runtime.sendMessage(
        extensionId,
        { type: 'auth-check' },
        response => { setIsLinked(response) }
      );
    } 
  }

  const unlink = () => {
    if (window.chrome && chrome.runtime) {
      chrome.runtime.sendMessage(
        extensionId,
        { type: 'remove-token' },
        (response) => {
        console.log('Message sent to Chrome extension:', response);
        if (!response.error) setIsLinked(false);
        }
      );
    }
  }

  const link = () => {
    if (window.chrome && chrome.runtime) {
      chrome.runtime.sendMessage(
        extensionId,
        { type: 'auth-token', token: user.extension_token },
        response => { 
          console.log('Message sent to Chrome extension:', response);
          if (!response.error) setIsLinked(true);
        }
      );
    }
  }

  useEffect(() => {
    isExtensionLinked();
  },[user]);

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

      <div 
        className={`fixed bottom-0 right-0 p-2 flex flex-col gap-2 text-lg border-2 rounded-lg m-2 text-white
          ${isLinked ? 'bg-green-500' : 'bg-red-500'}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className='flex gap-2'>
          <span>Extension status: <span className='font-bold'>{isLinked ? 'linked' : 'unlinked'}</span></span>

          <svg className='w-5 hover:cursor-pointer' onClick={isExtensionLinked} fill="rgb(255,255,255)" viewBox="0 0 24.00 24.00" xmlns="http://www.w3.org/2000/svg" stroke="#000000" strokeWidth="0.00024000000000000003">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> 
              <path d="M19.146 4.854l-1.489 1.489A8 8 0 1 0 12 20a8.094 8.094 0 0 0 7.371-4.886 1 1 0 1 0-1.842-.779A6.071 6.071 0 0 1 12 18a6 6 0 1 1 4.243-10.243l-1.39 1.39a.5.5 0 0 0 .354.854H19.5A.5.5 0 0 0 20 9.5V5.207a.5.5 0 0 0-.854-.353z"></path>
            </g>
          </svg>
        </div>

        {isHovered && (
          <div className='flex justify-center'>
            <button 
              className={`border-2 rounded-md py-1 px-3 hover:cursor-pointer hover:scale-105 font-semibold
                ${isLinked ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
              `}
              onClick={isLinked ? unlink : link}
            >
              {isLinked ? 'Unlink' : 'Link'}
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default Layout