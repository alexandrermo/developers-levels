// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import Developers from '../../back/models/Developers/DevelopersModel';

type Data = {
    name: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const devs = await Developers.findAll();
    console.log({ devs: devs[0].created_at });
    res.status(200).json({ name: 'John Doe' });
}
