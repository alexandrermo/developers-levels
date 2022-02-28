import { TableCell, TableSortLabel } from '@mui/material';
import { FieldItem } from '../../../../types/crudComponentsTypes';
import MyTypography from '../../../MyTypography/MyTypography';
import { Order } from '../../crudTableTypes';

interface Props {
    field: FieldItem;
    order: Order;
    property: string;
    setOrder: (order: Order) => void;
}

const CrudTableField = (props: Props) => {
    const { field, order, property, setOrder } = props;

    const isActiveOrder = order.property === property;

    return (
        <TableCell
            align="center"
            sortDirection={isActiveOrder ? order.direction : false}
        >
            <TableSortLabel
                active={isActiveOrder}
                direction={isActiveOrder ? order.direction : 'asc'}
            >
                <MyTypography variant="h6">{field.label}</MyTypography>
            </TableSortLabel>
        </TableCell>
    );
};

export default CrudTableField;
