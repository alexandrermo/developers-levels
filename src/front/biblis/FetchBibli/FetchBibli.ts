import { RequestInit } from 'next/dist/server/web/spec-extension/request';
import { ApiGetResponse } from '../../../common/types/commonEndpointTypes';
import EncodeUtil from '../../../common/utils/Encode/EncodeUtil';
import {
    ApiGetOptions,
    ApiGetWithIdOptions
} from '../../types/frontEndpointTypes';

export default class FetchBibli {
    private static fetch(req: RequestInfo, init?: RequestInit) {
        return fetch(req, init);
    }

    private static async api(url: string, init?: RequestInit) {
        try {
            const res = await FetchBibli.fetch(`/api/${url}`, init);
            return res;
        } catch (error) {
            return error;
        }
    }

    public static async apiGetJson(
        entity: string,
        options?: ApiGetOptions
    ): Promise<ApiGetResponse> {
        const queries = FetchBibli.mountQueries(options);
        const response = await FetchBibli.api(`${entity}${queries}`, {
            method: 'GET'
        });
        const json = await (response as Response).json();
        return json;
    }

    public static apiGetWithId(
        entity: string,
        id: string | number,
        options?: ApiGetWithIdOptions
    ) {
        const queries = FetchBibli.mountQueries(options);

        FetchBibli.api(`${entity}/${id}${queries}`);
    }

    private static mountQueries(options: ApiGetOptions = {}) {
        let queries = '';
        const { page, order, select, where } = options;
        if (page) {
            queries = FetchBibli.addQuery(queries, `page=${page}`);
        }

        if (order) {
            queries = FetchBibli.addQuery(
                queries,
                `order=${EncodeUtil.objectToUriComponent(order)}`
            );
        }

        if (select) {
            queries = FetchBibli.addQuery(
                queries,
                `order=${EncodeUtil.objectToUriComponent(select)}`
            );
        }

        if (where) {
            queries = FetchBibli.addQuery(
                queries,
                `where=${EncodeUtil.objectToUriComponent(where)}`
            );
        }

        if (queries) {
            queries = `?${queries}`;
        }

        return queries;
    }

    private static addQuery(prevQueries: string, newQuery: string) {
        let newAllTheQueries = prevQueries;
        if (newAllTheQueries) {
            newAllTheQueries += `&`;
        }

        newAllTheQueries += `${newQuery}`;

        return newAllTheQueries;
    }
}
