import { Button, Card, CardContent } from '@mui/material';
import { FieldItem } from '../../../../types/crudComponentsTypes';
import MyCardHeader from '../../../MyCardHeader/MyCardHeader';
import MyGrid from '../../../MyGrid/MyGrid';
import DatabaseItemFormElement from '../DatabaseItemFormElement/DatabaseItemFormElement';

interface Props {
    fieldsEntries: [string, FieldItem][];
    isNew: boolean;
    label: string;
}

const DatabaseItemFormBody: React.FunctionComponent<Props> = (props) => {
    const { fieldsEntries, isNew, label } = props;

    const title = `${isNew ? 'Novo' : 'Alterar'} ${label}`;

    return (
        <Card style={{ margin: 20 }}>
            <MyCardHeader title={title}>
                <Button color="primary" type="submit">
                    {isNew ? 'Salvar' : 'Alterar'}
                </Button>
            </MyCardHeader>
            <CardContent>
                <MyGrid container spacing={2}>
                    {fieldsEntries.map(([property, fieldItem]) => (
                        <DatabaseItemFormElement
                            key={property}
                            property={property}
                            field={fieldItem}
                        />
                    ))}
                </MyGrid>
            </CardContent>
        </Card>
    );
};

export default DatabaseItemFormBody;
