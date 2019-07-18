import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import reducer from "./redux/reducer"

const store = createStore(reducer);


class  App extends Component {
 
    render() { 
        return ( 
            <div>
                <button
                    onClick={()=>{store.dispatch({type:'DELE_NUM'})}}
                >-</button>
                <span>{this.props.num}</span>
                <button
                    onClick={()=>{store.dispatch({type:'ADD_NUM'})}}
                >+</button>
            </div>
         );
    }
}

render();

store.subscribe(()=>{
    render();
})


function render(){
    ReactDOM.render(<App num ={store.getState().num}/>,document.getElementById('root'));
}






//redux注意：

//发起了action一定是return后要新给一个对象，如果你发现你修改了state，但是页面没有更新，问题基本上就是没有更新最新的状态