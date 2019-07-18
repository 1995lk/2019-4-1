import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../store3/action'

class Ppa extends Component {
    constructor(props) {
        super(props);
       
    }
    render() { 
        console.log(this.props)
        let {num2,incerment2,delenum2} =this.props
        return (
            <div>
                <button onClick={incerment2}>+</button>
                <span>{num2}</span>
                <button onClick={delenum2}>-</button>
            </div>
         );
    }
}

function mapStateprop(state){
    return {num2:state.reducer2.num2}
}

export default connect(mapStateprop,actions)(Ppa)