import React from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { getCryptoNewsServer } from '../../services/cryptoNewsApi';
import { getCoinRankingServer } from '../../services/cryptoApi';
import { NewsOverview } from '../../components/NewsOverview';

const NewsPage: NextPage = () => {
    return <NewsOverview />;
};
export default NewsPage;

//When user access the /news , prefetch the default 12 news about cryptocurrencies topic
export const getServerSideProps: GetServerSideProps = async () => {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(
        ['getNewsServer'],
        () =>
            getCryptoNewsServer(
                12,
                'Cryptocurrencies',
                process.env.X_RAPIDAPI_KEY
            ),
        { staleTime: 5 * 1000 } //staleTime = 5s
    );
    await queryClient.prefetchQuery(
        ['getCoins'],
        () => getCoinRankingServer(100, process.env.API_KEY),
        { staleTime: 5 * 1000 } //staleTime = 5s
    );
    return { props: { dehydratedState: dehydrate(queryClient) } };
};
