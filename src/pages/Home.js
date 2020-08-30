import React, { Component } from "react";

export default class Home extends Component {
  constructor(props) {
    super(props);
    // 使用state属性维护状态，在构造函数中初始化状态
    this.state = {
      date: new Date(),
      counter: 0,
    };
    // this.setCounter = this.setCounter.bind(this);
  }
  componentDidMount() {
    this.timerId = setInterval(() => {
      this.setState({
        date: new Date(),
      });
    }, 1000);
    document.getElementsByTagName("button")[0].addEventListener(
      "click",
      () => {
        this.setState({
          counter: this.state.counter + 2,
        });
        console.log("sta", this.state.counter);
      },
      0,
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }
  setCounter = () => {
    /* setTimeout(() => {
      this.setState({
        counter: this.state.counter + 2,
      });
      console.log("sta", this.state.counter);
    }, 0); */
    /* this.setState(nextState => {
      return {
        counter: nextState.counter + 1,
      };
    });
    this.setState(nextState => {
      return {
        counter: nextState.counter + 2,
      };
    }); */
    /* this.setState({
      counter: this.state.counter + 1,
    });
    this.setState({
      counter: this.state.counter + 2,
    }); */
  };
  render() {
    const str = "我是home页面";
    const { date, counter } = this.state;
    return (
      <div>
        <h1>{str}</h1>
        <p>{date.toLocaleTimeString()}</p>
        <p>{counter}</p>
        <button onClick={this.setCounter}>改变counter</button>
      </div>
    );
  }
}
