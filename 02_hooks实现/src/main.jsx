import React from 'react'
import ReactDOM from 'react-dom'

let lastState;
function useState(initialState) {
  lastState = lastState || initialState;

  function setState(nweState) {
    if (typeof nweState === 'function') {
      lastState = nweState(lastState);
    } else {
      lastState = nweState;
    }
    render();
  }

  return [lastState, setState]
}


let lastRef
function useRef() {
  return useRef || { current: null };
}


function App() {

  const [counter, setCounter] = useState(0);
  const counterRef = useRef();

  const handleClick = () => {
    setTimeout(() => {
      console.log(counterRef.current);
    }, 2000);
  }


  return <div>
    <h2 onClick={handleClick}>counter: {counter}</h2>
    <button onClick={() => {
      counterRef.current = counter + 1;
      setCounter(counter + 1);
    }}>+</button>
    <button onClick={() => setCounter((count) => count + 1)}> 函数添加+</button>
  </div>;
}

function render() {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )

}

render()