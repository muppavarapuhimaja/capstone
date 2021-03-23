import React from 'react';
import {Grid} from "@material-ui/core";
import {useHttpErrorStyles} from "../../../styles/js/httpError";

export function DataNotFound() {
    const classes = useHttpErrorStyles()

    return (
        <Grid container className={classes.fixedContainer} justify={"center"} alignItems={"center"}>
            <Grid item className={classes.body}>
                Data Not Found.
            </Grid>
        </Grid>
    );
}
