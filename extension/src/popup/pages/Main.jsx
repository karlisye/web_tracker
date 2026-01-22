import axios from "axios";
import { useEffect, useState } from "react";
import CurrentTab from "../components/currentTab";

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
    }
    
    loadState();
    loadUser();
  }, []);

  const unlink = async () => {
    await chrome.storage.local.remove('authToken');
    redirectToLogin();
  }

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
        <div>
          <div className="flex justify-between items-center my-2">
            <p className="text-sm text-slate-600 text-center">
              Logged in as: <span className="text-black font-semibold">{user.name}</span>
            </p>
            <button 
              className="bg-indigo-500 text-white rounded-md hover:bg-indigo-600 hover:cursor-pointer px-3 py-1 text-sm font-semibold shadow-md hover:shadow-lg transition"
              onClick={unlink}
            >
              Unlink
            </button>
          </div>

          <CurrentTab />
        </div>

        <div className={`p-4 items-center flex justify-between gap-2 text-white font-semibold rounded-md text-sm shadow-lg hover:shadow-xl transition-shadow duration-300 bg-linear-to-br
          ${isActive ? 'from-green-500 to-green-600' : 'from-red-500 to-red-600'}`
        }>
          <span>{ isActive ? 'ON' : 'OFF' }</span>
          <div className="flex gap-2 items-center">
            <h3>Auth Monitor:</h3>
            <button 
              className={`py-1 px-3 rounded-xl hover:cursor-pointer transition
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
