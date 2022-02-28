import { SingleItem } from '../../../common/types/commonEndpointTypes';
import { GenericObject } from '../../../common/types/objectTypes';
import FetchBibli from '../../biblis/FetchBibli/FetchBibli';

import { levelsEntity } from '../../consts/developers/levelsConts';
import { ApiGet } from '../../types/frontEndpointTypes';

export default class LevelsEndpoint {
    public static get: ApiGet = (options) =>
        FetchBibli.apiGetJson(levelsEntity, options);

    public static getAll = () =>
        FetchBibli.apiGetJson<SingleItem[]>(`${levelsEntity}All`);

    public static delete = (values: GenericObject) =>
        FetchBibli.apiDeleteJson(levelsEntity, values);
}
