import React from './react';
import ReactDOM from './react-dom';

const ThemeContext = React.createContext();

class Parent extends React.Component {
  state = {
    show: true
  }

  /**
   * 修改颜色
   */
  handleChangeShow = () => {
    console.log('点击');
    this.setState({
      show: this.state.show ? false : true
    })
  }


  render() {

    return (
      <div>
        {
          this.state.show ? <Children /> : null
      }

        <button onClick={this.handleChangeShow}>切换</button>
      </div>
    )
  }
}

class Children extends React.Component {
  render() {
    return <Title />
  }
}


class Title extends React.Component {
  render() {
    return <div> 'title'</div>
  }
}

// const Element = CounterWrapper('子标题可以自定义哦')(Counter);
// const Element = CounterWrapper('子标题可以自定义哦')(Counter);


// console.log(Element);
ReactDOM.render(<Parent />, document.getElementById('root'));
