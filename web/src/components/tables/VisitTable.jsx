import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ContainerTitle from '../ContainerTitle';
import TableSkeleton from '../skeletons/TableSkeleton';
import WebsiteInfo from '../modals/WebsiteInfo';
import Modal from '../modals/Modal';

const VisitTable = () => {
  const [visits, setVisits] = useState(null);
  const [pageCount, setPageCount] = useState(null);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('visit_time');
  const [direction, setDirection] = useState('asc');

  const [isSeeMoreActive, setIsSeeMoreActive] = useState(false);
  const [websiteID, setWebsiteID] = useState(null);

  const getVisits = async () => {
    const res = await axios.get(`/visits?page=${page}`, { params: { sortBy, direction } });
    setPageCount(res.data.visits.links.length - 2);
    setVisits(res.data.visits.data);
  }

  useEffect(() => {
    getVisits();
  },[page, sortBy, direction]);

  if (!visits) return <TableSkeleton colCount={4} />

  return (
    <>
    <ContainerTitle title='Login History' />

    <div className="bg-primary rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 grow flex flex-col">
      <div className="flex text-primary mb-4 shrink-0 justify-between bg-secondary items-center p-2 rounded-md">
        <div className="flex gap-2 rounded-md">
          <button
            className={`rounded-md py-2 px-4 shadow-lg font-semibold text-white transition
              ${page - 1 < 1
                ? 'bg-primary/70 text-primary'
                : 'bg-primary hover:bg-primary-dark hover:cursor-pointer'}
            `}
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            disabled={page - 1 < 1}
          >
            {'<'}
          </button>

          <button
            className={`rounded-md py-2 px-4 shadow-lg font-semibold text-white transition
              ${page + 1 > pageCount
                ? 'bg-primary/70 text-primary'
                : 'bg-primary hover:bg-primary-dark hover:cursor-pointer'}
            `}
            onClick={() => setPage(prev => Math.min(prev + 1, pageCount))}
            disabled={page + 1 > pageCount}
          >
            {'>'}
          </button>
        </div>

        <div className='flex gap-4'>
          <div>
            <label htmlFor="sortBy">Sort by: </label>
            <select onChange={(e) => setSortBy(e.target.value)} id="sortBy">
              <option value="visit_time">Time</option>
              <option value="website_id">Website</option>
            </select>
          </div>

          <div>
            <label htmlFor="direction">Direction: </label>
            <select onChange={(e) => setDirection(e.target.value)} id="direction">
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <table className="w-full table-fixed text-left border-separate border-spacing-y-2 text-black">
          <thead>
            <tr>
              <th className="bg-secondary p-2 rounded-l-md">ID</th>
              <th className="bg-secondary p-2">User</th>
              <th className="bg-secondary p-2">Website</th>
              <th className="bg-secondary p-2">Time</th>
              <th className="bg-secondary p-2 rounded-r-md"></th>
            </tr>
          </thead>

          <tbody>
            {visits.map(visit => (
              <tr className="shadow-sm shadow-muted rounded-md" key={visit.id}>
                <td className="bg-secondary p-2 rounded-l-md">{visit.id}</td>
                <td className="bg-secondary p-2">{visit.user.name}</td>
                <td className="bg-secondary p-2">
                  <a
                    target="_blank"
                    href={visit.website.page_url}
                    className="text-primary hover:underline"
                  >
                    {visit.website.host}
                  </a>
                </td>
                <td className="bg-secondary p-2">{visit.visit_time}</td>
                <td className="bg-secondary p-2 rounded-r-md text-right">
                  <button
                    onClick={() => {
                      setIsSeeMoreActive(true);
                      setWebsiteID(visit.website_id);
                    }}
                    className="bg-primary text-white py-1 px-6 rounded-md shadow-sm hover:shadow-md transition hover:bg-primary-dark hover:cursor-pointer"
                  >
                    See More
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
    </div>

    
    <Modal setIsActive={setIsSeeMoreActive} isActive={isSeeMoreActive}>
      <WebsiteInfo websiteID={websiteID} />
    </Modal>

    </>
  )
}

export default VisitTable