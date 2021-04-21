import React from './react';
import ReactDOM from './react-dom';

const ThemeContext = React.createContext();

class Parent extends React.Component {
  state = {
    color: 'red'
  }

  /**
   * 修改颜色
   */
  handleOnChangeColor = () => {
    console.log();
    this.setState({
      color: this.state.color === 'red' ? 'green' : 'red'
    })
  }


  render() {
    const style = { color: this.state.color, changeColor: this.handleOnChangeColor };

    return (
      <ThemeContext.Provider value={style}>
        <main> <Children /> </main>
      </ThemeContext.Provider>
    )
  }
}

class Children extends React.Component {
  render() {
    return <ThemeContext.Consumer>
      {
        ({ color }) => {
          {/* console.log('color ', color) */}
          return <div style={{ border: `2px solid ${color}`, padding: '5px' }}> <Title /> </div>
        }
      }
    </ThemeContext.Consumer>
  }
}


class Title extends React.Component {
  render() {
    return <ThemeContext.Consumer>
      {
        ({ color, changeColor }) => {
          {/* console.log('color ', color, changeColor) */ }
          return <div>
            <h1 style={{ border: `2px solid ${color}`, color }}> hello Context </h1>
            <button onClick={changeColor}>修改颜色</button>
          </div>;
        }
      }
    </ThemeContext.Consumer>
  }
}

// const Element = CounterWrapper('子标题可以自定义哦')(Counter);
// const Element = CounterWrapper('子标题可以自定义哦')(Counter);


// console.log(Element);
ReactDOM.render(<Parent />, document.getElementById('root'));
