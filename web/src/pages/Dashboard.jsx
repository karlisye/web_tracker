import React, { useContext, useRef } from 'react'
import { AppContext } from '../context/AppContext';
import VisitTable from '../components/tables/VisitTable';
import { Link } from 'react-router-dom';
import MostVisitsGraph from '../components/graphs/MostVisitsGraph';
import InactiveWebsitesTable from '../components/tables/InactiveWebsitesTable';
import WebsitesTable from '../components/tables/WebsitesTable';
import DashboardNavigation from '../components/navbar/DashboardNavigation';
import SnapContainer from '../components/snap/SnapContainer';
import SnapItem from '../components/snap/SnapItem';

const Dashboard = () => {
  const { user } = useContext(AppContext);

  const visitsRef = useRef(null);
  const mostVisitsRef = useRef(null);
  const inactiveRef = useRef(null);
  const websitesRef = useRef(null);

  const handleNavigation = (section) => {
    const sections = {
      visits: visitsRef,
      mostVisits: mostVisitsRef,
      inactive: inactiveRef,
      websites: websitesRef
    }

    sections[section]?.current?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <SnapContainer>
      <SnapItem>
          <div className="py-16 px-4">
            <div className="max-w-6xl mx-auto text-center">
              <h1 className='hero'>Dashboard</h1>
            <div className="w-24 h-1 bg-primary-light mx-auto rounded-full" />

            <p className="text-muted text-lg mt-6 max-w-3xl mx-auto">
              Your online life, neatly organized. From daily favorites to forgotten sites, it’s all right here.
            </p>
            </div>
          </div>

          {user ? (
            <>
              <DashboardNavigation onNavigate={handleNavigation} />

              <div className='animate-pulse text-muted'>
                <p className='text-center mt-20 text-lg'>Start Scrolling</p>
                <div className='w-10 mx-auto'>
                  <svg fill="currentColor" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 30.727 30.727" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M29.994,10.183L15.363,24.812L0.733,10.184c-0.977-0.978-0.977-2.561,0-3.536c0.977-0.977,2.559-0.976,3.536,0 l11.095,11.093L26.461,6.647c0.977-0.976,2.559-0.976,3.535,0C30.971,7.624,30.971,9.206,29.994,10.183z"></path> </g> </g></svg>
                </div>
              </div>
            </>
          ) : (
            <p className="text-muted text-center py-20">
              <Link className="text-blue-500 underline" to="/login">
                Log in
              </Link>{" "}
              to see your web history statistics
            </p>
          )}
      </SnapItem>

      {user && (
        <>
          <SnapItem ref={visitsRef} >
              <VisitTable />
          </SnapItem>

          <SnapItem ref={mostVisitsRef}>
            <MostVisitsGraph />
          </SnapItem>

          <SnapItem ref={inactiveRef}>
            <InactiveWebsitesTable />
          </SnapItem>

          <SnapItem ref={websitesRef}>
            <WebsitesTable />
          </SnapItem>
        </>
      )}
    </SnapContainer>
  )
}


export default Dashboard