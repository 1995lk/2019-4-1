import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../store3/action'
// import {bindActionCreators} from 'redux'
class App extends Component {
    constructor(props) {
        super(props);
  
    }

   
    render() {
        // console.log(this.props)
        // let {shuzi,incerment,delenum} = this.props
        let {shuzi ,incerment,delenum} = this.props
        return ( 
            <div>
                <button onClick = {incerment}>+</button>
                <span>{shuzi}</span>
                <button  onClick = {delenum}>-</button>
            </div>
         );
    }
}

function mapStateprop(state){ //state是store的所有数据  
    return {shuzi:state.reducer1.num};   //看你当前组件需要哪个数据  就单独拿哪个
} 

// function mapdispatchprop(dispatch){
//     return bindActionCreators(actions,dispatch)
// }


// export default connect(mapStateprop,mapdispatchprop)(App)  
export default connect(mapStateprop,actions)(App)  