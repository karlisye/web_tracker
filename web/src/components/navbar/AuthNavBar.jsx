import React, { useContext } from 'react'
import { logout } from '../../services/auth';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

const AuthNavBar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AppContext);

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      await logout(setUser);
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='flex gap-4 items-center'>
      <span className=''>{user.name}</span>
      
      <form className='flex items-center' onSubmit={handleLogout}>
        <button className='hover:cursor-pointer hover:scale-105 w-7 h-7 text-white'>
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
            fill="none"
          >
            <path
              d="M12.9999 2C10.2385 2 7.99991 4.23858 7.99991 7..."
              fill="currentColor"
            />
            <path
              d="M13.9999 11C14.5522 11..."
              fill="currentColor"
            />
            <path
              d="M5.71783 11C5.80685 10.8902..."
              fill="currentColor"
            />
          </svg>
        </button>
      </form>
    </div>
  )
}

export default AuthNavBar