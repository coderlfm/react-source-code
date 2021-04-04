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
