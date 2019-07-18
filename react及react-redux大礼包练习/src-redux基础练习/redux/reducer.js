export default function reducer(state={num:0},action){
    let {type}=action;
    const obj =JSON.parse(JSON.stringify(state));  //把拿过来的数据转成对象类型
    switch(type){
        case 'ADD_NUM':
            obj.num = obj.num+1 
            console.log(obj.num)
            return obj;

        case 'DELE_NUM':
            obj.num = obj.num-1
            return obj;
            
        default:
            return obj;
    }
}