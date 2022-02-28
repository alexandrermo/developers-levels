import { NextApiResponse } from 'next';
import ConsoleUtil from '../../../common/utils/Console/ConsoleUtil';
import ErrorWithCode from '../../errors/ErrorWithCode/ErrorWithCode';
import { SendResponseOptions } from './ExceptionBibliTypes';

export default class ExceptionBibli {
    static sendResponseError(
        res: NextApiResponse,
        error: unknown,
        options?: SendResponseOptions
    ) {
        if (error instanceof ErrorWithCode) {
            res.status(error.code).json({ error: error.message });
        }

        if (error?.name === 'SequelizeForeignKeyConstraintError') {
            const { toDeleteItemsLabel, associateItemLabel } =
                options?.delete || {};
            res.status(501).json({
                error: `Não é possível deletar ${toDeleteItemsLabel} pois um ou mais está associado a ${associateItemLabel}`
            });
        } else {
            ConsoleUtil.error(error);
            res.status(500).json({
                error: 'Ocorreu um erro inesperado. Por favor, contate a administração'
            });
        }
    }
}
