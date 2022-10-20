//! This API use CoinGecko API via rapidapi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TExchange } from '../type';

const exchangesHeaders = {
  'X-RapidAPI-Key': '673572aedemsh6d3ab43d052735ap17d24bjsne5f46619407b',
  'X-RapidAPI-Host': 'coingecko.p.rapidapi.com',
};

const baseUrl = 'http://localhost:8000';

export const cryptoExchangeApi = createApi({
  reducerPath: 'cryptoExchangeApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    //Here we specific the type return by the API, and undefine is for the type of the query argument
    getExchanges: builder.query<Array<TExchange>, undefined>({
      query: () => ({
        url: `${baseUrl}/exchanges`,
        headers: exchangesHeaders,
      }),
    }),
  }),
});

export const { useGetExchangesQuery } = cryptoExchangeApi;
