import React, { createRef } from './react';
import ReactDOM from './react-dom';

class Counter extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    count: 0,
  };

  /**
   * div 点击事件
   * @param {*} event
   */
  handleDivClick = event => {
    console.log('div 发生点击(冒泡)');
  };

  /**
   * 同步更新 - 当前已经是异步更新了，内部实现了合成事件
   */
  increment = event => {
    this.setState({ count: this.state.count + 1 });
    console.log(this.state.count);
  };

  /**
   * 打印ref
   */
  handleGetRef = () => {
    console.log('ref:', this.ref);
  };

  componentWillMount() {
    console.log('1. 组件即将挂载');
  }

  componentDidMount() {
    console.log('3. 组件挂载完毕');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('4. 是否需要更新 shouldComponentUpdate');
    return nextState.count % 2 !== 0;
  }

  componentWillUpdate() {
    console.log('5. 组件即将更新');
  }

  componentDidUpdate() {
    console.log('6. 组件更新完毕');
  }

  componentWillUnMount() {
    console.log('7. 组件即将卸载');
  }

  render() {
    console.log('2. 组件 render()');

    return (
      <div onClick={this.handleDivClick}>
        {this.state.count}
        <br />
        <button onClick={this.increment}>更新+</button>
        <br />

        <ChildrenCount propsCount={this.state.count} />
      </div>
    );
  }
}

class ChildrenCount extends React.Component {
  componentWillMount() {
    console.log('1. 子组件即将挂载');
  }

  componentDidMount() {
    console.log('3. 子组件挂载完毕');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('4. 子是否需要更新 shouldComponentUpdate');
    return nextState.count % 2 !== 0;
  }

  componentWillUpdate() {
    console.log('5. 子组件即将更新');
  }

  componentDidUpdate() {
    console.log('6. 子组件更新完毕');
  }

  componentWillUnMount() {
    console.log('7. 子组件即将卸载');
  }

  render() {
    console.log('2. 子组件 render()');
    return (
      <div id='children-count'>
        <h2>{this.props.propsCount}</h2>
      </div>
    );
  }
}

const element = <Counter />;

ReactDOM.render(element, document.getElementById('root'));
