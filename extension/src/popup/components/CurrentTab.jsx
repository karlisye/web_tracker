import axios from 'axios';
import React, { useEffect, useState } from 'react';

const CurrentTab = () => {
  const [tabHost, setTabHost] = useState(null);
  const [visits, setVisits] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const loadCurrentTab = async () => {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab?.url) setTabHost(new URL(tab.url).host);
    };
    loadCurrentTab();
  }, []);

  const loadData = async () => {
    if (!tabHost) return;
    setIsOpen(true);

    const { authToken } = await chrome.storage.local.get('authToken');
    if (!authToken) return;

    try {
      const response = await axios.get(
        'http://localhost:8000/api/load-website-data',
        {
          headers: { Authorization: `Bearer ${authToken}` },
          params: { websiteHost: tabHost }
        }
      );
      setVisits(response.data.visits);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div 
      className={`bg-white p-2 rounded-lg shadow-lg flex flex-col gap-1 overflow-hidden
        ${isOpen ? 'h-full' : ''}
      `}
    >
      <p className='text-sm'>
        Currently on: <span className='text-indigo-500'>{tabHost}</span>
      </p>

      <button
        onClick={isOpen ? () => setIsOpen(false) : loadData}
        className='py-1 px-4 rounded-md bg-indigo-500 text-white text-sm hover:bg-indigo-600'
      >
        {isOpen ? 'Close' : 'Load data about this page'}
      </button>

      {isOpen && visits && (
        visits.length ? (
          <div className='bg-indigo-500 flex-1 rounded-md shadow-md p-2 overflow-hidden'>
            <div className='h-full overflow-y-scroll rounded-md'>
              <table className='w-full border-separate border-spacing-y-1'>
                <thead>
                  <tr className='text-white'>
                    <th className='sticky top-0 bg-indigo-600 px-2 py-1 text-left rounded-l-md'>
                      Website
                    </th>
                    <th className='sticky top-0 bg-indigo-600 px-2 py-1 text-left rounded-r-md'>
                      Visit time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {visits.map(v => (
                    <tr key={v.id} className='bg-white shadow-sm'>
                      <td className='px-2 py-1 rounded-l-md'>{v.website.host}</td>
                      <td className='px-2 py-1 rounded-r-md'>{v.visit_time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className='text-sm text-center text-red-500'>No data for this website</p>
        )
      )}
    </div>
  );
};

export default CurrentTab;