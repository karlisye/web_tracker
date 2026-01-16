import React from 'react'

const SnapContainer = ({ children }) => {
  return (
    <div className="bg-linear-to-br from-slate-50 to-blue-50 overflow-y-scroll lg:h-screen lg:snap-y lg:snap-mandatory scroll-smooth">
      {children}
    </div>
  )
}

export default SnapContainer