import { addEvent } from "./event";

/**
 * 渲染元素
 * @param {Object} vdom 虚拟dom
 * @param {*} container 容器
 */
function render(vdom, container) {
  const dom = createDOM(vdom);
  container.appendChild(dom);
}

/**
 * 函数组件和类组件
 * @typedef {Class} ClassComponent
 * @property  {Boolean} [isReactComponent]  是否类组件，可选参数
 */

/**
 * 创建真实dom
 * @param {Object} vdom 创建dom
 * @param {Object} vdom.props 元素属性
 * @param {(String|ClassComponent)} vdom.type  元素类型
 * @param {Object} [vdom.ref]  元素ref
 * @param {null} vdom.ref.current  元素ref current
 */
export function createDOM(vdom) {
  // 1. 如果 vdom 是字符串或者数字，则创建一个文本节点
  if (typeof vdom === "string" || typeof vdom === "number") {
    return document.createTextNode(vdom);
  }

  // 2. 如果 vdom 是 null 或者 undefined 则返回空串
  if (!vdom) {
    return "";
  }

  // 3. 以上都不是，则 children 是一个元素
  const { type, props, ref } = vdom;

  if (typeof vdom.type === "function") {
    // 3.1 vdom 是一个 类组件组件， 通过 isReactComponent 来判断
    if (vdom.type.isReactComponent) {
      return updateClassComponent(vdom);
      // 3.2 vdom 是一个 函数组件， 例如：<Welcome  />
    } else {
      // 3.2.1 直接通过 [updateFunctionComponent] 来生成真实 dom
      return updateFunctionComponent(vdom);
    }
  }

  // 3.2.1 vdom 是一个 原生元素 通过 React.createElement 创建的
  const dom = document.createElement(type);

  // 3.2.2 将属性挂载到元素上
  updateProps(dom, props);

  // 4. 渲染 props.children

  // 4.1 props.children 是字符串或者数字，则创建一个文本节点
  if (
    typeof props.children === "string" ||
    typeof props.children === "number"
  ) {
    dom.textContent = props.children;
    // dom.appendChild(document.createTextNode(props.children));
  }

  // 4.2 props.children 只有一个子元素，则直接递归调用 render 来创建子元素
  if (typeof props.children === "object" && props.type) {
    render(props.children, dom);
  }

  // 4.3 props.children 是一个数组，则表示有多个子元素
  if (Array.isArray(props.children)) {
    reconcileChilren(props.children, dom);
  }

  if (ref) {
    ref.current = dom;
  }

  return dom;
}

/**
 * 类组件创建真实 dom
 * 1. new 一个组件的实例
 * 2. 调用 实例的 render 方法得到 vdom(虚拟dom)
 * 3. 调用 [createDOM] 将 vdom 传入，得到真实 dom
 * @param {Object} vdom 虚拟dom
 * @param {ClassComponent}  vdom.type 元素类型，类
 * @param {Object} vdom.props 元素属性
 */
function updateClassComponent(vdom) {
  const { type, props } = vdom;
  const classInstance = new type(props);
  const classInstanceVdom = classInstance.render();
  const dom = createDOM(classInstanceVdom);

  // 此处将真实 dom 添加到 类组件 的实例身上，在 setState 进行组件数据更新时需要用的
  classInstance.dom = dom;
  return dom;
}

/**
 * 函数组件创建真实 dom
 * 如果函数式组件返回的不是原生元素，也会递归调用 createDOM
 * @param {Object} vdom 虚拟dom
 * @param {Function} vdom.type  元素类型，函数
 * @param {Object} vdom.props 元素属性
 * @returns 真实 dom
 */
function updateFunctionComponent(vdom) {
  const { type, props } = vdom;
  const dom = createDOM(type(props));
  return dom;
}

/**
 * 递归渲染子元素
 * @param {Object[]} childernVdom 虚拟dom
 * @param {*} container 容器
 */
function reconcileChilren(childernVdom, container) {
  childernVdom.forEach((vdom) => render(vdom, container));
}

/**
 * 将属性挂载到元素上
 * @param {*} dom   目标dom
 * @param {*} props 需要挂载到 dom 上的属性
 */
function updateProps(dom, props) {
  for (let key in props) {
    // 1. 如果是 chilren 则跳过，需要单独处理
    if (key === "children") {
      continue;

      // 2. 如果是样式，则遍历添加上去
    } else if (key === "style") {
      const styleObj = props[key];
      for (let key in styleObj) {
        dom.style[key] = styleObj[key]; // div.style.color = 'color'
      }

      // 3. 如果属性是以 on 开头的，则为事件处理函数
    } else if (key.startsWith("on")) {
      // 给 dom 绑定事件需要为小写 div.onclick
      // dom[key.toLocaleLowerCase()] = props[key];

      // 使用事件合成来添加事件
      addEvent(dom, key.toLocaleLowerCase(), props[key]);
      // 4. 如果是 ref 则跳过
    } else if (key === "ref") {
      continue;
      // 5. 如果是其它的，则直接添加
    } else {
      dom[key] = props[key];
    }
  }
}

const reactDOM = {
  render,
};

export default reactDOM;
