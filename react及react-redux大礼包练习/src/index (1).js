import React,{Component}from 'react';
import ReactDOM from 'react-dom';
import store from './store/index'
import * as  actionCreateors from './store/action'

import {bindActionCreators} from 'redux';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState()

        this.bindActionCreators = bindActionCreators(actionCreateors,store.dispatch)
    }

    componentDidMount(){   //在第一次渲染后调用，只在客户端。
      this.unsubscribe = store.subscribe(()=>{
            this.setState({num:store.getState().num});
        })
    }
    componentWillUnmount(){ //解除监听 在组件从 DOM 中移除之前立刻被调用。
        this.unsubscribe() 
    }

    render() { 
        return ( 
            <div>
            {/* <button onClick = {actionCreateors.incerment}>+</button> */}
            <button onClick = {this.bindActionCreators.incerment}>+</button>
            <span>{this.state.num}</span>
            {/* <button onClick ={actionCreateors.delenum}>-</button> */}
            <button onClick ={this.bindActionCreators.delenum}>-</button>
            </div>
         );
    }
}


ReactDOM.render(<App/>,document.getElementById('root'))