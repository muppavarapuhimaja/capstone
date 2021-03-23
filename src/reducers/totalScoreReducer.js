import {SET_TOTAL_SCORE, RESET_TOTAL_SCORE} from "../actions/types"

export const totalScoreReducer = (state
                                      = {scoreInfo: new Map(), totalScore: null}, action) => {
    switch (action.type) {
        case SET_TOTAL_SCORE:
            return {...state, totalScore: action.payload.totalScore}
        case RESET_TOTAL_SCORE:
            for (let [catId, catInfo] of state.scoreInfo) {
                for (let quesId of catInfo.questionResponse.keys()) {
                    catInfo.questionResponse.set(quesId, 0)
                }
                catInfo.categoryScore = 0
                state.scoreInfo.set(catId, catInfo)
            }
            return {...state, totalScore: 0, scoreInfo: state.scoreInfo}
        default:
            return state;
    }
};