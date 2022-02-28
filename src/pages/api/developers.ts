import { NextApiRequest, NextApiResponse } from 'next';
import ExceptionBibli from '../../back/biblis/Exception/ExceptionBibli';
import RouteBibli from '../../back/biblis/Route/RouteBibli';
import DevelopersController from '../../back/controllers/Developers/DevelopersController';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        await RouteBibli.callController(req, res, {
            get: DevelopersController.get,
            post: DevelopersController.post,
            delete: DevelopersController.delete
        });
    } catch (error) {
        ExceptionBibli.sendResponseError(res, error);
    }
}
