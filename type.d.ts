//* type of exchange object return by API, make sure to update if APi changes
export type TExchange = {
    country: string;
    description: string;
    has_trading_incentive: boolean;
    id: string;
    image: string;
    name: string;
    trade_volume_24h_btc: number | string;
    trade_volume_24h_btc_normalized: number | string;
    trust_score: number;
    trust_score_rank: number;
    url: string;
    year_established: number;
};
export type TResponseGetCoin = {
    status: string;
    data: { stats: TGloBalStats; coins: TCrypto[] };
};
export type TResponseGetCoinDetail = {
    status: string;
    data: {
        coin: TCrypto & {
            description: string;
            websiteUrl: string;
            color: string;
            links: { name: string; type: string; url: string }[];
            supply: {
                confirmed: boolean;
                supplyAt: number;
                max: string;
                total: string;
                circulating: string;
            };
            numberOfMarkets: number;
            numberOfExchanges: number;
            marketCap: string;
            fullyDilutedMarketCap: string;
            price: string;
            priceAt: number;
            change: string;
            rank: number;
            tag: string[];
        };
    };
};
export interface TCrypto {
    name: string;
    uuid: string;
    symbol: string;
    color: string;
    iconUrl: string;
    marketCap: string;
    price: string;
    listedAt: number;
    tier: number;
    change: string;
    rank: number;
    sparkline: string[];
    lowVolume: boolean;
    coinrankingUrl: string;
    btrPrice: string;
    '24hVolume': string;
    allTimeHigh: {
        price: string;
        timestamp: number;
    };
}
export interface TGloBalStats {
    total: number;
    totalCoins: number;
    totalMarkets: number;
    totalExchanges: number;
    totalMarketCap: number | string;
    total24hVolume: number | string;
}

export interface TBrands {
    logo: string;
    name: string;
    url: string;
}
export type TStats = {
    title: string;
    value: string | JSX.Element | number;
    icon: JSX.Element;
};
