import React, { Component } from "react";

export default class Search extends Component {
  /* state = {
    name: "",
  }; */
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
  }
  handle = () => {
    const { tellme } = this.props;
    tellme("我是search");
    console.log("handle");
  };
  change = event => {
    let value = event.target.value;
    this.setState({
      name: value,
    });
    console.log("change", this.state.name);
  };
  render() {
    const { name } = this.state;
    const { userInfo } = this.props.store;
    console.log("this", this);
    return (
      <div>
        <h1>我是Search页面</h1>
        <p>{userInfo.userName}</p>
        <button onClick={this.handle}>click</button>
        <input value={name} onChange={this.change} />
      </div>
    );
  }
}
