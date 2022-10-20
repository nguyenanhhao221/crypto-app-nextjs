import { Typography, Spin } from 'antd';
import GlobalStats from './GlobalStats';
import { TResponseGetCoin } from '../type';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import Cryptocurrencies from './Cryptocurrencies';
import News from './News';
import { getCoinRanking } from '../services/cryptoApi';

const { Title } = Typography;
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
    <div className="w-full py-4">
      <GlobalStats globalStats={globalStats} />
      <div className="top-cryptos">
        <div className="flex justify-between items-center">
          <h2 className="home-title font-bold md:text-2xl">
            Top 10 Cryptocurrencies in the world
          </h2>
          <Link className="text-blue-700" href="/cryptocurrencies">
            Show more
          </Link>
        </div>
        {/* <Cryptocurrencies simplified cryptos={data?.data?.coins} /> */}
      </div>
      <div className="news-cryptos">
        <div className="flex justify-between items-center">
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
