import React from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import Homepage from '../components/Homepage';
import { getCoinRanking } from '../services/cryptoApi';
import { getCryptoNews } from '../services/cryptoNewsApi';

const Home: NextPage = () => {
    return <Homepage />;
};

export const getServerSideProps: GetServerSideProps = async () => {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(['getCoins'], () => getCoinRanking(100));
    await queryClient.prefetchQuery(['getNews'], () =>
        getCryptoNews(6, 'Cryptocurrencies')
    );
    return { props: { dehydratedState: dehydrate(queryClient) } };
};

export default Home;
