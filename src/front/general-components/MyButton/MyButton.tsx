import { Button, ButtonProps } from '@mui/material';

type Props = ButtonProps;

const MyButton = (props: Props) => {
    const { children, ...rest } = props;

    return <Button {...rest}>{children}</Button>;
};

export default MyButton;
