import React from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import { getCoinRanking } from '../../services/cryptoApi';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import Cryptocurrencies from '../../components/Cryptocurrencies';

const CryptoCurrenciesPage: NextPage = () => {
  return (
    <div>
      <Cryptocurrencies simplified={false} />
    </div>
  );
};
export default CryptoCurrenciesPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['getCoins'], () => getCoinRanking(100));
  return { props: { dehydratedState: dehydrate(queryClient) } };
};
