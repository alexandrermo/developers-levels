import { GenericObject } from './objectTypes';

export type SingleItem = GenericObject;

export type Items = SingleItem[];

export interface ApiGetResponse {
    items: Items;

    page: number;

    numberOfPages: number;

    totalQuantityOfItems: number;
}

export interface FrontSequelizeOpObject {
    ['op.eq']?: number | string | Date;
    ['op.like']?: number | string | Date;
}

export interface ApiGetWhere {
    [property: string]: FrontSequelizeOpObject | number | string | Date;
}

export interface ApiGetWithIdOptions {
    select?: string[];
}

export interface ApiGetOptions extends ApiGetWithIdOptions {
    page?: number;
    where?: ApiGetWhere;
    order?: [string, 'asc' | 'desc'][];
}
