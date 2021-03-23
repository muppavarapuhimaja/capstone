import React, {useState} from 'react'
import {ButtonWithToolTip} from "../../ui/assessment/ButtonWithToolTip";
import {useSelector} from "react-redux";
import {SERVER_URL} from "../../../config/config";
import {useSnackbar} from "notistack";
import {SNACKBAR_AUTO_HIDE_DURATION} from "../../../constants/constants";
import SaveIcon from "@material-ui/icons/Save";
import {Loading} from "../../ui/common/Loading";
import {ASSESSMENT_API} from "../../../constants/api_routes";

export function SaveButton(props) {
    const {scoreInfo, totalScore} = useSelector(state => state.totalScoreReducer)
    const [saveState, setSaveState] = useState({
        loading: false, httpCode: 200
    });
    const {enqueueSnackbar} = useSnackbar();

    const saveBtnHandler = async () => {
        if (props.token !== null && props.token !== undefined) {
            setSaveState({...saveState, dataLoading: true, httpCode: 200})
            let assessmentRequest = {}
            let assessments = []

            for (let [catId, catInfo] of scoreInfo) {
                let categoryInfo = {}
                categoryInfo = {
                    ...categoryInfo, category: {
                        id: catId,
                        score: catInfo.categoryScore
                    }, questions: []
                }

                for (let [quesId, response] of catInfo.questionResponse) {
                    categoryInfo.questions.push({id: quesId, response: response})
                }
                assessments.push(categoryInfo)
            }

            let requestBody = {
                ...assessmentRequest,
                totalScore: totalScore,
                lastModifiedCategoryId: 0,
                assessment: assessments
            }

            SERVER_URL.defaults.headers.common['Authorization'] = `bearer ${props.token}`
            await SERVER_URL.put(ASSESSMENT_API, requestBody)
                .then((resp) => {
                    setSaveState({...saveState, dataLoading: false, httpCode: 200})
                    enqueueSnackbar(`Assessment saved successfully.`,
                        {
                            variant: "success",
                            autoHideDuration: SNACKBAR_AUTO_HIDE_DURATION,
                            preventDuplicate: true
                        })
                })
                .catch(err => {
                    console.log('status ==> ' + parseInt(err.response.status))
                    setSaveState({
                        ...saveState, dataLoading: false,
                        httpCode: parseInt(err.response.status)
                    })
                    enqueueSnackbar(`Unable to save assessment.`,
                        {
                            variant: "error",
                            autoHideDuration: SNACKBAR_AUTO_HIDE_DURATION,
                            preventDuplicate: true
                        })
                })
        }
    }

    if(saveState.loading) {
        return <Loading/>
    }

    return (
        <>
            <ButtonWithToolTip text="Save" icon={<SaveIcon/>}
                               btnHandler={saveBtnHandler}
                               position="bottom"
                               tooltip="Save your responses."/>
        </>
    )
}