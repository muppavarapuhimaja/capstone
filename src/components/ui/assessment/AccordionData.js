import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Container, Grid} from '@material-ui/core';
import "../../../styles/css/assessment/AccordionCategory.css";
import ResponseButtons from "./ResponseButton";
import {useDispatch, useSelector} from "react-redux";
import {SET_TOTAL_SCORE} from "../../../actions/types";
import withStyles from "@material-ui/core/styles/withStyles";
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import {Loading} from "../common/Loading";
import history from "../../../history";
import {LOGIN_ROUTE} from "../../../constants/page_routes";
import {InternalServerError} from "../../sections/errors/InternalServerError";
import parse from 'html-react-parser';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(18),
        fontWeight: theme.typography.fontWeightBold,
        [theme.breakpoints.down('xs')]: {
            fontSize: 12
        }
    },
    grid: {
        padding: theme.spacing(1),
        background: '#DCDCDC',
        maxHeight: 70,
        [theme.breakpoints.down('xs')]: {
            fontSize: 12
        }
    },
    scoreLabel: {
        fontWeight: 600,
        fontSize: theme.typography.pxToRem(18),
    },
    shortName: {
        textAlign: "justify",
        [theme.breakpoints.down('xs')]: {
            fontSize: 12
        }
    },
    questions: {
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
            fontSize: 12,
        }
    }
}));

const Accordion = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
        paddingBottom: 0,
        paddingTop: 0
    },
}))(MuiAccordionDetails);

