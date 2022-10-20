import millify from 'millify';
import { TBrands, TGloBalStats } from '../type';
import BrandBackLink from './BrandBackLink';

type Props = {
  globalStats: TGloBalStats;
};

const GlobalStats = ({ globalStats }: Props) => {
  const coinRankingInfo: TBrands = {
    logo: require('../public/coinranking-logo.png'),
    name: 'Coin Ranking',
    url: 'https://coinranking.com',
  };
  return (
    <div className="global-stats">
      <div className="global-stats-heading-container flex justify-between">
        <h2 className="font-bold text-2xl">Global Crypto Stats</h2>
        <BrandBackLink brand={coinRankingInfo} />
      </div>
      <div className="grid grid-cols-1 gap-6 place-content-center sm:grid-cols-2">
        <div className=" p-6 shadow-xl rounded-lg border hover:scale-105 transition-all">
          <h3 className="text-xl text-gray-500 tracking-wide">Total Coins</h3>
          <p className="text-2xl">{globalStats.totalCoins}</p>
        </div>
        <div className=" p-6 shadow-xl rounded-lg border hover:scale-105 transition-all">
          <h3 className="text-xl text-gray-500 tracking-wide">
            Total Exchanges
          </h3>
          <p className="text-2xl">{globalStats.totalExchanges}</p>
        </div>
        <div className=" p-6 shadow-xl rounded-lg border hover:scale-105 transition-all">
          <h3 className="text-xl text-gray-500 tracking-wide">
            Total Market Cap
          </h3>
          <p className="text-2xl">
            {millify(Number(globalStats.totalMarketCap))}
          </p>
        </div>
        <div className=" p-6 shadow-xl rounded-lg border hover:scale-105 transition-all">
          <h3 className="text-xl text-gray-500 tracking-wide">
            Total 24h Volume
          </h3>
          <p className="text-2xl">
            {millify(Number(globalStats.total24hVolume))}
          </p>
        </div>
        <div className=" p-6 shadow-xl rounded-lg border hover:scale-105 transition-all">
          <h3 className="text-xl text-gray-500 tracking-wide">Total Market</h3>
          <p className="text-2xl">{globalStats.totalMarkets}</p>
        </div>
      </div>
    </div>
  );
};
export default GlobalStats;
