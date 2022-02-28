import { ApiGetResponse } from '../../common/types/commonEndpointTypes';

export type UpdateStatesFromResponse = (response: ApiGetResponse) => void;

type FieldItemType = 'select' | 'default' | 'data';

interface OptionItem {
    value: string;
    label: string;
}

type FieldItemOptions = OptionItem[];

export type FilterItemGetOptionsApi = () => Promise<FieldItemOptions>;

export interface FieldItem {
    label: string;
    type?: FieldItemType;
    options?: FieldItemOptions;
    getOptionsApi?: FilterItemGetOptionsApi;
}

export interface Fields {
    [property: string]: FieldItem;
}
