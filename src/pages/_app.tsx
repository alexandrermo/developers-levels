import '../pages-aux/globals/globals.css';
import type { AppProps } from 'next/app';
import { useCallback, useState } from 'react';
import styles from '../pages-aux/App/App.module.css';
import AppAppBar from '../pages-aux/App/components/AppBar/AppAppBar';
import { ToggleMobileOpen } from '../pages-aux/App/AppTypes';
import AppDrawer from '../pages-aux/App/components/Drawer/AppDrawer';
import MyBox from '../front/general-components/MyBox/MyBox';
import { drawerWidth, footerHeight } from '../pages-aux/App/AppConsts';
import MyToolbar from '../front/general-components/MyToolbar/MyToolbar';

const MyApp = ({ Component, pageProps }: AppProps) => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const toggleMobileOpen: ToggleMobileOpen = useCallback(() => {
        setMobileOpen(!mobileOpen);
    }, [mobileOpen]);

    return (
        <div className={styles.container}>
            <MyBox
                sx={{
                    height: `calc(100vh - ${footerHeight}px)`,
                    overflow: 'auto'
                }}
            >
                <AppAppBar toggleMobileOpen={toggleMobileOpen} />
                <AppDrawer
                    toggleMobileOpen={toggleMobileOpen}
                    mobileOpen={mobileOpen}
                />
                <MyBox
                    className={styles.contentContainer}
                    sx={{
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        ml: { sm: `${drawerWidth}px` }
                    }}
                >
                    <MyToolbar />
                    <div className={styles.pageComponentDiv}>
                        <Component {...pageProps} />
                    </div>
                </MyBox>
            </MyBox>

            <footer className={styles.footer}>
                <span>Alguma empresa legal</span>
            </footer>
        </div>
    );
};

export default MyApp;
