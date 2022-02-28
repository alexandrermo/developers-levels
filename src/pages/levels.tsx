import { useState, useCallback } from 'react';
import { GenericObject } from '../common/types/objectTypes';
import CrudTable from '../front/general-components/CrudTable/CrudTable';
import { ApiGetResponse, Items } from '../common/types/commonEndpointTypes';
import CrudScreen from '../front/general-components/CrudScreen/CrudScreen';
import LevelsEndpoint from '../front/endpoints/Levels/LevelsEndpoint';
import {
    levelsEntity,
    levelsFields
} from '../front/consts/developers/levelsConts';

const Levels = () => {
    const [levels, setLevels] = useState<GenericObject[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalQuantityOfItems, setTotalQuantityOfItems] = useState<number>();
    const [selectedItems, setSelectedItems] = useState<Items>([]);

    const updateStatesFromResponse = useCallback(
        (response: ApiGetResponse) => {
            setLevels(response.items);
            setLoading(false);
            setTotalQuantityOfItems(response.totalQuantityOfItems);
            setCurrentPage(response.page);
        },
        [setLevels, setLoading, setTotalQuantityOfItems, setCurrentPage]
    );

    return (
        <CrudScreen
            endpointGet={LevelsEndpoint.get}
            currentPage={currentPage}
            loading={loading}
            updateStatesFromResponse={updateStatesFromResponse}
            title="Níveis"
            entity={levelsEntity}
            selectedItems={selectedItems}
            endpointDelete={LevelsEndpoint.delete}
            setLoading={setLoading}
        >
            <CrudTable
                currentPage={currentPage}
                endpointGet={LevelsEndpoint.get}
                fields={levelsFields}
                items={levels}
                setLoading={setLoading}
                totalQuantityOfItems={totalQuantityOfItems}
                updateStatesFromResponse={updateStatesFromResponse}
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
            />
        </CrudScreen>
    );
};

export default Levels;
