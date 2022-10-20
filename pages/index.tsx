import type { GetServerSideProps, NextPage } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { Footer } from '../components/Footer';
import Navbar from '../components/Navbar';
import React, { useState } from 'react';
import { getCoinRanking } from '../services/cryptoApi';
import Homepage from '../components/Homepage';

const Home: NextPage = () => {
  const [collapse, setCollapse] = useState(true);
  return (
    <div className="app-wrapper min-h-screen flex gap-4">
      <Navbar collapse={collapse} setCollapse={setCollapse} />
      <div className={`flex flex-col w-screen ml-20 md:static md:ml-0`}>
        <Homepage />
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
