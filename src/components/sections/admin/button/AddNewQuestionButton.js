import React from 'react';
import {Button} from "@material-ui/core";
import {AssessmentFormDialog} from "../dialog/AssessmentFormDialog";
import {SERVER_URL} from "../../../../config/config";
import {ASSESSMENT_DATA_API, ASSESSMENT_QUESTIONS_API} from "../../../../constants/api_routes";
import {Loading} from "../../../ui/common/Loading";
import {SNACKBAR_AUTO_HIDE_DURATION} from "../../../../constants/constants";
import {useSnackbar} from "notistack";
import AddIcon from '@material-ui/icons/Add';

export default function AddNewQuestionButton({token, fetchAssessmentData}) {
    const [state, setState] = React.useState({
        showAssessmentForm: false,
        loading: false,
        httpCode: 200,
    });
    const {enqueueSnackbar} = useSnackbar();

    const clickHandler = () => {
        setState({...state, showAssessmentForm: true})
    }

    const newQuestionBtnConfirmHandler = (addInfo) => {
        const requestBody = {
            categoryId: addInfo.categoryId,
            question: addInfo.question,
        }

        setState({...state, loading: true, showAssessmentForm: false})
        SERVER_URL.defaults.headers.common['Authorization'] = `bearer ${token}`
        SERVER_URL.post(ASSESSMENT_QUESTIONS_API, requestBody)
            .then(() => {
                enqueueSnackbar(`New question added successfully.`,
                    {
                        variant: "success",
                        autoHideDuration: SNACKBAR_AUTO_HIDE_DURATION,
                        preventDuplicate: true
                    })
                setState({...state, loading: false, showAssessmentForm: false})
                fetchAssessmentData(ASSESSMENT_DATA_API)
            })
            .catch(error => {
                setState({
                    ...state, showDeleteConfirmBox: false, deleteItemId: null,
                    loading: false, httpCode: error.response !== null ? parseInt(error.response.status) : 500
                })
                enqueueSnackbar(`Unable to add new question.`,
                    {
                        variant: "error",
                        autoHideDuration: SNACKBAR_AUTO_HIDE_DURATION,
                        preventDuplicate: true
                    })
            })
    }

    const newQuestionBtnCloseHandler = () => {
        setState({...state, showAssessmentForm: false})
    }

    return (
        <>
            <Button variant="contained"
                    startIcon={<AddIcon/>}
                    color="primary" onClick={clickHandler}>
                Add Question
            </Button>
            {state.showAssessmentForm ?
                <AssessmentFormDialog
                    confirmedHandler={newQuestionBtnConfirmHandler}
                    cancelHandler={newQuestionBtnCloseHandler}
                    token={token}
                    data={null}
                    updateId={null}
                    title={"Add Question"}
                /> : null}
            {state.loading ? <Loading/> : null}
        </>
    );
}
