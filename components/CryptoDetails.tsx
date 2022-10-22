import { useQuery } from '@tanstack/react-query';
import millify from 'millify';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { getCoinDetailClient } from '../services/cryptoApi';
import { Stats } from './Stats';
import { TStats } from '../type';
import { CryptoDetailDescription } from './CryptoDetailDescription';
import { CryptoLinks } from './CryptoLinks';
import LineChart from './LineChart';
import { MyListbox } from './ListBox';
import { Loader } from './Loader';
import {
    BoltIcon,
    CheckIcon,
    CurrencyDollarIcon,
    CurrencyEuroIcon,
    HashtagIcon,
    InformationCircleIcon,
    PresentationChartLineIcon,
    StopCircleIcon,
    TrophyIcon,
} from '@heroicons/react/24/outline';

export const CryptoDetails = () => {
    const [timePeriod, setTimePeriod] = useState('7d');
    const router = useRouter();
    const coinId = router.query.coinId;
    const { data, isLoading, isError, error } = useQuery(
        ['getCoinDetail', coinId],
        () => getCoinDetailClient(coinId)
    );
    if (isLoading) return <Loader />;
    if (isError && error instanceof Error) return <div>{error.message}</div>;

    if (data && !(data instanceof Error)) {
        const cryptoDetail = data.data.coin;
        //Detail about the crypto return by API
        //the Time period to be selected
        const time = ['7d', '3h', '24h', '30d', '3m', '1y', '3y', '5y'];
        //The main stat to be displayed
        const stats: TStats[] = [
            {
                title: 'Price to USD',
                value: `$ ${
                    cryptoDetail?.price && millify(Number(cryptoDetail?.price))
                }`,
                icon: <CurrencyDollarIcon className="h-5 w-5" />,
            },
            {
                title: 'Rank',
                value: cryptoDetail.rank,
                icon: <HashtagIcon className="h-5 w-5" />,
            },
            {
                title: '24h Volume',
                value: `${
                    cryptoDetail['24hVolume'] &&
                    millify(Number(cryptoDetail['24hVolume']))
                }`,
                icon: <BoltIcon className="h-5 w-5" />,
            },
            {
                title: 'Market Cap',
                value: `$ ${
                    cryptoDetail.marketCap &&
                    millify(Number(cryptoDetail.marketCap))
                }`,
                icon: <CurrencyDollarIcon className="h-5 w-5" />,
            },
            {
                title: 'All Time High',
                value: `$ ${
                    cryptoDetail?.allTimeHigh?.price &&
                    millify(Number(cryptoDetail?.allTimeHigh?.price))
                }`,
                icon: <TrophyIcon className="h-5 w-5" />,
            },
        ];
        //Other stats to be displayed
        const otherStats = [
            {
                title: 'Number Of Markets',
                value: cryptoDetail?.numberOfMarkets,
                icon: <PresentationChartLineIcon className="h-5 w-5" />,
            },
            {
                title: 'Number Of Exchanges',
                value: cryptoDetail?.numberOfExchanges,
                icon: <CurrencyEuroIcon className="h-5 w-5" />,
            },
            {
                title: 'Approved Supply',
                value: cryptoDetail?.supply?.confirmed ? (
                    <CheckIcon className="h-5 w-5" />
                ) : (
                    <StopCircleIcon className="h-5 w-5" />
                ),
                icon: <InformationCircleIcon className="h-5 w-5" />,
            },
            {
                title: 'Total Supply',
                value: `$ ${
                    cryptoDetail?.supply?.total &&
                    millify(Number(cryptoDetail?.supply?.total))
                }`,
                icon: <InformationCircleIcon className="h-5 w-5" />,
            },
            {
                title: 'Circulating Supply',
                value: `$ ${
                    cryptoDetail?.supply?.circulating &&
                    millify(Number(cryptoDetail?.supply?.circulating))
                }`,
                icon: <InformationCircleIcon className="h-5 w-5" />,
            },
        ];
        return (
            <main className="px-2 pt-4 md:mx-auto md:w-[90%]">
                <div className="py-6">
                    <h2 className="text-center text-2xl font-bold text-blue-700 md:text-4xl">
                        {cryptoDetail.name} Price
                    </h2>
                    <p className="py-4 text-center">
                        {cryptoDetail.name} live price in US dollar. View value
                        statistic, market cap and supply.
                    </p>
                </div>
                {/* Line chart */}
                <section>
                    <h2 className="text-center text-xl font-bold text-blue-500 md:text-2xl">
                        {cryptoDetail.name} Price Chart
                    </h2>
                    <div className="flex flex-col items-center gap-1 py-2 md:flex-row md:justify-between">
                        <MyListbox
                            data={time}
                            setStateFunc={setTimePeriod}
                            selectText="Select Time Period"
                            defaultValue={time[0]}
                        />
                        <p className="current-price text-sm font-bold md:text-lg">
                            Current {cryptoDetail.name} Price: $
                            {typeof cryptoDetail.price !== 'undefined' &&
                                millify(Number(cryptoDetail.price))}
                        </p>
                    </div>
                    <LineChart
                        coinName={cryptoDetail.name}
                        simplified={false}
                        mobileView={false}
                        timePeriod={timePeriod}
                    />
                </section>
                {/* Stats */}
                <section className="grid gap-4 px-1 py-4 md:grid-cols-2 md:gap-12 md:px-6">
                    {/* Main stats */}
                    <Stats name={cryptoDetail.name} statsArr={stats} />
                    {/* Other stats */}
                    <Stats
                        name={cryptoDetail.name}
                        statsArr={otherStats}
                        variants="others"
                    />
                </section>
                {/* Description */}
                <section className="grid gap-4 px-1 py-4 md:grid-cols-2 md:gap-12 md:px-6">
                    <CryptoDetailDescription
                        description={cryptoDetail.description}
                        name={cryptoDetail.name}
                    />
                    <CryptoLinks
                        name={cryptoDetail.name}
                        links={cryptoDetail.links}
                    />
                </section>
            </main>
        );
    }
    return <></>;
};
