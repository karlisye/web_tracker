import { useEffect, useState } from "react";
import browser from "webextension-polyfill";

function Main() {
  const [isActive, setIsActive] = useState(false);

  //parbauda vai chrome storage uzglaba isActive.
  useEffect(() => {
    const loadState = async () => {
      const result = await browser.storage.sync.get('isActive');
      //ja uzglaba tad saglaba taa vertibu, ja ne tad iedod false
      setIsActive(result.isActive ?? false);
    };
    loadState();
  }, []);

  const toggleWebsiteReader = () => {
    const newState = !isActive;
    browser.storage.sync.set({ isActive: newState });
    setIsActive(newState);
  }

  return (
    <div className="border p-2 flex gap-2">
        <span>{ isActive ? 'ON' : 'OFF' }</span>
        <h3>Current Website: </h3>
        {/* <p>{ tab }</p> */}
        <button onClick={toggleWebsiteReader}>{ isActive ? 'turn off' : 'turn on' }</button>
    </div>
  )
}

export default Main