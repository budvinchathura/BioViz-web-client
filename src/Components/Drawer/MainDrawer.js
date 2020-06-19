import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';

import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import {useDispatch, useSelector} from 'react-redux';


import {DrawerList} from './DrawerList';
import MainContent from '../MainContent';
import {setDrawerOpen} from '../../Redux/Actions/Mode';
import {ButtonBase} from '@material-ui/core';

import {setMode} from '../../Redux/Actions/Mode';


const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        // [theme.breakpoints.up('xl')]: {
        //     width: drawerWidth,
        //     flexShrink: 0,
        // },
    },
    appBar: {
        // [theme.breakpoints.up('xl')]: {
        //     width: `calc(100% - ${drawerWidth}px)`,
        //     marginLeft: drawerWidth,
        // },

    },
    menuButton: {
        marginRight: theme.spacing(2),
        // [theme.breakpoints.up('xl')]: {
        //     display: 'none',
        // },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(1),
    },
    headerBox: {
        width: '100%',
    },

}));

/**
 * Component display main navigation drawer.
 * @param {Object} props
 * @return {React.ReactElement}
 */
function MainDrawer(props) {
    const {container} = props;
    const dispatch = useDispatch();
    const classes = useStyles();
    const theme = useTheme();

    const drawerOpenStatus = useSelector((state) => state.drawerOpen);
    // const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        // setMobileOpen(!mobileOpen);
        dispatch(setDrawerOpen(!drawerOpenStatus));
    };

    const goToHomeSection = ()=>{
        dispatch(setMode(0));
    };


    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    {/* button to open the drawer */}
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Box className={classes.headerBox}>
                        <ButtonBase onClick={goToHomeSection}>
                            <Typography variant="h6" noWrap>
                                BioViz Web Client
                            </Typography>
                        </ButtonBase>
                    </Box>

                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">

                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={drawerOpenStatus}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true,
                            // Better open performance on mobile.
                        }}
                    >
                        <DrawerList closeDrawer={handleDrawerToggle}/>
                    </Drawer>

            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />

                {/* content to display in each mode */}
                <Box >
                    <MainContent />

                </Box>

            </main>
        </div>
    );
}

MainDrawer.propTypes = {
    container: PropTypes.object,
};

export default MainDrawer;
