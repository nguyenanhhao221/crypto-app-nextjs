import { Spin } from 'antd';
import GlobalStats from './GlobalStats';
import { TResponseGetCoin } from '../type';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import Cryptocurrencies from './Cryptocurrencies';
import { getCoinRanking } from '../services/cryptoApi';

const Homepage = () => {
    const { data, isLoading, isError, error } = useQuery<TResponseGetCoin>(
        ['getCoins'],
        () => getCoinRanking(100)
    );
    if (isLoading) return <Spin size="large" className="loader" />;

    if (isError) return <>Error {error}</>;
    if (!data) return <>GlobalStat undefined</>;
    const globalStats = data?.data?.stats;
    return (
        <div className="w-full space-y-4 py-4">
            <GlobalStats globalStats={globalStats} />
            <section className="top-cryptos">
                <div className="flex flex-col flex-wrap items-center justify-between px-4 pb-4  text-center md:flex-row md:text-left">
                    <h2 className="text-lg font-bold capitalize md:text-2xl">
                        Top 10 Cryptocurrencies in the world
                    </h2>
                    <Link className="text-blue-700" href="/cryptocurrencies">
                        Show more
                    </Link>
                </div>

                <Cryptocurrencies simplified />
            </section>
            <div className="news-cryptos">
                <div className="flex items-center justify-between">
                    <h2 className="home-title font-bold md:text-2xl">
                        Latest Crypto News
                    </h2>
                    <Link className="text-blue-700" href="/news">
                        Show more
                    </Link>
                </div>
                {/* <News simplified /> */}
            </div>
        </div>
    );
};

export default Homepage;
