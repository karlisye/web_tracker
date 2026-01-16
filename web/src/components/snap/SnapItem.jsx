import React from 'react'

const SnapItem = ({ children, ref }) => {
  return (
    <section ref={ref} className="lg:h-screen snap-start flex items-center px-4">
      <div className="max-w-6xl mx-auto w-full h-full flex flex-col justify-center p-10">
        {children}
      </div>
    </section>
  )
}

export default SnapItem