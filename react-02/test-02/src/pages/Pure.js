import React, { Component, PureComponent } from "react";
export default class PuerComponentPage extends PureComponent {
 constructor(props) {
 super(props);
 this.state = {
 counter: 0,
//  obj: {
//  num: 100,
//  },
 };
 }
 setCounter = () => {
 this.setState({
 counter: 1,
//  obj: {
//  num: 200,
//  },
 });
 console.log("setCounter");
 };
 render() {
 console.log("render");
 const { counter, obj } = this.state;
 return (
 <div>
 <button onClick={this.setCounter}>setCounter</button>
 <div>counter: {counter}</div>
 {/* <div>obj.num: {obj.num}</div> */}
 </div>
 );
 }
}