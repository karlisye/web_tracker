import React from 'react'
import { NavLink } from 'react-router-dom'

const UnauthNavBar = () => {
  return (
    <div className='flex gap-2'>
      <NavLink className={({ isActive }) => `hover:scale-105 focus:scale-110 ${isActive && 'text-stone-200'}`} to='/login'>Login</NavLink>
    </div>
  )
}

export default UnauthNavBar