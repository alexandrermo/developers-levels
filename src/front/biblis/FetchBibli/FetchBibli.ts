import { RequestInit } from 'next/dist/server/web/spec-extension/request';

export default class FetchBibli {
    static fetch(req: RequestInfo, init?: RequestInit) {
        return fetch(req, init);
    }

    static async api(url: string, init?: RequestInit) {
        try {
            const res = await FetchBibli.fetch(`/api/${url}`, init);
            return res;
        } catch (error) {
            return error;
        }
    }

    static async apiJson(url: string, init?: RequestInit) {
        const res = await FetchBibli.api(url, init);
        const json = await (res as Response).json();
        return json;
    }
}
