import React from 'react'
import {makeStyles} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import TotalScore from '../../ui/assessment/TotalScore';
import {PdfDownloadButton} from "./PdfDownloadButton";
import {PdfEmailButton} from "./PdfEmailButton";
import {SaveButton} from "./SaveButton";
import {ResetButton} from "./ResetButton";
import ScoreCategory from "./ScoreCategory";
import {useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
    grid: {
        padding: theme.spacing(1),
        background: "linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8))",
        [theme.breakpoints.up('sm')]: {
            zIndex: 4,
            position: "sticky",
            top: -40,
        }
    },
    pdfContainer: {
        alignItems: "center",
        [theme.breakpoints.down('xs')]: {
            alignItems: "flex-start",
        }
    },
    buttonWidth: {
        [theme.breakpoints.up('sm')]: {
            width: "40%",
        },
        [theme.breakpoints.up('md')]: {
            width: "30%",
        },
        [theme.breakpoints.down('xs')]: {
            width: "70%",
        }
    },
    totalScore: {
        height: 160,
        [theme.breakpoints.down('xs')]: {
            height: 120
        }
    },
    ScoreLabel: {
        fontSize: '25px',
        fontWeight: '600',
        color: '#839aa9',
    },
    ScoreRangeLabel: {
        fontSize: '20px',
        fontWeight: '600',
        color: '#839aa9',
    },
    redLabel: {
        color: 'Red',
    },
    orangeLabel: {
        color: '#ff5722',
    },
    greenLabel: {
        color: '#64dd17',
    }
}));

function ScoreCard(props) {
    const classes = useStyles();
    const {data} = useSelector(state => state.assessmentDataReducer)

    if (data === null) {
        return null
    } else if (data.assessment.length === 0) {
        return null
    }

    if (props.token === undefined || props.token === null) {
        return null
    }

    return (
        <Grid container direction="row" justify={"space-around"} alignItems={"center"} className={classes.grid}>
            <Grid item xs={4}>
                <Grid container direction="column" className={classes.pdfContainer}>
                    <Grid item className={classes.buttonWidth} style={{height: 52}}>
                        <PdfDownloadButton/>
                    </Grid>
                    <Grid item className={classes.buttonWidth} style={{height: 52}}>
                        <PdfEmailButton/>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={4}>
                <Grid container direction="column" alignItems={"center"}>
                    <Grid item className={classes.totalScore}>
                        <TotalScore/>
                    </Grid>
                    <Grid item>
                        <label className={classes.ScoreLabel}>SCORE</label>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={4}>
                <Grid container direction="column" alignItems={"center"}>
                    <Grid item className={classes.buttonWidth}>
                        <ResetButton token={props.token}/>
                    </Grid>
                    <Grid item className={classes.buttonWidth}>
                        <SaveButton token={props.token}/>
                    </Grid>
                </Grid>
            </Grid>

            <ScoreCategory/>
        </Grid>
    )
}

export default ScoreCard
