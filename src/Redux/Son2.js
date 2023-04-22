import React, { Component } from "react";
import store from './Store/store'
import actionCreator from "./Store/actionCreator";

class Son2 extends Component {
  componentDidMount () {
    store.subscribe(() => {
      this.setState({})
    })
  }
  render () {
    let { name, age } = store.getState()
    return (
      <div>
        <h3>Son2 子组件</h3>
        <p>name: {name}</p>
        <p>age: {age}</p>
        <button
          onClick={() => {
            actionCreator.changeAge(28)
          }}
        >修改年龄</button>
      </div>
    )
  }
}
export default Son2
