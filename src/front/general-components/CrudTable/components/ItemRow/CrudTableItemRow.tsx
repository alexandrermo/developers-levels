import { Checkbox, TableCell, TableRow } from '@mui/material';
import { ChangeEvent, useCallback } from 'react';
import {
    Items,
    SingleItem
} from '../../../../../common/types/commonEndpointTypes';
import ObjectUtil from '../../../../../common/utils/Object/ObjectUtil';
import { FieldItem, Fields } from '../../../../types/crudComponentsTypes';
import MyTypography from '../../../MyTypography/MyTypography';
import { OnClickRow } from '../../crudTableTypes';

interface Props {
    item: SingleItem;
    selectedItems: Items;
    idProperty: string;
    onClickRow: OnClickRow;
    fieldEntries: [string, FieldItem][];
}

const CrudTableItemRow = (props: Props) => {
    const { item, selectedItems, idProperty, fieldEntries, onClickRow } = props;

    const isItemSelected = selectedItems.some(
        (singleSelectedItem) =>
            singleSelectedItem[idProperty] === item[idProperty]
    );

    const onChangeCheckbox = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            onClickRow(event, item);
        },
        [onClickRow, item]
    );

    return (
        <TableRow>
            <TableCell padding="checkbox">
                <Checkbox
                    color="primary"
                    checked={isItemSelected}
                    onChange={onChangeCheckbox}
                />
            </TableCell>
            {fieldEntries.map(([property]) => (
                <TableCell key={property} align="center">
                    <MyTypography variant="body2">
                        {ObjectUtil.getNestedProperty(property, item)}
                    </MyTypography>
                </TableCell>
            ))}
        </TableRow>
    );
};

export default CrudTableItemRow;
