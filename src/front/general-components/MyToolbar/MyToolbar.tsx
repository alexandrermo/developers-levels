import { Toolbar, ToolbarTypeMap } from '@mui/material';

import { OverridableComponentProps } from '../../types/generalTypes';

export type Props<C extends React.ElementType> = OverridableComponentProps<
    ToolbarTypeMap,
    C
>;

const MyToolbar = <C extends React.ElementType>(props: Props<C>) => {
    const { children, ...rest } = props;

    return <Toolbar {...rest}>{children}</Toolbar>;
};

export default MyToolbar;
