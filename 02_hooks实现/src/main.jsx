import React from 'react'
import ReactDOM from 'react-dom'


function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return { number: action.payload };

    default:
      state;
  }
}

let lastRecuder;
const hookStates = [];
let lastIndex = 0;

function useReducer(reducer, initializerArg, init) {

  const currentIndex = lastIndex++;

  if (!hookStates[currentIndex] ) {
    hookStates[currentIndex] = init(initializerArg);
  }


  function dispatch(action) {
    hookStates[currentIndex] = reducer(initializerArg, action);
    render()
  }

  return [hookStates[currentIndex], dispatch]
}


function App() {

  const [counter, setCounter] = React.useState(0);
  const [counterMax, setCounterMax] = React.useState(10);
  const counterRef = React.useRef();

  const [number, dispatch] = useReducer(reducer, { counter: 0 }, (value) => {
    return { number: value.counter }
  })

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
    <h2>useReducer :{number.number} <button onClick={() => {
      dispatch({ type: 'ADD', payload: number.number + 1 })
    }}>+</button></h2>
    <Child />
  </div>;
}

function Child() {

  return <div >
    child
  </div>
}


function render() {
  // 每次 render 都需要让索引重置
  lastIndex = 0
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )

}

render()