import { List, ListProps } from '@mui/material';

export type Props = ListProps;

const MyList = (props: Props) => {
    const { children, ...rest } = props;

    return <List {...rest}>{children}</List>;
};

export default MyList;
