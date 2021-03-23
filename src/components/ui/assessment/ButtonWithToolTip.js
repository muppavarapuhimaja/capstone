import React from 'react'
import {makeStyles} from '@material-ui/core/styles';
import {Button} from '@material-ui/core';
import LightToolTip from "../../ui/assessment/LightToolTip";

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
        color: "black",
    }
}));

export function ButtonWithToolTip(props) {
    const classes = useStyles();

    const btnClickHandler = () => {
        props.btnHandler()
    }

    return (
        <LightToolTip title={props.tooltip} position={props.position} component={
            <Button
                variant="contained"
                className={classes.button}
                startIcon={props.icon}
                fullWidth
                onClick={btnClickHandler}
                style={{backgroundColor: "floralwhite"}}
            >
                {props.text}
            </Button>
        }/>
    )
}

