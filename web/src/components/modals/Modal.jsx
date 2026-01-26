import React from 'react'

const Modal = ({ setIsActive, isActive, children }) => {

  if (!isActive) return;

  return (
    <div onClick={() => setIsActive(false)} className='fixed w-screen h-screen top-0 left-0 flex justify-center items-center backdrop-blur-sm z-1'>
      <div onClick={(e) => e.stopPropagation()} className='p-4 bg-background w-2/3 rounded-2xl flex flex-col gap-4'>
        {children}
      </div>
    </div>
  )
}

export default Modal