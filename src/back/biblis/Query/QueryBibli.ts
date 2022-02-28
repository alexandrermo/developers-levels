import { NextApiRequest } from 'next';
import { Op, OrderItem } from 'sequelize';
import { itemsPerPage } from '../../../common/page/pageConsts';
import {
    ApiGetWhere,
    FrontSequelizeOpObject
} from '../../../common/types/commonEndpointTypes';
import DecodeUtil from '../../../common/utils/Decode/DecodeUtil';
import ErrorWithCode from '../../errors/ErrorWithCode/ErrorWithCode';

export default class QueryBibli {
    public static decodeQueryOptions(req: NextApiRequest) {
        const { page, order, where } = req.query;

        QueryBibli.checkIfExistsAndIsNotString(order, 'order');
        QueryBibli.checkIfExistsAndIsNotString(page, 'page');
        QueryBibli.checkIfExistsAndIsNotString(where, 'where');

        const pageInt = page ? parseInt(page as string, 10) : 1;

        if (pageInt < -1) {
            throw new ErrorWithCode(
                400,
                QueryBibli.buildInvalidParameterMessage('page')
            );
        }

        const pageIndex = pageInt - 1;

        let orderArray = [['id', 'ASC']];
        if (order) {
            orderArray = QueryBibli.tryToDecodeUriComponentToObject(
                order as string,
                'order'
            );
        }

        let sequelizeWhereObject;
        if (where) {
            const frontWhereObject = QueryBibli.tryToDecodeUriComponentToObject(
                where as string,
                'where'
            );

            sequelizeWhereObject =
                QueryBibli.transformFrontWhereObjectToSequelize(
                    frontWhereObject
                );
        }

        return {
            offset: pageIndex * itemsPerPage,
            order: orderArray as OrderItem[],
            where: sequelizeWhereObject,
            limit: itemsPerPage,
            pageInt
        };
    }

    private static transformFrontWhereObjectToSequelize(
        frontObject: ApiGetWhere | FrontSequelizeOpObject
    ) {
        const sequelizeObject = Object.entries(frontObject).reduce(
            (prevSequelizeObject, [frontProperty, frontValue]) => {
                let sequelizeProperty = frontProperty;
                const nextSequelizeObject = prevSequelizeObject;
                if (frontProperty.startsWith('op.')) {
                    sequelizeProperty = Op[frontProperty.split('.')[1]];
                }

                nextSequelizeObject[sequelizeProperty] =
                    typeof frontValue !== 'object'
                        ? frontValue
                        : QueryBibli.transformFrontWhereObjectToSequelize(
                              frontValue
                          );

                return nextSequelizeObject;
            },
            {}
        );

        return sequelizeObject;
    }

    private static tryToDecodeUriComponentToObject(
        queryValue: string,
        parameter: string
    ) {
        try {
            return DecodeUtil.uriComponentToObject(queryValue);
        } catch {
            throw new ErrorWithCode(
                400,
                QueryBibli.buildInvalidParameterMessage(parameter)
            );
        }
    }

    private static checkIfExistsAndIsNotString(
        queryValue: string | string[] | undefined,
        parameter: string
    ) {
        if (queryValue && typeof queryValue !== 'string') {
            throw new ErrorWithCode(
                400,
                QueryBibli.buildInvalidParameterMessage(parameter)
            );
        }
    }

    private static buildInvalidParameterMessage(parameter: string) {
        return `Parâmetro "${parameter}" é inválido.`;
    }
}
