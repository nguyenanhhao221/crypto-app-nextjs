import type { NextApiRequest, NextApiResponse } from 'next';
import { getCoinHistoryServer } from '../../../../services/cryptoApi';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { timePeriod, coinId } = req.query;
    const response = await getCoinHistoryServer(
        timePeriod,
        process.env.X_RAPIDAPI_KEY,
        coinId
    );
    return res.status(200).json(response);
};

export default handler;
