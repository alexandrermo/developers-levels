import {
    ApiGetOptions,
    ApiGetResponse,
    ApiGetWithIdOptions,
    SingleItem
} from '../../common/types/commonEndpointTypes';

export type ApiGet = (options?: ApiGetOptions) => Promise<ApiGetResponse>;

export type ApitGetWithId = (
    id: string | number,
    options?: ApiGetWithIdOptions
) => Promise<SingleItem>;
