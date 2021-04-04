jsx 经过 babel 编译得到 React.createElement
React.createElement() 调用后 得到 vdom(虚拟 dom) {type, props}

jsx -> React.createElement -> vdom(虚拟 dom)

## 异步更新 state

1. 创建更新队列 updateQueue

```js
export const updateQueue = {
  updates: [],
  isBatchUpdate: false,
  add(update) {
    this.updates.push(update);
  },
  batchUpdate() {
    this.updates.forEach((update) => update.updateComponent());
  },
};
```

2. 新建 `Updater` 类

```js
class Updater = {
  constructor(classInstance){
    this.classInstance = classInstance;
    this.pendingState = [];
  }

  addState(update){
    this.pendingState.push(update);

    updateQueue.isBatchUpdate ? updateQueue.add(this) : updateComponent();
  }

  updateComponent(){
    this.classInstance.state = this.getState();
    const renderVdom = this.classInstance.render();

    this.forceUpdate(this.classInstance, renderVdom)
  }

  getState(){
    let { state } = this.classInstance;
      this.pendingState.forEach(nextState => {
        if(isFunction(nextState)){
          state = {...state, ...nextState(state)};
        }
          state = {...state, ...nextState};
      });

    return state;
  }

}

function forceUpdate(classInstance, vdom){
  const oldDom = classInstance.dom;
  const newDom = createDOM(vdom);

  oldDom.parentNode.replaceChild(newDom, oldDom);
  classInstance.dom = newDom;

}

```
3. component 新增 update
``` js
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

```

4. 组件使用
``` jsx
import React, { createElement } from "./react";
import ReactDOM from "./react-dom";
import { updateQueue } from "./component";

class Counter extends React.Component {
  state = {
    count: 0,
  };

  /**
   * 同步更新
   */
  increment = () => {
    this.setState({ count: this.state.count + 1 });
    console.log(this.state.count);

    this.setState({ count: this.state.count + 1 });
    console.log(this.state.count);
  };

  /**
   * 异步更新(手动)
   * 1. 将 updateQueue.isBatchUpdate 设为 true
   * 2. 调用 setState
   * 3. 调用 updateQueue.batchUpdate() 执行更新
   * 4. 将 updateQueue.isBatchUpdate 设为 false
   */
  incrementAsync = () => {
    updateQueue.isBatchUpdate = true;

    this.setState({ count: this.state.count + 1 });
    console.log(this.state.count);

    this.setState({ count: this.state.count + 1 });
    console.log(this.state.count);

    // this.setState((prevState) => ({ count: prevState.count + 1 }));

    updateQueue.batchUpdate();
    updateQueue.isBatchUpdate = false;
  };

  render() {
    return (
      <div>
        {this.state.count}
        <br />
        <button onClick={this.increment}>同步更新+</button>
        <br />
        <button onClick={this.incrementAsync}>异步更新+</button>
      </div>
    );
  }
}

const element = <Counter> </Counter>;

ReactDOM.render(element, document.getElementById("root"));

```