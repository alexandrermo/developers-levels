import { DatePicker, DatePickerProps, LocalizationProvider } from '@mui/lab';
import localePtBR from 'date-fns/locale/pt-BR';

import AdapterDateFns from '@mui/lab/AdapterDateFns';

import { TextField } from '@mui/material';
import { useCallback } from 'react';

import useMyFormikField from '../../hooks/useMyFormikField';

interface Props
    extends Omit<DatePickerProps, 'value' | 'onChange' | 'renderInput'> {
    name: string;
    required?: boolean;
}

const FormikDatePicker: React.FunctionComponent<Props> = (props) => {
    const { name, required, ...rest } = props;

    const { meta, setValue, field, touchError, helperTextFormik } =
        useMyFormikField(name);

    const renderInput = useCallback(
        (params) => (
            <TextField
                {...params}
                onBlur={field.onBlur}
                error={touchError}
                helperText={helperTextFormik}
                required={required}
            />
        ),
        [field.onBlur, touchError, helperTextFormik, required]
    );

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={localePtBR}>
            <DatePicker
                value={meta.value}
                onChange={setValue}
                renderInput={renderInput}
                {...rest}
            />
        </LocalizationProvider>
    );
};

export default FormikDatePicker;
