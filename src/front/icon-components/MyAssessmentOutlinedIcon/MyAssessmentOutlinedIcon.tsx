import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import { IconComponentProps } from '../../types/iconTypes';

const MyAssessmentOutlinedIcon = (props: IconComponentProps) => {
    const { children, ...rest } = props;

    return (
        <AssessmentOutlinedIcon {...rest}>{children}</AssessmentOutlinedIcon>
    );
};

export default MyAssessmentOutlinedIcon;
