import React from 'react';
import {RegisterForm} from "../sections/authentication/RegisterForm";
import {HeaderTitle} from "../ui/common/HeaderTitle";
import {Grid} from "@material-ui/core";
import {Logo} from "../ui/common/Logo";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    container: {
    },
    headerTitle: {
        marginTop: 160,
        [theme.breakpoints.down('md')]: {
            padding: '10px 0px 50px 0px',
            marginTop: 80
        },
        [theme.breakpoints.down('xs')]: {
            marginTop: 10,
            paddingTop: '0px !important',
            paddingBottom: '0px !important'
        },
    },
    registerForm: {
        marginTop: 40,
        marginLeft: 70,
        alignSelf: "center",
        [theme.breakpoints.down('md')]: {
            marginLeft: 0
        },
        [theme.breakpoints.down('xs')]: {
            paddingBottom: '0px !important',
        },
    }
}));

export function RegisterPage() {
    const classes = useStyles()

    return (
        <>
            <Logo/>
            <Grid container justify={"center"} className={classes.container}>
                <Grid item className={classes.headerTitle}>
                    <HeaderTitle/>
                </Grid>
                <Grid item className={classes.registerForm}>
                    <RegisterForm/>
                </Grid>
            </Grid>
        </>
    );
}
