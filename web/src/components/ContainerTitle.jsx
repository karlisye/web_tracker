import React from 'react'

const ContainerTitle = ({ title, text }) => {
  return (
    <div className='flex gap-2 my-2 ml-2 items-center'>
      <h2 className='text-2xl font-bold'>{title}</h2>

      {text && (
        <div className='group relative z-10'>
          <span className='flex items-center justify-center w-5 h-5 rounded-full border text-sm text-slate-600'>?</span>
          <span className='absolute hidden group-hover:block bg-slate-900 text-white text-xs whitespace-nowrap p-1 rounded-md'>{text}</span>
        </div>
      )}
    </div>
  )
}

export default ContainerTitle