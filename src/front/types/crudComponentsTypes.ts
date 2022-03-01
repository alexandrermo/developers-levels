import { ApiGetResponse } from '../../common/types/commonEndpointTypes';

export type UpdateStatesFromResponse = (response: ApiGetResponse) => void;

type FieldItemType = 'select' | 'default' | 'date';

interface OptionItem {
    value: string;
    label: string;
}

export type FieldItemOptions = OptionItem[];

export type FilterItemGetOptionsApi = () => Promise<FieldItemOptions>;

export interface FieldItem {
    label: string;
    type?: FieldItemType;
    options?: FieldItemOptions;
    getOptionsApi?: FilterItemGetOptionsApi;
    table?: {
        hidden?: boolean;
        notOrder?: boolean;
    };
    form?: {
        required?: boolean;
        hidden?: boolean;
        disabled?: boolean;
    };
}

export interface Fields {
    [property: string]: FieldItem;
}
