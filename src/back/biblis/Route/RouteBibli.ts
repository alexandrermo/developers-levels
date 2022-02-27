import { NextApiRequest, NextApiResponse } from 'next';
import FunctionUtil from '../../../common/utils/Function/FunctionUtil';
import { ControllerObject } from './routeBibliTypes';

export default class RouteBibli {
    static async callController(
        req: NextApiRequest,
        res: NextApiResponse,
        controllerObject: ControllerObject
    ) {
        let { method } = req;
        method = method?.toLowerCase();
        if (method && ['get', 'put', 'post', 'delete'].includes(method)) {
            await FunctionUtil.callIfFunctionExists(
                controllerObject[method as 'get' | 'put' | 'post' | 'delete'],
                [req, res]
            );
        }
    }
}
