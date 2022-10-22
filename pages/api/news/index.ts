import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

const BASE_URL = 'https://bing-news-search1.p.rapidapi.com/news';
const axiosBase = axios.create({
    baseURL: BASE_URL,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const API_KEY = process.env.X_RAPIDAPI_KEY;
    if (!API_KEY) throw new Error('Api key is undefined');

    const endpoint = '/search';
    const response = await axiosBase.get(endpoint, {
        params: req.query,
        headers: {
            'X-BingApis-SDK': 'true',
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
        },
    });

    return res.status(200).send(response.data);
};

export default handler;
