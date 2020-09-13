import React, { Component } from "react";

export default class LifeCycle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };
    console.log("constructor", this.state.counter);
  }
  componentWillMount() {
    console.log("componentWillMount", this.state.counter);
  }
  componentDidMount() {
    console.log("componentDidMount", this.state.counter);
  }
  componentWillUnmount() {
    //组件卸载之前
    console.log("componentWillUnmount", this.state.counter);
  }
  componentWillUpdate() {
    console.log("componentWillUpdate", this.state.counter);
  }
  componentDidUpdate() {
    console.log("componentDidUpdate", this.state.counter);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { counter } = this.state;
    console.log("shouldComponentUpdate", counter, nextState.counter);
    return counter != 5;
  }

  setCounter = () => {
    this.setState({
      counter: this.state.counter + 1,
    });
  };

  render() {
    const { counter } = this.state;
    console.log("render", counter);

    return (
      <div>
        <h1>我是LifeCycle页面</h1>
        <p>{counter}</p>
        <button onClick={this.setCounter}>改变counter</button>
        {!!(counter % 2) && <Foo />}
      </div>
    );
  }
}

class Foo extends Component {
  componentWillUnmount() {
    //组件卸载之前
    console.log(" Foo componentWillUnmount");
  }
  render() {
    return <div>我是Foo组件</div>;
  }
}
