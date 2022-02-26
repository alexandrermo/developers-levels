import MyAppBar from '../../../../front/general-components/MyAppBar/MyAppBar';
import MyIconButton from '../../../../front/general-components/MyIconButton/MyIconButton';
import MyToolbar from '../../../../front/general-components/MyToolbar/MyToolbar';
import MyTypography from '../../../../front/general-components/MyTypography/MyTypography';
import MyMenuOutlinedIcon from '../../../../front/icon-components/MyMenuOutlinedIcon/MyMenuOutlinedIcon';
import { drawerWidth } from '../../AppConsts';
import { ToggleMobileOpen } from '../../AppTypes';

export interface Props {
    toggleMobileOpen: ToggleMobileOpen;
}

const AppAppBar = (props: Props) => {
    const { toggleMobileOpen } = props;

    return (
        <MyAppBar
            position="fixed"
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` }
            }}
        >
            <MyToolbar>
                <MyIconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2, display: { sm: 'none' } }}
                    onClick={toggleMobileOpen}
                >
                    <MyMenuOutlinedIcon />
                </MyIconButton>
                <MyTypography
                    variant="h6"
                    component="div"
                    noWrap
                    sx={{ flexGrow: 1, display: { sm: 'none' } }}
                >
                    Menu
                </MyTypography>
            </MyToolbar>
        </MyAppBar>
    );
};

export default AppAppBar;
