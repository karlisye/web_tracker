import axios from 'axios';
import React, { useEffect, useState } from 'react'

const CurrentTab = () => {
  const [tabHost, setTabHost] = useState(null);

  useEffect(() => {
    const loadCurrentTab = async () => {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      if (tab) {
        const host = new URL(tab?.url).host;
        setTabHost(host);
      }
    }

    loadCurrentTab();
  },[]);

  const loadData = async () => {
    if (!tabHost) return;

    const { authToken } = await chrome.storage.local.get('authToken');
    if (authToken) {
      try {
        const config = { 
          headers: { Authorization: `Bearer ${authToken}` },
          params: { websiteHost: tabHost }
        };
        const response = await axios.get('http://localhost:8000/api/load-website-data', config);
        console.log(response)

      } catch (error) {
        console.log('Error while loading website data', error);
      }
    }
  }

  return (
    <div className='bg-white p-2 rounded-lg shadow-lg flex flex-col gap-1'>
      <p className='text-sm'>
        Currently on: <span className='text-indigo-500'>{tabHost}</span>
      </p>

      <button
        onClick={loadData}
        className='py-1 px-4 rounded-md shadow-md hover:shadow-lg bg-indigo-500 text-white text-sm hover:cursor-pointer hover:bg-indigo-600'
      >
        Load data about this page
      </button>
    </div>
  )
}

export default CurrentTab