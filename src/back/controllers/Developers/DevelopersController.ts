import { NextApiRequest, NextApiResponse } from 'next';
import { OrderItem } from 'sequelize/types';
import NumberUtil from '../../../common/utils/Number/NumberUtil';
import ExceptionBibli from '../../biblis/Exception/ExceptionBibli';
import { itemsPerPage } from '../../consts/page/pageConsts';
import sequelize from '../../database/database';
import ErrorWithCode from '../../errors/ErrorWithCode/ErrorWithCode';
import DevelopersModel from '../../models/Developers/DevelopersModel';

export default class DevelopersController {
    static async get(req: NextApiRequest, res: NextApiResponse) {
        try {
            const { page, order } = req.query;

            if (page && !NumberUtil.isInteger(page)) {
                throw new ErrorWithCode(400, 'Parâmetro "page" é inválido.');
            }

            if (order && typeof order !== 'string') {
                throw new ErrorWithCode(400, 'Parâmetro "order" é inválido.');
            }

            let finalOrderArray = [['id', 'ASC']];
            if (order) {
                const parsialOrderArray = order.split(';');
                finalOrderArray = parsialOrderArray.map((orderItem) =>
                    orderItem.split(',')
                );
            }

            const pageInt = page ? parseInt(page as string, 10) : 1;
            const pageIndex = pageInt - 1;
            const [totalQuantityOfItems, items] = await sequelize.transaction(
                () =>
                    Promise.all([
                        DevelopersModel.count(),
                        DevelopersModel.findAll({
                            order: finalOrderArray as OrderItem[],
                            offset: pageIndex * itemsPerPage,
                            limit: itemsPerPage,
                            include: 'level'
                        })
                    ])
            );

            const numberOfPages = Math.ceil(
                totalQuantityOfItems / itemsPerPage
            );

            const responseJson = {
                items,
                numberOfPages,
                page: pageInt
            };

            res.status(200).json(responseJson);
        } catch (error) {
            ExceptionBibli.sendResponseError(res, error);
        }
    }
}
