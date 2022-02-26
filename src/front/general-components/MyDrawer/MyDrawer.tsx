import { Drawer, DrawerProps } from '@mui/material';

export type Props = DrawerProps;

const MyDrawer = (props: Props) => {
    const { children, ...rest } = props;

    return <Drawer {...rest}>{children}</Drawer>;
};

export default MyDrawer;
