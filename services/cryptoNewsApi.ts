import axios, { AxiosResponse } from 'axios';
import { TResponseNews } from '../type';
import { baseURLClient } from './cryptoApi';

export const getCryptoNewsServer = async (
    count: number,
    newCategory: string | string[],
    API_KEY: string | undefined
): Promise<TResponseNews> => {
    if (!API_KEY)
        throw new Error(
            'Api key is undefined, please double check your API_KEY and make sure API_KEY is valid in .env file'
        );
    const endpoint = '/news/search';
    const response: AxiosResponse<TResponseNews> = await axios(endpoint, {
        baseURL: process.env.BASE_URL_BING_NEWS,
        params: {
            q: newCategory,
            count: count,
            safeSearch: 'off',
            textFormat: 'Raw',
            freshness: 'Day',
            originalImg: true,
        },
        headers: {
            'X-BingApis-SDK': 'true',
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
        },
    });
    return response.data;
};

export const getCryptoNewsClient = async (
    count: number,
    newCategory: string
): Promise<TResponseNews> => {
    const endpoint = '/news';
    const response = await axios(endpoint, {
        baseURL: baseURLClient,
        params: {
            q: newCategory,
            count: count,
        },
    });
    return response.data;
};
