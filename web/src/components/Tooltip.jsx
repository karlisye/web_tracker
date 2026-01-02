import React from 'react'

const Tooltip = ({ text }) => {
  return (
    <div className='group relative'>
      <span className='flex items-center justify-center w-5 h-5 rounded-full border text-sm text-slate-600'>?</span>
      <span className='absolute hidden group-hover:block bg-slate-900 text-white text-xs whitespace-nowrap p-1 rounded-md'>{text}</span>
    </div>
  )
}

export default Tooltip