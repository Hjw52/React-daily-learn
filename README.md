# React

### 构建

关于React的构建方式。

```
import React from 'react';
import ReactDOM from 'react-dom';

const JSX = <h2>react study</h2>;
ReactDOM.render(JSX,
document.querySelector('#root'));
```

JSX混写语法，它控制数据层的逻辑，利用 React.createElement 将JSX渲染成虚拟DOM，数据 -> VDOM。而ReactDOM.render将虚拟DOM渲染成实际DOM，VDOM -> DOM。这是最简单的一个React构造例子，这也是必须引入React和ReactDOM的原因。

### JSX语法

React采用JSX描述UI，jsx语法允许js与HTML混写，这是React与Vue模板语法不同的地方。示例：

```
//基本写法
const name="kaka";
const jsx=<h2>{kaka}</h2>

//复合
const greet = <p>hello, 卡卡</p>
const jsx = <h2>{greet}</h2>;

//函数式
const user = { firstName: "卡卡", lastName: "kaka"
};
function formatName(user) {
 return user.firstName + " " + user.lastName;
}
const jsx = <h2>{formatName(user)}</h2>;

//数组
const arr = [1,2,3].map(num => <li key={num}>{num}
</li>)
const jsx = (
 <div>
 {/* 数组 */}
 <ul>{arr}</ul>
 </div>
);

//CSS 模块化方式 动态值单括号 静态值双括号
import style from "./index.module.css";
<img className={style.img} />
```

### 组件

React的组件分为函数组件和类组件两种。

- function组件：无状态 仅关注展示层，无状态 生命周期。（后面利用Hook也可实现状态）
- class组件，继承React.Component ，有状态 生命周期（继承获得）。

**class组件**

```
import React, { Component } from "react";
export default class Home extends Component {
 render(){
 
 }
 }
```

**function组件**

```
import React from "react";
function App() {
 return (

 );
}
```

### 组件状态管理

使⽤state属性维护状态，在构造函数中初始化状态，利用setState更新状态（异步更新）不能直接修改。

```
this.state.counter += 1; //错误的
```

```
constructor(props) {
 super(props);
 // 使⽤state属性维护状态，在构造函数中初始化状态
 this.state = { date: new Date() };
 }
 
 // 使⽤setState⽅法更新状态
 this.setState({
 date: new Date()
 });
```

setState通常是异步的，因此如果要获取到最新状态值有以 下三种⽅式：

1. setState执行函数式，函数式直接执行。

   ```
   this.setState((nextState, props) => ({
   counter: state.counter + 1}));// 1
   
   this.setState((nextState, props) => ({
   counter: state.counter + 1}));// 2
   
   this.setState((nextState, props) => ({
   counter: state.counter + 1}));// 3
   ```

2. 使用定时器，下一次宏任务执行

```
setTimeout(() => {
 this.setState({
      counter: state.counter + 1})
      });
 console.log(this.state.counter);
}, 0);
```

3. 利用原生事件

   ```
   componentDidMount(){
    document.body.addEventListener('click',
   this.changeValue, false)
   }
   changeValue = () => {
    this.setState({counter:
   this.state.counter+1})
    console.log(this.state.counter)
   }
   ```

**总结：** setState只有在合成事件和钩⼦函数中是异步的，在函数式，原⽣事件和setTimeout、setInterval中都是同步的。原⽣事件绑定不会通过合成事件的⽅式处理，⾃然也不会进⼊更新事务的 处理流程。setTimeout也⼀样，在setTimeout回调执⾏时已经完成了原更 新组件流程，也不会再进⼊异步更新流程，其结果⾃然就是是同步的了。

### 函数组件Hook

利用useState，useEffect设置状态。还有useReducer类似于reducer，useContext⽤于在快速在函数组件中导⼊上下⽂。

