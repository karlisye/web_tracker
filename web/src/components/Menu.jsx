import React from 'react'
import { NavLink } from 'react-router-dom'

const Menu = ({ setIsMenuClicked }) => {
  return (
    <div className='bg-indigo-700/50 backdrop-blur-xs rounded-xl absolute w-60 flex flex-col gap-2 pt-8 px-1 pb-2 text-white z-1'>
      <button onClick={() => setIsMenuClicked(false)} className='absolute right-0 top-0 mx-2 hover:cursor-pointer hover:scale-105'>
        <span className='text-xl font-bold'>x</span>
      </button>

      <NavLink className={({ isActive }) => `${isActive && 'bg-indigo-500/50 backdrop-blur-2xl border-l-6 border-white/50 shadow-md'} p-2 rounded-md font-semibold w-full`} to='/'>Home</NavLink>
      <NavLink className={({ isActive }) => `${isActive && 'bg-indigo-500/50 backdrop-blur-2xl border-l-6 border-white/50 shadow-md'} p-2 rounded-md font-semibold w-full`} to='/dashboard'>Dashboard</NavLink>
      <NavLink className={({ isActive }) => `${isActive && 'bg-indigo-500/50 backdrop-blur-2xl border-l-6 border-white/50 shadow-md'} p-2 rounded-md font-semibold w-full`} to='/about'>About Us</NavLink>
    </div>
  )
}

export default Menu