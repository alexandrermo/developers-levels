import { useRouter } from 'next/router';
import { useState } from 'react';
import { Formik, Form } from 'formik';
import { SingleItem } from '../../../common/types/commonEndpointTypes';
import useEffectOnFirstRender from '../../hooks/useEffectOnFirstRender';
import LoadingOnMiddle from '../LoadingOnMiddle/LoadingOnMiddle';
import {
    FieldItem,
    Fields,
    FilterItemGetOptionsApi
} from '../../types/crudComponentsTypes';
import DataBaseItemFormBibli from './DatabaseItemFormBibli';
import ObjectUtil from '../../../common/utils/Object/ObjectUtil';

interface Props {
    fields: Fields;
}

const DatabaseItemForm: React.FunctionComponent<Props> = (props) => {
    const { fields, endpointGetWithId } = props;

    const fieldsEntries = Object.entries(fields);

    const router = useRouter();
    const { id } = router.query;
    const isNew = id === 'new';
    const hasFieldWithApi = fieldsEntries.some(
        DataBaseItemFormBibli.checkFieldEntrieIsWithApi
    );

    const [loading, setLoading] = useState(!isNew || hasFieldWithApi);
    const [databaseItem, setDatabaseItem] = useState<SingleItem>();
    const [fieldsWithOptions, setFieldsWithOptions] = useState(fields);

    useEffectOnFirstRender(async () => {
        try {
            const promises = [];
            if (!isNew) {
                promises.push(endpointGetWithId(id));
            }

            let fieldsWithApiEntries: [string, FieldItem][] = [];
            if (hasFieldWithApi) {
                fieldsWithApiEntries = fieldsEntries.filter(
                    DataBaseItemFormBibli.checkFieldEntrieIsWithApi
                );

                const fieldsFunctionsApi = fieldsWithApiEntries.map(
                    ([, fieldItem]) => {
                        const { getOptionsApi } = fieldItem;
                        return (getOptionsApi as FilterItemGetOptionsApi)();
                    }
                );

                promises.push(...fieldsFunctionsApi);
            }
            const responses = await Promise.all(promises);
            const fieldsOptionsReponses = !isNew
                ? responses.splice(1)
                : responses;

            if (!isNew) {
                setDatabaseItem(responses[0]);
            }

            if (hasFieldWithApi) {
                const newFieldsWithOptions = fieldsWithApiEntries.reduce(
                    (
                        previousFieldsWithOptions,
                        fieldWithApiEntrieItem,
                        fieldWithApiEntrieItemIndex
                    ) => {
                        const [property] = fieldWithApiEntrieItem;
                        const nextFieldsWithOptions = previousFieldsWithOptions;
                        newFieldsWithOptions[property].options =
                            fieldsOptionsReponses[fieldWithApiEntrieItemIndex];

                        return nextFieldsWithOptions;
                    },
                    ObjectUtil.deepCopy(fieldsWithOptions)
                );

                setFieldsWithOptions(newFieldsWithOptions);
            }
        } finally {
            setLoading(false);
        }
    });

    if (loading) {
        return <LoadingOnMiddle />;
    }

    const initialValues = Object.entries(fieldsWithOptions).map(([property]) =>
        isNew
            ? ''
            : ObjectUtil.getNestedProperty(property, databaseItem as SingleItem)
    );

    return (
        <Formik>
            <Form />
        </Formik>
    );
};

export default DatabaseItemForm;