export default function AccordionData() {
    const classes = useStyles();
    const {scoreInfo, totalScore} = useSelector(state => state.totalScoreReducer)
    const {data, httpCode, loading} = useSelector(state => state.assessmentDataReducer)
    const [responseState, setResponseState] = useState({
        newUserResponse: false, accordionExpanded: false
    });
    const dispatch = useDispatch()
    let questionId = 0

    useEffect(() => {
        if (data && data.hasOwnProperty('assessment')) {
            // eslint-disable-next-line array-callback-return
            data.assessment.map(assessment => {
                // eslint-disable-next-line array-callback-return
                assessment.questions.map(question => {
                    updateScoreMap(question.id, assessment.category.id, question.response)
                })
            })

            dispatch({
                type: SET_TOTAL_SCORE,
                payload: {
                    totalScore: data.totalScore,
                    scoreInfo: scoreInfo
                }
            })
        }

        // eslint-disable-next-line
    }, [data])

    if (loading) {
        return <Loading/>
    }

    // TODO: Create a component to display this message
    if (httpCode === 500) {
        return <InternalServerError/>
    }

    if (httpCode === 401 || httpCode === 403) {
        history.push(LOGIN_ROUTE)
        return null
    }

    if (data === null) {
        return null
    } else {
        if (data.assessment.length === 0) {
            return <div style={{fontSize: "3rem", fontWeight: 700, color: "white",
                textAlign: "center", backgroundColor: "black"}}>
                Data not found. Please check back later.
            </div>
        }
    }


    const updateScoreMap = (questionId, categoryId, response) => {
        let categoryInfo
        let oldResponse = 0

        if (scoreInfo.has(categoryId)) {

            // get the question and response map
            categoryInfo = scoreInfo.get(categoryId)

            // subtract old response
            if (categoryInfo.questionResponse.has(questionId)) {
                oldResponse = categoryInfo.questionResponse.get(questionId)
                categoryInfo.categoryScore -= oldResponse
            }

        } else {

            // if question and response map not found means
            // category id need to set first.
            categoryInfo = {categoryScore: 0, questionResponse: new Map()}
        }

        // set question response
        categoryInfo.questionResponse.set(questionId, response)

        // add new response
        categoryInfo.categoryScore += response

        // update the category map
        scoreInfo.set(categoryId, categoryInfo)

        return oldResponse
    }

    const responseTabHandler = (questionId, categoryId, newResponse) => {

        // update map first
        let oldResponse = updateScoreMap(questionId, categoryId, newResponse)

        let newTotalScore = totalScore + newResponse - oldResponse

        if (newTotalScore < 0) {
            return
        }

        // now dispatch total score in redux store
        dispatch({
            type: SET_TOTAL_SCORE, payload: {
                totalScore: newTotalScore
            }
        })

        // now update the responseState
        setResponseState({...responseState, newUserResponse: true})
    }

    const handleAccordionChange = (panel) => (event, newExpanded) => {
        setResponseState({...responseState, accordionExpanded: newExpanded ? panel : false});
    };

    const renderAssessmentDataList = () => {
        return data.assessment.map(assessment => renderAssessmentData(assessment))
    }

    const renderAssessmentData = (assessment) => {
        return (
            <Accordion key={assessment.category.id}
                       square
                       expanded={responseState.accordionExpanded === assessment.category.id}
                       onChange={handleAccordionChange(assessment.category.id)}>
                {renderCategory(assessment.category)}
                <AccordionDetails>
                    <Grid container direction={"column"}>
                        <Grid item style={{paddingBottom: 20, paddingTop: 20, fontWeight: 600}}>
                            {renderCategoryShortName(assessment.category.shortName, assessment.category.scoreGuidance)}
                        </Grid>
                        <Grid item>
                            {renderDataLabel()}
                        </Grid>
                    </Grid>
                </AccordionDetails>
                {renderQuestions(assessment.questions, assessment.category.id)}
            </Accordion>
        )
    }

    const renderCategory = (category) => {
        return (<AccordionSummary expandIcon={<ExpandMoreIcon/>}
                                  style={{background: "linear-gradient(to bottom, rgba(200,200,200,1) 80%, rgba(0, 0, 0, 1) 100%)"}}
                                  id={category.id}>
                <Grid container alignItems={"center"}>
                    <Grid item xs={11} sm={10}>
                        <Typography className={classes.heading}>{parse(category.name)}</Typography>
                    </Grid>
                    <Grid item xs={1} sm={2}>
                        <label className={classes.scoreLabel}>
                            {scoreInfo.size > 0 ?
                                scoreInfo.get(category.id).categoryScore : category.score}
                        </label>
                    </Grid>
                </Grid>
            </AccordionSummary>
        )
    }

    const renderCategoryShortName = (shortName, scoreGuidance) => {
        return (
            <Grid container direction={"column"} className={classes.shortName}>
                <Grid item>
                    {shortName}
                </Grid>
                <Grid item style={{color: "red"}}>
                    Response Guidance: {scoreGuidance}
                </Grid>
            </Grid>
        )
    }

    const renderDataLabel = () => {
        return (
            <Grid container direction="row" justify="space-between" alignItems="center"
                  className={classes.grid} spacing={2}>
                <Grid item xs={1}>
                    #
                </Grid>
                <Grid item xs={8} style={{paddingLeft: 0}}>
                    Item
                </Grid>
                <Grid item xs={3} style={{paddingLeft: 20}}>
                    Response
                </Grid>
            </Grid>
        )
    }

    const renderQuestions = (questions, categoryId) => {
        return questions.map(question => (
            <AccordionDetails key={question.id}>
                <Grid container spacing={2} className={classes.questions}>
                    <Grid item xs={1} style={{paddingLeft: 15}}>
                        {++questionId}
                    </Grid>
                    <Grid item xs={8}>
                        {parse(question.description)}
                    </Grid>
                    <Grid item xs={3}>
                        <ResponseButtons questionId={question.id} categoryId={categoryId}
                                         tabValue={scoreInfo.size > 0 ?
                                             scoreInfo.get(categoryId).questionResponse.get(question.id)
                                             : question.response}
                                         responseHandler={responseTabHandler}/>
                    </Grid>
                </Grid>
            </AccordionDetails>
        ))
    }

    return (
        <Container maxWidth="lg" style={{paddingTop: 30}}>
            {renderAssessmentDataList()}
        </Container>
    );
}
