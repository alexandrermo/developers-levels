import { NextApiResponse } from 'next';
import ConsoleUtil from '../../../common/utils/Console/ConsoleUtil';
import ErrorWithCode from '../../errors/ErrorWithCode/ErrorWithCode';

export default class ExceptionBibli {
    static sendResponseError(res: NextApiResponse, error: unknown) {
        if (error instanceof ErrorWithCode) {
            res.status(error.code).json({ error: error.message });
        }

        ConsoleUtil.error(error);
        res.status(500).json({
            error: 'Ocorreu um erro inesperado. Por favor, contate a administração'
        });
    }
}
