import {combineReducers} from "redux";
import {totalScoreReducer} from "./totalScoreReducer";
import {assessmentDataReducer} from "./assessmentDataReducer";
import {adminTokenReducer} from "./adminTokenReducer";

export default combineReducers({
    totalScoreReducer,
    assessmentDataReducer,
    adminTokenReducer
});