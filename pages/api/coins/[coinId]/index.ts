import type { NextApiRequest, NextApiResponse } from 'next';
import { getCoinDetailServer } from '../../../../services/cryptoApi';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const response = await getCoinDetailServer(
        process.env.X_RAPIDAPI_KEY,
        req.query.coinId
    );
    return res.status(200).json(response);
};

export default handler;
