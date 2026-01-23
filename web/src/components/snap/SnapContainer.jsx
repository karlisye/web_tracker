import React from 'react'

const SnapContainer = ({ children }) => {
  return (
    <div className="overflow-y-scroll lg:h-screen lg:snap-y lg:snap-mandatory scroll-smooth">
      {children}
    </div>
  )
}

export default SnapContainer