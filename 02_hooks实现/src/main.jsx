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

const hookStates = [];
let lastIndex = 0;

function useReducer(reducer, initializerArg, init) {

  const currentIndex = lastIndex++;

  if (!hookStates[currentIndex]) {
    hookStates[currentIndex] = init(initializerArg);
  }


  function dispatch(action) {
    hookStates[currentIndex] = reducer(initializerArg, action);
    render()
  }

  return [hookStates[currentIndex], dispatch]
}

function useState(initialize) {
  
}


function useEffect(effect, deps) {

  if (hookStates[lastIndex]) {

    const [prevEffect, prevDeps] = hookStates[lastIndex];

    const isUpdate = prevDeps.every((item, index) => item !== deps[index]);
    prevEffect();
    const effect = effect();

    if (isUpdate) {
      hookStates[lastIndex++] = [effect, deps];
    }

  } else {
    hookStates[lastIndex++] = [effect(), deps];
  }

}


function App() {

  const [counter, setCounter] = React.useState(0);

  useEffect(() => {
    console.log('重新渲染');
  }, [counter])


  const handleClick = () => {
    setTimeout(() => {
      // console.log(counterRef.current);
    }, 2000);
  }


  return <div>
    <h2 onClick={handleClick}>
      counter: {counter}
      <br />
      <button onClick={() => {
        setCounter(counter + 1);
      }}>++</button>
    </h2>

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