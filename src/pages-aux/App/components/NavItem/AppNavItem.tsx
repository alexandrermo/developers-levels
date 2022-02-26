import Link from 'next/link';
import styles from './AppNavItem.module.css';

interface Props {
    text: string;
    icon: JSX.Element;
    page: string;
    index: number;
}

const AppNavItem = (props: Props) => {
    const { text, icon, page, index } = props;

    return (
        <Link href={page}>
            <a
                className={styles.navAnchor}
                style={{ marginTop: index !== 0 ? 10 : 0 }}
            >
                {icon}
                <span>{text}</span>
            </a>
        </Link>
    );
};

export default AppNavItem;
