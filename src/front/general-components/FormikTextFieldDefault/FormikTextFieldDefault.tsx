import { TextField, TextFieldProps } from '@mui/material';
import useMyFormikField from '../../hooks/useMyFormikField';

export interface FormikTextFieldDefaultProps
    extends Omit<
        TextFieldProps,
        'name' | 'onBlur' | 'onChange' | 'value' | 'error'
    > {
    name: string;
}

const FormikTextFieldDefault = (props: FormikTextFieldDefaultProps) => {
    const {
        fullWidth = true,
        name,
        helperText: helperTextProp,
        ...rest
    } = props;

    const { onChange, touchError, helperTextFormik, field, meta } =
        useMyFormikField(name, helperTextProp);

    return (
        <TextField
            fullWidth={fullWidth}
            name={name}
            onBlur={field.onBlur}
            onChange={onChange}
            error={touchError}
            helperText={helperTextFormik}
            value={meta.value || ''}
            {...rest}
        />
    );
};

export default FormikTextFieldDefault;
