import type { NextApiRequest, NextApiResponse } from 'next';
import { getCryptoNewsServer } from '../../../services/cryptoNewsApi';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { count, q = 'Cryptocurrencies' } = req.query;
    const response = await getCryptoNewsServer(
        Number(count),
        q,
        process.env.X_RAPIDAPI_KEY
    );

    return res.status(200).json(response);
};

export default handler;
