import {
    ApiGetWithIdOptions,
    SingleItem
} from '../../../common/types/commonEndpointTypes';
import { GenericObject } from '../../../common/types/objectTypes';
import FetchBibli from '../../biblis/FetchBibli/FetchBibli';

import { levelsEntity } from '../../consts/developers/levelsConts';
import { ApiGet, ApitGetWithId } from '../../types/frontEndpointTypes';

export default class LevelsEndpoint {
    public static get: ApiGet = (options) =>
        FetchBibli.apiGetJson(levelsEntity, options);

    public static getAll = () =>
        FetchBibli.apiGetJson<SingleItem[]>(`${levelsEntity}All`);

    public static delete = (values: GenericObject) =>
        FetchBibli.apiDeleteJson(levelsEntity, values);

    public static post = (values: GenericObject) =>
        FetchBibli.apiPostJson(levelsEntity, values);

    public static getWithId: ApitGetWithId = (
        id: string | number,
        options?: ApiGetWithIdOptions
    ) => FetchBibli.apiGetWithId(levelsEntity, id, options);

    public static putWihtId = (values: GenericObject, id: string | number) =>
        FetchBibli.apiPutWithIdJson(levelsEntity, id, values);
}
