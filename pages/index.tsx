import React from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import Homepage from '../components/Homepage';
import { getCoinRankingServer } from '../services/cryptoApi';
import { getCryptoNewsServer } from '../services/cryptoNewsApi';

const Home: NextPage = () => {
    return <Homepage />;
};

export const getServerSideProps: GetServerSideProps = async () => {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(['getCoins'], () =>
        getCoinRankingServer(10, process.env.X_RAPIDAPI_KEY)
    );
    await queryClient.prefetchQuery(
        ['getNewsServer'],
        () =>
            getCryptoNewsServer(
                6,
                'Cryptocurrencies',
                process.env.X_RAPIDAPI_KEY
            ),
        { staleTime: 5 * 1000 }
    );
    return { props: { dehydratedState: dehydrate(queryClient) } };
};

export default Home;
