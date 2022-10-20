import React from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import Homepage from '../components/Homepage';
import { getCoinRanking } from '../services/cryptoApi';

const Home: NextPage = () => {
    return <Homepage />;
};

export const getServerSideProps: GetServerSideProps = async () => {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(['getCoins'], () => getCoinRanking(100));
    return { props: { dehydratedState: dehydrate(queryClient) } };
};

export default Home;
