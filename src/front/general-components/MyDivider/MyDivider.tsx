import { Divider, DividerProps } from '@mui/material';

export type Props = DividerProps;

const MyDivider = (props: Props) => {
    const { children, ...rest } = props;

    return <Divider {...rest}>{children}</Divider>;
};

export default MyDivider;
