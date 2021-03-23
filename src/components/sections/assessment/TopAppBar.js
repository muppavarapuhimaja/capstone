import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {Grid, Hidden, IconButton} from "@material-ui/core";
import galenLogo from '../../../images/galenLogo.png';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LightToolTip from "../../ui/assessment/LightToolTip";
import {removeTokenFromCookie} from "../../../utils/Token";
import MoreIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles((theme) => ({
    root: {
        height: 60
    },
    grow: {
        flexGrow: 2,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    toolBar: {
        [theme.breakpoints.down('xs')]: {
            padding: 0
        }
    },
    title: {
        fontSize: '2.2vw',
        color: 'white',
        [theme.breakpoints.down('sm')]: {
            fontSize: 18
        }
    },
    appBar: {
        backgroundColor: "#1d2b3d",
        height: "inherit"
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    }
}));

const TopAppBar = () => {
    const classes = useStyles();
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const logoutHandler = () => {
        removeTokenFromCookie()
    }

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem style={{alignItems: 'center'}}>
                <Grid container onClick={logoutHandler} alignItems={"center"}>
                    <IconButton color="inherit">
                        <ExitToAppIcon/>
                    </IconButton>
                    <p style={{margin: 0}}>Logout</p>
                </Grid>
            </MenuItem>
        </Menu>
    );

    return (
        <div className={classes.root}>
            <AppBar position="static" classes={{root: classes.appBar}}>
                <Toolbar className={classes.toolBar}>
                    <Grid container alignItems={"center"}>

                        <Hidden xsDown>
                            <Grid item sm={2}>
                                <a href="https://www.galendata.com" target={"_blank"} rel="noopener noreferrer">
                                    <img src={galenLogo} alt="Galen Data Logo" width={"80%"}/>
                                </a>
                            </Grid>
                            <Grid item container direction="column" sm={8} style={{
                                textAlignLast: 'center',
                                textAlign: 'center', paddingTop: 10
                            }}>
                                <Grid item>
                                    <h2 className={classes.title}> CLOUD CONNECTIVITY SELF-ASSESSMENT </h2>
                                </Grid>
                            </Grid>
                        </Hidden>

                        <Hidden smUp>
                            <Grid item container direction="column" xs={10} md={8}
                                  style={{textAlignLast: 'center'}}>
                                <Grid item style={{paddingLeft: 55, paddingTop: 10}}>
                                    <h2 style={{fontSize: 12, marginBottom: 2}}> CLOUD CONNECTIVITY
                                        SELF-ASSESSMENT </h2>
                                </Grid>
                                <Grid item style={{paddingLeft: 50}}>
                                    <a href="https://www.galendata.com" target={"_blank"} rel="noopener noreferrer">
                                        <img src={galenLogo} alt="Galen Data Logo" width={"40%"}/>
                                    </a>
                                </Grid>

                            </Grid>
                        </Hidden>

                        <div className={classes.grow}/>
                        <div className={classes.sectionDesktop}>
                            <Grid item container justify={"flex-end"} style={{paddingBottom: 10}}>
                                <LightToolTip title={"Logout"} position={"top"} component={
                                    <IconButton aria-label="logout" size={"medium"}
                                                onClick={logoutHandler} style={{color: "white"}}>
                                        <Grid container direction={"column"}>
                                            <Grid item style={{height: 30}}>
                                                <ExitToAppIcon fontSize={"small"}/>
                                            </Grid>
                                            <Grid item style={{fontSize: "0.8rem", fontWeight: 600}}>
                                                Logout
                                            </Grid>
                                        </Grid>
                                    </IconButton>
                                }/>
                            </Grid>
                        </div>

                        <div className={classes.sectionMobile}>
                            <IconButton
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon/>
                            </IconButton>
                        </div>
                    </Grid>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
        </div>
    );
}

export default React.memo(TopAppBar)

