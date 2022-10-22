import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { getCoinRankingClient } from '../services/cryptoApi';
import { MyListbox } from './ListBox';
import { Loader } from './Loader';
import { News } from './News';

export const NewsOverview = () => {
    const [newCategory, setNewCategory] = useState('Cryptocurrencies');
    //Fetch data for 100 coins in Coinranking to be used in the filter box about news

    const {
        data: cryptoCoins,
        isSuccess,
        isLoading,
        isError,
        error,
    } = useQuery(['getCoins'], () => getCoinRankingClient(100));
    const dataList = isSuccess
        ? [
              'Cryptocurrencies',
              ...cryptoCoins?.data.coins.map((coin) => coin.name),
          ]
        : undefined;
    if (isLoading) return <Loader />;
    if (isError && error instanceof Error)
        return <div> Error: {error.message}</div>;
    if (isSuccess) {
        return (
            <main>
                <div className="flex w-full items-center justify-center py-4">
                    <MyListbox
                        selectText="Select news topic"
                        setStateFunc={setNewCategory}
                        data={dataList}
                    />
                </div>
                <News
                    simplified={false}
                    setNewCategory={setNewCategory}
                    newCategory={newCategory}
                />
            </main>
        );
    }
    return <></>;
};
