import FormikTextFieldDefault from '../../../FormikTextFieldDefault/FormikTextFieldDefault';
import { FieldItem } from '../../../../types/crudComponentsTypes';
import MyGrid from '../../../MyGrid/MyGrid';
import FormikTextFieldSelect from '../../../FormikTextFieldSelect/FormikTextFieldSelect';
import FormikDatePicker from '../../../FormikDatePicker/FormikDatePicker';

interface Props {
    property: string;
    field: FieldItem;
}

const DatabaseItemFormElement: React.FunctionComponent<Props> = (props) => {
    const { property, field } = props;
    const { form, options, label } = field;

    const { required, disabled } = form || {};

    return (
        <MyGrid item xs={12} sm={6} md={3} lg={2}>
            {(!field.type || field.type === 'default') && (
                <FormikTextFieldDefault
                    required={required}
                    name={property}
                    label={label}
                    disabled={disabled}
                />
            )}

            {field.type === 'select' && (
                <FormikTextFieldSelect
                    required={required}
                    name={property}
                    label={label}
                    options={options}
                    disabled={disabled}
                />
            )}

            {field.type === 'date' && (
                <FormikDatePicker
                    required={required}
                    name={property}
                    label={label}
                    disabled={disabled}
                />
            )}
        </MyGrid>
    );
};

export default DatabaseItemFormElement;
