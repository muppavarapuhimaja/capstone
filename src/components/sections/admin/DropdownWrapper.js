import React, {useEffect, useState} from "react";
import {SERVER_URL} from "../../../config/config";
import {InternalServerError} from "../errors/InternalServerError";
import {Loading} from "../../ui/common/Loading";
import Dropdown from "./Dropdown";
import {ASSESSMENT_CATEGORIES_API, ASSESSMENT_SCORE_GUIDANCE_API} from "../../../constants/api_routes";
import {SNACKBAR_AUTO_HIDE_DURATION} from "../../../constants/constants";
import {useSnackbar} from "notistack";

export function DropdownWrapper({
                                    token, required, allCategories, addNewOption, ddlMaxWidth,
                                    label, API, sendValueHandler, defaultValue, assessmentData
                                }) {

    const [state, setState] = useState({
        data: new Map(),
        loading: false,
        httpCode: 200,
    })
    const {enqueueSnackbar} = useSnackbar();

    const fetchAPI = () => {
        setState({...state, loading: true})
        SERVER_URL.defaults.headers.common['Authorization'] = `bearer ${token}`
        SERVER_URL.get(API)
            .then(response => {
                switch (API) {
                    case ASSESSMENT_CATEGORIES_API:
                        setState({
                            ...state, data: loadCategories(JSON.parse(JSON.stringify(response.data))),
                            loading: false, httpCode: 200
                        })

                        break
                    case ASSESSMENT_SCORE_GUIDANCE_API:
                        setState({
                            ...state, data: loadScoreGuidance(JSON.parse(JSON.stringify(response.data))),
                            loading: false, httpCode: 200
                        })
                        break
                    default:
                        console.error("Dropdown not supported")
                }
            })
            .catch(error => {
                console.error("Error fetching API....")
                setState({
                    ...state, loading: false, httpCode: error.response !== undefined ?
                        parseInt(error.response.status) : null
                })
                enqueueSnackbar(`Unable to fetch categories or score guidance`,
                    {
                        variant: "error",
                        autoHideDuration: SNACKBAR_AUTO_HIDE_DURATION,
                        preventDuplicate: true
                    })
            })
    }

    useEffect(() => {
        console.log('Component Did Mount')
        fetchAPI()

        // eslint-disable-next-line
    }, [assessmentData, defaultValue])

    const loadCategories = (categoryData) => {
        let categories = new Map()

        if (allCategories) {
            categories.set(0, "All Categories")
        }

        // eslint-disable-next-line array-callback-return
        categoryData.map(({categoryId, category}) => {
            categories.set(categoryId, category)
        })

        if (addNewOption) {
            categories.set(0, "Add New Category")
        }

        return categories
    }

    const loadScoreGuidance = (guidanceData) => {
        let scoreGuidance = new Map()

        // eslint-disable-next-line array-callback-return
        guidanceData.map(({id, guidance}) => {
            scoreGuidance.set(id, guidance)
        })

        if (addNewOption) {
            scoreGuidance.set(0, "Add New Score Guidance")
        }

        return scoreGuidance
    }

    const fetchDropdownValueHandler = (id) => {
        sendValueHandler(id, state.data.get(parseInt(id)))
    }

    if (state.httpCode === 500) {
        // go here and check for error code
        // display error.
        // Internal server error
        return <InternalServerError/>
    }

    return (
        <>
            {state.data !== null ?
                <Dropdown data={state.data} label={label}
                          defaultValue={defaultValue}
                          ddlMaxWidth={ddlMaxWidth}
                          required={required}
                          fetchDataHandler={fetchDropdownValueHandler}/> : null}
            {state.dataLoading ? <Loading/> : null}
        </>


    );
}