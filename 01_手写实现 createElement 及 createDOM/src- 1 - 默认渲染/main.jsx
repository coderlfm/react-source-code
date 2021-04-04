import React, { createElement } from "./react";
import ReactDOM from "./react-dom";

/**
 * 当前我们创建一个h1 元素，字体颜色为红色
 * 第一个子元素是 span， 内容是 hello
 * 第二个子元素是 字符串，内容是 'react'
 */
const element = createElement(
  "h1",
  {
    style: {
      color: "red",
    },
  },
  createElement("span", null, "hello"),
  "react"
);

const element = {
  type: "h1",
  props: {
    style: {
      color: "red",
    },
    children: [
      {
        type: "span",
        props: {
          children: "hello",
        },
      },
      "react",
    ],
  },
};

// console.log(JSON.stringify(element, null, 2));

ReactDOM.render(element, document.getElementById("root"));
