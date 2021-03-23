import React, {useState} from 'react';
import {Grid, Divider, Button} from "@material-ui/core";
import Modal from "../../../ui/common/Modal";
import {DropdownWrapper} from "../DropdownWrapper";
import TextField from '@material-ui/core/TextField';
import {
    ASSESSMENT_SCORE_GUIDANCE_API
} from "../../../../constants/api_routes";
import {DELETE_BUTTON_COLOR, NEW_ITEM_ADDITION_ID, SNACKBAR_AUTO_HIDE_DURATION} from "../../../../constants/constants";
import {ModalConfirmationDialog} from "../../../ui/common/ModalConfirmationDialog";
import {SERVER_URL} from "../../../../config/config";
import RemoveIcon from "@material-ui/icons/Remove";
import {useSnackbar} from "notistack";
import {Loading} from "../../../ui/common/Loading";

export const ScoreGuidanceFormDialog = (props) => {

    const [state, setState] = useState(
        {
            loading: false,
            httpCode: 200,
            scoreGuidanceId: props.data !== null ? props.data.scoreGuidanceId : '',
            scoreGuidance: props.data !== null ? props.data.scoreGuidance : '',
            newScoreGuidance: '',
            scoreGuidanceData: null,
            showDeleteConfirmBox: false,
            error: false,
            errorMsg: '',
            addNewItem: false
        })
    const {enqueueSnackbar} = useSnackbar();

    const fetchScoreGuidanceHandler = (id, value) => {

        if (id === NEW_ITEM_ADDITION_ID) {
            setState({
                ...state, scoreGuidanceId: id, scoreGuidance: '', newScoreGuidance: '', addNewItem: true
            })
            return
        }

        setState({
            ...state, scoreGuidanceId: id, scoreGuidance: value, newScoreGuidance: '', addNewItem: false
        })
    }

    const scoreGuidanceInputHandler = (e) => {
        setState({...state, scoreGuidance: e.target.value})
    }

    const newScoreGuidanceInputHandler = (e) => {
        setState({...state, newScoreGuidance: e.target.value})
    }

    const renderScoreGuidanceInput = () => {
        return (
            <Grid container alignItems={"center"} style={{fontSize: "1rem", height: 55}}>
                <Grid item container xs={3} justify={"flex-end"}>
                    Score Guidance:
                </Grid>
                <Grid item xs={9} style={{paddingLeft: 5}}>
                    <DropdownWrapper token={props.token}
                                     label={"Score Guidance"}
                                     required={true}
                                     addNewOption={true}
                                     ddlMaxWidth={"39vw"}
                                     defaultValue={state.scoreGuidanceId}
                                     API={ASSESSMENT_SCORE_GUIDANCE_API}
                                     sendValueHandler={fetchScoreGuidanceHandler}/>
                </Grid>
            </Grid>
        )
    }

    const renderInput = (label, handler, value) => {
        return (
            <Grid container alignItems={"center"} style={{fontSize: "1rem", height: 55}}>
                <Grid item container xs={3} justify={"flex-end"}>
                    {`${label}:`}
                </Grid>
                <Grid item xs={9} style={{paddingLeft: 12}}>
                    <TextField id="outlined-basic"
                               style={{width: "96%", maxWidth: "43vw"}}
                               value={value}
                               onChange={handler}
                               inputProps={{style: {height: 0}}}
                               InputLabelProps={{style: {lineHeight: 0}}}
                               variant="outlined"/>
                </Grid>
            </Grid>
        )
    }

    const saveClickHandler = () => {
        console.log('State = ' + JSON.stringify(state))
        if (state.addNewItem && state.newScoreGuidance === '') {
            setState({
                ...state,
                error: true,
                errorMsg: "Error: New Score guidance field is required."
            })
            return
        } else if (state.scoreGuidanceId === '') {
            setState({
                ...state,
                error: true,
                errorMsg: "Error: Select score guidance field is required."
            })
            return
        } else if (!state.addNewItem && state.scoreGuidance === '') {
            setState({
                ...state,
                error: true,
                errorMsg: "Error: Edit score guidance field is required."
            })
            return
        }
        props.confirmedHandler(state)
    }

    const deleteBtnHandler = () => {
        console.log("state.scoreGuidanceId ======> " + state.scoreGuidanceId)
        if(state.scoreGuidanceId === NEW_ITEM_ADDITION_ID) {
            enqueueSnackbar(`Cannot delete selected option.`,
                {
                    variant: "warning",
                    autoHideDuration: SNACKBAR_AUTO_HIDE_DURATION,
                    preventDuplicate: true
                })
            return
        }

        if (state.scoreGuidance !== undefined && state.scoreGuidance !== '') {
            setState({...state, showDeleteConfirmBox: true})
        }
    }

    const deleteBtnConfirmHandler = () => {
        setState({...state, loading: true})
        SERVER_URL.defaults.headers.common['Authorization'] = `bearer ${props.token}`
        SERVER_URL.delete(`${ASSESSMENT_SCORE_GUIDANCE_API}/${state.scoreGuidanceId}`)
            .then(() => {
                setState({...state, showDeleteConfirmBox: false, loading: false, httpCode: 200})
                enqueueSnackbar(`Score guidance deleted successfully.`,
                    {
                        variant: "success",
                        autoHideDuration: SNACKBAR_AUTO_HIDE_DURATION,
                        preventDuplicate: true
                    })
                props.cancelHandler()
            })
            .catch(error => {
                if (error.response !== null) {
                    setState({
                        ...state, showDeleteConfirmBox: false, loading: false,
                        httpCode: parseInt(error.response.status)
                    })
                }

                enqueueSnackbar(`Unable to delete score guidance.`,
                    {
                        variant: "error",
                        autoHideDuration: SNACKBAR_AUTO_HIDE_DURATION,
                        preventDuplicate: true
                    })
                props.cancelHandler()
            })
    }

    const deleteBtnCloseHandler = () => {
        setState({...state, showDeleteConfirmBox: false})
    }

    const renderDialogBox = () => {
        return (
            <Grid container direction="column">

                <Grid item container direction="column" style={{padding: "0.7em"}}>
                    <Grid item
                          style={{
                              color: "#9c9917", alignSelf: 'center',
                              fontSize: "1.5rem", fontWeight: "bolder", paddingBottom: "1rem"
                          }}>
                        Edit Score Guidance
                    </Grid>

                    <Grid item style={{color: "black", fontSize: 14, fontWeight: 600}}>
                        {renderScoreGuidanceInput()}
                    </Grid>

                    <Grid item style={{color: "black", fontSize: 14, fontWeight: 600}}>
                        {state.addNewItem? renderInput("Add Score Guidance", newScoreGuidanceInputHandler, state.newScoreGuidance)
                            : renderInput("Edit Score Guidance", scoreGuidanceInputHandler, state.scoreGuidance)}
                    </Grid>

                    {
                        state.error ? <Grid item style={{
                            color: "red",
                            fontSize: 14,
                            fontWeight: 700,
                            paddingTop: 20,
                            paddingLeft: 80
                        }}>
                            {state.errorMsg}
                        </Grid> : null
                    }

                </Grid>

                <Grid item>
                    <Divider style={{width: "inherit", height: 1}}/>
                </Grid>

                <Grid item xs={12}>
                    <Grid container spacing={2} justify={"flex-end"} alignItems={"center"} style={{padding: 10}}>
                        <Grid item xs={2}>
                            <Button variant="contained"
                                    startIcon={<RemoveIcon/>}
                                    onClick={deleteBtnHandler}
                                    style={{
                                        fontSize: "0.9rem", width: "100%",
                                        color: 'white',
                                        backgroundColor: DELETE_BUTTON_COLOR
                                    }}>
                                Delete
                            </Button>
                        </Grid>

                        <div style={{display: "flex", flexGrow: 1}}/>

                        <Grid item xs={2}>
                            <Button variant="contained" color={"primary"}
                                    onClick={saveClickHandler}
                                    style={{fontSize: "0.9rem", width: "100%"}}>
                                Save
                            </Button>
                        </Grid>

                        <Grid item xs={2}>
                            <Button variant={"outlined"} color={"secondary"} onClick={props.cancelHandler}
                                    style={{fontSize: "0.9rem", width: "100%"}}>
                                Cancel
                            </Button>
                        </Grid>

                    </Grid>
                </Grid>

            </Grid>
        )
    }

    return (
        <>
            <Modal renderWarningComponent={renderDialogBox()}
                   modalWidth="800px"
                   closeHandler={props.cancelHandler}/>
            {state.showDeleteConfirmBox ?
                <ModalConfirmationDialog
                    confirmedHandler={deleteBtnConfirmHandler}
                    cancelHandler={deleteBtnCloseHandler}
                    question={`Are you sure you want to delete this score guidance "${state.scoreGuidance}" permanently?`}
                /> : null}
            {state.loading? <Loading/> : null}
        </>
    )
}