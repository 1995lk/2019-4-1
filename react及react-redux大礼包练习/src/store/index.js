import {createStore} from 'redux';
import reducer from './reducer';  //2 把reducer引过来
const store = createStore(reducer)  //1 创建一个store

export default store;