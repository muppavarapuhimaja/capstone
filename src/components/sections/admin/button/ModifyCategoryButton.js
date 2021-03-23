import React from 'react';
import {Button} from "@material-ui/core";
import {SERVER_URL} from "../../../../config/config";
import {ASSESSMENT_CATEGORIES_API, ASSESSMENT_DATA_API} from "../../../../constants/api_routes";
import {Loading} from "../../../ui/common/Loading";
import {NEW_ITEM_ADDITION_ID, SNACKBAR_AUTO_HIDE_DURATION, UPDATE_BUTTON_COLOR} from "../../../../constants/constants";
import {useSnackbar} from "notistack";
import {CategoryFormDialog} from "../dialog/CategoryFormDialog";
import EditIcon from "@material-ui/icons/Edit";

export default function ModifyCategoryButton({token, fetchAssessmentData, data}) {
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
        if (stateInfo.categoryId === NEW_ITEM_ADDITION_ID) {
            requestBody = {
                category: stateInfo.newCategory,
                categoryShortName: stateInfo.description,
                scoreGuidanceId: stateInfo.scoreGuidanceId
            }

            SERVER_URL.post(ASSESSMENT_CATEGORIES_API, requestBody)
                .then(() => {
                    enqueueSnackbar(`New category added successfully.`,
                        {
                            variant: "success",
                            autoHideDuration: SNACKBAR_AUTO_HIDE_DURATION,
                            preventDuplicate: true
                        })
                    setState({...state, loading: false, showModifyCategoryForm: false})
                    fetchAssessmentData(ASSESSMENT_DATA_API)
                })
                .catch(error => {
                    setState({
                        ...state, showModifyCategoryForm: false, deleteItemId: null,
                        loading: false, httpCode: error.response !== null ? parseInt(error.response.status) : 500
                    })
                    enqueueSnackbar(`Unable to add new category.`,
                        {
                            variant: "error",
                            autoHideDuration: SNACKBAR_AUTO_HIDE_DURATION,
                            preventDuplicate: true
                        })
                })
        } else {
            requestBody = {
                category: stateInfo.category,
                categoryId: stateInfo.categoryId,
                categoryShortName: stateInfo.description,
                scoreGuidanceId: stateInfo.scoreGuidanceId
            }

            SERVER_URL.put(ASSESSMENT_CATEGORIES_API, requestBody)
                .then(() => {
                    enqueueSnackbar(`Category updated successfully.`,
                        {
                            variant: "success",
                            autoHideDuration: SNACKBAR_AUTO_HIDE_DURATION,
                            preventDuplicate: true
                        })
                    setState({...state, loading: false, showModifyCategoryForm: false})
                    fetchAssessmentData(ASSESSMENT_DATA_API)
                })
                .catch(error => {
                    setState({
                        ...state, showModifyCategoryForm: false, deleteItemId: null,
                        loading: false, httpCode: error.response !== null ? parseInt(error.response.status) : 500
                    })
                    enqueueSnackbar(`Unable to update category.`,
                        {
                            variant: "error",
                            autoHideDuration: SNACKBAR_AUTO_HIDE_DURATION,
                            preventDuplicate: true
                        })
                })
        }
    }

    const modifyBtnCloseHandler = () => {
        fetchAssessmentData(ASSESSMENT_DATA_API)
        setState({...state, showModifyCategoryForm: false})
    }

    const deleteBtnHandler = () => {
        fetchAssessmentData(ASSESSMENT_DATA_API, true)
    }

    return (
        <>
            <Button variant="contained"
                    startIcon={<EditIcon/>}
                    style={{backgroundColor: UPDATE_BUTTON_COLOR}} onClick={clickHandler}>
                Edit Category
            </Button>
            {state.showModifyCategoryForm ?
                <CategoryFormDialog
                    confirmedHandler={modifyBtnConfirmHandler}
                    cancelHandler={modifyBtnCloseHandler}
                    deleteCategoryHandler={deleteBtnHandler}
                    data={data}
                    token={token}
                /> : null}
            {state.loading ? <Loading/> : null}
        </>
    );
}
