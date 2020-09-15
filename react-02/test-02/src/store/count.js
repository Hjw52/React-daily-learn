// import {createStore} from 'redux'
import {createStore, applyMiddleware} from '../test/MyRedux'
const counter=(state=0,action)=>{
    switch(action.type){
        case 'add':
            return state+1
        case 'minus':
            return state-1
        default:
            return state
    }
}
 function logger({dispatch, getState}) {
    return dispatch => action => {
    // 中间件任务
    console.log(action.type + '执⾏了！！');
    // 下⼀个中间件
    return dispatch(action);
    }
   }
   const thunk = ({dispatch, getState}) => dispatch => action=> {
     if (typeof action == 'function') {
     return action(dispatch, getState)
    }
 return dispatch(action)
}
const store=createStore(counter,applyMiddleware(logger,thunk));
export default store;