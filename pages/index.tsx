import type { GetServerSideProps, NextPage } from 'next';
import { App } from '../components/App';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { Footer } from '../components/Footer';
import Navbar from '../components/Navbar';
import React, { useState } from 'react';
import { getCoinRanking } from '../services/cryptoApi';

const Home: NextPage = () => {
  const [collapse, setCollapse] = useState(false);
  return (
    <div className="app-wrapper min-h-screen md:flex">
      <Navbar collapse={collapse} setCollapse={setCollapse} />
      <div className="flex flex-col w-screen">
        <App />
        <Footer />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['getCoins'], () => getCoinRanking(100));
  return { props: { dehydratedState: dehydrate(queryClient) } };
};

export default Home;