```
import React, { useState, useEffect,useReducer } from "react";
//定义reducer 函数 这边dateReducer示例
function dateReducer(state,action){
	switch(action.type){
	case :....
	case :....
	}
}
export default function User() {
 const [date, setDate] = useState(new Date());
 const [date, dispatch] =useReducer(dateReducer, []);
 //使用setState
 useEffect(() => {
 const timeId = setInterval(() => {
 setDate(new Date());
 }, 1000);
 //使用useReducer
 useEffect(() => {
 setTimeout(() => {
 dispatch({ type, data});
 }, 1000);
 }, []);
 return () => clearInterval(timeId);
 });
 return <div>{date.toLocaleTimeString()}</div>;
}
```

### 事件处理

React利用onXX写法来监听事件，onClick，onChange。事件回调函数注意绑定this指向，常见三种方法：

1. 构造函数中绑定并覆盖：this.change = this.change.bind(this) 
2. ⽅法定义为箭头函数：change = ()=>{} ，不绑定this ，继承外层的this
3. 事件中定义为箭头函数：onChange={()=>this.change()}

```
import React, { Component } from "react";
export default class Search extends Component {
 constructor(props) {
 super(props);
 this.state = { name: "" };
 // this.change = this.change.bind(this);
 }
 btn = () => {
 //使⽤箭头函数，不需要指定回调函数this，且便于传递参数
  console.log("btn");
 };
 change = e => {
 let value = e.target.value;
 this.setState({
 name: value,
 });
 console.log("name", this.state.name);
 };
 render() {
 const { name } = this.state;
 return (
 <div>
 <button onClick={this.btn}>按钮</button>
 <input
 type="text"
 placeholder="请输⼊"
 name={name}
 onChange={this.change}
 />
 </div>
 );
 }
}
```

### 生命周期

V16.4之前

