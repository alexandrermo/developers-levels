import { Typography, TypographyTypeMap } from '@mui/material';
import React from 'react';

import { OverridableComponentProps } from '../../types/generalTypes';

export type Props<C extends React.ElementType> = OverridableComponentProps<
    TypographyTypeMap,
    C
>;

const MyTypography = <C extends React.ElementType>(props: Props<C>) => {
    const { children, ...rest } = props;

    return <Typography {...rest}>{children}</Typography>;
};

export default MyTypography;
