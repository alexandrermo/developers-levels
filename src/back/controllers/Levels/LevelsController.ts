import { NextApiRequest, NextApiResponse } from 'next';
import { itemsPerPage } from '../../../common/page/pageConsts';
import sequelize from '../../database/database';
import DevelopersModel from '../../models/Developers/DevelopersModel';
import { ApiGetResponse } from '../../../common/types/commonEndpointTypes';
import QueryBibli from '../../biblis/Query/QueryBibli';
import LevelsModel from '../../models/Levels/LevelsModel';

export default class LevelsController {
    static async get(
        req: NextApiRequest,
        res: NextApiResponse<ApiGetResponse>
    ) {
        const { order, offset, limit, pageInt, where } =
            QueryBibli.decodeQueryOptions(req);

        const [totalQuantityOfItems, items] = await sequelize.transaction(() =>
            Promise.all([
                DevelopersModel.count(),
                DevelopersModel.findAll({
                    order,
                    offset,
                    limit,
                    where,
                    include: 'level'
                })
            ])
        );

        const numberOfPages = Math.ceil(totalQuantityOfItems / itemsPerPage);

        const responseJson = {
            items,
            numberOfPages,
            page: pageInt,
            totalQuantityOfItems
        };

        res.status(200).json(responseJson);
    }

    static async getWithId(req: NextApiRequest, res: NextApiResponse) {
        const id = req.query.id as string;

        const developer = DevelopersModel.findByPk(id as string, {
            include: 'level'
        });

        res.status(200).json(developer);
    }

    public static async post(req: NextApiRequest, res: NextApiResponse) {
        const developer = await DevelopersModel.create(req.body, {
            fields: ['birthday', 'name', 'hobby', 'sex']
        });

        res.status(200).json(developer);
    }

    public static async getAll(req: NextApiRequest, res: NextApiResponse) {
        const levels = await LevelsModel.findAll();

        res.status(200).json(levels);
    }
}
