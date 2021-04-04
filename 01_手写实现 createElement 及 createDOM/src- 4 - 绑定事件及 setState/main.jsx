
import React, { createElement } from "./react";
import ReactDOM from "./react-dom";

class Counter extends React.Component {
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

const element = <Counter title="react 类组件" a > <span>123</span> </Counter>;

// console.log("element:", element);
// {
//   type: Counter,
//   props:{
//     title,
//     a,
//     Children: {
//       type:'span',
//       config: null,
//       children: 123
//     }
//   }
// }
// console.log("element:", JSON.stringify(element, null, 2));

ReactDOM.render(element, document.getElementById("root"));
