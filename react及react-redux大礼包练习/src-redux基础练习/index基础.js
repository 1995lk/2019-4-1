import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
const initialState={
    num:1
}

function reducer(state=initialState,action){ //为触发的事件

     //console.log(action.type) //能拿到ADD_NUM

    switch(action.type){
        case 'ADD_NUM':  //如果你的action.type刚好是ADD_NUM 就走return 否则就返回default：return原数据
            return{...state,num2:state.num+8} //...state是发起action之前的值，后面的是之后的值
        case 'CHANG_NAMTE':
            return{...state,name:action.na}
            
        case 'HELLOW_KUO':
            return{...state,hri:action.nae}
            // return{hei:1+1}

            default:
                return state
    }
    //return state; //reducer函数要返回出去state

}

const store = createStore(reducer);//两个参数第一个放reducer  第二个放扩展函数

store.subscribe(()=>{
    console.log(store.getState())   //最后一步：利用subscribe拿到dispatch发起的action后的数据值
})

// console.log(store.getState())

store.dispatch({type:'ADD_NUM'})    //通过dispatch发起一个action

store.dispatch({type:'CHANG_NAMTE',na:'吕阔'})

store.dispatch({type:'HELLOW_KUO',nae:'哈哈哥'})
// console.log(store.getState().hri)


function App(){
    return(
        <div>123</div>
    )
}

ReactDOM.render(<App/>,document.getElementById('root'));

//redux注意：

//发起了action一定是return后要新给一个对象，如果你发现你修改了state，但是页面没有更新，问题基本上就是没有更新最新的状态