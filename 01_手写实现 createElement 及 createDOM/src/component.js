import { createDOM } from './react-dom.js'

class Component {
  // 通过该属性来标记类组件和函数式组件
  static isReactComponent = true;

  constructor(props) {
    this.props = props;
    this.state = {};
  }

  /**
   * 更新state(同步更新)
   * 1. 更新 state
   * 2. 调用子组件的 render 方法，得到 vdom
   * 3. 调用 [updateClassInstance] 更新dom
   * @param {Object|Function} partialState 需要更新的state
   */
  setState(partialState) {
    this.state = { ...this.state, ...partialState };
    const renderVdom = this.render();
    updateClassInstance(this, renderVdom);
  }
}

/**
 * 更新 dom
 * 1. 通过 createDOM 创建新的 真实dom
 * 2. 通过之前在类实例添加的 dom 属性，可以找到旧的 dom，然后找到其父节点，将其子节点替换成 新的真实dom，此处只是简单的替换，真实的 diff 算法替换会比这复杂得多
 * 3. 重新将 dom 属性修改为当前最新的 真实dom
 * @param {Object} classInstance 类组件实例对象
 * @param {Object} vdom 虚拟dom
 */
function updateClassInstance(classInstance, vdom) {
  const dom = createDOM(vdom);
  classInstance.dom.parentNode.replaceChildren(dom);
  classInstance.dom = dom;
}

export default Component;
