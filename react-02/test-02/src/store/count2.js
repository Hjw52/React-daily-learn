import { createStore, applyMiddleware, combineReducers } from "redux";
 import logger from "redux-logger";
import thunk from "redux-thunk";
const counter2=(state=0,action)=>{
    switch(action.type){
        case 'add':
            return state+1
        case 'minus':
            return state-1
        default:
            return state
    }
}
const store2=createStore(counter2,applyMiddleware(logger,thunk))
export default store2;