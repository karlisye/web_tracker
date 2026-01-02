import React from 'react'
import { NavLink } from 'react-router-dom'

const Menu = ({ setIsMenuClicked }) => {
  return (
    <div className='bg-linear-to-br from-indigo-600 to-indigo-800 rounded-r-xl fixed left-0 top-0 bottom-0 w-60 flex flex-col gap-2 pt-10 px-1 text-white'>
      <button onClick={() => setIsMenuClicked(false)} className='absolute right-0 top-0 mx-2 hover:cursor-pointer hover:scale-105'>
        <span className='text-xl font-bold'>x</span>
      </button>

      <NavLink className={({ isActive }) => `${isActive && 'bg-linear-to-r from-indigo-400 to-indigo-500 border-l-6 border-white shadow-md'} p-2 rounded-md font-semibold w-full`} to='/'>Home</NavLink>
      <NavLink className={({ isActive }) => `${isActive && 'bg-linear-to-r from-indigo-400 to-indigo-500 border-l-6 border-white shadow-md'} p-2 rounded-md font-semibold w-full`} to='/dashboard'>Dashboard</NavLink>
      <NavLink className={({ isActive }) => `${isActive && 'bg-linear-to-r from-indigo-400 to-indigo-500 border-l-6 border-white shadow-md'} p-2 rounded-md font-semibold w-full`} to='/about'>About Us</NavLink>
    </div>
  )
}

export default Menu