


 //创建一个装DOM节点的容器，html.appendChild(要插入的DOM节点)
 // let html = document.createDocumentFragment();


const  fempty = document.querySelector('.f-empty');
const breadNav = document.querySelector('.bread-nav');
let {getChild,getParents,getParent,po,duang} = tools; 

let globalId = 0; //存储id的

  //tools.getChild()

function render(id){

    globalId = id*1;
    folders.innerHTML = '';
    //如果有子级，就渲染
    let ary = getChild(globalId);
    // console.log(ary,globalId);
    if(ary){
        fempty.style.display = 'none';
        // console.time('计时器');
        // let html = document.createDocumentFragment();
        ary.forEach((ele,i)=>{
            let div = document.createElement('div');
            div.className = ele.checked?'file-item active':'file-item';
            div.dataset.id = ele.id;
            let img = document.createElement('img');
            img.src = 'img/folder-b.png';
            img.ondblclick = function(){
                let arr = getChild(ele.id)
                if(arr&&arr.length){
                    render(ele.id);
                }else{
                    fempty.style.display = 'block';
                    globalId = ele.id;
                    folders.innerHTML = '';
                }
                //双击文件的时候清除全选
                checkedAll.className = '';
                ary.forEach(item=>item.checked=false);
                //面包屑渲染
                renderBread();
            }
            let span = document.createElement('span');

            span.className = 'folder-name';
            span.innerHTML = ele.title;
            span.contentEditable = true;
            let input = document.createElement('input');
            input.className = "editor";
            let is = document.createElement('i');
            is.className = ele.checked?'checked':'';
            
            //点击可以选择自定义的文件
            is.onclick = function(){
                data[ele.id].checked = this.classList.toggle('checked');
                render(globalId);
            }

            div.append(img);
            div.append(span);
            div.append(input);
            div.append(is);

            // html.appendChild(div);
            folders.appendChild(div);
            span.onblur = function(){
                console.log(123)
            }
        });
    }
}

render(0);
//点击创建文件夹====================================
create.onclick = function(){
    fempty.style.display = 'none';

    let div = document.createElement('div');
    div.className = 'file-item';
    
    let img = document.createElement('img');
    img.src = 'img/folder-b.png';
    
    let input = document.createElement('input');
    input.className = "editor";
    input.value = '新建文件夹'
    let is = document.createElement('i');
    is.className = 'checked';
    
    div.append(img);
    div.append(input);
    div.append(is);
    folders.appendChild(div);
    input.style.display='block';
    input.select();

    input.onblur = function(){
        let v =this.value;
        //同级所有数据
        let ary = getChild(globalId);
        //如果为true说明重名
        let resault = ary.some(item=>item.title ===v);
        let id = +new Date;
        if(!resault){
            //没有重名
            data[id]={
                title:v,
                id,
                pid:globalId,
                checked:false
            }
        }else{
            //重命名
            let v2 = v;
            let num = 0;
            while(resault){
                //新建文件夹
                v2 = v2.replace(/\(\d+\)/,'')+`(${++num})`;
                resault = ary.some(item=>item.title===v2);
            }
            console.log(v2)
            data[id]={
                title:v2,
                id,
                pid:globalId,
                checked:false
            }
        }
        render(globalId)
    }
}


//面包屑====================================================
// console.log(getParents(globalId))
function renderBread(){
    let html = '';
    //生成面包屑数组
    let ary = getParents(globalId);
    // console.log(ary)
    ary.forEach((item,i,all)=>{
        if(i !=all.length-1){
            //用自定义的方式去存储标签
            html+=`<a every-id="${item.id}" href="javascript:;">${item.title}</a>`;
        }else{
            html += `<span>${item.title}</span>`;
        }
    });
     breadNav.innerHTML = html; 
}
//点击面包屑的时候把对应的Id获取出来赋值给globalId
breadNav.onclick = function(ev){
    if(ev.target.tagName === 'A'){
        // console.log(globalId)
        let ary =getChild(globalId);
        console.log(ary)
        ary.forEach(item=>item.checked = false);
        render(ev.target.getAttribute('every-id'))
        renderBread();
        //点击了面包屑  就把checked值清除掉
        checkedAll.className = '';
    }
}

renderBread();

//选框碰撞=================================================
const kuang = document.querySelector('.kuang');
//碰撞个数
let checkedNum = 0;
 
