import type { NextApiRequest, NextApiResponse } from 'next';
import { getCoinRankingServer } from '../../../services/cryptoApi';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const response = await getCoinRankingServer(
        Number(req.query.limit),
        process.env.X_RAPIDAPI_KEY
    );

    return res.status(200).json(response);
};

export default handler;
