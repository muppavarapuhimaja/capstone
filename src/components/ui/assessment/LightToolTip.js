import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';


const LightTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 14,
    },
}))(Tooltip);


export default function LightToolTip(props) {
    return (
        <LightTooltip title={props.title} aria-label={props.title}
                      placement={props.position}
                      TransitionProps={{timeout: 600}}>
            {props.component}
        </LightTooltip>

    );
}
