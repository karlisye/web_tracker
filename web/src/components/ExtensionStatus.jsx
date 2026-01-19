import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { link, unlink } from '../services/auth';

const extensionId = import.meta.env.VITE_CHROME_EXTENSION_ID;

const ExtensionStatus = () => {
  const { user } = useContext(AppContext);

  const [isLinked, setIsLinked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const isExtensionLinked = () => {
    if (window.chrome && chrome.runtime) {
      chrome.runtime.sendMessage(
        extensionId,
        { type: 'auth-check' },
        (response) => {
          setIsLinked(response);
        }
      );
    }
  };

  useEffect(() => {
    isExtensionLinked();
  }, [user]);

  const handleLinkToggle = () => {
    if (isLinked) {
      unlink();
      setIsLinked(false);
    } else {
      link(user.extension_token);
      setIsLinked(true);
    }
  };

  return (
    <div
      className="fixed bottom-0 right-0 flex m-2 items-center z-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`flex transition-all duration-300 overflow-hidden 
          ${isHidden && 'transform translate-x-14/15'}
        `}>
        <button
          className={`ml-auto hover:cursor-pointer rounded-l-full text-white transition-all duration-300 overflow-hidden flex items-center w-6
            ${isLinked ? 'bg-green-600' : 'bg-red-600'}
          `}
          onClick={() => setIsHidden((prev) => !prev)}
          disabled={!isHovered}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0" /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"><path fillRule="evenodd" clipRule="evenodd" d="M8.29289 5.29289C8.68342 4.90237 9.31658 4.90237 9.70711 5.29289L15.5303 11.1161C16.0185 11.6043 16.0185 12.3957 15.5303 12.8839L9.70711 18.7071C9.31658 19.0976 8.68342 19.0976 8.29289 18.7071C7.90237 18.3166 7.90237 17.6834 8.29289 17.2929L13.5858 12L8.29289 6.70711C7.90237 6.31658 7.90237 5.68342 8.29289 5.29289Z" fill="currentColor" /></g></svg>
        </button>

        <div
          className={`p-2 flex flex-col text-lg text-white shadow-lg transition-all duration-300 items-center rounded-r-lg
            ${isLinked ? 'bg-green-500' : 'bg-red-500'} 
          `}
        >
          <div className="flex gap-2 items-center">
            <span>
              Extension status:{' '}
              <span className="font-bold">{isLinked ? 'linked' : 'unlinked'}</span>
            </span>

            <svg className="w-5 hover:cursor-pointer" onClick={isExtensionLinked} fill="rgb(255,255,255)" viewBox="0 0 24.00 24.00" xmlns="http://www.w3.org/2000/svg" stroke="#000000" strokeWidth="0.00024000000000000003"><g id="SVGRepo_bgCarrier" strokeWidth="0" /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"><path d="M19.146 4.854l-1.489 1.489A8 8 0 1 0 12 20a8.094 8.094 0 0 0 7.371-4.886 1 1 0 1 0-1.842-.779A6.071 6.071 0 0 1 12 18a6 6 0 1 1 4.243-10.243l-1.39 1.39a.5.5 0 0 0 .354.854H19.5A.5.5 0 0 0 20 9.5V5.207a.5.5 0 0 0-.854-.353z" /></g></svg>
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              isHovered ? 'max-h-20 opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'
            }`}
          >
            <div className="flex justify-center">
              <button
                className={`rounded-md py-1 px-5 hover:cursor-pointer font-semibold shadow-md transition ${
                  isLinked
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
                onClick={handleLinkToggle}
              >
                {isLinked ? 'Unlink' : 'Link'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtensionStatus;