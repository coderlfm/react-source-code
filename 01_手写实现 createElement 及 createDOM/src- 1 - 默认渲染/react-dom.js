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
 * 创建真实dom
 * @param {Object} vdom 创建dom
 * @param {String} vdom.type  元素类型
 * @param {Object} vdom.props 元素属性
 */
function createDOM(vdom) {
  // 1. 如果 vdom 是字符串或者数字，则创建一个文本节点
  if (typeof vdom === "string" || typeof vdom === "number") {
    return document.createTextNode(vdom);
  }

  // 2. 如果 vdom 是 null 或者 undefined 则返回空串
  if (!vdom) {
    return "";
  }

  // 3. 以上都不是，则 children 是一个元素
  const { type, props } = vdom;

  // console.log("props:", props);
  const dom = document.createElement(type);

  // 3.1 将属性挂载到元素上
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

      // 3. 如果是其它的，则直接添加
    } else {
      dom[key] = props[key];
    }
  }
}

const reactDOM = {
  render,
};

export default reactDOM;
