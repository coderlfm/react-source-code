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


// 反向继承
/**
 * 场景：使用例如 Antd 的组件时，我们可能想在这些组件身上加一下额外的属性
 */
class Button extends React.Component {

  componentDidMount() {
    console.log('componentDidMount()');
  }

  render() {
    return <button>点击</button>
  }
}


class CurrentButton extends Button {

  componentDidMount() {
    console.log('CurrentButton()');
    super.componentDidMount();
  }

  handleClick = () => {
    console.log('点击事件');
  }

  render() {
    const oldComponent = super.render();
    const newProps = { ...oldComponent.props, onClick: this.handleClick }
    const oldChilren = oldComponent.children;

    console.log('oldComponent:', oldComponent);

    return React.cloneElement(oldComponent, newProps, oldChilren, 123)
  }

}
// const Element = CounterWrapper('子标题可以自定义哦')(Counter);
// const Element = CounterWrapper('子标题可以自定义哦')(Counter);


// console.log(Element);
ReactDOM.render(<CurrentButton />, document.getElementById('root'));
