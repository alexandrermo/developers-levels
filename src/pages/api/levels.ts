import { NextApiRequest, NextApiResponse } from 'next';
import ExceptionBibli from '../../back/biblis/Exception/ExceptionBibli';
import RouteBibli from '../../back/biblis/Route/RouteBibli';
import LevelsController from '../../back/controllers/Levels/LevelsController';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        await RouteBibli.callController(req, res, {
            get: LevelsController.get,
            post: LevelsController.post,
            delete: LevelsController.delete
        });
    } catch (error) {
        ExceptionBibli.sendResponseError(res, error, {
            delete: {
                associateItemLabel: 'desenvolvedores',
                toDeleteItemsLabel: 'os níveis'
            }
        });
    }
}
