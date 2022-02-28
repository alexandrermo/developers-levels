import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import * as Yup from 'Yup';
import { Formik, Form } from 'formik';
import { SingleItem } from '../../../common/types/commonEndpointTypes';
import useEffectOnFirstRender from '../../hooks/useEffectOnFirstRender';
import LoadingOnMiddle from '../LoadingOnMiddle/LoadingOnMiddle';
import {
    FieldItem,
    FieldItemOptions,
    Fields,
    FilterItemGetOptionsApi
} from '../../types/crudComponentsTypes';
import DatabaseItemFormBibli from './DatabaseItemFormBibli';
import ObjectUtil from '../../../common/utils/Object/ObjectUtil';
import { GenericObject } from '../../../common/types/objectTypes';
import { ApitGetWithId } from '../../types/frontEndpointTypes';
import DatabaseItemFormBody from './components/DatabaseItemFormBody/DatabaseItemFormBody';

interface Props {
    fields: Fields;
    endpoints: {
        getWithId: ApitGetWithId;
        post: (values: GenericObject) => Promise<void>;
        putWithId: (values: GenericObject, id: string) => Promise<void>;
    };
    label: string;
}

const DatabaseItemForm: React.FunctionComponent<Props> = (props) => {
    const { fields, endpoints, label } = props;
    const { post, putWithId } = endpoints;

    const formFieldsEntries = Object.entries(fields).filter(
        ([, fieldItem]) => !fieldItem.form?.hidden
    );

    const router = useRouter();
    const id = router.query.id as string;
    const isNew = id === 'new';
    const hasFieldWithApi = formFieldsEntries.some(
        DatabaseItemFormBibli.checkFieldEntrieIsWithApi
    );

    const [loading, setLoading] = useState(!isNew || hasFieldWithApi);
    const [databaseItem, setDatabaseItem] = useState<SingleItem>();
    const [fieldsWithOptions, setFieldsWithOptions] = useState(fields);
    const formFieldsWithOptions = Object.entries(fieldsWithOptions).filter(
        ([, fieldItem]) => !fieldItem.form?.hidden
    );

    const onSubmit = useCallback(
        async (values) => {
            try {
                setLoading(true);
                if (isNew) {
                    await post(values);
                } else {
                    await putWithId(values, id);
                }
            } finally {
                setLoading(false);
            }
        },
        [isNew, id, post, putWithId]
    );

    useEffectOnFirstRender(async () => {
        try {
            const promises = [];
            if (!isNew) {
                promises.push(endpoints.getWithId(id));
            }

            let fieldsWithApiEntries: [string, FieldItem][] = [];
            if (hasFieldWithApi) {
                fieldsWithApiEntries = formFieldsEntries.filter(
                    DatabaseItemFormBibli.checkFieldEntrieIsWithApi
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

                        const nextFieldsWithOptionsBuilding =
                            previousFieldsWithOptions;

                        nextFieldsWithOptionsBuilding[property].options =
                            fieldsOptionsReponses[
                                fieldWithApiEntrieItemIndex
                            ] as FieldItemOptions;

                        return nextFieldsWithOptionsBuilding;
                    },
                    ObjectUtil.deepCopy(fieldsWithOptions)
                );

                setFieldsWithOptions(newFieldsWithOptions);
            }
        } finally {
            setLoading(false);
        }
    });

    const fieldsWithOptionsEntries = Object.entries(fieldsWithOptions);

    const yupValidationSchema = fieldsWithOptionsEntries.reduce<GenericObject>(
        (previousYupValidationSchema, [property, fieldItem]) => {
            const nextYupValidationSchema = previousYupValidationSchema;
            const yupValue = Yup.mixed();
            if (fieldItem.form?.required) {
                yupValue.required();
            }
            nextYupValidationSchema[property] = yupValue;

            return nextYupValidationSchema;
        },
        {}
    );

    if (loading) {
        return <LoadingOnMiddle />;
    }

    const initialValues = formFieldsWithOptions.reduce<GenericObject>(
        (previousInitialValues, [property]) => {
            const nextInitialValues = previousInitialValues;

            const propertyInitialValue = isNew
                ? ''
                : ObjectUtil.getNestedProperty(
                      property,
                      databaseItem as SingleItem
                  );

            nextInitialValues[property] = propertyInitialValue;
            return nextInitialValues;
        },
        {}
    );

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object().shape(yupValidationSchema)}
            onSubmit={onSubmit}
        >
            <Form>
                <DatabaseItemFormBody
                    fieldsEntries={formFieldsWithOptions}
                    isNew={isNew}
                    label={label}
                />
            </Form>
        </Formik>
    );
};

export default DatabaseItemForm;
