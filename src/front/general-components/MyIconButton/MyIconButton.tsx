import { IconButton, IconButtonProps } from '@mui/material';

export type Props = IconButtonProps;

const MyIconButton = (props: Props) => {
    const { children, ...rest } = props;

    return <IconButton {...rest}>{children}</IconButton>;
};

export default MyIconButton;
