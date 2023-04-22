import React, { Component, Fragment } from "react";
import Son1 from './Son1'
import Son2 from './Son2'

// Box 是容器组件 - 负责展示
function Box () {
  return (
    <Fragment>
      <Son1></Son1>
      <hr/>
      <Son2></Son2>
    </Fragment>
  )
}
export default Box
