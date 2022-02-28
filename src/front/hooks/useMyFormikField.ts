import { useField } from 'formik';
import { ReactNode, useCallback } from 'react';

const useMyFormikField = (name: string, helperTextTouch?: ReactNode) => {
    const [field, meta, helper] = useField(name);

    const { touched, error, initialValue } = meta;

    const { setValue: setValueFormik } = helper;

    const onChange = useCallback(
        (event) => {
            setValueFormik(event.target.value);
        },
        [setValueFormik]
    );

    const setValue = useCallback(
        (newValue) => {
            setValueFormik(newValue);
        },
        [setValueFormik]
    );

    const touchError = touched && !!error;

    const helperTextFormik = touchError ? error : helperTextTouch;

    return {
        touchError,
        onChange,
        setValue,
        helperTextFormik,
        initialValue,
        field,
        helper,
        meta
    };
};

export default useMyFormikField;
