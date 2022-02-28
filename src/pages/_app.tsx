/* eslint-disable no-template-curly-in-string */
import '../pages-aux/globals/globals.css';
import type { AppProps } from 'next/app';
import { useCallback, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import { setLocale } from 'yup';
import styles from '../pages-aux/App/App.module.css';
import AppAppBar from '../pages-aux/App/components/AppBar/AppAppBar';
import { ToggleMobileOpen } from '../pages-aux/App/AppTypes';
import AppDrawer from '../pages-aux/App/components/Drawer/AppDrawer';
import MyBox from '../front/general-components/MyBox/MyBox';
import { drawerWidth, footerHeight } from '../pages-aux/App/AppConsts';
import MyToolbar from '../front/general-components/MyToolbar/MyToolbar';
import { primaryColor } from '../front/consts/theme/themeConsts';

setLocale({
    mixed: {
        default: 'Não é válido',
        required: 'Campo obrigatório'
    },
    string: {
        length: 'Campo precisa ter ${length} caracteres',
        max: 'Campo pode ter no máximo ${max} caracteres',
        min: 'Campo deve ter no mínimo ${min} caracteres',
        email: 'Campo deve ser um e-mail válido'
    }
});

const theme = createTheme({
    palette: {
        primary: {
            main: primaryColor
        }
    }
});

const MyApp = ({ Component, pageProps }: AppProps) => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const toggleMobileOpen: ToggleMobileOpen = useCallback(() => {
        setMobileOpen(!mobileOpen);
    }, [mobileOpen]);

    return (
        <ThemeProvider theme={theme}>
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
        </ThemeProvider>
    );
};

export default MyApp;
