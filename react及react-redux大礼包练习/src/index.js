import React,{Component}from 'react';
import ReactDOM from 'react-dom';
import store from './store2/index'
import {Provider} from 'react-redux';
import App from './components/app';
import Ppa from './components/ppa'


ReactDOM.render(
        <Provider store={store}>
            <App/>
            <Ppa/>
        </Provider>,
        document.getElementById('root'))
