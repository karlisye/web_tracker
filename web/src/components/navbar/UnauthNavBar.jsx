import React from 'react'
import { NavLink } from 'react-router-dom'

const UnauthNavBar = () => {
  return (
    <div className='flex gap-2'>
      <NavLink className={({ isActive }) => `hover:scale-105 ${isActive && 'text-black'}`} to='/register'>Register</NavLink>
      <NavLink className={({ isActive }) => `hover:scale-105 ${isActive && 'text-black'}`} to='/login'>Login</NavLink>
    </div>
  )
}

export default UnauthNavBar