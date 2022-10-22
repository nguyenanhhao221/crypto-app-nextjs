import React from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { getCryptoNews } from '../../services/cryptoNewsApi';
import { getCoinRanking } from '../../services/cryptoApi';
import { NewsOverview } from '../../components/NewsOverview';

const NewsPage: NextPage = () => {
    return <NewsOverview />;
};
export default NewsPage;

//When user access the /news , prefetch the default 12 news about cryptocurrencies topic
export const getServerSideProps: GetServerSideProps = async () => {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(
        ['getNews'],
        () => getCryptoNews(12, 'Cryptocurrencies'),
        { staleTime: 5 * 1000 } //staleTime = 5s
    );
    await queryClient.prefetchQuery(
        ['getCoins'],
        () => getCoinRanking(100),
        { staleTime: 5 * 1000 } //staleTime = 5s
    );
    return { props: { dehydratedState: dehydrate(queryClient) } };
};
