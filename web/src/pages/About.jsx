import React from 'react'
import { Link } from 'react-router-dom'
import SnapContainer from '../components/snap/SnapContainer'
import SnapItem from '../components/snap/SnapItem'
import ContainerTitle from '../components/ContainerTitle'
import { useState } from 'react'
import { useRef } from 'react'


const About = () => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const ref = useRef(null);

  const handleImageClick = (e) => {
    ref.current = e.target;
    setIsImageModalOpen(true);
  }

  return (
    <>
      <SnapContainer>
        <SnapItem>
          <div className='flex flex-col items-center justify-center h-full text-center px-20'>
            <div className='mb-12'>
              <h1 className='text-7xl font-bold text-white mb-8'>
                Your Digital Life,<br/>Finally Organized
              </h1>
              <p className='text-yellow-100 text-2xl leading-relaxed max-w-4xl mx-auto mb-6'>
                Web Tracker helps you see every website you're registered on, understand your browsing habits, and clean up forgotten accounts that clutter your online presence.
              </p>
              <p className='text-slate-300 text-xl max-w-3xl mx-auto'>
                Stop wondering where your data lives. Start taking control.
              </p>
            </div>

            <div className='w-32 h-1 bg-teal-700 rounded-full mb-12'></div>

            <div className='grid grid-cols-3 gap-12 max-w-5xl'>
              <div className='bg-teal-600 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8'>
                <h3 className='text-3xl font-bold text-white mb-3'>Track</h3>
                <p className='text-yellow-50 text-lg'>
                  Monitor login activity across all your registered websites
                </p>
              </div>

              <div className='bg-yellow-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8'>
                <h3 className='text-3xl font-bold text-teal-700 mb-3'>Analyze</h3>
                <p className='text-teal-800 text-lg'>
                  Visualize patterns and discover your most-used accounts
                </p>
              </div>

              <div className='bg-pink-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8'>
                <h3 className='text-3xl font-bold text-teal-700 mb-3'>Clean</h3>
                <p className='text-teal-800 text-lg'>
                  Remove inactive accounts and reduce your digital footprint
                </p>
              </div>
            </div>
          </div>
        </SnapItem>

        <SnapItem>
          <div className='mb-16'>
            <h1 className='text-5xl font-bold text-slate-200 mb-4'>
              Login History
            </h1>
            <div className='w-24 h-1 bg-teal-600 rounded-full'></div>
          </div>

          <div className='grid grid-cols-2 gap-8'>
            <div className='bg-teal-600 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-12 flex flex-col justify-center'>
              <div className='inline-block bg-yellow-100 text-teal-700 px-4 py-1 rounded-full text-sm font-bold mb-6 w-fit'>
                Track Activity
              </div>
              <h3 className='text-4xl font-bold text-white mb-6'>
                See Your Recent Login History
              </h3>
              <p className='text-yellow-50 text-xl leading-relaxed mb-6'>
                Monitor all the websites where you've logged in recently. Get a complete overview of your digital footprint and see which accounts you're actively using.
              </p>
              <p className='text-yellow-100 text-lg leading-relaxed'>
                Take control of your online presence by identifying forgotten accounts and cleaning up your digital life.
              </p>
            </div>

            <div 
              className='bg-yellow-100 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 flex flex-col items-center justify-center'
            >
              <img 
                onClick={handleImageClick}
                src="images/about/visits.png" 
                className='w-full h-auto rounded-xl shadow-lg hover:scale-105 transition cursor-pointer'
              />

              <h3 className='text-teal-700 font-bold mt-4 text-lg'>Available after signing up in the Dashboard page</h3>
            </div>
          </div>
        </SnapItem>

        <SnapItem>
          <div className='mb-16'>
            <h1 className='text-5xl font-bold text-slate-200 mb-4'>
              Websites You Use Most Often
            </h1>
            <div className='w-24 h-1 bg-pink-200 rounded-full'></div>
          </div>

          <div className='grid grid-cols-2 gap-8'>
            <div 
              className='bg-pink-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 flex flex-col items-center justify-center'
            >
              <img 
                onClick={handleImageClick}
                src="images/about/most-visits.png" 
                className='w-full h-auto rounded-xl shadow-lg hover:scale-105 transition cursor-pointer'
              />

              <h3 className='text-teal-700 font-bold mt-4 text-lg'>Interactive charts showing your browsing patterns</h3>
            </div>

            <div className='bg-teal-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-12 flex flex-col justify-center'>
              <div className='inline-block bg-pink-200 text-teal-700 px-4 py-1 rounded-full text-sm font-bold mb-6 w-fit'>
                Analyze Patterns
              </div>
              <h3 className='text-4xl font-bold text-white mb-6'>
                Discover Your Most Visited Sites
              </h3>
              <p className='text-yellow-50 text-xl leading-relaxed mb-6'>
                Visualize which websites you visit most frequently with interactive graphs. Understand your browsing habits and identify the platforms that matter most to you.
              </p>
              <p className='text-yellow-100 text-lg leading-relaxed'>
                Make data-driven decisions about where to focus your security efforts and which accounts deserve your attention.
              </p>
            </div>
          </div>
        </SnapItem>

        <SnapItem>
          <div className='mb-16'>
            <h1 className='text-5xl font-bold text-slate-200 mb-4'>
              Clean Up Your Accounts
            </h1>
            <div className='w-24 h-1 bg-yellow-100 rounded-full'></div>
          </div>

          <div className='grid grid-cols-2 gap-8'>
            <div className='bg-yellow-100 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-12 flex flex-col justify-center'>
              <div className='inline-block bg-teal-700 text-white px-4 py-1 rounded-full text-sm font-bold mb-6 w-fit'>
                Manage Accounts
              </div>
              <h3 className='text-4xl font-bold text-teal-700 mb-6'>
                Identify Inactive Websites
              </h3>
              <p className='text-teal-800 text-xl leading-relaxed mb-6'>
                See a complete list of websites you haven't visited in a while. Keep track of forgotten accounts that might pose security risks or clutter your digital life.
              </p>
              <p className='text-teal-700 text-lg leading-relaxed'>
                Easily identify inactive accounts and reduce your digital footprint for better privacy and security.
              </p>
            </div>

            <div 
              className='bg-teal-600 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 flex flex-col items-center justify-center'
            >
              <img 
                onClick={handleImageClick}
                src="images/about/inactive-websites.png" 
                alt="Inactive websites table"
                className='w-full h-auto rounded-xl shadow-lg hover:scale-105 transition cursor-pointer'
              />

              <h3 className='text-yellow-100 font-bold mt-4 text-lg'>Track the websites you have forgotten about</h3>
            </div>
          </div>
        </SnapItem>

        <SnapItem>
          <div className='flex flex-col items-center justify-center h-full text-center'>
            <div className='bg-teal-700 rounded-3xl shadow-2xl p-16 max-w-4xl'>
              <h2 className='text-5xl font-bold text-white mb-6'>
                Ready to Take Control?
              </h2>
              <p className='text-yellow-100 text-2xl leading-relaxed mb-8'>
                Whether you're tidying up, tightening security, or just curious, Web Tracker helps you reclaim your online life - one account at a time.
              </p>
              
              <div className='flex gap-6 justify-center mb-8'>
                <Link 
                  to="/register"
                  className='bg-pink-200 text-teal-700 font-bold text-xl px-10 py-4 rounded-full shadow-lg hover:shadow-xl hover:bg-pink-300 hover:scale-105 transition-all duration-300'
                >
                  Get Started Free
                </Link>
                <Link 
                  to="/setup"
                  className='bg-yellow-100 text-teal-700 font-bold text-xl px-10 py-4 rounded-full shadow-lg hover:shadow-xl hover:bg-yellow-200 hover:scale-105 transition-all duration-300'
                >
                  View Setup Guide
                </Link>
              </div>

              <div className='grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/20'>
                <div className='text-center'>
                  <div className='text-yellow-100 text-4xl font-bold mb-2'>100%</div>
                  <div className='text-white text-sm'>Free to Use</div>
                </div>
                <div className='text-center'>
                  <div className='text-yellow-100 text-4xl font-bold mb-2'>Private</div>
                  <div className='text-white text-sm'>Your Data Stays Yours</div>
                </div>
                <div className='text-center'>
                  <div className='text-yellow-100 text-4xl font-bold mb-2'>5 Min</div>
                  <div className='text-white text-sm'>Quick Setup</div>
                </div>
              </div>
            </div>
          </div>
        </SnapItem>

      </SnapContainer>

      {isImageModalOpen && (
        <div 
          className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-8'
          onClick={() => setIsImageModalOpen(false)}
        >
          <div className='relative max-w-6xl w-full'>
            <button
              className='absolute -top-12 right-0 text-white text-4xl font-bold hover:text-pink-200 transition'
              onClick={() => setIsImageModalOpen(false)}
            >
              ×
            </button>
            <img 
              src={ref.current.src}
              alt="Enlarged view"
              className='w-full h-auto rounded-xl shadow-2xl'
            />
          </div>
        </div>
      )}
    </>
  )
}

export default About
