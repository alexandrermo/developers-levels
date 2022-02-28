import {
    Table,
    TableBody,
    TableContainer,
    TablePagination
} from '@mui/material';
import { useCallback, useState } from 'react';
import { itemsPerPage } from '../../../common/page/pageConsts';
import { Items } from '../../../common/types/commonEndpointTypes';
import {
    Fields,
    UpdateStatesFromResponse
} from '../../types/crudComponentsTypes';
import { ApiGet } from '../../types/frontEndpointTypes';
import CrudTableHead from './components/Head/CrudTableHead';
import CrudTableItemRow from './components/ItemRow/CrudTableItemRow';
import { OnClickRow, Order } from './crudTableTypes';

interface Props {
    fields: Fields;
    items: Items;
    idProperty?: string;
    endpointGet: ApiGet;
    setLoading: (loading: boolean) => void;
    currentPage: number;
    totalQuantityOfItems: number | undefined;
    updateStatesFromResponse: UpdateStatesFromResponse;
}

const CrudTable: React.FunctionComponent<Props> = (props) => {
    const {
        fields,
        idProperty = 'id',
        endpointGet,
        items,
        setLoading,
        currentPage,
        totalQuantityOfItems,
        updateStatesFromResponse
    } = props;

    const tableFieldsEntries = Object.entries(fields).filter(
        ([, fieldItem]) => !fieldItem.table?.hidden
    );

    const [selectedItems, setSelectedItems] = useState<Items>([]);
    const [order, setOrder] = useState<Order>({});

    const onPageChange = useCallback(
        async (event, newPageIndex: number) => {
            setLoading(true);
            const response = await endpointGet({ page: newPageIndex + 1 });
            updateStatesFromResponse(response);
        },
        [endpointGet, setLoading, updateStatesFromResponse]
    );

    const onClickRow = useCallback<OnClickRow>(
        (event, itemRow) => {
            const { checked } = event.target;
            setSelectedItems((prevSelectedItems) => {
                const itemRowIndex = prevSelectedItems.findIndex(
                    (prevSingleSelectedItem) =>
                        prevSingleSelectedItem[idProperty] ===
                        itemRow[idProperty]
                );

                const itemIsSelected = itemRowIndex !== -1;

                if (
                    (checked && itemIsSelected) ||
                    (!checked && !itemIsSelected)
                ) {
                    return prevSelectedItems;
                }

                const newSelectedItems = [...prevSelectedItems];
                if (checked) {
                    newSelectedItems.push(itemRow);
                } else {
                    newSelectedItems.splice(itemRowIndex, 1);
                }

                return newSelectedItems;
            });
        },
        [idProperty]
    );

    return (
        <>
            <TableContainer>
                <Table size="medium">
                    <CrudTableHead
                        items={items}
                        fields={fields}
                        fieldsEntries={tableFieldsEntries}
                        selectedItems={selectedItems}
                        setSelectedItems={setSelectedItems}
                        order={order}
                        setOrder={setOrder}
                    />

                    <TableBody>
                        {items.map((singleItem) => (
                            <CrudTableItemRow
                                key={singleItem[idProperty]}
                                item={singleItem}
                                selectedItems={selectedItems}
                                idProperty={idProperty}
                                onClickRow={onClickRow}
                                fieldEntries={tableFieldsEntries}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {totalQuantityOfItems !== undefined && (
                <TablePagination
                    component="div"
                    count={totalQuantityOfItems}
                    rowsPerPage={itemsPerPage}
                    page={currentPage - 1}
                    onPageChange={onPageChange}
                    rowsPerPageOptions={[5]}
                />
            )}
        </>
    );
};

export default CrudTable;
