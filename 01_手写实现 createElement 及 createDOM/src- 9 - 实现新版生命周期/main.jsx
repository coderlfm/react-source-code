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
   * 同步更新 - 当前已经是异步更新了，内部实现了合成事件
   */
  increment = event => {
    // debugger;
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    // console.log('2. 组件 render()');
    // console.log(this.state.count, this.state.count % 2 !== 0);

    return (
      <div>
        <p>{this.state.count}</p>
        <ChildrenCount propsCount={this.state.count} />
        <br />
        <button onClick={this.increment}>更新+</button>
      </div>
    );
  }
}

class ChildrenCount extends React.Component {

  state = {
    number:1
  }
  
  static getDerivedStateFromProps(props, state) {
    console.log(props, state);
    const { propsCount } = props;

    return { number: propsCount % 2 === 0 ? propsCount * 2 : propsCount * 3 };
    return null;
  }
  
  render() {
    return (
      <div id='children-count'>
        <h2>{this.state.number}</h2>
      </div>
    );
  }
}

const element = <Counter />;

ReactDOM.render(element, document.getElementById('root'));
