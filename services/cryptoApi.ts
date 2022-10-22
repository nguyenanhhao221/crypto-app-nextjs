import axios, { AxiosRequestConfig } from 'axios';
import {
    TResponseCoinHistory,
    TResponseGetCoin,
    TResponseGetCoinDetail,
} from '../type';

export const getCoinRanking = async (
    limit: number
): Promise<TResponseGetCoin> => {
    const endpoint = 'http://localhost:3000/api/coins';
    const response = await axios(endpoint, {
        params: {
            limit,
        },
    });
    return response.data;
};
export const getCoinDetail = async (
    coinId?: string | string[]
): Promise<TResponseGetCoinDetail | Error> => {
    if (!coinId)
        return new Error(
            'Cannot find coin ID please supply the coin ID in the request'
        );
    const endpoint = `http://localhost:3000/api/coins/${coinId}`;
    const response = await axios(endpoint, {
        params: {
            coinId,
        },
    });
    return response.data;
};
export const getCoinHistory = async (
    timePeriod: string,
    coinId?: string | string[]
): Promise<TResponseCoinHistory> => {
    const endpoint = `http://localhost:3000/api/coins/${coinId}/history`;
    const options: AxiosRequestConfig = {
        params: {
            timePeriod,
        },
    };
    const response = await axios.get(endpoint, options);
    return response.data;
};
