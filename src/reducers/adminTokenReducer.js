import {SET_ADMIN_TOKEN} from "../actions/types"

export const adminTokenReducer = (state = null, action) => {
    switch (action.type) {
        case SET_ADMIN_TOKEN:
            return action.payload
        default:
            return state;
    }
};