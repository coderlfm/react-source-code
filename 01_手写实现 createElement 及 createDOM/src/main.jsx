import React, { createElement } from "./react";
import ReactDOM from "./react-dom";

class Couter extends React.Component {
  state = {
    count: 0,
  };

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        {this.state.count}
        <br />
        <button onClick={this.increment}>+</button>
      </div>
    );
  }
}

const element = <Couter title="react 类组件" />;

// console.log("element:", element);
// console.log("element:", JSON.stringify(element.type, null, 2));

ReactDOM.render(element, document.getElementById("root"));
