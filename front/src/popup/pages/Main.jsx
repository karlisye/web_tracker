import { useEffect, useState } from "react";

function Main() {
  const [isActive, setIsActive] = useState(false);
  const [user, setUser] = useState({});
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
          const response = await fetch('http://localhost:8000/api/user', {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setUser(data);
          }
        } catch (error) {
          
        }
      }
      setLoading(false);
    }

    loadState();
    loadUser();
  }, []);

  const toggleWebsiteReader = () => {
    const newState = !isActive;
    storage.sync.set({ isActive: newState });
    setIsActive(newState);
  };

  return (
    <div className="border p-2 flex gap-2">
        <span>{ isActive ? 'ON' : 'OFF' }</span>
        <h3>Auth Monitor:</h3>
        <button onClick={toggleWebsiteReader}>{ isActive ? 'Turn OFF' : 'Turn ON' }</button>

        <div>{loading ? <p>Loading...</p> : <p>{user.name}</p>}</div>
    </div>
  );
}

export default Main;
