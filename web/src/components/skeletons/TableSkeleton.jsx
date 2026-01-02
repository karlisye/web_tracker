import React from 'react'

const TableSkeleton = ({ colCount=2, rowCount=3 }) => {
  return (
    <div>
      <div className='w-1/3 bg-slate-200 h-10 rounded-md animate-pulse mb-2'></div>
      <div className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 md:p-10 flex flex-col gap-2'>
        <div className='flex gap-2'>
          {Array.from({ length: colCount }).map((_, i) => (
            <div className='bg-slate-200 h-10 w-full rounded-md animate-pulse' key={i}></div>
          ))}
        </div>

        {Array.from({ length: rowCount }).map((_, i) => (
          <div className='flex gap-2' key={i}>
            {Array.from({ length: colCount }).map((_, i) => (
              <div className='bg-slate-100 h-10 w-full rounded-md animate-pulse' key={i}></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default TableSkeleton