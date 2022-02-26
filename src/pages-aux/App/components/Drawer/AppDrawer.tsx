import { SxProps, Theme } from '@mui/material';
import MyBox from '../../../../front/general-components/MyBox/MyBox';
import MyDrawer from '../../../../front/general-components/MyDrawer/MyDrawer';
import { drawerWidth, footerHeight } from '../../AppConsts';
import { ToggleMobileOpen } from '../../AppTypes';
import AppDrawerBody from '../DrawerBody/AppDrawerBody';
import styles from './AppDrawer.module.css';

interface Props {
    toggleMobileOpen: ToggleMobileOpen;
    mobileOpen: boolean;
}

const AppDrawer = (props: Props) => {
    const { toggleMobileOpen, mobileOpen } = props;

    const commonMuiDrawerPaperSx: SxProps<Theme> = {
        boxSizing: 'border-box',
        width: drawerWidth
    };

    return (
        <MyBox
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
            <MyDrawer
                variant="temporary"
                open={mobileOpen}
                onClose={toggleMobileOpen}
                ModalProps={{
                    keepMounted: true // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },

                    '& .MuiDrawer-paper': commonMuiDrawerPaperSx
                }}
                PaperProps={{ className: styles.drawer }}
            >
                <AppDrawerBody />
            </MyDrawer>
            <MyDrawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': {
                        ...commonMuiDrawerPaperSx,
                        height: `calc(100% - ${footerHeight}px)`
                    }
                }}
                PaperProps={{ className: styles.drawer }}
            >
                <AppDrawerBody />
            </MyDrawer>
        </MyBox>
    );
};

export default AppDrawer;
