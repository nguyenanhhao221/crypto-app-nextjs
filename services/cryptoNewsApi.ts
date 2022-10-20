import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:8000';

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptosNews: builder.query({
      query: ({ newCategory, count }) => ({
        url: `${baseUrl}/get-crypto-news`,
        params: {
          q: newCategory,
          count: count,
          safeSearch: 'off',
          textFormat: 'Raw',
          freshness: 'Day',
          originalImg: true,
        },
      }),
    }),
  }),
});

export const { useGetCryptosNewsQuery } = cryptoNewsApi;
