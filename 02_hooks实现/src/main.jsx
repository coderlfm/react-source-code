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
    hookStates[currentIndex] = init ? init(initializerArg) : initializerArg;
  }


  function dispatch(action) {
    hookStates[currentIndex] = reducer ? reducer(initializerArg, action) : action;
    render()
  }

  return [hookStates[currentIndex], dispatch]
}

function useState(initialize) {
  return useReducer(null, initialize);
}


function useEffect(effect, deps) {

  if (hookStates[lastIndex]) {

    const [prevEffect, prevDestroy, prevDeps] = hookStates[lastIndex];

    const isUpdate = deps.length && prevDeps.every((item, index) => item !== deps[index]);

    if (isUpdate) {
      prevDestroy && prevDestroy();

      setTimeout(() => {
        const destroy = prevEffect();
        hookStates[lastIndex++] = [effect, destroy, deps];
      });
    }

  } else {
    setTimeout(() => {
      hookStates[lastIndex++] = [effect, effect(), deps];
    })
  }

}


function App() {

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    console.log('重新渲染');

    return () => {
      console.log('组件卸载');
    }
  }, [])


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



function render() {
  // 每次 render 都需要让索引重置
  lastIndex = 0
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )

}

render()