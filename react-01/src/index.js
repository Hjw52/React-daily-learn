import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import logo from "./logo.svg";

import * as serviceWorker from "./serviceWorker";

const str = "我是str";

const name = {
  firstName: "Harry",
  lastName: "Porter",
};

function formatName(name) {
  return name.firstName + " " + name.lastName;
}

const greet = <h1>我是greet</h1>;
const show = false;
const a = [0, 1, 2, 3];
const obj = [
  {
    name: "Tom",
    age: 18,
  },
  {
    name: "Kitty",
    age: 19,
  },
];
const jsx = (
  <div>
    hello react
    <p>{str}</p>
    <p>{formatName(name)}</p>
    {show && greet}
    {show ? greet : "haha"}
    <ul>
      {a.map((item, index) => {
        return <li key={"item" + index}>{item}</li>;
      })}
    </ul>
    <ul>
      {obj.map((item, index) => {
        return <li key={"item2" + index}>{item.name + "-" + item.age}</li>;
      })}
    </ul>
    <img className="logo" src={logo}></img>
  </div>
);

// ReactDOM.render(jsx, document.getElementById("root"));
ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

//React.createElement
