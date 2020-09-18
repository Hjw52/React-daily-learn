// import React from "react";
// import ReactDOM from "react-dom";
// import "./index.css";
// import App from "./App";
// import store from './store/count2'
// import {Provider} from 'react-redux'

// ReactDOM.render(
// <Provider store={store}>
// <App />
// </Provider>
// , document.getElementById("root"));


import React from './myreact/index2'
// const ReactDOM = React
// let element = <div id="container">
//  <input value="foo" type="text" />
//  <a href="/bar">测试</a>
//  <span>开课吧</span>
// </div>
// ReactDOM.render( element,
// document.getElementById('root'))
const ReactDOM = React
class Demo extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      count:1
    }
  }
  handleClick = ()=>{
    this.setState({
      count:this.state.count+1
    })
  }
  render(){
    return <div>
      <h2 onClick={this.handleClick}>{this.state.count} 点击add</h2>
    </div>
  }
}
Demo = React.transfer(Demo)

function App(props){
  const [count, setCount] = React.useState(1)
  return <div id="container" className="red">
    <h1>{props.title}, {count}</h1>
    <button onClick={()=>setCount(count+1)}>add</button>
    <hr/>
    <Demo></Demo>
  </div>
}
let element = <App title="fiber" />

ReactDOM.render( element, document.getElementById('root'))