import React, { useContext, useState, useRef, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/AppContext';
import { logout } from '../../services/auth';

const NavBar = () => {
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const [isProfileClicked, setIsProfileClicked] = useState(false);

  const menuRef = useRef(null);
  const profileMenuRef = useRef(null);

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      await logout(setUser);
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuClicked(false);
      }

      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
        setIsProfileClicked(false);
      }
    };

    if (isMenuClicked || isProfileClicked) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuClicked, isProfileClicked]);

  return (
    <nav className='group flex justify-center fixed left-0 right-0 top-0 z-1 m-2'>
      <div className='relative'>
        <div 
          className={`flex items-center bg-primary py-2 px-6 text-xl font-bold justify-between gap-60 shadow-lg hover:shadow-xl group-hover:translate-y-0 transition-all duration-300 text-white
            ${!isMenuClicked && !isProfileClicked && 'transform -translate-y-5/6'} 
            ${isMenuClicked ? 'rounded-r-full rounded-tl-full' :
            isProfileClicked ? 'rounded-l-full rounded-tr-full' : 'rounded-full'}
          `}
        >
          <div className='flex gap-2 items-center'>
            <button onClick={() => {setIsMenuClicked(prev => !prev); setIsProfileClicked(false)}} className='h-12 w-12 hover:scale-105 hover:cursor-pointer focus:scale-110'>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={`${isMenuClicked && 'text-secondary'}`}><path fill="currentColor" d="M18.75 8C18.75 8.41421 18.4142 8.75 18 8.75H6C5.58579 8.75 5.25 8.41421 5.25 8C5.25 7.58579 5.58579 7.25 6 7.25H18C18.4142 7.25 18.75 7.58579 18.75 8Z" /><path fill="currentColor" d="M18.75 12C18.75 12.4142 18.4142 12.75 18 12.75H6C5.58579 12.75 5.25 12.4142 5.25 12C5.25 11.5858 5.58579 11.25 6 11.25H18C18.4142 11.25 18.75 11.5858 18.75 12Z" /><path fill="currentColor" d="M18.75 16C18.75 16.4142 18.4142 16.75 18 16.75H6C5.58579 16.75 5.25 16.4142 5.25 16C5.25 15.5858 5.58579 15.25 6 15.25H18C18.4142 15.25 18.75 15.5858 18.75 16Z" /></svg>
            </button>

            <NavLink className={({ isActive }) => `p-1 rounded-md text-2xl hover:scale-105 focus:scale-110 ${isActive && 'text-secondary'}`} to='/'>WT</NavLink>
          </div>

          <button className='w-6 h-6 hover:cursor-pointer hover:scale-105'
            onClick={() => {setIsProfileClicked(prev => !prev); setIsMenuClicked(false)}}
          >
            <svg viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracurrentColorerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_icurrentColoronCarrier"> <title>profile_round [currentColor]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-140.000000, -2159.000000)" fill="currentColor"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M100.562548,2016.99998 L87.4381713,2016.99998 C86.7317804,2016.99998 86.2101535,2016.30298 86.4765813,2015.66198 C87.7127655,2012.69798 90.6169306,2010.99998 93.9998492,2010.99998 C97.3837885,2010.99998 100.287954,2012.69798 101.524138,2015.66198 C101.790566,2016.30298 101.268939,2016.99998 100.562548,2016.99998 M89.9166645,2004.99998 C89.9166645,2002.79398 91.7489936,2000.99998 93.9998492,2000.99998 C96.2517256,2000.99998 98.0830339,2002.79398 98.0830339,2004.99998 C98.0830339,2007.20598 96.2517256,2008.99998 93.9998492,2008.99998 C91.7489936,2008.99998 89.9166645,2007.20598 89.9166645,2004.99998 M103.955674,2016.63598 C103.213556,2013.27698 100.892265,2010.79798 97.837022,2009.67298 C99.4560048,2008.39598 100.400241,2006.33098 100.053171,2004.06998 C99.6509769,2001.44698 97.4235996,1999.34798 94.7348224,1999.04198 C91.0232075,1998.61898 87.8750721,2001.44898 87.8750721,2004.99998 C87.8750721,2006.88998 88.7692896,2008.57398 90.1636971,2009.67298 C87.1074334,2010.79798 84.7871636,2013.27698 84.044024,2016.63598 C83.7745338,2017.85698 84.7789973,2018.99998 86.0539717,2018.99998 L101.945727,2018.99998 C103.221722,2018.99998 104.226185,2017.85698 103.955674,2016.63598" id="profile_round-[currentColor]"> </path> </g> </g> </g> </g></svg>
          </button>
        </div>

        <div 
          ref={menuRef}
          className={`w-60 rounded-b-4xl duration-400 bg-primary overflow-hidden text-white text-sm flex flex-col shadow-lg hover:shadow-xl
            ${isMenuClicked ? 'h-40 opacity-100' : 'h-0 opacity-0'}
          `}
        >
          <NavLink 
              className={({ isActive }) => `flex-1 px-4 py-2 hover:bg-secondary hover:text-primary hover:scale-102 transition-transfrom hover:flex-2 flex items-center duration-400 ${isActive && 'font-bold'}`} 
              to='/'
              onClick={() => setIsMenuClicked(false)}
            >
              Home
            </NavLink>

            <NavLink 
              className={({ isActive }) => `flex-1 px-4 py-2 hover:bg-secondary hover:text-primary hover:scale-102 transition-transfrom hover:flex-2 flex items-center duration-400 ${isActive && 'font-bold'}`} 
              to='/dashboard'
              onClick={() => setIsMenuClicked(false)}
            >
              Dashboard
            </NavLink>

            <NavLink 
              className={({ isActive }) => `flex-1 px-4 py-2 hover:bg-secondary hover:text-primary hover:scale-102 transition-transfrom hover:flex-2 flex items-center duration-400 ${isActive && 'font-bold'}`} 
              to='/about'
              onClick={() => setIsMenuClicked(false)}
            >
              About Us
            </NavLink>

            <NavLink
              className={({ isActive }) => `flex-1 px-4 py-2 hover:bg-secondary hover:text-primary hover:scale-102 transition-transfrom hover:flex-2 flex items-center duration-400 ${isActive && 'font-bold'}`} 
              to='/setup'
              onClick={() => setIsMenuClicked(false)}
            >
              Setup
            </NavLink>
        </div>

        <div
          ref={profileMenuRef}
          className={`w-60 rounded-b-4xl duration-400 bg-primary overflow-hidden text-white text-sm flex flex-col shadow-lg hover:shadow-xl ml-auto
            ${isProfileClicked && !user ? 'h-20 opacity-100' : 
            isProfileClicked ? 'h-40 opacity-100' : 'h-0 opacity-0'}
          `}
        >
          {user ? (
            <>
              <div className='px-4 py-3 border-b border-muted'>
                <p className='text-sm font-semibold text-white'>{user.name || 'User'}</p>
                <p className='text-xs text-white truncate'>{user.email || 'user@example.com'}</p>
              </div>

              <NavLink 
                to='/profile' 
                className={({ isActive }) => `flex-1 px-4 py-2 hover:bg-secondary hover:text-primary hover:scale-102 transition-transfrom hover:flex-2 flex items-center duration-400 ${isActive && 'font-bold'}`} 
                onClick={() => setIsProfileClicked(false)}
              >
                My Profile
              </NavLink>

              <form 
                className='border-t border-muted'
                onSubmit={handleLogout}
              >
                <button 
                  className='w-full text-left px-4 py-3 text-sm text-white bg-danger-light hover:bg-danger hover:cursor-pointer transition'
                >
                  Sign Out
                </button>
              </form>
            </>
          ) : (
            <>
              <NavLink 
                to='/login' 
                className={({ isActive }) => 'flex-1 px-4 py-2 hover:bg-secondary hover:text-primary hover:scale-102 transition-transfrom hover:flex-2 flex items-center duration-400'} 
                onClick={() => setIsProfileClicked(false)}
              >
                Sign In
              </NavLink>
              <NavLink 
                to='/register' 
                className={({ isActive }) => 'flex-1 px-4 py-2 hover:bg-secondary hover:text-primary hover:scale-102 transition-transfrom hover:flex-2 flex items-center duration-400'} 
                onClick={() => setIsProfileClicked(false)}
              >
                Create An Account
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default NavBar