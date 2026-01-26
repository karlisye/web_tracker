import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CurrentTabSkeleton from './CurrentTabSkeleton';

const CurrentTab = () => {
  const [tabHost, setTabHost] = useState(null);
  const [visits, setVisits] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCurrentTab = async () => {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab?.url) setTabHost(new URL(tab.url).host);
    };
    loadCurrentTab();
  }, []);

  useEffect(() => {
    if (isOpen && tabHost) {
      fetchVisits(page);
    }
  }, [page]);

  const loadData = async () => {
    if (!tabHost) return;
    setIsOpen(true);
    setPage(1);
    await fetchVisits(1);
  };

  const fetchVisits = async (pageNum) => {
    setLoading(true);
    const { authToken } = await chrome.storage.local.get('authToken');
    if (!authToken) return;

    try {
      const response = await axios.get(
        'http://localhost:8000/api/load-website-data',
        {
          headers: { Authorization: `Bearer ${authToken}` },
          params: { 
            websiteHost: tabHost,
            page: pageNum,
            perPage: 10
          }
        }
      );
      
      setVisits(response.data.visits);
      setTotalPages(response.data.totalPages || 1);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className={`bg-white p-2 rounded-lg shadow-lg flex flex-col gap-1 overflow-hidden
        ${isOpen ? 'h-full' : ''}
      `}
    >
      <p className='text-sm'>
        Currently on: <span className='text-primary'>{tabHost}</span>
      </p>

      <button
        onClick={isOpen ? () => setIsOpen(false) : loadData}
        className='py-1 px-4 rounded-md bg-primary text-secondary text-sm hover:bg-primary-dark hover:cursor-pointer'
      >
        {isOpen ? 'Close' : 'Load data about this page'}
      </button>

      {isOpen && (
        loading ? (
          <CurrentTabSkeleton />
        ) : visits.length ? (
          <div className='bg-primary flex-1 rounded-md shadow-md p-2 overflow-hidden flex flex-col gap-2'>
            <div className='flex-1 overflow-y-scroll rounded-md'>
              <table className='w-full border-separate border-spacing-y-1'>
                <thead>
                  <tr className='shadow-sm'>
                    <th className='sticky top-0 bg-primary-dark text-secondary px-2 py-1 text-left rounded-l-md'>
                      Website
                    </th>
                    <th className='sticky top-0 bg-primary-dark text-secondary px-2 py-1 text-left rounded-r-md'>
                      Visit time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {visits.map(v => (
                    <tr key={v.id} className='shadow-sm'>
                      <td className='px-2 py-1 bg-white rounded-l-md'>{v.website.host}</td>
                      <td className='px-2 py-1 bg-white rounded-r-md'>{v.visit_time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className='flex items-center justify-between bg-white rounded-md px-3 py-2'>
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className='px-3 py-1 rounded-md bg-primary text-secondary text-sm hover:bg-primary-dark disabled:bg-muted hover:cursor-pointer disabled:hover:cursor-default'
              >
                {'<'}
              </button>
              
              <span className='text-sm font-medium'>
                {page} of {totalPages}
              </span>

              <button
                onClick={() => setPage(page + 1)}
                disabled={page >= totalPages}
                className='px-3 py-1 rounded-md bg-primary text-secondary text-sm hover:bg-primary-dark disabled:bg-muted hover:cursor-pointer disabled:hover:cursor-default'
              >
                {'>'}
              </button>
            </div>
          </div>
        ) : (
          <p className='text-sm text-center text-danger'>No data for this website</p>
        )
      )}
    </div>
  );
};

export default CurrentTab;