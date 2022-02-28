import { Checkbox, TableCell, TableHead, TableRow } from '@mui/material';
import { ChangeEvent, useCallback } from 'react';
import { Items } from '../../../../../common/types/commonEndpointTypes';
import { Fields } from '../../../../types/crudComponentsTypes';
import { Order } from '../../crudTableTypes';
import CrudTableField from '../Field/CrudTableField';

interface Props {
    selectedItems: Items;
    items: Items;
    setSelectedItems: (items: Items) => void;
    fields: Fields;
    order: Order;
    setOrder: (order: Order) => void;
}

const CrudTableHead = (props: Props) => {
    const { selectedItems, items, setSelectedItems, fields, order, setOrder } =
        props;

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
                {Object.entries(fields).map(([property, fieldItem]) => (
                    <CrudTableField
                        key={property}
                        property={property}
                        field={fieldItem}
                        order={order}
                        setOrder={setOrder}
                    />
                ))}
            </TableRow>
        </TableHead>
    );
};

export default CrudTableHead;
