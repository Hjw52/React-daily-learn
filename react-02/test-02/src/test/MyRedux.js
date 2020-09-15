export function createStore(reducer,enhancer){
    if(enhancer){
        return enhancer(createStore)(reducer);
    }
    let currentState=undefined;
    let listeners=[];
    function getState(){
        return currentState
     }
     function subscribe(listener){
        listeners.push(listener)
     }
     function dispatch(action){
         currentState=reducer(currentState,action)
         //执行 更新订阅
         listeners.forEach(f=>f())
         return action;
     }
     return {
        getState,subscribe,dispatch
     }
}
export function applyMiddleware(...middlewares){
    return createStore=>(...args)=>{
        const store=createStore(...args)
        let dispatch=store.dispatch;
        const api={
            getState:store.getState,
            dispatch:(...args)=>dispatch(...args)
        }
        //获取中间状态 
        const middle=middlewares.map(middlewares=>middlewares(api));
        dispatch= compose(...middle)(store.dispatch)
        return {
            ...store,
            dispatch
        }
    }
}
//链式执行
export function compose(...funcs){
    if (funcs.length==0) {
    return arg=>arg
    }
    if (funcs.length==1) {
    return funcs[0]
    }
    return funcs.reduce((left,right) => (...args) =>
     right(left(...args)))
   }