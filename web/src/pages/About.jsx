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
          <div className='text-center mb-16'>
            <h1 className='text-5xl font-bold text-slate-200 mb-4'>
              About Web Tracker
            </h1>
            <div className='w-24 h-1 bg-teal-600 mx-auto rounded-full'></div>
          </div>

          <div className='grid grid-cols-2 gap-10'>
            <div className='bg-yellow-100 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8'>
              <div className='flex gap-4'>
                <p className='text-teal-700 text-lg'>
                  Have you ever stopped to think about how many websites you've signed up for over the years - and how many of them you actually still use? Your digital footprint grows with every "Create Account" click, but trying to keep track of it all can feel impossible.
                </p>
              </div>
            </div>

            <div className='bg-yellow-100 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8'>
              <div className='flex gap-4'>
                <p className='text-teal-700 text-lg'>
                  That's where Web Tracker comes in. It's a smarter, cleaner way to see everywhere you're registered online, monitor how often you actually use those accounts, and take control of your digital presence again.
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
          <div className='bg-teal-700 rounded-2xl shadow-lg p-8'>
            <div className='flex gap-4'>
              <p className='text-yellow-100 text-lg'>
                Whether you're tidying up, tightening security, or just curious, Web Tracker helps you reclaim your online life - one account at a time. Start tracking your account usage by following the <Link className='underline'>Web Tracker setup guide</Link>.
              </p>
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
