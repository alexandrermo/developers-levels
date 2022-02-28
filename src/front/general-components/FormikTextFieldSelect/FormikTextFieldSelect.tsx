import { MenuItem } from '@mui/material';
import FormikTextFieldDefault, {
    FormikTextFieldDefaultProps
} from '../FormikTextFieldDefault/FormikTextFieldDefault';

interface Props extends Omit<FormikTextFieldDefaultProps, 'select'> {
    options?: { value: string; label: string }[];
}

const FormikTextFieldSelect: React.FunctionComponent<Props> = (props) => {
    const { options = [], ...rest } = props;

    return (
        <FormikTextFieldDefault select {...rest}>
            {options.map(({ value, label }) => (
                <MenuItem key={value} value={value}>
                    {label}
                </MenuItem>
            ))}
        </FormikTextFieldDefault>
    );
};

export default FormikTextFieldSelect;
