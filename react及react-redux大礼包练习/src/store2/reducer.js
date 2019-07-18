import * as types from './actionTypes' //拿到所有的

import {combineReducers} from 'redux';  //合并reducer

const initState = {num:1}

/*

    {...state} 前拷贝
    JSON.parse(JSON.stringify(state))  深拷贝  最终把数据转换成对象
*/


 function reducer1(state=initState,action){
    
    switch(action.type){
        case types.INCERMENT:

            return{...state,num:state.num+1}
        case types.DELENUM:

        return{...state,num:state.num-1}

            default :
                return state;
    }
}

 function reducer2(state={
     num2:10
 },action){

    switch(action.type){
        case types.INCERMENT2:

            return{...state,num2:state.num2+10}

        case types.DELENUM2:

        return{...state,num2:state.num2-10}
            default :
                return state;
    }
}

const reducers = combineReducers({
    reducer1,
    reducer2
})
export default reducers