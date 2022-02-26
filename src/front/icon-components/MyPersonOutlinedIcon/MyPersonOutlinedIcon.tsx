import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

import { IconComponentProps } from '../../types/iconTypes';

const MyPersonOutlinedIcon = (props: IconComponentProps) => {
    const { children, ...rest } = props;

    return <PersonOutlinedIcon {...rest}>{children}</PersonOutlinedIcon>;
};

export default MyPersonOutlinedIcon;
