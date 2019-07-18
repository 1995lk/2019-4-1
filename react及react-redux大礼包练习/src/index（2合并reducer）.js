import React,{Component}from 'react';
import ReactDOM from 'react-dom';

import store from './store2/index'
import * as  actionCreateors from './store/action'

import {bindActionCreators} from 'redux';

console.log(store.getState())

class App extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState().reducer1 //拿到reducer1的数据

        this.bindActionCreators = bindActionCreators(actionCreateors,store.dispatch)
    }

    componentDidMount(){   //在第一次渲染后调用，只在客户端。
      this.unsubscribe = store.subscribe(()=>{
            this.setState({num:store.getState().reducer1.num});  //操作reducer1的数据
        })
    }
    componentWillUnmount(){ //解除监听 在组件从 DOM 中移除之前立刻被调用。
        this.unsubscribe() 
    }
    render() { 
        return ( 
            <div>
         
            <button onClick = {this.bindActionCreators.incerment}>+</button>
            <span>{this.state.num}</span>
            <button onClick ={this.bindActionCreators.delenum}>-</button>
            </div>
         );
    }
}





class Ppa extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState().reducer2 //拿到reducer1的数据

        this.bindActionCreators = bindActionCreators(actionCreateors,store.dispatch)
    }

    componentDidMount(){   //在第一次渲染后调用，只在客户端。
      this.unsubscribe = store.subscribe(()=>{
            this.setState({num2:store.getState().reducer2.num2});  //操作reducer1的数据
        })
    }
    componentWillUnmount(){ //解除监听 在组件从 DOM 中移除之前立刻被调用。
        this.unsubscribe() 
    }
    render() { 
        return ( 
            <div>
                <button onClick = {this.bindActionCreators.incerment2}>+</button>
                <span>{this.state.num2}</span>
                <button onClick ={this.bindActionCreators.delenum2}>-</button>
            </div>
         );
    }
}

ReactDOM.render(
        <div>
            <App/>
            <Ppa/>
        </div>
    ,document.getElementById('root'))