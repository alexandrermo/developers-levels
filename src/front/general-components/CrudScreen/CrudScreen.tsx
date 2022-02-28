import { Button, Card, CardContent } from '@mui/material';
import Link from 'next/link';
import { useEffect } from 'react';
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
}

const CrudScreen: React.FunctionComponent<Props> = (props) => {
    const {
        endpointGet,
        currentPage,
        loading,
        children,
        updateStatesFromResponse,
        title,
        entity
    } = props;

    const isFirstRender = useIsFirstRender();

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
                <Link href={`${entity}/new`}>
                    <a>
                        <Button color="primary">Novo</Button>
                    </a>
                </Link>
            </MyCardHeader>
            <CardContent>{children}</CardContent>
        </Card>
    );
};

export default CrudScreen;
