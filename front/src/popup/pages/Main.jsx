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
        <p>Logged in as: {user.name}</p> 
        <div className="border p-2 flex gap-2">
            <span>{ isActive ? 'ON' : 'OFF' }</span>
            <h3>Auth Monitor:</h3>
            <button onClick={toggleWebsiteReader}>{ isActive ? 'Turn OFF' : 'Turn ON' }</button>
        </div>
      </>
      ) : redirectToLogin()}
    </>
  );
}

export default Main;
