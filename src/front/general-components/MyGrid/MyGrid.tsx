import { Grid, GridProps } from '@mui/material';

type Props = GridProps;

const MyGrid = (props: Props) => {
    const { children, ...rest } = props;

    return <Grid {...rest}>{children}</Grid>;
};

export default MyGrid;
