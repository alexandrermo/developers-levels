import MyDivider from '../../../../front/general-components/MyDivider/MyDivider';
import MyList from '../../../../front/general-components/MyList/MyList';
import MyToolbar from '../../../../front/general-components/MyToolbar/MyToolbar';
import AppNavItem from '../NavItem/AppNavItem';
import { navItems } from './AppDrawerBodyConsts';
import styles from './AppDrawerBody.module.css';
import MyTypography from '../../../../front/general-components/MyTypography/MyTypography';
import {
    backgroundColor,
    primaryColor
} from '../../../../front/consts/themeConsts';

const AppDrawerBody = () => (
    <div>
        <MyToolbar
            className={styles.toolbar}
            sx={{
                backgroundColor: { xs: backgroundColor, sm: primaryColor }
            }}
        >
            <MyTypography
                variant="h6"
                sx={{ display: { xs: 'none', sm: 'inline' } }}
            >
                Menu
            </MyTypography>
        </MyToolbar>
        <MyDivider />
        <MyList>
            {navItems.map((singleNavItem, index) => (
                <AppNavItem
                    key={singleNavItem.text}
                    text={singleNavItem.text}
                    icon={singleNavItem.icon}
                    page={singleNavItem.page}
                    index={index}
                />
            ))}
        </MyList>
    </div>
);

export default AppDrawerBody;
