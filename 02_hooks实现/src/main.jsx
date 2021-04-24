import React from 'react'
import ReactDOM from 'react-dom'

let lastState;
function useState(initialState) {
  lastState = lastState || initialState;

  function setState(nweState) {
    lastState = nweState;
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

  return <div>
    <h2>counter: {counter}</h2>
    <button onClick={() => setCounter(counter + 1)}>+</button>
  </div>;
}

function render() {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )

}

render()