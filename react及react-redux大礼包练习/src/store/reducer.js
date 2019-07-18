import * as types from './actionTypes' //拿到所有的
const initState = {num:1}
/*

    {...state} 前拷贝
    JSON.parse(JSON.stringify(state))  深拷贝  最终把数据转换成对象
*/


export default function reducer(state=initState,action){
    
    switch(action.type){
        case types.INCERMENT:
            console.log(state)
            return{...state,num:state.num+1}
        case types.DELENUM:

        return{...state,num:state.num-1}

            default :
                return state;
    }
}
