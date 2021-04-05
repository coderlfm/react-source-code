import React, { createElement } from "./react";
import ReactDOM from "./react-dom";

class Counter extends React.Component {
  state = {
    count: 0,
  };

  /**
   * 同步更新
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
