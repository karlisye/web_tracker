import React from 'react'

const SnapItem = ({ children, ref }) => {
  return (
    <section ref={ref} className="lg:h-screen snap-start flex items-center px-4">
      <div className="max-w-6xl mx-auto w-full">
        {children}
      </div>
    </section>
  )
}

export default SnapItem