import { isFunction } from '../utils/index.js';
import { createDOM, compareTwoVdom } from './react-dom.js';

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
    // console.log('updates', this.updates);
    // 开始批量更新，调用 updateComponent()
    this.updates.forEach(update => update.updateComponent());
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

    // 同步更新相当于直接调用 updateComponent()
    // this.updateComponent();
    this.emitUpdate();
  }

  /**
   * 发出更新
   */
  emitUpdate(nextProps) {
    this.nextProps = nextProps;

    // 判断是否需要 异步更新(合并更新) 异步更新需要将 this 传进去 updateQueue.add(this)
    nextProps || !updateQueue.isBatchUpdate ? this.updateComponent() : updateQueue.add(this);
  }

  /**
   * 更新组件
   */
  updateComponent() {
    const { pendingState, classInstance, nextProps } = this;
    // 如果等待更新的队列有值则开始进行更新
    if (nextProps || pendingState.length) {
      sholdUpdate(classInstance, nextProps);
    }
  }

  /**
   * 合并更新state
   * @returns 批量更新后的 state
   */
  getState() {
    let { state } = this.classInstance;

    this.pendingState.forEach(nextState => {
      // 如果setState 传入的是一个方法，则需要将上一次的 state值传入；
      if (isFunction(nextState)) {
        nextState = {
          ...state,
          ...nextState(state),
        };
      }
      state = {
        ...state,
        ...nextState,
      };
    });

    return state;
  }
}

/**
 * 组件是否需要更新
 * @param {*} classInstance 组件实例
 * @returns
 */
function sholdUpdate(classInstance, nextProps) {
  if (nextProps) classInstance.props = nextProps;

  // debugger;
  // 此处无论组件重不重新渲染， state已经改变为最新的值了
  const nextState = (classInstance.state = classInstance.update.getState());

  // 实现 shouldComponentUpdate() 是否需要重新渲染  此处暂时将旧的 props 传入，实际需要传入 nextProps
  if (classInstance.shouldComponentUpdate && !classInstance.shouldComponentUpdate(classInstance.props, nextState)) {
    return;
  }

  // 组件开始更新
  classInstance.forceUpdate();
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

  /**
   * 强制更新组件
   */
  forceUpdate() {
    // 组件即将更新
    this.componentWillUpdate && this.componentWillUpdate();

    // debugger;

    // 实现 getDerivedStateFromProps 生命周期
    if (this.onwVdom.type.getDerivedStateFromProps) {
      const { children, ...props } = this.props;
      const newState = this.onwVdom.type.getDerivedStateFromProps(props, this.state);
      newState && (this.state = newState);
    }
    
    const oldVdom = this.oldVdom;
    const newVdom = this.render();

    const currentVdom = compareTwoVdom(oldVdom.dom.parentNode, oldVdom, newVdom);

    this.oldVdom = currentVdom;
    this.componentDidUpdate && this.componentDidUpdate();

    // updateClassComponent(this, renderVdom);
  }
}

export default Component;
