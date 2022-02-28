import { GenericObject } from './objectTypes';

export type SingleItem = GenericObject;

export type Items = SingleItem[];

export interface ApiGetResponse {
    items: Items;

    page: number;

    numberOfPages: number;

    totalQuantityOfItems: number;
}
