import { RequestInit } from 'next/dist/server/web/spec-extension/request';
import {
    ApiGetOptions,
    ApiGetWithIdOptions
} from '../../../common/types/commonEndpointTypes';
import { GenericObject } from '../../../common/types/objectTypes';
import EncodeUtil from '../../../common/utils/Encode/EncodeUtil';

export default class FetchBibli {
    private static fetch(req: RequestInfo, init?: RequestInit) {
        return fetch(req, init);
    }

    private static async api(url: string, init?: RequestInit) {
        const res = await FetchBibli.fetch(`/api/${url}`, init);
        return res;
    }

    public static async apiPostJson(entity: string, body: GenericObject) {
        const response = await FetchBibli.api(entity, {
            body: JSON.stringify(body),
            method: 'POST'
        });
        const json = await response.json();

        return json;
    }

    public static async apiDeleteJson(entity: string, body: GenericObject) {
        const response = await FetchBibli.api(entity, {
            body: JSON.stringify(body),
            method: 'DELETE'
        });
        const json = await response.json();

        return json;
    }

    public static async apiPutWithIdJson(
        entity: string,
        id: string | number,
        body: GenericObject
    ) {
        const response = await FetchBibli.api(`${entity}/${id}`, {
            body: JSON.stringify(body),
            method: 'PUT'
        });
        const json = await response.json();

        return json;
    }

    public static async apiGetJson<T extends GenericObject = GenericObject>(
        entity: string,
        options?: ApiGetOptions
    ): Promise<T> {
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

        return FetchBibli.apiGetJson(`${entity}/${id}${queries}`);
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
