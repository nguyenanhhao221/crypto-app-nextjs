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
    <section className="global-stats w-full px-4">
      <div className="global-stats-heading-container text-center pb-4 md:text-left flex flex-col  md:flex-row justify-between flex-wrap">
        <h2 className="font-bold text-lg md:text-2xl">Global Crypto Stats</h2>
        <BrandBackLink brand={coinRankingInfo} />
      </div>
      <div className="grid grid-cols-1 gap-4 md:gap-6 place-content-center sm:grid-cols-2">
        <div className="p-6 md:shadow-xl shadow-lg rounded-lg border md:hover:bg-gray-200 transition-all">
          <h3 className="md:text-xl text-gray-500 tracking-wide">
            Total Coins
          </h3>
          <p className="md:text-2xl text-lg">{globalStats.totalCoins}</p>
        </div>
        <div className=" p-6 md:shadow-xl shadow-lg rounded-lg border md:hover:bg-gray-200 transition-all">
          <h3 className="md:text-xl text-gray-500 tracking-wide">
            Total Exchanges
          </h3>
          <p className="md:text-2xl text-lg">{globalStats.totalExchanges}</p>
        </div>
        <div className=" p-6 md:shadow-xl shadow-lg rounded-lg border md:hover:bg-gray-200 transition-all">
          <h3 className="md:text-xl text-gray-500 tracking-wide">
            Total Market Cap
          </h3>
          <p className="md:text-2xl text-lg">
            {millify(Number(globalStats.totalMarketCap))}
          </p>
        </div>
        <div className=" p-6 md:shadow-xl shadow-lg rounded-lg border md:hover:bg-gray-200 transition-all">
          <h3 className="md:text-xl text-gray-500 tracking-wide">
            Total 24h Volume
          </h3>
          <p className="md:text-2xl text-lg">
            {millify(Number(globalStats.total24hVolume))}
          </p>
        </div>
        <div className=" p-6 md:shadow-xl shadow-lg rounded-lg border md:hover:bg-gray-200 transition-all">
          <h3 className="md:text-xl text-gray-500 tracking-wide">
            Total Market
          </h3>
          <p className="md:text-2xl text-lg">{globalStats.totalMarkets}</p>
        </div>
      </div>
    </section>
  );
};
export default GlobalStats;
