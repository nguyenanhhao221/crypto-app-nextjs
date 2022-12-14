import GlobalStats from './GlobalStats';
import { TResponseGetCoin } from '../type';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import Cryptocurrencies from './Cryptocurrencies';
import { getCoinRankingClient } from '../services/cryptoApi';
import { Loader } from './Loader';
import { News } from './News';

const Homepage = () => {
    const { data, isLoading, isError, error } = useQuery<TResponseGetCoin>(
        ['getCoins'],
        () => getCoinRankingClient(100),
        {
            //options to refetch this query in 60s and even in background. This is to update to the user real time data every 60s
            refetchInterval: 60 * 1000,
            refetchIntervalInBackground: true,
        }
    );
    if (isLoading) return <Loader />;

    if (isError && error instanceof Error) return <>Error {error.message}</>;
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

                <Cryptocurrencies simplified={true} />
            </section>
            <section className="news-cryptos">
                <div className="flex flex-col flex-wrap items-center justify-between px-4 pb-4  text-center md:flex-row md:text-left">
                    <h2 className="home-title font-bold capitalize md:text-2xl">
                        Latest Crypto News
                    </h2>
                    <Link className="text-blue-700" href="/news">
                        Show more
                    </Link>
                </div>
                <News simplified={true} newCategory="Cryptocurrencies" />
            </section>
        </div>
    );
};

export default Homepage;
