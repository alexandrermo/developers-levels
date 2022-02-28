import { Button, Card, CardContent } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { SingleItem } from '../../../common/types/commonEndpointTypes';
import { GenericObject } from '../../../common/types/objectTypes';
import useIsFirstRender from '../../hooks/useIsFirstRender';
import { UpdateStatesFromResponse } from '../../types/crudComponentsTypes';
import { ApiGet } from '../../types/frontEndpointTypes';
import LoadingOnMiddle from '../LoadingOnMiddle/LoadingOnMiddle';
import MyCardHeader from '../MyCardHeader/MyCardHeader';
import styles from './CrudScreen.module.css';

interface Props {
    endpointGet: ApiGet;
    currentPage: number;
    loading: boolean;
    updateStatesFromResponse: UpdateStatesFromResponse;
    title: string;
    entity: string;
    selectedItems: SingleItem[];
    endpointDelete: (body: GenericObject) => Promise<void>;
    setLoading: (loading: boolean) => void;
}

const CrudScreen: React.FunctionComponent<Props> = (props) => {
    const {
        endpointGet,
        currentPage,
        loading,
        children,
        updateStatesFromResponse,
        title,
        entity,
        selectedItems,
        setLoading,
        endpointDelete
    } = props;

    const router = useRouter();

    const isFirstRender = useIsFirstRender();

    const onPressDelete = useCallback(async () => {
        try {
            setLoading(true);
            await endpointDelete(selectedItems.map((item) => item.id));
            router.reload();
        } catch {
            setLoading(false);
        }
    }, [endpointDelete, selectedItems, setLoading, router, entity]);

    useEffect(() => {
        if (isFirstRender) {
            (async () => {
                const response = await endpointGet({ page: currentPage });
                updateStatesFromResponse(response);
            })();
        }
    }, [endpointGet, isFirstRender, currentPage, updateStatesFromResponse]);

    if (loading) {
        return <LoadingOnMiddle />;
    }

    return (
        <Card className={styles.card}>
            <MyCardHeader title={title}>
                <div>
                    <Link href={`${entity}/new`}>
                        <a>
                            <Button color="primary">Novo</Button>
                        </a>
                    </Link>
                    <Link href={`${entity}/${selectedItems[0]?.id}`}>
                        <a>
                            <Button
                                color="secondary"
                                disabled={selectedItems.length !== 1}
                            >
                                Alterar
                            </Button>
                        </a>
                    </Link>
                    <Button
                        color="error"
                        disabled={!selectedItems.length}
                        onClick={onPressDelete}
                    >
                        Excluir
                    </Button>
                </div>
            </MyCardHeader>
            <CardContent>{children}</CardContent>
        </Card>
    );
};

export default CrudScreen;