![img](https://upload-images.jianshu.io/upload_images/16775500-8d325f8093591c76.jpg?imageMogr2/auto-orient/strip|imageView2/2/format/webp)

V16.4之后的⽣命周期：

![img](https://upload-images.jianshu.io/upload_images/16775500-102dbe772034e8fa.png?imageMogr2/auto-orient/strip|imageView2/2/format/webp)

在React v16推出的Fiber之后，因为如果要开启async rendering，在render函数之前的所有函数，都有可能被执⾏多次。所以可能会废弃的三个⽣命周期函数：

- componentWillMount 
- componentWillReceiveProps 
- componentWillUpdate

如果开发者开了async rendering，⽽且⼜在以上这些render前执 ⾏的⽣命周期⽅法做AJAX请求的话，那AJAX将被⽆谓地多次调⽤。

引⼊两个新的⽣命周期函数：

- getDerivedStateFromProps 

  会在调⽤ render ⽅法之前调⽤，并且在初始挂载及后续更新时都会被调⽤。它应返回⼀个对象来更新 state，如果返回 null 则不更新任何内容。 不管原因是什么，都会在每次渲染前触发此⽅法。

- getSnapshotBeforeUpdate

​       在最近⼀次渲染输出（提交到 DOM 节点）之前调⽤。它使得组件能在发⽣更改之前从 DOM 中 捕获⼀些信息（例如，滚动位置）。此⽣命周期的任何返回值将作 为参数传递给 componentDidUpdate()

### 组件优化

1. 通过shouldComponentUpdate判断是否渲染 ，如nextProps, nextState没变化则不渲染

2. react 的 PureComponent 会自动比较渲染的值 不过比较只是浅比较，对于含有object的state没有效果，而且也只针对类组件。下面为部分源码

   ```
   /*
    * React.PureComponent
    */
   //浅比较属性和状态 return{ !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState)}
   //=>把两个对象进行浅比较
   // 只比较对象的第一级
   // 如果属性值是基本类型的，我们只需要比较值是否一样即可
   function shallowEqual(obj1, obj2) {
   	if (Object.keys(obj1).length !== Object.keys(obj2).length) {
   		return false;
   	}
   	for (let key in obj1) {
   		if (obj1[key] !== obj2[key]||!obj1.hasOwnPorperty(obj2[key])) {
   			return false;
   		}
   	}
   	return true;
   }
   ```

3. React.memo 作用和pureComponent类似 相当于函数组件版的纯组件。

```
import React, { Component, memo } from "react";
const PuerCounter = memo(props => {
 console.log("render");
 return <div>{props.counter}</div>;
});
```

### Portals 异地挂载

Portal 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案。

```
ReactDOM.createPortal(child, container)
```

第一个参数（`child`）是任何[可渲染的 React 子元素](https://react.docschina.org/docs/react-component.html#render)，例如一个元素，字符串或 fragment。第二个参数（`container`）是一个 DOM 元素。portal 的典型用例是当父组件有 `overflow: hidden` 或 `z-index` 样式时，但你需要子组件能够在视觉上“跳出”其容器。例如，对话框、悬浮卡以及提示框。但要**注意：**对于事件冒泡，还是在声明处开始传播，并不会根据挂载地点而改变。无论其是否采用 portal 实现，父组件都能够捕获其事件。

### redux

redux是全局的状态管理器，与vuex不同，redux并不是只适用于redux。当然react也有自己的react-redux版本。redux简单讲：

1. 需要一个store存储数据 通过createStore(Reducer)创建

2. Reducer根据action类型控制状态变更，它是一个纯函数，不能修改传入参数 不能产生副作用 也不能调用非存函数（比如获取时间Date.now()等）

3. 使用时需要store.subscribe()订阅更新 ，也可全局地store.subscribe(render)。

   ```
   componentDidMount() {
    	store.subscribe(() => {
    		this.forceUpdate();
    		//this.setState({});
    });
    }
   ```

核心实现：

- 存储状态state
- 获取状态getState
- 更新状态dispatch
- 订阅subscribe

相当于一个类 提供了以上方法。

### react-redux

react版的redux，提供两个API，Provider包裹APP根组件 传入store 为后代组件提供store，connect 为组件提供数据和变更⽅法（mapStateToProps，mapDispatchToProps）。redux-thunk使用中间件可以实现异步等操作。

```
const store = createStore(Reducer,
applyMiddleware(logger, thunk));
```

### React调度逻辑

render⼀旦开始渲染，就开始递归，本身这个 没啥问题，但是如果应⽤变得庞⼤后，多层递归会有卡顿， 后⾯状态修改后的diff也是⼀样， 整个vdom对象变⼤后，diff的过程也有会递归过多导致的卡顿。这时就要利用浏览器的闲时调度requestIdleCallback ，它可以利⽤浏览器的 业余时间，我们可以把任务分成⼀个个的⼩⼈物，然后 利⽤浏览器空闲时间来做diff，如果当前⼜任务来了，⽐如⽤户的点击或者动画，会先执⾏，然后空闲后，再回去把requestIdleCallback没完成的任务完成。

没有闲时调度：

![image-20200918222330063](https://github.com/Hjw52/React_learn/blob/master/image/image-20200918222330063.png)

采用闲时调度：

![image-20200918222403787](https://github.com/Hjw52/React_learn/blob/master/image/image-20200918222403787.png)

为了浏览器兼容，react已经重写了调度逻辑，不⽤requestIdleCallback ，但是过程思路是⼀致的。

### fiber

**为什么需要fiber ？**

对于⼤型项⽬，组件树会很⼤，这个时候递归遍历的成本就会很⾼，会 造成主线程被持续占⽤，结果就是主线程上的布局、动画等周期性任务 就⽆法⽴即得到处理，造成视觉上的卡顿，影响⽤户体验。

**如何解决？**

- 增量渲染（把渲染任务拆分成块，匀到多帧） 
- 更新时能够暂停，终⽌，复⽤渲染任务  
- 给不同类型的更新赋予优先级 
- 并发⽅⾯新的基础能⼒

16.0之前vdom结构是⼀个树形结构， 他的diff过程是没法中断的。为了管理我们vdom树之间的关系，我们需要把 树形结构的内部关系，改造成链表(⽅便终⽌)之前只是children作为⼀个数组递归遍 历，现在⽗=》⼦,⼦=》兄弟，，⼦=》⽗，都有关系。存了执行父节点 兄弟节点 子节点三个指针。

![image-20201012224310527](https://github.com/Hjw52/React_learn/blob/master/image/image-20201012224310527.png)
