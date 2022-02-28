import { useState, useCallback } from 'react';
import { GenericObject } from '../common/types/objectTypes';
import DevelopersEndpoint from '../front/endpoints/Developers/DevelopersEndpoint';
import CrudTable from '../front/general-components/CrudTable/CrudTable';
import { ApiGetResponse, Items } from '../common/types/commonEndpointTypes';
import CrudScreen from '../front/general-components/CrudScreen/CrudScreen';
import { developersEntity } from '../front/consts/developers/developersConts';

const Developers = () => {
    const [developers, setDevelopers] = useState<GenericObject[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalQuantityOfItems, setTotalQuantityOfItems] = useState<number>();
    const [selectedItems, setSelectedItems] = useState<Items>([]);

    const updateStatesFromResponse = useCallback(
        (response: ApiGetResponse) => {
            setDevelopers(response.items);
            setLoading(false);
            setTotalQuantityOfItems(response.totalQuantityOfItems);
            setCurrentPage(response.page);
        },
        [setDevelopers, setLoading, setTotalQuantityOfItems, setCurrentPage]
    );

    return (
        <CrudScreen
            endpointGet={DevelopersEndpoint.get}
            currentPage={currentPage}
            loading={loading}
            updateStatesFromResponse={updateStatesFromResponse}
            title="Desenvolvedores"
            entity={developersEntity}
            selectedItems={selectedItems}
            endpointDelete={DevelopersEndpoint.delete}
            setLoading={setLoading}
        >
            <CrudTable
                currentPage={currentPage}
                endpointGet={DevelopersEndpoint.get}
                fields={{
                    id: { label: 'ID' },
                    name: { label: 'Nome' },
                    sex: { label: 'Sexo' },
                    birthday: { label: 'Dt. Nascimento' },
                    hobby: { label: 'Hobby' },
                    'level.description': { label: 'Nível' }
                }}
                items={developers}
                setLoading={setLoading}
                totalQuantityOfItems={totalQuantityOfItems}
                updateStatesFromResponse={updateStatesFromResponse}
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
            />
        </CrudScreen>
    );
};

export default Developers;
