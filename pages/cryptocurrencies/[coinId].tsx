import React from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import {
    getCoinDetailServer,
    getCoinHistoryServer,
} from '../../services/cryptoApi';
import { CryptoDetails } from '../../components/CryptoDetails';

const CryptoDetailPage: NextPage = () => {
    return (
        <>
            <CryptoDetails />
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const queryClient = new QueryClient();
    if (!context) return { props: {} };
    await queryClient.prefetchQuery(['getCoinDetail'], () => {
        getCoinDetailServer(process.env.X_RAPIDAPI_KEY, context.query.coinId);
        getCoinHistoryServer(
            '24h',
            process.env.X_RAPIDAPI_KEY,
            context.query.coinId
        );
    });
    return { props: { dehydratedState: dehydrate(queryClient) } };
};

export default CryptoDetailPage;
