import React, {useEffect, useState} from 'react';
import {Grid, Divider, Button} from "@material-ui/core";
import Modal from "../../../ui/common/Modal";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import {DropdownWrapper} from "../DropdownWrapper";
import TextField from '@material-ui/core/TextField';
import {
    ASSESSMENT_CATEGORIES_API,
    ASSESSMENT_SCORE_GUIDANCE_API
} from "../../../../constants/api_routes";
import {DELETE_BUTTON_COLOR, NEW_ITEM_ADDITION_ID, SNACKBAR_AUTO_HIDE_DURATION} from "../../../../constants/constants";
import {SERVER_URL} from "../../../../config/config";
import {useSnackbar} from "notistack";
import RemoveIcon from "@material-ui/icons/Remove";
import {ModalConfirmationDialog} from "../../../ui/common/ModalConfirmationDialog";
import {Loading} from "../../../ui/common/Loading";

export const CategoryFormDialog = (props) => {

    const [state, setState] = useState(
        {
            loading: false,
            httpCode: 200,
            categoryId: props.data !== null ? props.data.categoryId : '',
            category: props.data !== null ? props.data.category : '',
            newCategory: '',
            description: props.data !== null ? props.data.categoryShortName : '',
            scoreGuidanceId: props.data !== null ? props.data.scoreGuidanceId : '',
            disableCategoryField: true,
            showDeleteConfirmBox: false,
            categoryData: null,
            error: false,
            errorMsg: '',
            addNewCategory: false
        })
    const {enqueueSnackbar} = useSnackbar();

    const fetchAPI = () => {
        setState({...state, loading: true})
        SERVER_URL.defaults.headers.common['Authorization'] = `bearer ${props.token}`
        SERVER_URL.get(ASSESSMENT_CATEGORIES_API)
            .then((response) => {
                setState({
                    ...state, categoryData: JSON.parse(JSON.stringify(response.data)),
                    loading: false, httpCode: 200
                })
            })
            .catch(error => {
                setState({
                    ...state, showModifyCategoryForm: false, deleteItemId: null,
                    loading: false, httpCode: error.response !== null ? parseInt(error.response.status) : 500
                })
                enqueueSnackbar(`Unable to fetch categories.`,
                    {
                        variant: "error",
                        autoHideDuration: SNACKBAR_AUTO_HIDE_DURATION,
                        preventDuplicate: true
                    })
            })
    }

    useEffect(() => {
        fetchAPI()

        // eslint-disable-next-line
    }, [])

    const fetchCategoryHandler = (id, value) => {

        if (id === NEW_ITEM_ADDITION_ID) {
            setState({
                ...state, disableCategoryField: false, categoryId: id, category: '', newCategory: '',
                scoreGuidanceId: '', description: '', addNewCategory: true
            })
            return
        }

        let category = {}
        for (let i = 0; i < state.categoryData.length; i++) {
            if (state.categoryData[i].categoryId === id) {
                category = state.categoryData[i];
                break;
            }
        }
        console.log("Category Data = " + JSON.stringify(category))
        setState({
            ...state, categoryId: id, category: value, newCategory: '', addNewCategory: false,
            scoreGuidanceId: category.scoreGuidanceId, description: category.categoryShortName
        })
    }

    const fetchScoreGuidanceHandler = (id) => {
        setState({...state, scoreGuidanceId: id})
    }

    const textAreaHandler = (e) => {
        setState({...state, description: e.target.value})
    }

    const categoryInputHandler = (e) => {
            setState({...state, category: e.target.value})
    }

    const newCategoryInputHandler = (e) => {
        setState({...state, newCategory: e.target.value})
    }

    const renderCategoryInput = () => {
        return (
            <Grid container alignItems={"center"} style={{fontSize: "1rem", height: 55}}>
                <Grid item container xs={2} justify={"flex-end"}>
                    Category:
                </Grid>
                <Grid item xs={10} style={{paddingLeft: 5}}>
                    <DropdownWrapper token={props.token}
                                     label={"Category"}
                                     required={true}
                                     addNewOption={true}
                                     ddlMaxWidth={"43vw"}
                                     defaultValue={state.categoryId}
                                     API={ASSESSMENT_CATEGORIES_API}
                                     sendValueHandler={fetchCategoryHandler}/>
                </Grid>
            </Grid>
        )
    }

    const renderInput = (label, handler, value) => {
        return (
            <Grid container alignItems={"center"} style={{fontSize: "1rem", height: 55}}>
                <Grid item container xs={2} justify={"flex-end"}>
                    {`${label}:`}
                </Grid>
                <Grid item xs={10} style={{paddingLeft: 12}}>
                    <TextField id="outlined-basic"
                               style={{width: "100%", maxWidth: "43vw"}}
                               value={value}
                               onChange={handler}
                               inputProps={{style: {height: 0}}}
                               InputLabelProps={{style: {lineHeight: 0}}}
                               variant="outlined"/>
                </Grid>
            </Grid>
        )
    }

    const renderScoreGuidanceInput = () => {
        return (
            <Grid container alignItems={"center"} style={{fontSize: "1rem", height: 55, paddingTop: 10}}>
                <Grid item container xs={2} justify={"flex-end"}>
                    Score Guidance:
                </Grid>
                <Grid item xs={10} style={{paddingLeft: 5}}>
                    <DropdownWrapper token={props.token}
                                     label={"Score Guidance"}
                                     required={true}
                                     ddlMaxWidth={"43vw"}
                                     defaultValue={state.scoreGuidanceId}
                                     API={ASSESSMENT_SCORE_GUIDANCE_API}
                                     sendValueHandler={fetchScoreGuidanceHandler}/>
                </Grid>
            </Grid>
        )
    }

    const renderDescriptionInput = () => {
        return (
            <Grid container alignItems={"center"} style={{fontSize: "1rem", paddingTop: 30, paddingBottom: 30}}>
                <Grid item container xs={2} justify={"flex-end"}>
                    Description:
                </Grid>
                <Grid item xs={9} style={{marginLeft: 13}}>
                    <TextareaAutosize
                        rowsMax={3}
                        rowsMin={2}
                        onChange={textAreaHandler}
                        value={state.description}
                        placeholder="Description"
                        inputMode={"text"}
                        style={{width: "106%", paddingLeft: 10}}
                    />
                </Grid>
            </Grid>
        )
    }

    const saveClickHandler = () => {
        console.log('State = ' + JSON.stringify(state))
        if (state.question === '') {
            setState({...state, error: true, errorMsg: "Error: Question field is required."})
            return
        } else if (state.categoryId === '') {
            setState({...state, error: true, errorMsg: "Error: Category field is required."})
            return
        } else if (state.scoreGuidanceId === '') {
            setState({...state, error: true, errorMsg: "Error: Score guidance field is required."})
            return
        } else if (state.description === '') {
            setState({...state, error: true, errorMsg: "Error: Description field is required."})
            return
        } else if (state.addNewCategory && state.newCategory === '') {
            setState({...state, error: true, errorMsg: "Error: New category field is required."})
            return
        } else if (!state.addNewCategory && state.category === '') {
            setState({...state, error: true, errorMsg: "Error: Edit category field is required."})
            return
        }
        props.confirmedHandler(state)
    }

    const deleteBtnHandler = () => {
        if (parseInt(state.categoryId) === NEW_ITEM_ADDITION_ID) {
            enqueueSnackbar(`Cannot delete selected option.`,
                {
                    variant: "warning",
                    autoHideDuration: SNACKBAR_AUTO_HIDE_DURATION,
                    preventDuplicate: true
                })
            return
        }

        if (state.category !== undefined && state.category !== '') {
            setState({...state, showDeleteConfirmBox: true})
        }
    }

    const deleteBtnConfirmHandler = () => {
        setState({...state, loading: true, showDeleteConfirmBox: false})
        SERVER_URL.defaults.headers.common['Authorization'] = `bearer ${props.token}`
        SERVER_URL.delete(`${ASSESSMENT_CATEGORIES_API}/${state.categoryId}`)
            .then(() => {
                setState({...state, showDeleteConfirmBox: false, loading: false, httpCode: 200})
                enqueueSnackbar(`Category deleted successfully.`,
                    {
                        variant: "success",
                        autoHideDuration: SNACKBAR_AUTO_HIDE_DURATION,
                        preventDuplicate: true
                    })
                props.cancelHandler()
                props.deleteCategoryHandler()
            })
            .catch(error => {
                setState({
                    ...state, showDeleteConfirmBox: false, loading: false,
                    httpCode: error.response !== null ? parseInt(error.response.status) : 500
                })

                enqueueSnackbar(`Unable to delete category.`,
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
                        Edit Category
                    </Grid>

                    <Grid item style={{color: "black", fontSize: 14, fontWeight: 600}}>
                        {renderCategoryInput()}
                    </Grid>
                    <Grid item style={{color: "black", fontSize: 14, fontWeight: 600}}>
                        {state.addNewCategory? renderInput("Add Category", newCategoryInputHandler, state.newCategory)
                            : renderInput("Edit Category", categoryInputHandler, state.category)}
                    </Grid>
                    <Grid item style={{color: "black", fontSize: 14, fontWeight: 600}}>
                        {renderScoreGuidanceInput()}
                    </Grid>

                    <Grid item style={{color: "black", fontSize: 14, fontWeight: 600}}>
                        {renderDescriptionInput()}
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
                    question={`Are you sure you want to delete this category "${state.category}" permanently?`}
                /> : null}
            {state.loading ? <Loading/> : null}
        </>
    )
}