import React from 'react';
import {Grid} from "@material-ui/core";
import {useHttpErrorStyles} from "../../../styles/js/httpError";
import {Logo} from "../../ui/common/Logo";

export function PageNotFound() {
    const classes = useHttpErrorStyles()

    return (
        <>
            <Logo/>
            <Grid container className={classes.container} justify={"center"} alignItems={"center"}>
                <Grid item className={classes.body}>
                    404: Page Not Found
                </Grid>
            </Grid>
        </>
    );
}
