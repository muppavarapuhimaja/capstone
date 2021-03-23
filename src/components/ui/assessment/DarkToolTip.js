import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';


const DarkTooltip = withStyles((theme) => ({
    tooltip: {
        boxShadow: theme.shadows[1],
        fontSize: 14,
    },
}))(Tooltip);


export default function DarkToolTip(props) {
    return (
        <DarkTooltip title={props.title} aria-label={props.title}
                      placement={props.position}
                      TransitionProps={{timeout: 600}}>
            {props.component}
        </DarkTooltip>

    );
}
