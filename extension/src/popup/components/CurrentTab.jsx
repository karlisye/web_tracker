import axios from 'axios';
import React, { useEffect, useState } from 'react'

const CurrentTab = () => {
  const [tabHost, setTabHost] = useState(null);
  const [visits, setVisits] = useState(null);
  const [isDataLoadBtnClicked, setIsDataLoadBtnClicked] = useState(false);

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

    setIsDataLoadBtnClicked(true);

    const { authToken } = await chrome.storage.local.get('authToken');
    if (authToken) {
      try {
        const config = { 
          headers: { Authorization: `Bearer ${authToken}` },
          params: { websiteHost: tabHost }
        };
        const response = await axios.get('http://localhost:8000/api/load-website-data', config);
        setVisits(response.data.visits);

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
        onClick={isDataLoadBtnClicked ? () => setIsDataLoadBtnClicked(false) : loadData}
        className='py-1 px-4 rounded-md shadow-md hover:shadow-lg bg-indigo-500 text-white text-sm hover:cursor-pointer hover:bg-indigo-600'
      >
        {isDataLoadBtnClicked ? 'Close' : 'Load data about this page'}
      </button>

      {isDataLoadBtnClicked && visits && (
        <div className="bg-indigo-500 h-55 w-full rounded-md shadow-md p-2">
          <div className="h-full overflow-y-auto rounded-md">
            <table className="w-full border-separate border-spacing-y-1">
              <thead>
                <tr className='text-white'>
                  <th className="sticky top-0 bg-indigo-600 z-10 px-2 py-1 text-left rounded-l-md">
                    Website
                  </th>
                  <th className="sticky top-0 bg-indigo-600 z-10 px-2 py-1 text-left rounded-r-md">
                    Visit time
                  </th>
                </tr> 
              </thead> 

              <tbody>
                {visits.map((visit) => (
                  <tr key={visit.id} className="bg-white shadow-sm">
                    <td className="px-2 py-1 rounded-l-md">{visit.website.host}</td>
                    <td className="px-2 py-1 rounded-r-md">{visit.visit_time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  )
}

export default CurrentTab