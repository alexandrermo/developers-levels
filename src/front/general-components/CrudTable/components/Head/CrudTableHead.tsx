import { Checkbox, TableCell, TableHead, TableRow } from '@mui/material';
import { ChangeEvent, useCallback } from 'react';
import { Items } from '../../../../../common/types/commonEndpointTypes';
import {
    FieldItem,
    UpdateStatesFromResponse
} from '../../../../types/crudComponentsTypes';
import { ApiGet } from '../../../../types/frontEndpointTypes';
import { Order } from '../../crudTableTypes';
import CrudTableField from '../Field/CrudTableField';

interface Props {
    selectedItems: Items;
    items: Items;
    setSelectedItems: (items: Items) => void;
    order: Order;
    setOrder: (order: Order) => void;
    fieldsEntries: [string, FieldItem][];
    endpointGet: ApiGet;
    updateStatesFromResponse: UpdateStatesFromResponse;
    setLoading: (loading: boolean) => void;
    setCurrentPage: (page: number) => void;
}

const CrudTableHead = (props: Props) => {
    const {
        selectedItems,
        items,
        setSelectedItems,
        fieldsEntries,
        order,
        setOrder,
        endpointGet,
        updateStatesFromResponse,
        setLoading,
        setCurrentPage
    } = props;

    const onChangeCheckbox = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            if (event.target.checked) {
                setSelectedItems(items);
            } else {
                setSelectedItems([]);
            }
        },
        [items, setSelectedItems]
    );

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={
                            selectedItems.length > 0 &&
                            selectedItems.length < items.length
                        }
                        checked={
                            items.length > 0 &&
                            selectedItems.length === items.length
                        }
                        onChange={onChangeCheckbox}
                    />
                </TableCell>
                {fieldsEntries.map(([property, fieldItem]) => (
                    <CrudTableField
                        key={property}
                        property={property}
                        field={fieldItem}
                        order={order}
                        setOrder={setOrder}
                        endpointGet={endpointGet}
                        setLoading={setLoading}
                        updateStatesFromResponse={updateStatesFromResponse}
                        setCurrentPage={setCurrentPage}
                    />
                ))}
            </TableRow>
        </TableHead>
    );
};

export default CrudTableHead;
