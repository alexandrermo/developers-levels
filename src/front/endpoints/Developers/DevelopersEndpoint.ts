import { GenericObject } from '../../../common/types/objectTypes';
import FetchBibli from '../../biblis/FetchBibli/FetchBibli';
import { developersEntity } from '../../consts/developers/developersConts';
import { ApiGet, ApitGetWithId } from '../../types/frontEndpointTypes';

export default class DevelopersEndpoint {
    public static get: ApiGet = (options) =>
        FetchBibli.apiGetJson(developersEntity, options);

    public static getWithId: ApitGetWithId = (id, options) =>
        FetchBibli.apiGetWithId(developersEntity, id, options);

    public static post = (values: GenericObject) =>
        FetchBibli.apiPostJson(developersEntity, values);
}
