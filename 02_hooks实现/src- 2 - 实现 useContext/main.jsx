import React from 'react'
import ReactDOM from 'react-dom'

const StyleProvider = React.createContext();

function useContext(context) {
  return context._currentValue;
}


function App() {

  // debugger;
  const [counter, setCounter] = React.useState(0);
  const [counterMax, setCounterMax] = React.useState(10);
  const counterRef = React.useRef();
  const [style] = React.useState({ color: 'red' })

  const memoCounter = React.useMemo(() => {
    return counter * 100
  }, [counter])


  const handleClick = () => {
    setTimeout(() => {
      console.log(counterRef.current);
    }, 2000);
  }


  return <div>
    <h2 onClick={handleClick}>
      counter: {counter}
      <br />
      counterRef: {counterRef.current}
      <br />
      <button onClick={() => {
        counterRef.current = counter + 1;
        setCounter(counter + 1);
      }}>+</button>
      <button onClick={() => setCounter((count) => count + 1)}> 函数添加+</button>
    </h2>

    <h2 onClick={handleClick}>
      counterMax: {counterMax}
      <br />
      <button onClick={() => setCounterMax(counterMax + 10)}>+</button>
      <button onClick={() => setCounterMax((counterMax) => counterMax + 10)}> 函数添加+</button>
    </h2>

    <h2>counter 的 useMemo:{memoCounter}</h2>
    <StyleProvider.Provider value={style} >
      <Child />
    </StyleProvider.Provider>
  </div>;
}

function Child() {

  const style = useContext(StyleProvider);

  return <div style={style}>
    child
  </div>
}


function render() {
  // 每次 render 都需要让索引重置
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )

}

render()