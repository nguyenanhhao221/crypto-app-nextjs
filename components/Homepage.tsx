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
    <div className="w-full p-4">
      <GlobalStats globalStats={globalStats} />
      <div className="top-cryptos">
        <div className="home-heading-container">
          <Title level={2} style={{ margin: 0 }} className="home-title">
            Top 10 Cryptocurrencies in the world
          </Title>
          <Title level={2} style={{ margin: 0 }} className="show-more">
            <Link href="/cryptocurrencies">Show more</Link>
          </Title>
        </div>
        {/* <Cryptocurrencies simplified /> */}
      </div>
      <div className="news-cryptos">
        <div className="home-heading-container">
          <Title level={2} style={{ margin: 0 }} className="home-title">
            Latest Crypto News
          </Title>
          <Title level={2} style={{ margin: 0 }} className="show-more">
            <Link href="/news">Show more</Link>
          </Title>
        </div>
        {/* <News simplified /> */}
      </div>
    </div>
  );
};

export default Homepage;
