import React from './react';
import ReactDOM from './react-dom';

const ThemeContext = React.createContext();

class Parent extends React.PureComponent {
  state = {
    show: true
  }

  /**
   * 修改颜色
   */
  handleChangeShow = () => {
    // console.log('点击');
    this.setState({
      show: true
    })
  }


  render() {
    console.log('render()');

    return (
      <div>
        <h2>
          状态: {this.state.show ? 'show' : 'hide'}
        </h2>
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

ReactDOM.render(<Parent />, document.getElementById('root'));
