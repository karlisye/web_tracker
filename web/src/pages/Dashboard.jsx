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
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4">
                Dashboard
              </h1>
            <div className="w-24 h-1 bg-indigo-500 mx-auto rounded-full" />

            <p className="text-slate-600 text-lg mt-6 max-w-3xl mx-auto">
              Your online life, neatly organized. From daily favorites to forgotten sites, it’s all right here.
            </p>
            </div>
          </div>

          <DashboardNavigation onNavigate={handleNavigation} />
      </SnapItem>

      {user ? (
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


      ) : (
        <p className="text-slate-600 text-center py-20">
          <Link className="text-blue-500 underline" to="/login">
            Log in
          </Link>{" "}
          to see your web history statistics
        </p>
      )}
    </SnapContainer>

  )
}


export default Dashboard