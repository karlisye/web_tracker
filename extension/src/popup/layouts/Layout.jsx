import React from 'react';
import Head from './Head';
import Main from '../pages/Main';

const Layout = () => {
  return (
    <div className='w-80 h-[480px] p-2 bg-background flex flex-col'>
      <header>
        <Head />
      </header>

      <main className='flex flex-col flex-1 overflow-hidden'>
        <Main />
      </main>
    </div>
  );
};

export default Layout;
