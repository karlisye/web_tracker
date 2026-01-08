import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AppContext } from '../../context/AppContext';
import AuthNavBar from './AuthNavBar';
import UnauthNavBar from './UnauthNavBar';

const NavBar = ({ setIsMenuClicked }) => {
  const { user } = useContext(AppContext);

  return (
    <nav className='bg-linear-to-r from-indigo-50 to-indigo-100 flex py-2 px-4 gap-2 justify-between font-bold text-slate-600 items-center'>
      <div className='flex gap-2 items-center'>
        <button onClick={() => setIsMenuClicked(prev => !prev)} className='h-12 w-12 hover:scale-105 hover:cursor-pointer'>
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="text-slate-600"><path fill="currentColor" d="M18.75 8C18.75 8.41421 18.4142 8.75 18 8.75H6C5.58579 8.75 5.25 8.41421 5.25 8C5.25 7.58579 5.58579 7.25 6 7.25H18C18.4142 7.25 18.75 7.58579 18.75 8Z" /><path fill="currentColor" d="M18.75 12C18.75 12.4142 18.4142 12.75 18 12.75H6C5.58579 12.75 5.25 12.4142 5.25 12C5.25 11.5858 5.58579 11.25 6 11.25H18C18.4142 11.25 18.75 11.5858 18.75 12Z" /><path fill="currentColor" d="M18.75 16C18.75 16.4142 18.4142 16.75 18 16.75H6C5.58579 16.75 5.25 16.4142 5.25 16C5.25 15.5858 5.58579 15.25 6 15.25H18C18.4142 15.25 18.75 15.5858 18.75 16Z" /></svg>
        </button>

        <NavLink className={({ isActive }) => `p-1 rounded-md text-2xl hover:scale-105 ${isActive && 'text-black'}`} to='/'>WT</NavLink>
      </div>

      {user ? <AuthNavBar /> : <UnauthNavBar /> }
    </nav>
  )
}

export default NavBar