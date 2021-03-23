import React, {useEffect} from 'react';
import AppDrawer from "../sections/admin/AppDrawer";
import {AssessmentDataView} from "../sections/admin/view/AssessmentDataView";
import Cookies from "js-cookie";
import {ADMIN_TOKEN_COOKIE} from "../../constants/constants";
import history from "../../history";
import {ADMIN_LOGIN_ROUTE} from "../../constants/page_routes";
import {useDispatch} from "react-redux";
import {SET_ADMIN_TOKEN} from "../../actions/types";

export function AdminAssessmentDataPage() {
    const dispatch = useDispatch()

    useEffect(() => {
        console.log("Component did mount....")
        let tokenFromCookie = Cookies.get(ADMIN_TOKEN_COOKIE)
        if(tokenFromCookie !== null && tokenFromCookie !== undefined) {
            dispatch({type: SET_ADMIN_TOKEN, payload: tokenFromCookie})

        } else {
            history.push(ADMIN_LOGIN_ROUTE)
        }

        // eslint-disable-next-line
    }, [])

    return (
        <>
            <AppDrawer innerComponent={<AssessmentDataView/>}/>
        </>
    );
}
