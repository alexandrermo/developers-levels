import { TableCell, TableSortLabel } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import {
    FieldItem,
    UpdateStatesFromResponse
} from '../../../../types/crudComponentsTypes';
import { ApiGet } from '../../../../types/frontEndpointTypes';
import MyTypography from '../../../MyTypography/MyTypography';
import { Order } from '../../crudTableTypes';

interface Props {
    field: FieldItem;
    order: Order;
    property: string;
    setOrder: (order: Order) => void;
    endpointGet: ApiGet;
    updateStatesFromResponse: UpdateStatesFromResponse;
    setLoading: (loading: boolean) => void;
    setCurrentPage: (page: number) => void;
}

const CrudTableField = (props: Props) => {
    const {
        field,
        order,
        property,
        setOrder,
        endpointGet,
        updateStatesFromResponse,
        setLoading,
        setCurrentPage
    } = props;

    const { enqueueSnackbar } = useSnackbar();

    const isActiveOrder = order.property === property;

    const onClickSort = useCallback(async () => {
        try {
            setLoading(true);
            let newDirection: 'asc' | 'desc' = 'asc';
            if (isActiveOrder) {
                newDirection = order.direction === 'asc' ? 'desc' : 'asc';
            }
            const response = await endpointGet({
                order: [[property, newDirection]],
                page: 1
            });
            setOrder({ property, direction: newDirection });
            setCurrentPage(1);
            updateStatesFromResponse(response);
        } catch (error) {
            if (error instanceof Error && error.message) {
                enqueueSnackbar(error.message, { variant: 'error' });
            }
        }
    }, [
        endpointGet,
        enqueueSnackbar,
        isActiveOrder,
        order,
        property,
        setCurrentPage,
        setLoading,
        setOrder,
        updateStatesFromResponse
    ]);

    return (
        <TableCell
            align="center"
            sortDirection={isActiveOrder ? order.direction : false}
        >
            {field.table?.notOrder ? (
                <MyTypography variant="h6">{field.label}</MyTypography>
            ) : (
                <TableSortLabel
                    active={isActiveOrder}
                    direction={isActiveOrder ? order.direction : 'asc'}
                    onClick={onClickSort}
                >
                    <MyTypography variant="h6">{field.label}</MyTypography>
                </TableSortLabel>
            )}
        </TableCell>
    );
};

export default CrudTableField;