// console.log(kuang)
fBox.onmousedown=function(ev){

    if(ev.target.classList.contains('file-item') || ev.target.parentNode.classList.contains('file-item')){
        return false;
    }
    let disX = ev.pageX - fBox.offsetLeft;
    let {top} = po(fBox);
    let disY = ev.pageY - top;

    kuang.style.display = 'block';
    kuang .style.left =disX +'px';
    kuang .style.top = disY +'px';

    fBox.onmousemove =function(ev){
        checkedNum = 0;
        let w = Math.abs((ev.pageX-fBox.offsetLeft) - disX);
        let h = Math.abs((ev.pageY-top) - disY);
        kuang.style.width = w +'px';
        kuang.style.height = h +'px';

        let l = Math.min(disX,(ev.pageX-fBox.offsetLeft));
        let t = Math.min(disY,(ev.pageY-top));
        kuang.style.left = l +'px';
        kuang.style.top = t +'px';
        //碰撞
        let fileItem = document.querySelectorAll('.file-item')

        fileItem.forEach((ele,i)=>{
            if(duang(kuang,ele)){
                data[ele.dataset.id].checked = true;
                checkedNum ++;
            }else{
                data[ele.dataset.id].checked = false;
            }
        });

        //选框碰撞全选与非全选
        if(checkedNum === fileItem.length){
            // console.log('全选');
            checkedAll.className = 'checked';
        }else{
            // console.log('不全选');
            checkedAll.className = '';
        }
        render(globalId);
        //在事件down的时候浏览器
        ev.returnValue =false;
    }
    document.onmouseup=function(){
        kuang.style.display = 'none';
        kuang.style.width = kuang.style.width = 0;
        fBox.onmousemove = document.onmouseup = null;
    }
    // ev.returnValue =false;
}

checkedAll.onclick = function(){
    let bool = checkedAll.classList.toggle('checked');
    let ary = getChild(globalId);
    ary.forEach(item=>{
        item.checked=bool?true:false
    })
    render(globalId);
}


//选中删除的文件夹===================================
//点击触发删除事件
del.onclick = function(){
    //存一个新的数组
    let ary = getChild(globalId);
    console.log(ary)
    let a = document.querySelectorAll('.conf-btn a');
    let x = document.querySelector('.close-ico');

    //过滤数组内的每一项满足checked的值
    let len = ary.filter(ele=>ele.checked).length;
    if(len > 0){
        //删除的个数大于0就打开删除框样式
        tanbox.style.display = 'block';
    }else{
        fullbox('请选择删除文件');
    }
    //点击确定
    a[0].onclick = function(){
        //数组的每一项
        ary.forEach(item=>{
            //如果每一项的值都符合
            if(item.checked){
                //就删除当前的id
                delete data[item.id];
            }
        });
        //渲染出去
        render(globalId);
        //隐藏删除框的样式
        tanbox.style.display = 'none';
    }
    //点击取消 和 叉标  关闭删除框的样式
    a[1].onclick = x.onclick = function(){
        tanbox.style.display = 'none';
    }
}
//重命名=================================================
//点击触发重命名事件
rename.onclick = function(){
    //存一个新的数组
    let ary = getChild(globalId);
    //过滤数组的值是为true还是false
    let arr = ary.filter(item=>item.checked);
    //存一个数组的个数
    let len = arr.length;
    //如果数组的个数不等于1
    if(len!==1){
        fullbox('请选择一个文件');
    }else{
        //获取一个i元素下的一个cheacked
        let is = document.querySelector('i[class="checked"]');
        //is的上一个兄弟给input
        let input = is.previousElementSibling;
        //input的上一个兄弟给span
        let span = input.previousElementSibling;

        //input的样式打开
        input.style.display = 'block';
        // span的样式隐藏
        span.style.display = 'none';
        //调用这个方法
        input.select();

        /*
            [{id:0},{id:1},{id:2}]
        */
       //当input失焦点的时候触发事件
        input.onblur = function(){
            let v = this.value.trim();
            //如果修改的名字和数据的名字一样，说明没有修改
            if(v === arr[0].title)return;
            if(!v){
                fullbox ('请输入文件名');
                return;
            };
            let id = arr[0].id;
            //同级所有数据,并且排除选中数据
            let ary = getChild(globalId).filter(el=>el.id !== id);

            //如果为true说明重命名
            let resault = ary.some(item => item.title === v);
            
            if(!resault){
                //如果没有重命名
                data[id].title = v;
            }else{
                //否则有重命名
                let v2 = v;
                let num = 0;
                while(resault){
                    v2 = v2.replace(/\(\d+\)/,'') + `(${++num})`;
                    resault = ary.some(item=>item.title === v2);
                }
                // console.log(v2);
                data[id].title = v2;
            }
            // console.log('全局那个'+globalId)
            render(globalId);
            fullbox ('重命名成功');
        }
        // console.log(is);
    }
}