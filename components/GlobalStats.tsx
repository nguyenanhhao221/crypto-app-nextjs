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
            <div className="global-stats-heading-container flex flex-col flex-wrap justify-between pb-4  text-center md:flex-row md:text-left">
                <h2 className="text-lg font-bold md:text-2xl">
                    Global Crypto Stats
                </h2>
                <BrandBackLink brand={coinRankingInfo} />
            </div>
            <div className="grid grid-cols-1 place-content-center gap-4 sm:grid-cols-2 md:gap-6">
                <div className="rounded-lg border p-6 shadow-lg transition-all md:shadow-xl md:hover:bg-gray-200">
                    <h3 className="tracking-wide text-gray-500 md:text-xl">
                        Total Coins
                    </h3>
                    <p className="text-lg md:text-2xl">
                        {globalStats.totalCoins}
                    </p>
                </div>
                <div className=" rounded-lg border p-6 shadow-lg transition-all md:shadow-xl md:hover:bg-gray-200">
                    <h3 className="tracking-wide text-gray-500 md:text-xl">
                        Total Exchanges
                    </h3>
                    <p className="text-lg md:text-2xl">
                        {globalStats.totalExchanges}
                    </p>
                </div>
                <div className=" rounded-lg border p-6 shadow-lg transition-all md:shadow-xl md:hover:bg-gray-200">
                    <h3 className="tracking-wide text-gray-500 md:text-xl">
                        Total Market Cap
                    </h3>
                    <p className="text-lg md:text-2xl">
                        {millify(Number(globalStats.totalMarketCap))}
                    </p>
                </div>
                <div className=" rounded-lg border p-6 shadow-lg transition-all md:shadow-xl md:hover:bg-gray-200">
                    <h3 className="tracking-wide text-gray-500 md:text-xl">
                        Total 24h Volume
                    </h3>
                    <p className="text-lg md:text-2xl">
                        {millify(Number(globalStats.total24hVolume))}
                    </p>
                </div>
                <div className=" rounded-lg border p-6 shadow-lg transition-all md:shadow-xl md:hover:bg-gray-200">
                    <h3 className="tracking-wide text-gray-500 md:text-xl">
                        Total Market
                    </h3>
                    <p className="text-lg md:text-2xl">
                        {globalStats.totalMarkets}
                    </p>
                </div>
            </div>
        </section>
    );
};
export default GlobalStats;
