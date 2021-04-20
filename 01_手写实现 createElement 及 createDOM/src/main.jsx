import React from './react';
import ReactDOM from './react-dom';


// 高阶组件
const CounterWrapper = (props) => (OldComponent) => {
  return class extends React.Component {

    componentDidMount() {
      console.log('组件挂载完成', props, this.props);
    }

    render() {
      return <OldComponent {...this.props} subTitle={props} />;
    }
  }
}

class Counter extends React.Component {

  state = {
    count: 0,
  };

  increment = event => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {

    return (
      <div>
        <p>{this.state.count}</p>
        <br />
        {this.props.title}
        {this.props.subTitle}
        <button onClick={this.increment}>更新+</button>
      </div>
    );
  }
}

const Element = CounterWrapper('子标题可以自定义哦')(Counter);
console.log(Element);
ReactDOM.render(<Element title="hello 高阶组件" />, document.getElementById('root'));
