import React, {useEffect, useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {SERVER_URL} from "../../../../config/config";
import {
    ASSESSMENT_CATEGORIES_API,
    ASSESSMENT_DATA_API,
    ASSESSMENT_QUESTIONS_API,
} from "../../../../constants/api_routes";
import {InternalServerError} from "../../errors/InternalServerError";
import VirtualTable from "../VirtualTable";
import {Loading} from "../../../ui/common/Loading";
import {DropdownWrapper} from "../DropdownWrapper";
import {ModalConfirmationDialog} from "../../../ui/common/ModalConfirmationDialog";
import {AssessmentFormDialog} from "../dialog/AssessmentFormDialog";
import AddNewQuestionButton from "../button/AddNewQuestionButton";
import {useSnackbar} from "notistack";
import {
    DELETE_BUTTON_COLOR,
    DOWNLOAD_BUTTON_COLOR,
    EDIT_ACTION_TYPE,
    SNACKBAR_AUTO_HIDE_DURATION
} from "../../../../constants/constants";
import ModifyCategoryButton from "../button/ModifyCategoryButton";
import ModifyScoreGuidanceButton from "../button/ModifyScoreGuidanceButton";
import {CSVLink} from "react-csv";
import {Button} from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import RemoveIcon from "@material-ui/icons/Remove";
import {DataNotFound} from "../../errors/DataNotFound";
import {useSelector} from "react-redux";
import DarkToolTip from "../../../ui/assessment/DarkToolTip";

const assessmentDataAttributes = [
    {
        width: 50,
        label: 'Id',
        dataKey: 'questionId',
        numeric: true
    },
    {
        width: 250,
        label: 'Question',
        dataKey: 'question',
    },
    {
        width: 200,
        label: 'Category',
        dataKey: 'category',
    },
    {
        width: 700,
        label: 'Description',
        dataKey: 'categoryShortName',
    },
    {
        width: 250,
        label: 'Action',
        dataKey: 'questionId',
        numeric: true
    }
]

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        backgroundColor: 'white'
    },
    button: {
        paddingBottom: 15
    },
    exportButton: {
        color: '#FFFFFF',
        textDecoration: 'none'
    }
}));

