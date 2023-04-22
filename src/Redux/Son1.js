import React, { Component } from "react";
// 在需要使用到数据的组件中引入Store
import store from './Store/store'
import actionCreator from './Store/actionCreator'

class Son1 extends Component {
  componentDidMount() {
    // 使用subscribe监听reducer的改动.只要reducer中数据改变就会触发
    store.subscribe(() => {
      // 使用setState中只放一个空对象会更新所有的数据
      // 目的就是触发render的执行, 来重新渲染页面, 让页面的数据发生改变
      this.setState({})
    })
  }
  render () {
    // store下面有一个方法: getState() 获取到reducer下return的数据
    /* store组件中使用了reducer, 并返回了新的reducer
      reducer中返回的是state中的数据, 
    */
    let { name, age } = store.getState()
    return (
      <div>
        <h3>Son1 子组件</h3>
        <p>name: {name}</p>
        <p>age: {age}</p>
        <button
          onClick={() => {
            /* 调用actionCreator里面的changeName方法
              但是只调用这个方法数据是会改变, 但是页面数据不会
            改变
            */
            actionCreator.changeName()
          }}
        >修改名字</button>
      </div>
    )
  }
}
export default Son1
