import { ChangeEvent } from 'react';
import { SingleItem } from '../../../common/types/commonEndpointTypes';

export interface Order {
    property?: string;
    direction?: 'asc' | 'desc';
}

export type OnClickRow = (
    event: ChangeEvent<HTMLInputElement>,
    itemRow: SingleItem
) => void;
