import React from 'react'

const CurrentTabSkeleton = () => {
  return (
    <div className='bg-teal-700 flex-1 rounded-md shadow-md p-2 overflow-hidden flex flex-col gap-2 animate-pulse'>
      <div className='flex-1 overflow-y-scroll rounded-md'>
        <table className='w-full border-separate border-spacing-y-1'>
          <thead>
            <tr className='text-white'>
              <th className='sticky top-0 bg-teal-700 text-yellow-100 px-2 py-1 text-left rounded-l-md'>
                Website
              </th>
              <th className='sticky top-0 bg-teal-700 text-yellow-100  px-2 py-1 text-left rounded-r-md'>
                Visit time
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className='bg-white shadow-sm'>
                <td className='px-2 py-1 rounded-l-md'>
                  <div className='bg-slate-200 h-4 w-32 rounded-full'></div>
                </td>
                <td className='px-2 py-1 rounded-r-md'>
                  <div className='bg-slate-200 h-4 w-24 rounded-full'></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='flex items-center justify-between bg-white rounded-md px-3 py-2'>
        <div className='px-3 py-1 rounded-md bg-gray-300 h-8 w-20'></div>
        <div className='h-4 bg-gray-300 rounded w-16'></div>
        <div className='px-3 py-1 rounded-md bg-gray-300 h-8 w-16'></div>
      </div>
    </div>
  )
}

export default CurrentTabSkeleton
