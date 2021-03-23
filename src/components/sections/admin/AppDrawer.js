import React from 'react';
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import EditIcon from '@material-ui/icons/Edit';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {Grid} from "@material-ui/core";
import galenLogo from "../../../images/galenLogo.png";
import {ADMIN_ASSESSMENT_DATA_ROUTE, ADMIN_HOME_ROUTE, ADMIN_LOGIN_ROUTE} from "../../../constants/page_routes";
import {removeTokenFromCookie} from "../../../utils/Token";
import history from "../../../history";
import {ADMIN_TOKEN_COOKIE} from "../../../constants/constants";
import DarkToolTip from "../../ui/assessment/DarkToolTip";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        backgroundColor: "#353535",
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        paddingLeft: 3,
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(7) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
    },
}));

export default function AppDrawer({innerComponent}) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const menuItemsBtnHandler = (API) => {
        if(API === ADMIN_LOGIN_ROUTE) {
            removeTokenFromCookie(ADMIN_TOKEN_COOKIE, API)
        }
        history.push(API)
    }

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Grid container alignItems={"center"}>
                        <Grid item xs={3}>
                            <a href="https://www.galendata.com" target={"_blank"} rel="noopener noreferrer">
                                <img src={galenLogo} alt="Galen Data Logo" width={"50%"}/>
                            </a>
                        </Grid>
                        <Grid item style={{fontSize: "1.8rem", fontWeight: 600, paddingLeft: 30}}>
                            Cloud Connectivity Self-Assessment Admin
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </div>
                <Divider/>
                <List>
                    {[['Home', <HomeIcon/>, "Go to Home", ADMIN_HOME_ROUTE],
                        ['Edit', <EditIcon/>, "Edit Assessment Data", ADMIN_ASSESSMENT_DATA_ROUTE],
                        ['Logout', <ExitToAppIcon/>, "Logout", ADMIN_LOGIN_ROUTE]].map(
                        (arr, index) => {
                            return <DarkToolTip key={index} title={arr[2]} position={"right"} component={
                                <div className="sidebar-menu-items" onClick={() => menuItemsBtnHandler(arr[3])}>
                                    <ListItem button key={arr[0]}>
                                        <ListItemIcon>{arr[1]}</ListItemIcon>
                                        <ListItemText primary={arr[0]}/>
                                    </ListItem>
                                </div>}/>
                        })}
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                {innerComponent}
            </main>
        </div>
    );
}
