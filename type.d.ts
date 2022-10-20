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
  data: { stats: TGloBalStats };
};
export interface TGloBalStats {
  total: number;
  totalCoins: number;
  totalMarkets: number;
  totalExchanges: number;
  totalMarketCap: number | string;
  total24hVolume: number | string;
}

export interface TBrands {
  logo: any;
  name: string;
  url: string;
}
