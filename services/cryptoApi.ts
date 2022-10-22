import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
    TResponseCoinHistory,
    TResponseGetCoin,
    TResponseGetCoinDetail,
} from '../type';

export const baseURLClient = `/api`;
export const getCoinRankingClient = async (
    limit: number
): Promise<TResponseGetCoin> => {
    const endpoint = '/coins';
    const response = await axios(endpoint, {
        baseURL: baseURLClient,
        params: {
            limit,
        },
    });
    return response.data;
};
export const getCoinRankingServer = async (
    limit: number,
    API_KEY: string | undefined
): Promise<TResponseGetCoin> => {
    if (!API_KEY)
        throw new Error(
            'Api key is undefined, please double check your API_KEY and make sure API_KEY is valid in .env file'
        );
    const endpoint = '/coins';
    const response = await axios.get(endpoint, {
        baseURL: process.env.BASE_URL_COINRANKING,
        params: {
            referenceCurrencyUuid: 'yhjMzLPhuIDl',
            timePeriod: '24h',
            'tiers[0]': '1',
            orderBy: 'marketCap',
            orderDirection: 'desc',
            limit: limit,
            offset: '0',
        },
        headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
        },
    });

    return response.data;
};
export const getCoinDetailServer = async (
    API_KEY: string | undefined,
    coinId?: string | string[]
): Promise<TResponseGetCoinDetail | Error> => {
    if (!coinId)
        return new Error(
            'Cannot find coin ID please supply the coin ID in the request'
        );
    if (!API_KEY)
        throw new Error(
            'Api key is undefined, please double check your API_KEY and make sure API_KEY is valid in .env file'
        );
    const endpoint = `/coin/${coinId}`;
    const response: AxiosResponse<TResponseGetCoinDetail> = await axios.get(
        endpoint,
        {
            baseURL: process.env.BASE_URL_COINRANKING,
            params: {
                referenceCurrencyUuid: 'yhjMzLPhuIDl',
                timePeriod: '24h',
            },
            headers: {
                'X-RapidAPI-Key': API_KEY,
                'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
            },
        }
    );
    return response.data;
};
export const getCoinDetailClient = async (
    coinId?: string | string[]
): Promise<TResponseGetCoinDetail | Error> => {
    if (!coinId)
        return new Error(
            'Cannot find coin ID please supply the coin ID in the request'
        );
    const endpoint = `/coins/${coinId}`;
    const response: AxiosResponse<TResponseGetCoinDetail> = await axios(
        endpoint,
        {
            baseURL: baseURLClient,
            params: {
                coinId,
            },
        }
    );
    return response.data;
};
export const getCoinHistoryServer = async (
    timePeriod: string | string[] | undefined,
    API_KEY: string | undefined,
    coinId?: string | string[]
): Promise<TResponseCoinHistory> => {
    if (!coinId)
        throw new Error(
            'Cannot find coin ID please supply the coin ID in the request'
        );
    if (!API_KEY)
        throw new Error(
            'Api key is undefined, please double check your API_KEY and make sure API_KEY is valid in .env file'
        );
    const endpoint = `/coin/${coinId}/history`;
    const response: AxiosResponse<TResponseCoinHistory> = await axios.get(
        endpoint,
        {
            baseURL: process.env.BASE_URL_COINRANKING,
            params: {
                referenceCurrencyUuid: 'yhjMzLPhuIDl',
                timePeriod,
            },
            headers: {
                'X-RapidAPI-Key': API_KEY,
                'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
            },
        }
    );
    return response.data;
};

export const getCoinHistoryClient = async (
    timePeriod: string,
    coinId?: string | string[]
): Promise<TResponseCoinHistory> => {
    const endpoint = `/coins/${coinId}/history`;
    const options: AxiosRequestConfig = {
        baseURL: baseURLClient,
        params: {
            timePeriod,
        },
    };
    const response = await axios.get(endpoint, options);
    return response.data;
};
