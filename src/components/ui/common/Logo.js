import React from "react";
import {Grid} from "@material-ui/core";
import GalenLogo from '../../../images/galenLogo.png';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    logo: {
        paddingLeft: 20,
        [theme.breakpoints.down('md')]: {
            padding: '10px 0px 50px 20px',
        },
        [theme.breakpoints.down('xs')]: {
            padding: '30px 10px 30px 0px',
            justifyContent: 'center',
        },
    }
}));

export const Logo = () => {
    const classes = useStyles()

    return (
        <Grid container alignItems={"center"} className={classes.logo}>
            <Grid item xs={6} sm={3} md={3} lg={2}>
                <a href="https://www.galendata.com" target={"_blank"} rel="noopener noreferrer">
                    <img src={GalenLogo} width="100%" alt={"Galen Data Logo"}/>
                </a>
            </Grid>
        </Grid>
    )
}