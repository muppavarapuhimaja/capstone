import {ADD_ASSESSMENT_DATA, ACTIVATE_ASSESSMENT_LOADING} from "../actions/types"

export const assessmentDataReducer = (state
                                      = {data: null, loading: false, httpCode: 200}, action) => {
    switch (action.type) {
        case ADD_ASSESSMENT_DATA:
            return {...state, data: action.payload.data,
                loading: false, httpCode: action.payload.httpCode}
        case ACTIVATE_ASSESSMENT_LOADING:
            return {...state, loading: true}
        default:
            return state;
    }
};