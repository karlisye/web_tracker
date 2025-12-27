import React from 'react'
import { NavLink } from 'react-router-dom'

const Menu = ({ setIsMenuClicked }) => {
  return (
    <div className='rounded-r-xl fixed left-0 top-0 bottom-0 w-60 flex flex-col gap-2 bg-indigo-300 pt-10 px-1 text-slate-600'>
      <button onClick={() => setIsMenuClicked(false)} className='absolute right-0 top-0 mx-2 hover:cursor-pointer hover:scale-105'>
        <span className='text-xl font-bold'>x</span>
      </button>

      <NavLink className={({ isActive }) => `${isActive && 'bg-indigo-200 border-l-6 border-white'} p-2 rounded-md font-semibold w-full`} to='/'>Home</NavLink>
      <NavLink className={({ isActive }) => `${isActive && 'bg-indigo-200 border-l-6 border-white'} p-2 rounded-md font-semibold w-full`} to='/dashboard'>Dashboard</NavLink>
    </div>
  )
}

export default Menu