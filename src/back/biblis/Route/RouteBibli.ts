import { NextApiRequest, NextApiResponse } from 'next';
import ErrorWithCode from '../../errors/ErrorWithCode/ErrorWithCode';
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
            const controllerMethod =
                controllerObject[method as 'get' | 'put' | 'post' | 'delete'];

            if (!controllerMethod) {
                throw new ErrorWithCode(
                    409,
                    'Método de solicitação não implementado para essa entidade'
                );
            }

            await controllerMethod(req, res);
        } else {
            throw new ErrorWithCode(
                501,
                'Método de solicitação não suportado pelo servidor'
            );
        }
    }
}
