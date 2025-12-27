import React from 'react'
import { Link } from 'react-router-dom'

const Menu = ({ setIsMenuClicked }) => {
  return (
    <div className='rounded-r-xl fixed left-0 top-0 bottom-0 w-60 flex flex-col gap-2 bg-indigo-300 pt-10 px-1 text-slate-600'>
      <button onClick={() => setIsMenuClicked(false)} className='absolute right-0 top-0 mx-2 hover:cursor-pointer hover:scale-105'>
        <span className='text-xl font-bold'>x</span>
      </button>

      <div className='bg-indigo-200 p-2 rounded-md'>
        <Link className='font-semibold' to='/dashboard'>Dashboard</Link>
      </div>
    </div>
  )
}

export default Menu