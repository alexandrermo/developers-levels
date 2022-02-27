import { NextApiRequest, NextApiResponse } from 'next';
import RouteBibli from '../../back/biblis/Route/RouteBibli';
import DevelopersController from '../../back/controllers/Developers/DevelopersController';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await RouteBibli.callController(req, res, {
        get: DevelopersController.get
    });
}