export function AssessmentDataView() {
    const classes = useStyles();
    const [state, setState] = useState({
        data: null,
        loading: false,
        httpCode: 200,
        showDeleteConfirmBox: false,
        deleteItemId: null,
        showAssessmentForm: false,
        updateItemId: null,
        showDeleteAllConfirmBox: false,
        selectedCategoryId: 0,
        dataMap: new Map()
    })
    const {enqueueSnackbar} = useSnackbar();
    const token = useSelector(state => state.adminTokenReducer)

    const fetchAssessmentData = (API, forcedUpdateToDefault = false) => {
        setState({...state, loading: true})

        SERVER_URL.defaults.headers.common['Authorization'] = `bearer ${token}`
        SERVER_URL.get(forcedUpdateToDefault ? API : state.selectedCategoryId > 0 ?
            `${API}/${state.selectedCategoryId}` : API)
            .then(response => {
                let responseData = JSON.parse(JSON.stringify(response.data))

                // eslint-disable-next-line array-callback-return
                responseData.map(assessment => {
                    state.dataMap.set(assessment.questionId, assessment)
                })

                setState({
                    ...state, data: responseData,
                    loading: false, httpCode: 200,
                    showDeleteConfirmBox: false, showAssessmentForm: false
                })
            })
            .catch(error => {
                console.error("Error fetching API....")
                if (error.response !== undefined) {
                    setState({
                        ...state,
                        loading: false,
                        httpCode: error.response !== null ? parseInt(error.response.status) : 500
                    })
                    enqueueSnackbar(`Unable to fetch data.`,
                        {
                            variant: "error",
                            autoHideDuration: SNACKBAR_AUTO_HIDE_DURATION,
                            preventDuplicate: true
                        })
                } else {
                    setState({
                        ...state, loading: false, httpCode: 204
                    })
                }
            })
    }

    useEffect(() => {
        console.log('Component Did Mount')

        if (token !== null && token !== undefined) {
            fetchAssessmentData(ASSESSMENT_DATA_API)
        }

        // eslint-disable-next-line
    }, [state.showDeleteAllConfirmBox, state.selectedCategoryId, token])

    if (token === null) {
        return null
    }

    if (state.httpCode === 500) {
        // go here and check for error code
        // display error.
        // Internal server error
        return <InternalServerError/>
    }

    const fetchCategoryHandler = (id) => {
        try {
            setState({...state, selectedCategoryId: parseInt(id)})
        } catch (e) {
            console.error("Unable to convert category id.")
        }
    }

    const deleteBtnHandler = (id) => {
        setState({...state, showDeleteConfirmBox: true, deleteItemId: id})
    }

    const deleteBtnCloseHandler = () => {
        setState({...state, showDeleteConfirmBox: false, deleteItemId: null})
    }

    const deleteBtnConfirmHandler = () => {
        setState({...state, loading: true, showDeleteConfirmBox: false})

        SERVER_URL.defaults.headers.common['Authorization'] = `bearer ${token}`
        SERVER_URL.delete(`${ASSESSMENT_QUESTIONS_API}/${state.deleteItemId}`)
            .then(() => {
                setState({...state, loading: false, showDeleteConfirmBox: false})
                enqueueSnackbar(`Question deleted successfully.`,
                    {
                        variant: "success",
                        autoHideDuration: SNACKBAR_AUTO_HIDE_DURATION,
                        preventDuplicate: true
                    })
                fetchAssessmentData(ASSESSMENT_DATA_API)
            })
            .catch(error => {
                setState({
                    ...state, showDeleteConfirmBox: false, deleteItemId: null,
                    loading: false, httpCode: error.response !== null ? parseInt(error.response.status) : 500
                })
                enqueueSnackbar(`Unable to delete question.`,
                    {
                        variant: "error",
                        autoHideDuration: SNACKBAR_AUTO_HIDE_DURATION,
                        preventDuplicate: true
                    })
            })
    }

    const updateBtnHandler = (id) => {
        setState({...state, showAssessmentForm: true, updateItemId: id})
    }

    const updateBtnConfirmHandler = (updateInfo) => {
        const requestBody = {
            categoryId: updateInfo.categoryId,
            question: updateInfo.question,
            questionId: updateInfo.questionId,
        }

        setState({...state, loading: true, showAssessmentForm: false})
        SERVER_URL.defaults.headers.common['Authorization'] = `bearer ${token}`
        SERVER_URL.put(ASSESSMENT_DATA_API, requestBody)
            .then(() => {
                setState({...state, loading: false, showAssessmentForm: false})
                enqueueSnackbar(`Question updated successfully.`,
                    {
                        variant: "success",
                        autoHideDuration: SNACKBAR_AUTO_HIDE_DURATION,
                        preventDuplicate: true
                    })
                fetchAssessmentData(ASSESSMENT_DATA_API)
            })
            .catch(error => {
                setState({
                    ...state, showAssessmentForm: false, deleteItemId: null,
                    loading: false, httpCode: error.response !== null ? parseInt(error.response.status) : 500
                })
                enqueueSnackbar(`Unable to update question.`,
                    {
                        variant: "error",
                        autoHideDuration: SNACKBAR_AUTO_HIDE_DURATION,
                        preventDuplicate: true
                    })
            })
    }

    const updateBtnCloseHandler = () => {
        setState({...state, showAssessmentForm: false, updateItemId: null})
    }


    const deleteAllBtnHandler = () => {
        setState({...state, showDeleteAllConfirmBox: true})
    }

    const deleteAllBtnConfirmHandler = () => {
        setState({...state, loading: true, showDeleteAllConfirmBox: false})
        SERVER_URL.defaults.headers.common['Authorization'] = `bearer ${token}`
        SERVER_URL.delete(ASSESSMENT_DATA_API)
            .then(() => {
                setState({...state, showDeleteAllConfirmBox: false, data: null, loading: false, httpCode: 200})
                enqueueSnackbar(`Questions, categories and score guidance are deleted successfully.`,
                    {
                        variant: "success",
                        autoHideDuration: SNACKBAR_AUTO_HIDE_DURATION,
                        preventDuplicate: true
                    })
            })
            .catch(error => {
                setState({
                    ...state, showDeleteAllConfirmBox: false, loading: false,
                    httpCode: error.response !== null ? parseInt(error.response.status) : 500
                })

                enqueueSnackbar(`Unable to delete self-assessment data.`,
                    {
                        variant: "error",
                        autoHideDuration: SNACKBAR_AUTO_HIDE_DURATION,
                        preventDuplicate: true
                    })
            })
    }

    const deleteAllBtnCloseHandler = () => {
        setState({...state, showDeleteAllConfirmBox: false})
    }

    const getCurrentDateTime = () => {
        let dateTime = new Date()
        let year = dateTime.getFullYear()
        let month = dateTime.getMonth()
        let date = dateTime.getDate()
        let hour = dateTime.getHours()
        let minutes = dateTime.getMinutes()
        let seconds = dateTime.getSeconds()

        return `${month}-${date}-${year}_${hour}_${minutes}_${seconds}`
    }

    return (
        <div className={classes.root}>
            <Grid container direction={"column"} justify={"center"}>
                <Grid item xs={12} style={{
                    fontWeight: "bold",
                    fontSize: "2rem", alignSelf: "center", padding: "20px 0"
                }}>
                    Assessment Data
                </Grid>

                <Grid container spacing={2} alignItems={"center"} style={{paddingLeft: 20}}>
                    <Grid item style={{fontSize: "1rem"}}>
                        Filter By:
                    </Grid>
                    <Grid item xs={3}>
                        <DropdownWrapper token={token}
                                         label={"Category"}
                                         defaultValue={0}
                                         required={false}
                                         assessmentData={state.data}
                                         allCategories={true}
                                         API={ASSESSMENT_CATEGORIES_API}
                                         sendValueHandler={fetchCategoryHandler}/>
                    </Grid>

                    <Grid item>
                        <ModifyScoreGuidanceButton data={state.data}
                                                   fetchAssessmentData={fetchAssessmentData} token={token}/>
                    </Grid>

                    <Grid item>
                        <ModifyCategoryButton data={state.data}
                                              fetchAssessmentData={fetchAssessmentData} token={token}/>
                    </Grid>

                    <Grid item>
                        <AddNewQuestionButton fetchAssessmentData={fetchAssessmentData} token={token}/>
                    </Grid>

                    <Grid item>
                        <DarkToolTip title="Delete all assessment data." position={"top"} component={
                            <Button variant="contained"
                                    startIcon={<RemoveIcon/>}
                                    onClick={deleteAllBtnHandler}
                                    style={{
                                        fontSize: "0.9rem", width: "100%",
                                        color: 'white',
                                        backgroundColor: DELETE_BUTTON_COLOR
                                    }}>
                                Delete All
                            </Button>}/>
                    </Grid>

                    <Grid item>
                        {state.data !== null ? <Button variant="contained" startIcon={<GetAppIcon/>}
                                                       style={{backgroundColor: DOWNLOAD_BUTTON_COLOR}}>
                            <CSVLink data={state.data} className={"exportButton"}
                                     filename={`Self-Assessment-Data-${getCurrentDateTime()}.csv`}>
                                Download CSV
                            </CSVLink>
                        </Button> : null}
                    </Grid>
                </Grid>

                {state.httpCode !== 204 ? <VirtualTable rowHeight={120}
                                                        actionType={EDIT_ACTION_TYPE}
                                                        data={state.data}
                                                        actionColumnIndex={4}
                                                        deleteHandler={deleteBtnHandler}
                                                        updateHandler={updateBtnHandler}
                                                        attributes={assessmentDataAttributes}/> : <DataNotFound/>
                }
            </Grid>
            {state.showAssessmentForm ?
                <AssessmentFormDialog
                    confirmedHandler={updateBtnConfirmHandler}
                    cancelHandler={updateBtnCloseHandler}
                    token={token}
                    updateId={state.updateItemId}
                    data={state.updateItemId !== null ? state.dataMap.get(state.updateItemId) : null}
                    title={"Update Question"}
                /> : null}
            {state.showDeleteConfirmBox ?
                <ModalConfirmationDialog
                    confirmedHandler={deleteBtnConfirmHandler}
                    cancelHandler={deleteBtnCloseHandler}
                    question={`Are you sure you want to delete this question id "${state.deleteItemId}" permanently?`}
                /> : null}
            {state.showDeleteAllConfirmBox ?
                <ModalConfirmationDialog
                    confirmedHandler={deleteAllBtnConfirmHandler}
                    cancelHandler={deleteAllBtnCloseHandler}
                    question={`Are you sure you want to delete all the questions, categories and score guidance permanently?`}
                /> : null}
            {state.loading ? <Loading/> : null}
        </div>
    );
}