import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='overflow-scroll py-16 px-4'>
      <div className='max-w-6xl mx-auto'>
        
        <div className='text-center mb-16'>
          <h1 className='hero'>
            Welcome to Web Tracker
          </h1>
          <p className='text-secondary text-2xl mb-4 max-w-3xl mx-auto'>
            Track your account usage across the web and take control of your digital footprint
          </p>
          <p className='text-muted text-lg mb-8'>
            Monitor login activity, discover forgotten accounts, and clean up your online presence
          </p>
          <div className='w-24 h-1 bg-primary mx-auto rounded-full mb-8'></div>
          
          <div className='flex gap-6 justify-center'>
            <Link 
              to="/register"
              className='bg-primary text-secondary font-bold text-xl px-10 py-4 rounded-full shadow-lg hover:bg-primary-light hover:scale-105 transition'
            >
              Get Started Free
            </Link>
            <Link 
              to="/about"
              className='bg-background text-white font-bold text-xl px-10 py-4 rounded-full shadow-lg hover:bg-background-light hover:scale-105 transition'
            >
              Learn More
            </Link>
          </div>
        </div>

        <div className='mb-16'>
          <h2 className='title'>What You Can Do</h2>
          <div className='grid grid-cols-3 gap-8'>
            <div className='bg-primary rounded-2xl p-8 shadow-lg hover:shadow-xl transition'>
              <h3 className='text-2xl font-bold text-secondary mb-3'>Track Activity</h3>
              <p className='text-white'>
                Monitor every website where you log in. See your complete browsing history and login patterns in one place.
              </p>
            </div>

            <div className='bg-secondary rounded-2xl p-8 shadow-lg hover:shadow-xl transition'>
              <h3 className='text-2xl font-bold text-primary mb-3'>Analyze Usage</h3>
              <p className='text-primary'>
                Discover which accounts you use most. Interactive charts show your browsing patterns over time.
              </p>
            </div>

            <div className='bg-accent rounded-2xl p-8 shadow-lg hover:shadow-xl transition'>
              <h3 className='text-2xl font-bold text-primary mb-3'>Clean Up</h3>
              <p className='text-primary'>
                Find inactive accounts you forgot about. Reduce your digital footprint and improve security.
              </p>
            </div>
          </div>
        </div>

        <div className='mb-16'>
          <h2 className='title'>How It Works</h2>
          <div className='grid grid-cols-3 gap-8'>
            <div className='text-center'>
              <div className='bg-primary text-secondary rounded-full w-16 h-16 flex items-center justify-center text-3xl font-bold mx-auto mb-4'>
                1
              </div>
              <h3 className='text-xl font-bold text-secondary mb-3'>Install Extension</h3>
              <p className='text-muted'>
                Download and install our Chrome extension in under 5 minutes
              </p>
            </div>

            <div className='text-center'>
              <div className='bg-secondary text-primary rounded-full w-16 h-16 flex items-center justify-center text-3xl font-bold mx-auto mb-4'>
                2
              </div>
              <h3 className='text-xl font-bold text-secondary mb-3'>Link Account</h3>
              <p className='text-muted'>
                Sign up and link your account to start automatic tracking
              </p>
            </div>

            <div className='text-center'>
              <div className='bg-accent text-primary rounded-full w-16 h-16 flex items-center justify-center text-3xl font-bold mx-auto mb-4'>
                3
              </div>
              <h3 className='text-xl font-bold text-secondary mb-3'>Track & Manage</h3>
              <p className='text-muted'>
                View your dashboard and manage your digital footprint
              </p>
            </div>
          </div>
        </div>

        <div className='bg-background rounded-3xl p-12 mb-16'>
          <h2 className='title'>Why Web Tracker?</h2>
          <div className='grid grid-cols-3 gap-8'>
            <div className='text-center'>
              <div className='text-5xl font-bold text-primary-light mb-2'>100%</div>
              <div className='text-secondary text-lg font-semibold mb-2'>Free Forever</div>
              <div className='text-muted'>No hidden fees or premium tiers</div>
            </div>

            <div className='text-center'>
              <div className='text-5xl font-bold text-accent-dark mb-2'>Private</div>
              <div className='text-secondary text-lg font-semibold mb-2'>Your Data</div>
              <div className='text-muted'>We never sell or share your information</div>
            </div>

            <div className='text-center'>
              <div className='text-5xl font-bold text-secondary-dark mb-2'>Easy</div>
              <div className='text-secondary text-lg font-semibold mb-2'>Setup</div>
              <div className='text-muted'>Get started in less than 5 minutes</div>
            </div>
          </div>
        </div>

        <div className='bg-primary rounded-3xl p-16 text-center shadow-2xl'>
          <h2 className='title'>Ready to Take Control?</h2>
          <p className='text-secondary text-xl mb-8 max-w-2xl mx-auto'>
            Join Web Tracker today and start managing your digital footprint. No credit card required.
          </p>
          <div className='flex gap-6 justify-center'>
            <Link 
              to="/register"
              className='bg-secondary text-primary font-bold text-xl px-10 py-4 rounded-full shadow-lg hover:bg-secondary-dark hover:scale-105 transition'
            >
              Create Free Account
            </Link>
            <Link 
              to="/setup"
              className='bg-accent text-primary font-bold text-xl px-10 py-4 rounded-full shadow-lg hover:bg-accent-dark hover:scale-105 transition'
            >
              View Setup Guide
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Home
