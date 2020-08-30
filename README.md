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

**总结：** setState只有在合成事件和钩⼦函数中是异步的，在函数式，原⽣事件和setTimeout、setInterval中都是同步的。

### 函数组件Hook

利用useState，useEffect设置状态。

```
import React, { useState, useEffect } from "react";
export default function User() {
 const [date, setDate] = useState(new Date());
 useEffect(() => {
 const timeId = setInterval(() => {
 setDate(new Date());
 }, 1000);
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