import React from 'react'
import Head from './Head'
import Main from '../pages/Main'

const Layout = () => {
  return (
    <div className='w-80 h-120 p-2 bg-linear-to-br from-indigo-50 to-indigo-100 flex flex-col'>
      <header>
        <Head />
      </header>

      <main className='flex flex-col justify-between h-full'>
        <Main />
      </main>
    </div>
  )
}

export default Layout