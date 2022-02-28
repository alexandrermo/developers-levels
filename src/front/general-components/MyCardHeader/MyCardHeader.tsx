import { HTMLAttributes } from 'react';
import MyDivider from '../MyDivider/MyDivider';
import MyTypography from '../MyTypography/MyTypography';
import styles from './MyCardHeader.module.css';

interface Props {
    title: string;
    containerStyle?: HTMLAttributes<HTMLDivElement>['style'];
}

const MyCardHeader: React.FunctionComponent<Props> = (props) => {
    const { title, children, containerStyle } = props;

    return (
        <>
            <div className={styles.title} style={containerStyle}>
                <MyTypography variant="h5">{title}</MyTypography>
                {children}
            </div>
            <MyDivider />
        </>
    );
};

MyCardHeader.defaultProps = {
    containerStyle: undefined
};

export default MyCardHeader;
