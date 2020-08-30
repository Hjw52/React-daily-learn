import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home";
import User from "./pages/User";
import Search from "./pages/Search";
import LifeCycle from "./pages/LifeCycle";

const store = {
  userInfo: {
    userName: "xiaoming",
  },
};

function tellme(msg) {
  console.log("tellme", msg);
}

function App() {
  return (
    <div className="App">
      {/* <Home /> */}
      {/* <User /> */}
      {/* <Search store={store} tellme={tellme} /> */}
      <LifeCycle />
    </div>
  );
}

export default App;
