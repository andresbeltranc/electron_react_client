import {UPDATE_AGREEMENT} from "../actions/types";
const INITIAL_STATE = {
    userA:null

};
export default (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case UPDATE_AGREEMENT:
            return {...state, userA:action.payload};
        default:
            return state;
    }
};