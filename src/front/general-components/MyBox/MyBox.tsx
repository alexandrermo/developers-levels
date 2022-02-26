import { Box, BoxTypeMap } from '@mui/material';
import { OverridableComponentProps } from '../../types/generalTypes';

export type Props<C extends React.ElementType> = OverridableComponentProps<
    BoxTypeMap,
    C
>;

const MyBox = <C extends React.ElementType>(props: Props<C>) => {
    const { children, ...rest } = props;

    return <Box {...rest}>{children}</Box>;
};

export default MyBox;
