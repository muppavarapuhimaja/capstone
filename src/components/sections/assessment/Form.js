import React, {useEffect} from 'react';
import AccordionData from '../../ui/assessment/AccordionData';
import {SERVER_URL} from "../../../config/config";
import {SNACKBAR_AUTO_HIDE_DURATION} from "../../../constants/constants";
import {useSnackbar} from "notistack";
import {removeTokenFromCookie} from "../../../utils/Token";
import {ASSESSMENT_API} from "../../../constants/api_routes";
import {useDispatch} from "react-redux";
import {ACTIVATE_ASSESSMENT_LOADING, ADD_ASSESSMENT_DATA} from "../../../actions/types";

function Form(props) {

    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();

    const getAssessmentData = (token) => {
        dispatch({type: ACTIVATE_ASSESSMENT_LOADING})
        SERVER_URL.defaults.headers.common['Authorization'] = `bearer ${token}`
        SERVER_URL.get(ASSESSMENT_API)
            .then((resp) => {
                dispatch({
                    type: ADD_ASSESSMENT_DATA, payload:
                        {
                            data: JSON.parse(JSON.stringify(resp.data)),
                            loading: false,
                            httpCode: 200
                        }
                })
                enqueueSnackbar(`Logged in successfully.`,
                    {
                        variant: "success",
                        autoHideDuration: SNACKBAR_AUTO_HIDE_DURATION,
                        preventDuplicate: true
                    })
                enqueueSnackbar(`Welcome ${resp.data.firstName} ${resp.data.lastName}`,
                    {
                        variant: "info",
                        autoHideDuration: SNACKBAR_AUTO_HIDE_DURATION,
                        preventDuplicate: true
                    })
            })
            .catch(err => {
                dispatch({
                    type: ADD_ASSESSMENT_DATA, payload:
                        {
                            data: null,
                            loading: false,
                            httpCode: err.response !== undefined ? parseInt(err.response.status) : 500
                        }
                })
                removeTokenFromCookie()
            })
    }

    useEffect(() => {
        if (props.token !== null && props.token !== undefined) {
            getAssessmentData(props.token)
        }

        return () => dispatch({
            type: ADD_ASSESSMENT_DATA, payload:
                {
                    data: null,
                    loading: false,
                    httpCode: 200
                }
        })
        // eslint-disable-next-line
    }, [props])

    if (props.token === undefined || props.token === null) {
        console.log('Returning due to token not found...')
        return null
    }

    console.log("Rendering Form...")

    return (
        <>
            <AccordionData token={props.token}/>
        </>
    );
}

export default Form;