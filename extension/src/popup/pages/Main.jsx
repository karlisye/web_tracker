import axios from "axios";
import { useEffect, useState } from "react";

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
          const config = { headers: { Authorization: `Bearer ${authToken}` } }
          const response = await axios.get('http://localhost:8000/api/user', config);
          setUser(response.data);
        } catch (error) {
          console.log('Error getting user', error)
        }
      }
      setLoading(false);
    }
    
    loadState();
    loadUser();
  }, []);

  const toggleWebsiteReader = () => {
    const newState = !isActive;
    chrome.storage.sync.set({ isActive: newState });
    setIsActive(newState);
  };

  const redirectToLogin = () => {
    if (window.chrome && chrome.runtime) {
      chrome.runtime.sendMessage(
        { 
          type: 'redirect-to-login',
        },
        (response) => {
          console.log("Message sent to Chrome extension:", response);
        }
      );
    }
  }

  if(loading) return <p>Loading...</p>

  return (
    <>
      {user ? ( 
      <>
        <div className="flex justify-between items-center my-2">
          <p className="text-sm text-slate-600 text-center">
            Logged in as: <span className="text-black font-semibold">{user.name}</span>
          </p>
          <button 
            className="bg-indigo-300 border-2 text-white rounded-md hover:bg-indigo-400 hover:cursor-pointer px-3 py-1 text-sm font-semibold"
          >
            Unlink
          </button>
        </div>

        <div className={`border-2 p-4 m-2 items-center flex justify-between gap-2 text-white font-semibold rounded-md border-white text-sm fixed bottom-0 left-0 right-0
          ${isActive ? 'bg-green-500' : 'bg-red-500'}`
        }>
          <span>{ isActive ? 'ON' : 'OFF' }</span>
          <div className="flex gap-2 items-center">
            <h3>Auth Monitor:</h3>
            <button 
              className={`border-2 py-1 px-3 rounded-xl hover:cursor-pointer hover:scale-105
                ${isActive ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`
              } 
              onClick={toggleWebsiteReader}
            >
              { isActive ? 'Turn OFF' : 'Turn ON' }
            </button>
          </div>
        </div>
      </>
      ) : redirectToLogin()}
    </>
  );
}

export default Main;
