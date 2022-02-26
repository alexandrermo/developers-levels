import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { IconComponentProps } from '../../types/iconTypes';

const MyMenuOutlinedIcon = (props: IconComponentProps) => {
    const { children, ...rest } = props;

    return <MenuOutlinedIcon {...rest}>{children}</MenuOutlinedIcon>;
};

export default MyMenuOutlinedIcon;
