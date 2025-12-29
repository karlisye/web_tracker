import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className='min-h-screen bg-linear-to-br from-slate-50 to-blue-50 py-16 px-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='text-center mb-16'>
          <h1 className='text-5xl md:text-6xl font-bold text-slate-900 mb-4'>
            About Web Tracker
          </h1>
          <div className='w-24 h-1 bg-indigo-500 mx-auto rounded-full'></div>
        </div>

        <div className='grid md:grid-cols-2 gap-8 lg:gap-12'>
          <div className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 md:p-10'>
            <div className='flex items-start gap-4'>
              <div className='shrink-0 w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center'>
                <svg className='w-6 h-6 text-indigo-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 8a3.5 3 0 0 1 3.5 -3h1a3.5 3 0 0 1 3.5 3a3 3 0 0 1 -2 3a3 4 0 0 0 -2 4' /><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 19l0 .01' /></svg>
              </div>
              <p className='text-slate-600 text-lg leading-relaxed'>
                Have you ever stopped to think about how many websites you've signed up for over the years - and how many of them you actually still use? Your digital footprint grows with every "Create Account" click, but trying to keep track of it all can feel impossible.
              </p>
            </div>
          </div>

          <div className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 md:p-10'>
            <div className='flex items-start gap-4'>
              <div className='shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center'>
                <svg className='w-6 h-6 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
              </div>
              <p className='text-slate-600 text-lg leading-relaxed'>
                That's where Web Tracker comes in. It's a smarter, cleaner way to see everywhere you're registered online, monitor how often you actually use those accounts, and take control of your digital presence again.
              </p>
            </div>
          </div>

          <div className='md:col-span-2 bg-linear-to-r from-indigo-600 to-indigo-700 rounded-2xl shadow-lg p-8 md:p-10'>
            <div className='flex items-start gap-4'>
              <div className='shrink-0 w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center'>
                <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' />
                </svg>
              </div>
              <p className='text-white text-lg leading-relaxed'>
                Whether you're tidying up, tightening security, or just curious, Web Tracker helps you reclaim your online life - one account at a time. Start tracking your account usage by following the <Link className='underline'>Web Tracker setup guide</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About