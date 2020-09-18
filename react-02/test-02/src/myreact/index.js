// 类型 属性 子元素
function createElement(type,props,...children){
    return{
        type,
        props:{
            ...props,
            children:children.map(child=>typeof child==='object'?child:createTextElement(child)),
        }
    }
}
function createTextElement(text){
    return{
        type:'Text',
        props:{
            nodeValue:text,
            children:[],
        }
    }
}
function render(vdom,container){
    console.log(vdom);
    const dom=vdom.type=='Text'?document.createTextNode(''):document.createElement(vdom.type);
    Object.keys(vdom.props).forEach(name=>{
        if(name!='children'){
            dom[name]=vdom.props[name];
        }
    })
    vdom.props.children.forEach(child=>render(child,dom))
    container.appendChild(dom);
  //  container.innerHTML = "<pre>"+JSON.stringify(vdom,null,2)+"</pre>"
}
export default{
    createElement,
    render
}