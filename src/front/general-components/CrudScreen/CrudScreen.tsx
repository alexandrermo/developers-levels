import { Button, Card, CardContent, Modal } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { SingleItem } from '../../../common/types/commonEndpointTypes';
import { GenericObject } from '../../../common/types/objectTypes';
import useIsFirstRender from '../../hooks/useIsFirstRender';
import { UpdateStatesFromResponse } from '../../types/crudComponentsTypes';
import { ApiGet } from '../../types/frontEndpointTypes';
import LoadingOnMiddle from '../LoadingOnMiddle/LoadingOnMiddle';
import MyCardHeader from '../MyCardHeader/MyCardHeader';
import MyTypography from '../MyTypography/MyTypography';
import styles from './CrudScreen.module.css';
import MyBox from '../MyBox/MyBox';

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
    const { enqueueSnackbar } = useSnackbar();

    const isFirstRender = useIsFirstRender();

    const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);

    const closeConfirmation = useCallback(() => {
        setIsOpenConfirmation(false);
    }, []);

    const deleteSelected = useCallback(async () => {
        try {
            setIsOpenConfirmation(true);
            setLoading(true);
            await endpointDelete(selectedItems.map((item) => item.id));
            enqueueSnackbar('Itens deletados com sucesso', {
                variant: 'success'
            });
            router.reload();
        } catch (error) {
            if (error?.message) {
                enqueueSnackbar(error.message, { variant: 'error' });
            }
            closeConfirmation();
            setLoading(false);
        }
    }, [
        endpointDelete,
        selectedItems,
        setLoading,
        router,
        enqueueSnackbar,
        closeConfirmation
    ]);

    const onPressDelete = useCallback(async () => {
        setIsOpenConfirmation(true);
    }, []);

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
        <>
            <Modal open={isOpenConfirmation} onClose={closeConfirmation}>
                <MyBox
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4
                    }}
                >
                    <MyTypography>
                        Deseja realmente excluir os {title} selecionados?
                    </MyTypography>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button color="error" onClick={closeConfirmation}>
                            CANCELAR
                        </Button>
                        <Button color="primary" onClick={deleteSelected}>
                            SIM
                        </Button>
                    </div>
                </MyBox>
            </Modal>
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
        </>
    );
};

export default CrudScreen;
