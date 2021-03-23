import React, {useEffect, useState} from 'react';
import TopAppBar from "../sections/assessment/TopAppBar"
import ScoreCard from "../sections/assessment/ScoreCard";
import Form from "../sections/assessment/Form";
import {ASSESSMENT_TOKEN_COOKIE} from "../../constants/constants";
import Cookies from 'js-cookie';
import history from "../../history";
import {LOGIN_ROUTE} from "../../constants/page_routes";

export function AssessmentPage() {
    const [token, setToken] = useState(null)

    useEffect(() => {
        console.log("Component did mount....")
        let tokenFromCookie = Cookies.get(ASSESSMENT_TOKEN_COOKIE)
        if(tokenFromCookie !== null && tokenFromCookie !== undefined) {
            setToken(tokenFromCookie)
        } else {
            history.push(LOGIN_ROUTE)
        }
    }, [])

    console.log("Rendering AssessmentPage....")

    return (
        <>
            <TopAppBar/>
            <ScoreCard token={token}/>
            <Form token={token}/>
        </>

    );
}
