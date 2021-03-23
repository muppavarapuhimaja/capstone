import React from 'react';
import {Grid} from "@material-ui/core";
import {useHttpErrorStyles} from "../../../styles/js/httpError";
import {Logo} from "../../ui/common/Logo";

export function InternalServerError() {
    const classes = useHttpErrorStyles()

    return (
        <>
            <Logo/>
            <Grid container className={classes.container} justify={"center"} alignItems={"center"}>
                <Grid item className={classes.body}>
                    500: Internal Server Error
                </Grid>
            </Grid>
        </>
    );
}
