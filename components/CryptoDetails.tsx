import {
    CheckOutlined,
    DollarOutlined,
    ExclamationCircleOutlined,
    FundOutlined,
    MoneyCollectOutlined,
    NumberOutlined,
    StopOutlined,
    ThunderboltOutlined,
    TrophyOutlined,
} from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Col, Row, Select, Spin } from 'antd';
import millify from 'millify';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { getCoinDetail } from '../services/cryptoApi';
import { Typography } from 'antd';
import JSXStyle from 'styled-jsx/style';
const { Title, Text } = Typography;
const { Option } = Select;
export const CryptoDetails = () => {
    const [timePeriod, setTimePeriod] = useState('7d');
    const router = useRouter();
    const coinId = router.query.coinId;
    const { data, isLoading, isError, error } = useQuery(
        ['getCoinDetail'],
        () => getCoinDetail(coinId)
    );
    if (isLoading) return <Spin />;
    if (isError && error instanceof Error) return <div>{error.message}</div>;

    if (data && !(data instanceof Error)) {
        const cryptoDetail = data.data.coin;
        //Detail about the crypto return by API
        //the Time period to be selected
        const time = ['3h', '24h', '7d', '30d', '3m', '1y', '3y', '5y'];
        //The main stat to be displayed
        const stats = [
            {
                title: 'Price to USD',
                value: `$ ${
                    cryptoDetail?.price && millify(Number(cryptoDetail?.price))
                }`,
                icon: <DollarOutlined />,
            },
            {
                title: 'Rank',
                value: cryptoDetail.rank,
                icon: <NumberOutlined />,
            },
            {
                title: '24h Volume',
                value: `${
                    cryptoDetail['24hVolume'] &&
                    millify(Number(cryptoDetail['24hVolume']))
                }`,
                icon: <ThunderboltOutlined />,
            },
            {
                title: 'Market Cap',
                value: `$ ${
                    cryptoDetail.marketCap &&
                    millify(Number(cryptoDetail.marketCap))
                }`,
                icon: <DollarOutlined />,
            },
            {
                title: 'All Time High',
                value: `$ ${
                    cryptoDetail?.allTimeHigh?.price &&
                    millify(Number(cryptoDetail?.allTimeHigh?.price))
                }`,
                icon: <TrophyOutlined />,
            },
        ];
        //Other stats to be displayed
        const otherStats = [
            {
                title: 'Number Of Markets',
                value: cryptoDetail?.numberOfMarkets,
                icon: <FundOutlined />,
            },
            {
                title: 'Number Of Exchanges',
                value: cryptoDetail?.numberOfExchanges,
                icon: <MoneyCollectOutlined />,
            },
            {
                title: 'Approved Supply',
                value: cryptoDetail?.supply?.confirmed ? (
                    <CheckOutlined />
                ) : (
                    <StopOutlined />
                ),
                icon: <ExclamationCircleOutlined />,
            },
            {
                title: 'Total Supply',
                value: `$ ${
                    cryptoDetail?.supply?.total &&
                    millify(Number(cryptoDetail?.supply?.total))
                }`,
                icon: <ExclamationCircleOutlined />,
            },
            {
                title: 'Circulating Supply',
                value: `$ ${
                    cryptoDetail?.supply?.circulating &&
                    millify(Number(cryptoDetail?.supply?.circulating))
                }`,
                icon: <ExclamationCircleOutlined />,
            },
        ];
        return (
            <main className="px-2 pt-4 md:mx-auto md:w-[90%]">
                <div>
                    <h2 className="text-center text-2xl font-bold text-fuchsia-700">
                        {cryptoDetail.name} Price
                    </h2>
                    <p className="text-center">
                        {cryptoDetail.name} live price in US dollar. View value
                        statistic, market cap and supply.
                    </p>
                </div>
                {/* Line chart */}
                <section></section>
                {/* Stats */}
                <section className="grid gap-4 px-1 py-4 md:grid-cols-2 md:gap-12 md:px-6">
                    {/* Main stats */}
                    <div>
                        <div>
                            <h3 className="text-center font-semibold capitalize text-fuchsia-500 md:text-left">
                                {cryptoDetail.name} value statistics
                            </h3>
                            <p className="text-center capitalize md:text-left">
                                An overview showing of {cryptoDetail.name}
                            </p>
                        </div>
                        <ul className="flex flex-col divide-y-2">
                            {stats.map((stat) => (
                                <li
                                    key={stat.value}
                                    className="flex justify-between py-4 md:py-6"
                                >
                                    <div className="flex items-center gap-1">
                                        {stat.icon}
                                        <p className="inline text-sm md:text-base">
                                            {stat.title}
                                        </p>
                                    </div>
                                    <div className="text-sm font-bold md:text-base">
                                        {stat.value}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Other stats */}
                    <div>
                        <div>
                            <h3 className="text-center font-semibold capitalize text-fuchsia-500 md:text-left">
                                {cryptoDetail.name} Other Stats
                            </h3>
                            <p className="text-center capitalize md:text-left">
                                Other stats of {cryptoDetail.name}
                            </p>
                        </div>
                        <ul className="flex flex-col divide-y-2">
                            {otherStats.map((stat) => (
                                <li
                                    key={stat.title}
                                    className="flex justify-between py-4 md:py-6"
                                >
                                    <div className="flex items-center gap-1">
                                        {stat.icon}
                                        <p className="inline text-sm md:text-base">
                                            {stat.title}
                                        </p>
                                    </div>
                                    <div className="text-sm font-bold md:text-base">
                                        {stat.value}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </main>
        );
    }
    return <></>;
};
