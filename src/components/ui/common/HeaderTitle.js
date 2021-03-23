import React from "react";
import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    title: {
        fontSize: "2.1rem",
        fontWeight: "700",
        color: "white",
        [theme.breakpoints.down('md')]: {
            fontSize: "2.5rem",
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: "2rem",
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: "1.2rem",
        },
    }
}));

export const HeaderTitle = () => {
    const classes = useStyles();
    return (
        <Grid container direction={"column"}
              alignItems={"center"} className={classes.title}>
            <Grid item style={{textAlign: "center"}}>
                Welcome to
            </Grid>
            <Grid item style={{textAlign: "center"}}>
                Cloud Connectivity Self-Assessment
            </Grid>
        </Grid>
    )
}