import React, { createRef } from "./react";
import ReactDOM from "./react-dom";

class Counter extends React.Component {
  constructor(props) {
    super(props);

    this.ref = createRef();
  }

  state = {
    count: 0,
  };

  /**
   * div 点击事件
   * @param {*} event
   */
  handleDivClick = (event) => {
    console.log("div 发生点击(冒泡)");
  };

  /**
   * 同步更新 - 当前已经是异步更新了，内部实现了合成事件
   */
  increment = (event) => {
    this.setState({ count: this.state.count + 1 });
    console.log(this.state.count);

    this.setState({ count: this.state.count + 1 });
    console.log(this.state.count);

    console.log("event:", event);

    setTimeout(() => {
      console.log("setTimeout event:", event);
    });
  };

  /**
   * 异步更新(自动动)
   */
  incrementAsync = () => {
    this.setState({ count: this.state.count + 1 });
    console.log(this.state.count);

    this.setState({ count: this.state.count + 1 });
    console.log(this.state.count);

    // this.setState((prevState) => ({ count: prevState.count + 1 }));
  };

  /**
   * 打印ref
   */
  handleGetRef = () => {
    console.log("ref:", this.ref);
  };

  render() {
    return (
      <div onClick={this.handleDivClick}>
        {this.state.count}
        <br />
        <button onClick={this.increment}>同步更新+</button>
        <br />
        <button onClick={this.incrementAsync}>异步更新+</button>
        <br />

        <button onClick={this.handleGetRef} ref={this.ref}>
          获取元素 ref
        </button>
      </div>
    );
  }
}

const element = <Counter />;

ReactDOM.render(element, document.getElementById("root"));
