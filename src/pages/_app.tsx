import '../styles/globals.css';
import type { AppProps } from 'next/app';
import {
    AppBar,
    Container,
    Drawer,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MailIcon from '@mui/icons-material/Mail';
import styles from '../styles/App.module.css';
import { useState } from 'react';

const drawerWidth = 240;

function MyApp({ Component, pageProps }: AppProps) {
    const [open, setOpen] = useState(false);

    return (
        <div className={styles.container}>
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` }
                }}
            >
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => setOpen(!open)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        Menu
                    </Typography>
                </Toolbar>
            </AppBar>
            <Grid container></Grid>
            <Drawer variant="persistent" anchor="left" open={open}>
                <List>
                    <ListItem button>
                        <ListItemIcon>
                            <MailIcon />
                        </ListItemIcon>
                        <ListItemText primary="Teste" />
                    </ListItem>
                </List>
            </Drawer>
            <main className={styles.mainContentContainer}>
                <Component {...pageProps} />
            </main>
            <footer className={styles.footer}>
                <span>Alguma empresa legal</span>
            </footer>
        </div>
    );
}

export default MyApp;
