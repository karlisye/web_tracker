import axios from 'axios';
import { useEffect, useState } from 'react';
import CurrentTab from '../components/currentTab';

function Main() {
  const [isActive, setIsActive] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadState = async () => {
      const result = await chrome.storage.sync.get('isActive');
      setIsActive(result.isActive ?? false);
    };

    const loadUser = async () => {
      const { authToken } = await chrome.storage.local.get('authToken');
      if (authToken) {
        try {
          const config = { headers: { Authorization: `Bearer ${authToken}` } };
          const response = await axios.get('http://localhost:8000/api/user', config);
          setUser(response.data);
        } catch (error) {
          console.log('Error getting user', error);
        }
      }
      setLoading(false);
    };

    loadState();
    loadUser();
  }, []);

  const unlink = async () => {
    await chrome.storage.local.remove('authToken');
    redirectToLogin();
  };

  const toggleWebsiteReader = () => {
    const newState = !isActive;
    chrome.storage.sync.set({ isActive: newState });
    setIsActive(newState);
  };

  const redirectToLogin = () => {
    chrome.runtime.sendMessage({ type: 'redirect-to-login' });
  };

  if (loading) return <p>Loading...</p>;

  if (!user) {
    redirectToLogin();
    return null;
  }

  return (
    <div className='flex flex-col flex-1 overflow-hidden gap-2'>
      <div className='flex flex-col flex-1 overflow-hidden'>
        <div className='flex justify-between items-center my-2'>
          <p className='text-sm text-white'>
            Logged in as: <span className='text-secondary font-semibold'>{user.name}</span>
          </p>
          <button
            className='bg-primary text-secondary rounded-md px-3 py-1 text-sm font-semibold shadow-md hover:bg-primary-dark hover:cursor-pointer'
            onClick={unlink}
          >
            Unlink
          </button>
        </div>

        <div className='flex-1 overflow-hidden'>
          <CurrentTab />
        </div>
      </div>

      <div
        className={`p-4 flex justify-between items-center text-white font-semibold rounded-md text-sm shadow-lg
        ${isActive ? 'bg-linear-to-br from-green-500 to-green-600' : 'bg-linear-to-br from-danger to-danger-dark'}`}
      >
        <span>{isActive ? 'ON' : 'OFF'}</span>
        <div className='flex gap-2 items-center'>
          <h3>Auth Monitor:</h3>
          <button
            className={`py-1 px-3 rounded-xl
              ${isActive ? 'bg-green-600 hover:bg-green-700' : 'bg-danger-dark hover:bg-danger-darker'}`}
            onClick={toggleWebsiteReader}
          >
            {isActive ? 'Turn OFF' : 'Turn ON'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Main;
