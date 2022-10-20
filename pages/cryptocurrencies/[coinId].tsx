import React from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { getCoinDetail, getCoinHistory } from '../../services/cryptoApi';
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
        getCoinDetail(context.query.coinId);
        getCoinHistory('24h', context.query.coinId);
    });
    return { props: { dehydratedState: dehydrate(queryClient) } };
};

export default CryptoDetailPage;
