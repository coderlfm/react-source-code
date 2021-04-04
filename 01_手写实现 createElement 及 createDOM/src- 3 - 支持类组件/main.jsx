import React, { createElement } from "./react";
import ReactDOM from "./react-dom";

class Couter extends React.Component {
  render() {
    return <h1>类组件{this.props.title}</h1>;
  }
}
/**
  <Welcome title="react" /> 会默认转成 成 type：函数名，props为 组件上的属性，children 会组件，如果没有则为 undefined
  {
    props: {
      "title": "react",
    },
    type: class Couter
  }
 */
const element = <Couter title="react 类组件" />;

console.log("element:", element);
// console.log("element:", JSON.stringify(element.type, null, 2));

ReactDOM.render(element, document.getElementById("root"));
