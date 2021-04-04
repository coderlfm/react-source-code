class Component {
  // 通过该属性来标记类组件和函数式组件
  static isReactComponent = true;

  constructor(props) {
    this.props = props;
  }
}

export default Component;
