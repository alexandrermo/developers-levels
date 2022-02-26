import { AppBar, AppBarProps } from '@mui/material';

export type Props = AppBarProps;

const MyAppBar = (props: Props) => {
    const { children, ...rest } = props;

    return <AppBar {...rest}>{children}</AppBar>;
};

export default MyAppBar;
