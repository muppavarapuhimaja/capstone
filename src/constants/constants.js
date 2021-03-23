export const SNACKBAR_AUTO_HIDE_DURATION = 5000
export const ASSESSMENT_TOKEN_COOKIE = "ASSESSMENT_TOKEN_COOKIE"
export const ADMIN_TOKEN_COOKIE = "ADMIN_TOKEN_COOKIE"
export const NEW_ITEM_ADDITION_ID = 0
export const UPDATE_BUTTON_COLOR = "#ffc107"
export const DELETE_BUTTON_COLOR = "#dc3545"
export const DOWNLOAD_BUTTON_COLOR = "#ff6e0d"
export const EDIT_ACTION_TYPE = 1
export const DOWNLOAD_ACTION_TYPE = 2

export const SCORE_GUIDANCE = [
    {
        range: "0 to 25",
        advice: "We have some work to do!",
        color: "red"
    },
    {
        range: "26 to 50",
        advice: "Great start, needs improvement!",
        color: "#ff5722"
    },
    {
        range: "51 to 75",
        advice: "Pretty good shape, still opportunities!",
        color: "yellow"
    },
    {
        range: "76 to 100",
        advice: "Well prepared all-set!",
        color: "#64dd17"
    },
]

export const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
};