import React from 'react'

const GraphSkeleton = ({ colCount=7 }) => {
  return (
    <div>
      <div className='w-1/3 bg-white h-10 rounded-md animate-pulse mb-2'></div>
      <div className='bg-secondary h-80 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 md:p-10 flex flex-col gap-2'>
        <div className='border-l-2 border-b-2 h-full w-full flex items-end gap-4 p-2 border-primary'>
          {Array.from({ length: colCount }).map((_,i) => (
            <div 
              className='bg-primary w-full animate-pulse'
              key={i}
              style={{
                height: `${100 / (i+1)}%`
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default GraphSkeleton