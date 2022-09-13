import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Drawer, Typography, useMediaQuery } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import PeopleIcon from '@mui/icons-material/People';
import LabelIcon from '@mui/icons-material/Label';
import Badge from '@mui/material/Badge';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';
import { BrowserView, MobileView } from 'react-device-detect';
import { Menu, useResourceDefinitions } from 'react-admin';
// project imports
import MenuList from './MenuList';
import LogoSection from '../LogoSection';
import MenuCard from './MenuCard';
import { drawerWidth } from 'store/constant';
import { createElement } from 'react';
import customization from "../../Customization";
// ==============================|| SIDEBAR DRAWER ||============================== //

const Sidebar = ({drawerOpen, drawerToggle, window}) => {
    const theme = useTheme();
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
    const resources = useResourceDefinitions();
    const drawer = (
        <>
            <Box sx={{ display: {xs: 'block', md: 'none' }}}>
                <Box sx={{ display: 'flex', p: 2, mx: 'auto' }}>
                    <LogoSection/>
                </Box>
            </Box>
            <BrowserView>
                <PerfectScrollbar
                    component="div"
                    style={{
                        height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
                        paddingLeft: '16px',
                        paddingRight: '16px'
                    }}
                >
                    <MenuList />
                    {/*<Menu>*/}
                    {/*    {Object.keys(resources).map((name) => (*/}
                    {/*        <Menu.Item*/}
                    {/*            sx={{*/}
                    {/*                borderRadius: `15px`,*/}
                    {/*                mb: 0.5,*/}
                    {/*                alignItems: 'flex-start',*/}
                    {/*                backgroundColor: 'red' > 1 ? 'transparent !important' : 'inherit',*/}
                    {/*                py: 1 > 1 ? 1 : 1.25,*/}
                    {/*                pl: `${24}px`*/}
                    {/*            }}*/}
                    {/*            key={name}*/}
                    {/*            to={`/${name}`}*/}
                    {/*            primaryText={*/}
                    {/*                <Typography color="inherit">*/}
                    {/*                    {(resources[name].options && resources[name].options.label) || name}*/}
                    {/*                </Typography>*/}
                    {/*            }*/}

                    {/*            lleftIcon={createElement(resources[name].icon)}*/}

                    {/*        />*/}
                    {/*    ))}*/}
                    {/*    <Menu.Item to="/custom-route" primaryText="Miscellaneous" leftIcon={<LabelIcon/>}/>*/}
                    {/*</Menu>*/}
                    {/*<MenuCard/>*/}
                </PerfectScrollbar>
            </BrowserView>
            <MobileView>
                <Box sx={{px: 2}}>
                    <MenuList/>
                    {/*<MenuCard/>*/}
                </Box>
            </MobileView>
        </>
    );

    const container = window !== undefined ? () => window.document.body : undefined;

    return (
        <Box component="nav" sx={{flexShrink: {md: 0}, width: matchUpMd ? drawerWidth : 'auto'}}
             aria-label="mailbox folders">
            <Drawer
                container={container}
                variant={matchUpMd ? 'persistent' : 'temporary'}
                anchor="left"
                open={drawerOpen}
                onClose={drawerToggle}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        background: theme.palette.background.default,
                        color: theme.palette.text.primary,
                        borderRight: 'none',
                        [theme.breakpoints.up('md')]: {
                            top: '88px'
                        }
                    }
                }}
                ModalProps={{keepMounted: true}}
                color="inherit"
            >
                {drawer}
            </Drawer>
        </Box>
    );
};

Sidebar.propTypes = {
    drawerOpen: PropTypes.bool,
    drawerToggle: PropTypes.func,
    window: PropTypes.object
};

export default Sidebar;
