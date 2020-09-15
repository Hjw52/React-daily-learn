import React, { Component } from "react";
import store from '../store/count'
export default class ReduxPage extends Component {
    componentDidMount(){
        store.subscribe(()=>{
            // this.setState({});
            this.forceUpdate();
        })
    }
    add = () => {
        store.dispatch({ type: "add" });
        };
        minus = () => {
        store.dispatch({ type: "minus" });
        };
        stayStatic = () => {
       // store.dispatch({ type: "others" });
       store.dispatch(dispatch => {
        setTimeout(() => {
        dispatch({ type: "add" });
        }, 1000);
        });
        };
        render() {
            console.log("store", store);
            return (
            <div>
            <h1>ReduxPage</h1>
            <p>{store.getState()}</p>
            <button onClick={this.add}>add</button>
            <button onClick={this.minus}>minus</button>
            <button onClick={this.stayStatic}>static</button>
            </div>
            );
  }
 }