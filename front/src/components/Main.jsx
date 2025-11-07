import { useEffect, useState } from "react";
import { storage } from "webextension-polyfill";

function Main() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const loadState = async () => {
      const result = await storage.sync.get('isActive');
      setIsActive(result.isActive ?? false);
    };
    loadState();
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
    </div>
  );
}

export default Main;
