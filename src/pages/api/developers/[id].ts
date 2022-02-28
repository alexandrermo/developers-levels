import { NextApiRequest, NextApiResponse } from 'next';
import ExceptionBibli from '../../../back/biblis/Exception/ExceptionBibli';
import RouteBibli from '../../../back/biblis/Route/RouteBibli';
import DevelopersController from '../../../back/controllers/Developers/DevelopersController';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        await RouteBibli.callController(req, res, {
            get: DevelopersController.getWithId,
            put: DevelopersController.putWithId
        });
    } catch (error) {
        ExceptionBibli.sendResponseError(res, error);
    }
}
