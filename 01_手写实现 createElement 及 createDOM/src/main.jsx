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
    // console.log('div 发生点击(冒泡)');
  };

  /**
   * 同步更新 - 当前已经是异步更新了，内部实现了合成事件
   */
  increment = event => {
    // debugger;
    this.setState({ count: this.state.count + 1 });
  };



  shouldComponentUpdate(nextProps, nextState) {
    // console.log('4. 是否需要更新 shouldComponentUpdate');
    return true;
    return this.state.count % 2 === 0;
  }

  render() {
    console.log('2. 组件 render()');
    // console.log(this.state.count, this.state.count % 2 !== 0);

    return (
      <div onClick={this.handleDivClick}>
        <p>{this.state.count}</p>
        <br />
        {this.state.count % 2 === 0 ? <ChildrenCount propsCount={this.state.count} /> : null} 
        <br />
        <button onClick={this.increment}>更新+</button>
      </div>
    );
  }
}

class ChildrenCount extends React.Component {

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
