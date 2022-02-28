import { ApiGetResponse } from '../../common/types/commonEndpointTypes';

interface ApiGetWhere {
    equal: string | number;
    notEqual: string | number;
    like: string;
}

export interface ApiGetWithIdOptions {
    order?: [string, 'asc' | 'desc'][];
    select?: string[];
    where?: ApiGetWhere;
}

export interface ApiGetOptions extends ApiGetWithIdOptions {
    page?: number;
}

export type ApiGet = (options?: ApiGetOptions) => Promise<ApiGetResponse>;
