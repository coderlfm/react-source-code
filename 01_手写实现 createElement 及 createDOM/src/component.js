import { isFunction } from "../utils/index.js";
import { createDOM } from "./react-dom.js";

// 更新队列，全局单例
// 所有组件共享这一个 更新队列
export const updateQueue = {
  updates: new Set(), // 等待更新队列
  isBatchUpdate: false, // 是否异步更新，默认 false
  add(update) {
    // 向更新队列添加 一个 需要更新后的状态
    this.updates.add(update);
  },
  batchUpdate() {
    // 开始批量更新，调用 updateComponent()
    this.updates.forEach((update) => update.updateComponent());
    this.isBatchUpdate = false;
    this.updates.clear();
  },
};

/**
 * 更新器
 */
class Updater {
  constructor(classInstance) {
    this.classInstance = classInstance; // 当前类组件的实例
    this.pendingState = []; // 等待更新的队列
  }

  /**
   *
   * @param {Object|Function} update 需要更新的state
   */
  addState(update) {
    this.pendingState.push(update);

    // 判断是否需要 异步更新(合并更新) 异步更新需要将 this 传进去 updateQueue.add(this)
    updateQueue.isBatchUpdate ? updateQueue.add(this) : this.updateComponent();

    // 同步更新相当于直接调用 updateComponent()
    // this.updateComponent();
  }

  /**
   * 更新组件
   */
  updateComponent() {
    // 如果等待更新的队列有值则开始进行更新
    if (this.pendingState.length) {
      this.classInstance.state = this.getState();
      const renderVdom = this.classInstance.render();
      forceUpdate(this.classInstance, renderVdom);
    }
  }

  /**
   * 合并更新state
   * @returns 批量更新后的 state
   */
  getState() {
    let { state } = this.classInstance;

    this.pendingState.forEach((nextState) => {
      // 如果setState 传入的是一个方法，则需要将上一次的 state值传入；
      if (isFunction(nextState)) {
        nextState = { ...state, ...nextState(state) };
      }
      state = { ...state, ...nextState };
    });

    return state;
  }
}

/**
 * 强制更新组件
 * @param {Object} classInstance 类组件实例对象
 * @param {Object} vdom 虚拟dom
 */
function forceUpdate(classInstance, renderVdom) {
  const oldDom = classInstance.dom;
  const newDom = createDOM(renderVdom);
  oldDom.parentNode.replaceChild(newDom, oldDom);

  classInstance.dom = newDom;
}

class Component {
  // 通过该属性来标记类组件和函数式组件
  static isReactComponent = true;

  constructor(props) {
    this.props = props;
    this.state = {};

    // 每个组件都配一个 Updater
    this.update = new Updater(this);
  }

  /**
   * 更新state
   * 将需要更新的状态添加到 update 中
   * @param {Object|Function} partialState 需要更新的state
   */
  setState(partialState) {
    this.update.addState(partialState);
  }
}

export default Component;
