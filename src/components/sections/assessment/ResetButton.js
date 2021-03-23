import React, {useState} from 'react'
import ReplayIcon from '@material-ui/icons/Replay';
import {ButtonWithToolTip} from "../../ui/assessment/ButtonWithToolTip";
import {useDispatch} from "react-redux";
import {RESET_TOTAL_SCORE} from "../../../actions/types";
import {SERVER_URL} from "../../../config/config";
import {useSnackbar} from "notistack";
import {SNACKBAR_AUTO_HIDE_DURATION} from "../../../constants/constants";
import {RESET_ASSESSMENT_API} from "../../../constants/api_routes";
import {ModalConfirmationDialog} from "../../ui/common/ModalConfirmationDialog";

export function ResetButton(props) {
    const dispatch = useDispatch();
    const [resetState, setResetState] = useState({
        loading: false, httpCode: 200, resetConfirm: false
    });
    const {enqueueSnackbar} = useSnackbar();

    // TODO: Create a component to display this message
    if (resetState.httpCode !== 200 && resetState.httpCode !== 404) {
        enqueueSnackbar(`Assessment reset failed.`,
            {
                variant: "error",
                autoHideDuration: SNACKBAR_AUTO_HIDE_DURATION,
                preventDuplicate: true
            })
        return <div>Error is occurred</div>
    }

    const resetBtnHandler = () => {
        setResetState({...resetState, resetConfirm: true})
    }

    const resetCancelBtnHandler = () => {
        setResetState({...resetState, resetConfirm: false})
    }

    const resetConfirmBtnHandler = async () => {
        if (props.token !== null && props.token !== undefined) {
            setResetState({...resetState, dataLoading: true, httpCode: 200})
            dispatch({type: RESET_TOTAL_SCORE})
            SERVER_URL.defaults.headers.common['Authorization'] = `bearer ${props.token}`
            await SERVER_URL.put(RESET_ASSESSMENT_API)
                .then((resp) => {
                    setResetState({...resetState, dataLoading: false, httpCode: 200})
                    enqueueSnackbar(`Assessment reset successful.`,
                        {
                            variant: "success",
                            autoHideDuration: SNACKBAR_AUTO_HIDE_DURATION,
                            preventDuplicate: true
                        })
                })
                .catch(err => {
                    setResetState({
                        ...resetState, dataLoading: false,
                        httpCode: parseInt(err.response.status)
                    })
                })
            setResetState({...resetState, resetConfirm: false})
        }
    }

    return (
        <>
            <ButtonWithToolTip text="Reset" icon={<ReplayIcon/>}
                               btnHandler={resetBtnHandler}
                               position="top"
                               tooltip="Reset your current and saved responses."/>

            {resetState.resetConfirm ?
                <ModalConfirmationDialog
                    confirmedHandler={resetConfirmBtnHandler}
                    cancelHandler={resetCancelBtnHandler}
                    question="This will reset your current and saved progress. Are you sure you want to reset your responses?"
                /> : null}
        </>
    )
}

