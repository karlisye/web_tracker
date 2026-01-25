import React from 'react'
import { Link } from 'react-router-dom'
import SnapContainer from '../components/snap/SnapContainer'
import SnapItem from '../components/snap/SnapItem'

const Setup = () => {
  return (
    <SnapContainer>
      <SnapItem>
        <div className='flex flex-col items-center justify-center h-full text-center px-20'>
          <div className='mb-12'>
            <h1 className='text-7xl font-bold text-white mb-8'>
              Web Tracker Setup Guide
            </h1>
            <p className='text-yellow-100 text-2xl leading-relaxed max-w-4xl mx-auto mb-6'>
              Follow these simple steps to install the Chrome extension and start tracking your browsing activity.
            </p>
            <p className='text-slate-300 text-xl max-w-3xl mx-auto'>
              Get set up in under 5 minutes and take control of your digital footprint.
            </p>
          </div>

          <div className='w-32 h-1 bg-teal-700 rounded-full mb-12'></div>

          <div className='grid grid-cols-3 gap-12 max-w-5xl'>
            <div className='bg-teal-600 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8'>
              <h3 className='text-3xl font-bold text-white mb-3'>Step 1-2</h3>
              <p className='text-yellow-50 text-lg'>
                Download and prepare the extension files
              </p>
            </div>

            <div className='bg-yellow-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8'>
              <h3 className='text-3xl font-bold text-teal-700 mb-3'>Step 3-4</h3>
              <p className='text-teal-800 text-lg'>
                Enable developer mode and install
              </p>
            </div>

            <div className='bg-pink-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8'>
              <h3 className='text-3xl font-bold text-teal-700 mb-3'>Step 5-6</h3>
              <p className='text-teal-800 text-lg'>
                Link your account and start tracking
              </p>
            </div>
          </div>
        </div>
      </SnapItem>

      <SnapItem>
        <div className='mb-16'>
          <h1 className='text-5xl font-bold text-slate-200 mb-4'>
            Download & Prepare
          </h1>
          <div className='w-24 h-1 bg-teal-600 rounded-full'></div>
        </div>

        <div className='grid grid-cols-2 gap-8'>
          <div className='bg-teal-600 rounded-2xl shadow-lg p-12 flex flex-col justify-center'>
            <div className='inline-block bg-yellow-100 text-teal-700 px-4 py-1 rounded-full text-sm font-bold mb-6 w-fit'>
              Steps 1-2
            </div>
            <h3 className='text-4xl font-bold text-white mb-6'>
              Download the Extension
            </h3>
            <p className='text-yellow-50 text-xl leading-relaxed mb-6'>
              Click the download button to get the Web Tracker Chrome extension file. Save it to a location you can easily find.
            </p>
            <p className='text-yellow-100 text-lg leading-relaxed mb-8'>
              If you downloaded a .zip file, extract it to a folder on your computer. Make sure you remember where you saved it.
            </p>
            <button className='bg-yellow-100 text-teal-700 font-bold text-xl px-10 py-4 rounded-full shadow-lg hover:bg-yellow-200 hover:scale-105 transition w-fit'>
              Download Extension
            </button>
          </div>

          <div className='bg-yellow-100 rounded-2xl shadow-lg p-12 flex flex-col justify-center'>
            <div className='bg-teal-700 rounded-xl p-8 mb-6'>
              <div className='flex items-center gap-4 mb-4'>
                <div className='bg-yellow-100 text-teal-700 rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold'>
                  1
                </div>
                <h4 className='text-2xl font-bold text-white'>Download File</h4>
              </div>
              <p className='text-yellow-50 text-lg'>
                Click the download button and save the extension file to your computer.
              </p>
            </div>

            <div className='bg-pink-200 rounded-xl p-8'>
              <div className='flex items-center gap-4 mb-4'>
                <div className='bg-teal-700 text-yellow-100 rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold'>
                  2
                </div>
                <h4 className='text-2xl font-bold text-teal-700'>Extract Files</h4>
              </div>
              <p className='text-teal-800 text-lg'>
                If it's a .zip file, right-click and select "Extract All" to unzip the folder.
              </p>
            </div>
          </div>
        </div>
      </SnapItem>

      <SnapItem>
        <div className='mb-16'>
          <h1 className='text-5xl font-bold text-slate-200 mb-4'>
            Install the Extension
          </h1>
          <div className='w-24 h-1 bg-pink-200 rounded-full'></div>
        </div>

        <div className='grid grid-cols-2 gap-8'>
          <div className='bg-pink-200 rounded-2xl shadow-lg p-12 flex flex-col justify-center'>
            <div className='bg-teal-700 rounded-xl p-8 mb-6'>
              <div className='flex items-center gap-4 mb-4'>
                <div className='bg-pink-200 text-teal-700 rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold'>
                  3
                </div>
                <h4 className='text-2xl font-bold text-white'>Open Extensions</h4>
              </div>
              <p className='text-yellow-50 text-lg'>
                Type <code className='bg-yellow-100 text-teal-700 px-2 py-1 rounded font-mono'>chrome://extensions</code> in Chrome's address bar.
              </p>
            </div>

            <div className='bg-yellow-100 rounded-xl p-8'>
              <div className='flex items-center gap-4 mb-4'>
                <div className='bg-teal-700 text-yellow-100 rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold'>
                  4
                </div>
                <h4 className='text-2xl font-bold text-teal-700'>Enable Developer Mode</h4>
              </div>
              <p className='text-teal-800 text-lg'>
                Toggle the "Developer mode" switch in the top-right corner to ON.
              </p>
            </div>
          </div>

          <div className='bg-teal-700 rounded-2xl shadow-lg p-12 flex flex-col justify-center'>
            <div className='inline-block bg-pink-200 text-teal-700 px-4 py-1 rounded-full text-sm font-bold mb-6 w-fit'>
              Steps 3-4
            </div>
            <h3 className='text-4xl font-bold text-white mb-6'>
              Open Chrome Extensions
            </h3>
            <p className='text-yellow-50 text-xl leading-relaxed mb-6'>
              Navigate to Chrome's extensions page by typing <code className='bg-white/20 px-2 py-1 rounded font-mono text-yellow-100'>chrome://extensions</code> in your address bar.
            </p>
            <p className='text-yellow-100 text-lg leading-relaxed mb-6'>
              Then, enable Developer Mode by clicking the toggle switch in the top-right corner. This allows you to install extensions from outside the Chrome Web Store.
            </p>
            <div className='bg-yellow-100 rounded-lg p-4'>
              <p className='text-teal-700 font-semibold'>💡 Tip: You can also access this page through Menu → More Tools → Extensions</p>
            </div>
          </div>
        </div>
      </SnapItem>

      <SnapItem>
        <div className='mb-16'>
          <h1 className='text-5xl font-bold text-slate-200 mb-4'>
            Load the Extension
          </h1>
          <div className='w-24 h-1 bg-yellow-100 rounded-full'></div>
        </div>

        <div className='grid grid-cols-2 gap-8'>
          <div className='bg-yellow-100 rounded-2xl shadow-lg p-12 flex flex-col justify-center'>
            <div className='inline-block bg-teal-700 text-white px-4 py-1 rounded-full text-sm font-bold mb-6 w-fit'>
              Step 5
            </div>
            <h3 className='text-4xl font-bold text-teal-700 mb-6'>
              Install from Folder
            </h3>
            <p className='text-teal-800 text-xl leading-relaxed mb-6'>
              Click the "Load unpacked" button on the extensions page. A file browser will open.
            </p>
            <p className='text-teal-700 text-lg leading-relaxed mb-6'>
              Navigate to the folder where you extracted the extension files and select it. Click "Select Folder" to install.
            </p>
            <div className='bg-teal-700 rounded-lg p-4'>
              <p className='text-yellow-100 font-semibold'>✓ The Web Tracker extension will now appear in your extensions list!</p>
            </div>
          </div>

          <div className='bg-teal-600 rounded-2xl shadow-lg p-12 flex flex-col justify-center'>
            <div className='bg-yellow-100 rounded-xl p-8 space-y-6'>
              <div>
                <h4 className='text-2xl font-bold text-teal-700 mb-3'>What to Look For</h4>
                <p className='text-teal-800 text-lg mb-4'>
                  The folder must contain a <code className='bg-teal-700 text-yellow-100 px-2 py-1 rounded font-mono'>manifest.json</code> file.
                </p>
              </div>

              <div className='border-t-2 border-teal-300 pt-6'>
                <h4 className='text-xl font-bold text-teal-700 mb-3'>Common Mistakes</h4>
                <ul className='text-teal-800 space-y-2'>
                  <li>• Don't select the .zip file itself</li>
                  <li>• Make sure you extracted the files first</li>
                  <li>• Select the folder, not individual files</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </SnapItem>

      <SnapItem>
        <div className='mb-16'>
          <h1 className='text-5xl font-bold text-slate-200 mb-4'>
            Link Your Account
          </h1>
          <div className='w-24 h-1 bg-pink-200 rounded-full'></div>
        </div>

        <div className='grid grid-cols-2 gap-8'>
          <div className='bg-pink-200 rounded-2xl shadow-lg p-12 flex flex-col justify-center'>
            <div className='bg-teal-700 rounded-xl p-8 mb-6'>
              <h4 className='text-2xl font-bold text-white mb-4'>Click the Extension Icon</h4>
              <p className='text-yellow-50 text-lg'>
                Look for the Web Tracker icon in your Chrome toolbar (top-right corner).
              </p>
            </div>

            <div className='bg-yellow-100 rounded-xl p-8'>
              <h4 className='text-2xl font-bold text-teal-700 mb-4'>Log In</h4>
              <p className='text-teal-800 text-lg'>
                After clicking on it, you will automatically get redirected to our website login page.
              </p>
            </div>
          </div>

          <div className='bg-teal-700 rounded-2xl shadow-lg p-12 flex flex-col justify-center'>
            <div className='inline-block bg-pink-200 text-teal-700 px-4 py-1 rounded-full text-sm font-bold mb-6 w-fit'>
              Step 6
            </div>
            <h3 className='text-4xl font-bold text-white mb-6'>
              Connect & Start Tracking
            </h3>
            <p className='text-yellow-50 text-xl leading-relaxed mb-6'>
              After signing up or logging in, the extension is ready to be used.
            </p>
            <p className='text-yellow-100 text-lg leading-relaxed mb-8'>
              Once logged in, the extension will automatically start tracking your website visits and sync them to your dashboard.
            </p>
            <div className='bg-yellow-100 rounded-lg p-6'>
              <p className='text-teal-700 text-xl font-bold mb-2'>You're All Set!</p>
              <p className='text-teal-800'>Tip: If you don't want your history to be tracked for some time you can click the extension icon and disable auth monitoring.</p>
            </div>
          </div>
        </div>
      </SnapItem>

      <SnapItem>
        <div className='flex flex-col items-center justify-center h-full text-center px-20'>
          <div className='mb-12'>
            <h1 className='text-5xl font-bold text-white mb-6'>
              Managing Your Connection
            </h1>
            <div className='w-24 h-1 bg-pink-200 rounded-full mx-auto mb-8'></div>
          </div>

          <div className='grid grid-cols-2 gap-12 max-w-5xl'>
            <div className='bg-yellow-100 rounded-2xl shadow-lg p-10'>
              <h3 className='text-3xl font-bold text-teal-700 mb-4'>Pause Tracking</h3>
              <p className='text-teal-800 text-xl leading-relaxed'>
                Click the extension icon and disable auth monitoring to temporarily stop tracking your browsing activity.
              </p>
            </div>

            <div className='bg-pink-200 rounded-2xl shadow-lg p-10'>
              <h3 className='text-3xl font-bold text-teal-700 mb-4'>Unlink Account</h3>
              <p className='text-teal-800 text-xl leading-relaxed'>
                You can unlink your account anytime by pressing the unlink button in the extension or at the bottom right corner of our website.
              </p>
            </div>
          </div>
        </div>
      </SnapItem>

      <SnapItem>
        <div className='flex flex-col items-center justify-center h-full text-center'>
          <div className='bg-teal-700 rounded-3xl shadow-2xl p-16 max-w-4xl'>
            <h2 className='text-5xl font-bold text-white mb-6'>
              Installation Complete!
            </h2>
            <p className='text-yellow-100 text-2xl leading-relaxed mb-8'>
              You're ready to start tracking your digital footprint and taking control of your online accounts.
            </p>
            
            <div className='flex gap-6 justify-center mb-8'>
              <Link 
                to="/dashboard"
                className='bg-pink-200 text-teal-700 font-bold text-xl px-10 py-4 rounded-full shadow-lg hover:shadow-xl hover:bg-pink-300 hover:scale-105 transition-all duration-300'
              >
                Go to Dashboard
              </Link>
              <Link 
                to="/about"
                className='bg-yellow-100 text-teal-700 font-bold text-xl px-10 py-4 rounded-full shadow-lg hover:shadow-xl hover:bg-yellow-200 hover:scale-105 transition-all duration-300'
              >
                Learn More
              </Link>
            </div>

            <div className='grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/20'>
              <div className='text-center'>
                <div className='text-yellow-100 text-4xl font-bold mb-2'>✓</div>
                <div className='text-white text-sm'>Extension Installed</div>
              </div>
              <div className='text-center'>
                <div className='text-yellow-100 text-4xl font-bold mb-2'>✓</div>
                <div className='text-white text-sm'>Account Linked</div>
              </div>
              <div className='text-center'>
                <div className='text-yellow-100 text-4xl font-bold mb-2'>✓</div>
                <div className='text-white text-sm'>Ready to Track</div>
              </div>
            </div>
          </div>
        </div>
      </SnapItem>

    </SnapContainer>
  )
}

export default Setup
