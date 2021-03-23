import React, {useState} from 'react';
import {Grid, Divider, Button} from "@material-ui/core";
import Modal from "../../../ui/common/Modal";
import {DropdownWrapper} from "../DropdownWrapper";
import TextField from '@material-ui/core/TextField';
import {ASSESSMENT_CATEGORIES_API} from "../../../../constants/api_routes";

export const AssessmentFormDialog = (props) => {

    const [state, setState] = useState(
        {
            questionId: props.updateId !== null ? props.updateId : null,
            question: props.data !== null ? props.data.question : '',
            categoryId: props.data !== null ? props.data.categoryId : '',
            category: props.data !== null ? props.data.category : null,
            scoreGuidanceId: props.data !== null ? props.data.scoreGuidanceId : '',
            scoreGuidance: props.data !== null ? props.data.scoreGuidance : null,
            description: props.data !== null ? props.data.categoryShortName : null,
            error: false,
            errorMsg: ''
        })

    const fetchCategoryHandler = (id, value) => {
        setState({...state, categoryId: id, category: value})
    }

    const questionChangeHandler = (e) => {
        setState({...state, question: e.target.value})
    }

    const renderUpdateId = () => {
        return (
            <Grid container alignItems={"center"} style={{fontSize: "1rem", height: 50}}>
                <Grid item container xs={2} justify={"flex-end"}>
                    Question Id:
                </Grid>
                <Grid item style={{marginLeft: 12}}>
                    {props.updateId}
                </Grid>
            </Grid>
        )
    }

    const renderQuestionInput = () => {
        return (
            <Grid container alignItems={"center"} style={{fontSize: "1rem", height: 55}}>
                <Grid item container xs={2} justify={"flex-end"}>
                    Question:
                </Grid>
                <Grid item xs={10}>
                    <TextField id="question-field"
                               value={state.question}
                               style={{width: "95%", marginLeft: 12}}
                               required={true}
                               onChange={questionChangeHandler}
                               inputProps={{style: {height: 0}}}
                               InputLabelProps={{style: {lineHeight: 0}}}
                               label="Question" variant="outlined"/>

                </Grid>
            </Grid>
        )
    }

    const renderCategoryInput = () => {
        return (
            <Grid container alignItems={"center"} style={{fontSize: "1rem", height: 55, paddingTop: 10}}>
                <Grid item container xs={2} justify={"flex-end"}>
                    Category:
                </Grid>
                <Grid item xs={10} style={{paddingLeft: 5}}>
                    <DropdownWrapper token={props.token}
                                     label={"Category"}
                                     required={true}
                                     ddlMaxWidth={"43vw"}
                                     defaultValue={state.categoryId}
                                     API={ASSESSMENT_CATEGORIES_API}
                                     sendValueHandler={fetchCategoryHandler}/>
                </Grid>
            </Grid>
        )
    }

    const saveClickHandler = () => {
        console.log('State = ' + JSON.stringify(state))
        if (state.question === '') {
            setState({...state, error: true, errorMsg: "Error: Question must not be empty."})
            return
        } else if (state.categoryId === '') {
            setState({...state, error: true, errorMsg: "Error: Category is required."})
            return
        }
        props.confirmedHandler(state)
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
                        {props.title}
                    </Grid>

                    {
                        props.updateId !== null ?
                            <Grid item style={{color: "black", fontSize: 14, fontWeight: 600}}>
                                {renderUpdateId()}
                            </Grid> : null
                    }

                    <Grid item style={{color: "black", fontSize: 14, fontWeight: 600}}>
                        {renderQuestionInput()}
                    </Grid>
                    <Grid item style={{color: "black", fontSize: 14, fontWeight: 600}}>
                        {renderCategoryInput()}
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
        <Modal renderWarningComponent={renderDialogBox()}
               modalWidth="800px"
               closeHandler={props.cancelHandler}/>
    )
}