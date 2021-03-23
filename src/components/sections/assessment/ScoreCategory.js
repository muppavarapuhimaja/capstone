import React from 'react'
import {makeStyles} from '@material-ui/core/styles';
import {Grid, Hidden} from '@material-ui/core';
import {SCORE_GUIDANCE} from "../../../constants/constants";

const useStyles = makeStyles((theme) => ({
    container: {
        justify: "space-around",
        alignItems: "center",
        paddingTop: 5,
        paddingLeft: 100,
        [theme.breakpoints.down('md')]: {
            paddingLeft: 20,
        }
    },
    ScoreRangeLabel: {
        fontSize: '20px',
        fontWeight: '600',
        color: '#839aa9',
        [theme.breakpoints.down('xs')]: {
            fontSize: 12
        }
    }
}));

const ScoreCategory = () => {
    const classes = useStyles();

    const renderMobileScoreLabel = (range, advice, color) => {
        return <Grid key={range} container spacing={1} className={classes.ScoreRangeLabel} style={{textAlign: "right"}}>
            <Grid item xs={3} style={{color: color}}>
                {`${range} :`}
            </Grid>

            <Grid item>
                {advice}
            </Grid>
        </Grid>
    }

    const renderDesktopScoreLabel = (range, advice, color) => {
        return <Grid key={range} item xs={6} style={{textAlign: "right"}}>
            <Grid container spacing={1} className={classes.ScoreRangeLabel}>
                <Grid item xs={3} style={{color: color}}>
                    {`${range} :`}
                </Grid>

                <Grid item>
                    {advice}
                </Grid>
            </Grid>
        </Grid>
    }

    return (
        <>
            <Hidden mdUp>
                <Grid container className={classes.container}>
                    {
                        SCORE_GUIDANCE.map(({range, advice, color}) => {
                            return renderMobileScoreLabel(range, advice, color)
                        })
                    }
                </Grid>
            </Hidden>

            <Hidden smDown>
                <Grid container className={classes.container}>
                    {
                        SCORE_GUIDANCE.map(({range, advice, color}) => {
                            return renderDesktopScoreLabel(range, advice, color)
                        })
                    }
                </Grid>
            </Hidden>
        </>
    )
}

export default React.memo(ScoreCategory)

