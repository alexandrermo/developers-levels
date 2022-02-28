import FetchBibli from '../../biblis/FetchBibli/FetchBibli';
import { developersEntity } from '../../consts/developers/developersConts';
import {
    ApiGetOptions,
    ApiGetWithIdOptions
} from '../../types/frontEndpointTypes';

export default class DevelopersEndpoint {
    public static get(options?: ApiGetOptions) {
        return FetchBibli.apiGetJson(developersEntity, options);
    }

    public static getWithId(id: string | number, options: ApiGetWithIdOptions) {
        return FetchBibli.apiGetWithId(developersEntity, id, options);
    }
}
