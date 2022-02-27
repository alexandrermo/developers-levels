import styles from './LoadingOnMiddle.module.css';
import Loading from '../Loading/Loading';

const LoadingOnMiddle = () => (
    <div className={styles.container}>
        <Loading />
    </div>
);

export default LoadingOnMiddle;
