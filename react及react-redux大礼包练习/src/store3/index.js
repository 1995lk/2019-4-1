import {createStore} from 'redux';
import reducer from './reducer';  //2 把reducer引过来
const store = createStore(reducer)  //1 创建一个store
// import * as  actionCreateor from './store/action'
// const actionCreateors = bindActionCreators(actionCreateor);  //合并小方法
// export {actionCreateors}
export default store;