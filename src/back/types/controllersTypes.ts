import { NextApiRequest, NextApiResponse } from 'next';

export interface MyController {
    get: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
}
