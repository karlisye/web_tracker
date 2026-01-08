import React from 'react'
import { NavLink } from 'react-router-dom'

const Menu = ({ setIsMenuClicked }) => {
  let timeout;
  return (
    <div 
      className='bg-indigo-700/50 backdrop-blur-xs rounded-xl flex gap-2 py-2 px-1 text-white z-1 flex-1'
      onMouseLeave={() => {
        timeout = setTimeout(() => setIsMenuClicked(false), 300);
      }}
      onMouseEnter={() => clearTimeout(timeout)}
    >
      <div className='flex flex-col flex-1'>
        <NavLink className={({ isActive }) => `${isActive && 'bg-indigo-500/50 backdrop-blur-2xl border-l-6 border-white/50 shadow-md'} p-2 rounded-md font-semibold w-full`} to='/'>Home</NavLink>
        <NavLink className={({ isActive }) => `${isActive && 'bg-indigo-500/50 backdrop-blur-2xl border-l-6 border-white/50 shadow-md'} p-2 rounded-md font-semibold w-full`} to='/dashboard'>Dashboard</NavLink>
        <NavLink className={({ isActive }) => `${isActive && 'bg-indigo-500/50 backdrop-blur-2xl border-l-6 border-white/50 shadow-md'} p-2 rounded-md font-semibold w-full`} to='/about'>About Us</NavLink>
      </div>

      <button 
        className='text-2xl font-bold mr-2 hover:scale-110 hover:cursor-pointer'
        onClick={() => setIsMenuClicked(false)}
      >
        x
      </button>
    </div>
  )
}

export default Menu