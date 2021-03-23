import React from 'react';
import {Button} from "@material-ui/core";
import {SERVER_URL} from "../../../../config/config";
import {
    ASSESSMENT_SCORE_GUIDANCE_API
} from "../../../../constants/api_routes";
import {Loading} from "../../../ui/common/Loading";
import {NEW_ITEM_ADDITION_ID, SNACKBAR_AUTO_HIDE_DURATION, UPDATE_BUTTON_COLOR} from "../../../../constants/constants";
import {useSnackbar} from "notistack";
import {ScoreGuidanceFormDialog} from "../dialog/ScoreGuidanceFormDialog";
import EditIcon from '@material-ui/icons/Edit';

export default function ModifyScoreGuidanceButton({token, fetchAssessmentData, data}) {
    const [state, setState] = React.useState({
        showModifyCategoryForm: false,
        loading: false,
        httpCode: 200,
    });
    const {enqueueSnackbar} = useSnackbar();

    const clickHandler = () => {
        setState({...state, showModifyCategoryForm: true})
    }

    const modifyBtnConfirmHandler = (stateInfo) => {
        let requestBody;
        setState({...state, loading: true, showModifyCategoryForm: false})
        SERVER_URL.defaults.headers.common['Authorization'] = `bearer ${token}`
        if (stateInfo.scoreGuidanceId === NEW_ITEM_ADDITION_ID) {
            requestBody = {
                scoreGuidanceId: stateInfo.scoreGuidanceId,
                scoreGuidance: stateInfo.newScoreGuidance
            }

            SERVER_URL.post(ASSESSMENT_SCORE_GUIDANCE_API, requestBody)
                .then(() => {
                    enqueueSnackbar(`New score guidance added successfully.`,
                        {
                            variant: "success",
                            autoHideDuration: SNACKBAR_AUTO_HIDE_DURATION,
                            preventDuplicate: true
                        })
                    setState({...state, loading: false, showModifyCategoryForm: false})
                })
                .catch(error => {
                    setState({
                        ...state, showModifyCategoryForm: false, deleteItemId: null,
                        loading: false, httpCode: error.response !== null ? parseInt(error.response.status) : 500
                    })
                    enqueueSnackbar(`Unable to add new score guidance.`,
                        {
                            variant: "error",
                            autoHideDuration: SNACKBAR_AUTO_HIDE_DURATION,
                            preventDuplicate: true
                        })
                    setState({...state, loading: false, showModifyCategoryForm: false})
                })
        } else {
            requestBody = {
                scoreGuidanceId: stateInfo.scoreGuidanceId,
                scoreGuidance: stateInfo.scoreGuidance
            }

            SERVER_URL.put(ASSESSMENT_SCORE_GUIDANCE_API, requestBody)
                .then(() => {
                    enqueueSnackbar(`Score guidance updated successfully.`,
                        {
                            variant: "success",
                            autoHideDuration: SNACKBAR_AUTO_HIDE_DURATION,
                            preventDuplicate: true
                        })
                    setState({...state, loading: false, showModifyCategoryForm: false})
                })
                .catch(error => {
                    setState({
                        ...state, showModifyCategoryForm: false, deleteItemId: null,
                        loading: false, httpCode: error.response !== null ? parseInt(error.response.status) : 500
                    })
                    enqueueSnackbar(`Unable to update score guidance.`,
                        {
                            variant: "error",
                            autoHideDuration: SNACKBAR_AUTO_HIDE_DURATION,
                            preventDuplicate: true
                        })
                })
        }
    }

    const modifyBtnCloseHandler = () => {
        setState({...state, showModifyCategoryForm: false})
    }

    return (
        <>
            <Button variant="contained"
                    startIcon={<EditIcon/>}
                    style={{backgroundColor: UPDATE_BUTTON_COLOR}} onClick={clickHandler}>
                Edit Score Guidance
            </Button>
            {state.showModifyCategoryForm ?
                <ScoreGuidanceFormDialog
                    confirmedHandler={modifyBtnConfirmHandler}
                    cancelHandler={modifyBtnCloseHandler}
                    token={token}
                    data={data}
                /> : null}
            {state.loading ? <Loading/> : null}
        </>
    );
}
