import axios from 'axios';
import { TResponseNews } from '../type';

export const getCryptoNews = async (
    count: number,
    newCategory: string
): Promise<TResponseNews> => {
    const endpoint = 'http://localhost:3000/api/news';
    const response = await axios(endpoint, {
        params: {
            q: newCategory,
            count: count,
            safeSearch: 'off',
            textFormat: 'Raw',
            freshness: 'Day',
            originalImg: true,
        },
    });
    return response.data;
};
