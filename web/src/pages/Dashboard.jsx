import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';
import VisitTable from '../components/tables/VisitTable';
import { Link } from 'react-router-dom';
import MostVisitsGraph from '../components/graphs/MostVisitsGraph';
import InactiveWebsitesTable from '../components/tables/InactiveWebsitesTable';
import WebsitesTable from '../components/tables/WebsitesTable';

const Dashboard = () => {
  const { user } = useContext(AppContext);

  return (
    <div className="bg-linear-to-br from-slate-50 to-blue-50 h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">

      <section className="h-screen snap-start flex items-center px-4">
        <div className="max-w-6xl mx-auto w-full">
          <div className="py-16 px-4">
            <div className="max-w-6xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4">
                Dashboard
              </h1>
              <div className="w-24 h-1 bg-indigo-500 mx-auto rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {user ? (
        <>
          <section className="h-screen snap-start flex items-center px-4">
            <div className="max-w-6xl mx-auto w-full">
              <VisitTable />
            </div>
          </section>

          <section className="h-screen snap-start flex items-center px-4">
            <div className="max-w-6xl mx-auto w-full">
              <MostVisitsGraph />
            </div>
          </section>

          <section className="h-screen snap-start flex items-center px-4">
            <div className="max-w-6xl mx-auto w-full">
              <InactiveWebsitesTable />
            </div>
          </section>

          <section className="h-screen snap-start flex items-center px-4">
            <div className="max-w-6xl mx-auto w-full">
              <WebsitesTable />
            </div>
          </section>
        </>


      ) : (
        <p className="text-slate-600 text-center py-20">
          <Link className="text-blue-500 underline" to="/login">
            Log in
          </Link>{" "}
          to see your web history statistics
        </p>
      )}
    </div>
  )
}


export default Dashboard