import Cookies from "js-cookie";
import {ASSESSMENT_TOKEN_COOKIE} from "../constants/constants";
import history from "../history";
import {ASSESSMENT_ROUTE, LOGIN_ROUTE} from "../constants/page_routes";

export function setTokenInCookie(token, tokenName = ASSESSMENT_TOKEN_COOKIE,
                                 redirectRoute = ASSESSMENT_ROUTE) {
    let tokenExist = Cookies.get(tokenName);
    if (tokenExist) {
        Cookies.remove(tokenName)
        console.log("Removing token")
    }
    try {
        Cookies.set(tokenName, token)
    } catch (err) {
        console.error("Unable to set token in the cookie.")
        return
    }
    history.push(redirectRoute)
}

export function removeTokenFromCookie(tokenName = ASSESSMENT_TOKEN_COOKIE,
                                      redirectRoute = LOGIN_ROUTE) {
    try {
        Cookies.remove(tokenName)
    } catch (err) {
        console.error("Unable to remove token from the cookie")
    }
    history.push(redirectRoute)
}