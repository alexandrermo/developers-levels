import { ApiGetWithIdOptions } from '../../../common/types/commonEndpointTypes';
import { GenericObject } from '../../../common/types/objectTypes';
import FetchBibli from '../../biblis/FetchBibli/FetchBibli';
import { developersEntity } from '../../consts/developers/developersConts';
import { ApiGet, ApitGetWithId } from '../../types/frontEndpointTypes';

export default class DevelopersEndpoint {
    public static get: ApiGet = (options) =>
        FetchBibli.apiGetJson(developersEntity, options);

    public static getWithId: ApitGetWithId = (
        id: string | number,
        options?: ApiGetWithIdOptions
    ) => FetchBibli.apiGetWithId(developersEntity, id, options);

    public static post = (values: GenericObject) =>
        FetchBibli.apiPostJson(developersEntity, values);

    public static putWihtId = (values: GenericObject, id: string | number) =>
        FetchBibli.apiPutWithIdJson(developersEntity, id, values);

    public static delete = (values: GenericObject) =>
        FetchBibli.apiDeleteJson(developersEntity, values);
}
