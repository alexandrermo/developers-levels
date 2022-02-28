import { NextApiRequest, NextApiResponse } from 'next';
import { itemsPerPage } from '../../../common/page/pageConsts';
import sequelize from '../../database/database';
import { ApiGetResponse } from '../../../common/types/commonEndpointTypes';
import QueryBibli from '../../biblis/Query/QueryBibli';
import LevelsModel from '../../models/Levels/LevelsModel';
import DevelopersModel from '../../models/Developers/DevelopersModel';

export default class LevelsController {
    static async get(
        req: NextApiRequest,
        res: NextApiResponse<ApiGetResponse>
    ) {
        const { order, offset, limit, pageInt, where } =
            QueryBibli.decodeQueryOptions(req);

        const [totalQuantityOfItems, items] = await sequelize.transaction(() =>
            Promise.all([
                LevelsModel.count(),
                LevelsModel.findAll({
                    order,
                    offset,
                    limit,
                    where,
                    include: {
                        model: DevelopersModel,
                        as: 'developers',
                        attributes: ['id']
                    }
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

        const level = await LevelsModel.findByPk(id as string);

        res.status(200).json(level);
    }

    public static async post(req: NextApiRequest, res: NextApiResponse) {
        const level = await LevelsModel.create(JSON.parse(req.body), {
            fields: ['description']
        });

        res.status(201).json(level);
    }

    public static async getAll(req: NextApiRequest, res: NextApiResponse) {
        const levels = await LevelsModel.findAll();

        res.status(200).json(levels);
    }

    public static async putWithId(req: NextApiRequest, res: NextApiResponse) {
        const level = await LevelsModel.update(JSON.parse(req.body), {
            fields: ['description'],
            where: { id: req.query.id }
        });

        res.status(200).json(level);
    }

    public static async delete(req: NextApiRequest, res: NextApiResponse) {
        await LevelsModel.destroy({
            where: { id: JSON.parse(req.body) }
        });
        res.status(204).json({});
    }
}
