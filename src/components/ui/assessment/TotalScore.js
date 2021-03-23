import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useSelector} from "react-redux";

const desktopFontSize = '120px'
const desktopFontWeight = '120px'
const mobileFontSize = '80px'

const styles = makeStyles((theme) => ({
    redLabel: {
        fontSize: desktopFontSize,
        color: 'red',
        fontWeight: desktopFontWeight,
        [theme.breakpoints.down('xs')]: {
            fontSize: mobileFontSize
        }
    },
    orangeLabel: {
        fontSize: desktopFontSize,
        color: '#ff5722',
        fontWeight: desktopFontWeight,
        [theme.breakpoints.down('xs')]: {
            fontSize: mobileFontSize
        }
    },
    yellowLabel: {
        fontSize: desktopFontSize,
        color: 'yellow',
        fontWeight: desktopFontWeight,
        [theme.breakpoints.down('xs')]: {
            fontSize: mobileFontSize
        }
    },
    greenLabel: {
        fontSize: desktopFontSize,
        color: '#64dd17',
        fontWeight: desktopFontWeight,
        [theme.breakpoints.down('xs')]: {
            fontSize: mobileFontSize
        }
    },
}));

function TotalScore() {
    const {totalScore} = useSelector(state => state.totalScoreReducer)
    const style = styles();

    if (totalScore === null) {
        return null
    }

    if (totalScore >= 0 && totalScore <= 25) {
        return <label className={style.redLabel}>{totalScore}</label>
    } else if (totalScore >= 26 && totalScore <= 50) {
        return <label className={style.orangeLabel}>{totalScore}</label>
    } else if (totalScore >= 51 && totalScore <= 76) {
        return <label className={style.yellowLabel}>{totalScore}</label>
    } else {
        return <label className={style.greenLabel}>{totalScore}</label>
    }
}

export default TotalScore
