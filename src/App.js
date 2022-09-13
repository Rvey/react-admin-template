import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { AppBar, Box, CssBaseline, Toolbar, useMediaQuery, StyledEngineProvider, Typography, Collapse, List } from '@mui/material';
import { Admin, Resource, ListGuesser, Layout } from 'react-admin';
import { createElement } from 'react';
import { Menu, useResourceDefinitions } from 'react-admin';
import LabelIcon from '@mui/icons-material/Label';
import { Outlet } from 'react-router-dom';

// routing
import Routes from 'routes';
import NavigationScroll from 'layout/NavigationScroll';
import jsonServerProvider from 'ra-data-json-server';
// defaultTheme
import themes from 'themes';
import Header from 'layout/MainLayout/Header';
import Sidebar from 'layout/MainLayout/Sidebar';
import navigation from 'menu-items';
import Breadcrumbs from 'ui-component/extended/Breadcrumbs';
import MenuList from 'layout/MainLayout/Sidebar/MenuList';
import BookIcon from '@mui/icons-material/Book';
// project imports
import { theme } from './themes/index';
import { SET_MENU } from 'store/actions';
// ==============================|| APP ||============================== //

const MyAppBar = (props) => {
    const theme = useTheme();
    const leftDrawerOpened = useSelector((state) => state.customization.opened);
    const dispatch = useDispatch();
    const handleLeftDrawerToggle = () => {
        dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                enableColorOnDark
                position="fixed"
                color="inherit"
                elevation={0}
                sx={{
                    bgcolor: theme.palette.background.default,
                    transition: leftDrawerOpened ? theme.transitions.create('width') : 'none'
                }}
            >
                <Toolbar>
                    <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
                </Toolbar>
            </AppBar>
        </Box>
    );
};

// const MyRoutes = () => <MyMenu />;
const MySideBar = () => {
    const theme = useTheme();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'));

    const leftDrawerOpened = useSelector((state) => state.customization.opened);
    const dispatch = useDispatch();
    const handleLeftDrawerToggle = () => {
        dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
    };

    useEffect(() => {
        dispatch({ type: SET_MENU, opened: !matchDownMd });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [matchDownMd]);

    return <Sidebar drawerOpen={leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} />;
};

const MyLayout = (props) => <Layout {...props} appBar={MyAppBar} menu={MySideBar} />;
const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
const App = () => {
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);
    const leftDrawerOpened = useSelector((state) => state.customization.opened);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <CssBaseline />
                <NavigationScroll>
                    <Admin theme={theme} layout={MyLayout} dataProvider={dataProvider} open={leftDrawerOpened}>
                        <Resource name="posts" list={ListGuesser} />
                        <Resource name="users" list={ListGuesser} />
                    </Admin>
                </NavigationScroll>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
