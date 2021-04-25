import React from 'react'
import ReactDOM from 'react-dom'


const hookStates = [];  // 存储所有的 hooks 
let lastIndex = 0;      // 记录当前渲染的索引，每次调用一个hooks 都会自增，render 一次后重置为 0 ，保证索引的正确性

function useState(initialState) {
  hookStates[lastIndex] = hookStates[lastIndex] || initialState;

  // 记录当前的索引，保证下次 调用setState 的时候 修改的 state 是原来的的索引，而不是最有一次的索引
  const currentIndex = lastIndex++;

  function setState(nweState) {
    // debugger;
    if (typeof nweState === 'function') {
      hookStates[currentIndex] = nweState(hookStates[currentIndex]);
    } else {
      hookStates[currentIndex] = nweState;
    }
    render();
  }

  return [hookStates[currentIndex], setState]
}


function useRef() {
  hookStates[lastIndex] = hookStates[lastIndex] || { current: null }

  // 设置完后需要自增索引
  return hookStates[lastIndex++];
}

function useMemo(factory, deps) {

  if (hookStates[lastIndex]) {

    // 说明上一次有
    const [oldMemo, prevDeps] = hookStates[lastIndex];

    if (prevDeps.length && prevDeps.every((item, index) => item !== deps[index])) {

      const memo = factory();
      hookStates[lastIndex++] = [memo, deps];
      return memo;
    } else {
      lastIndex++;
      return oldMemo;
    }

  } else {
    const memo = factory();

    hookStates[lastIndex++] = [memo, deps]
    return memo;
  }

}


function App() {

  // debugger;
  const [counter, setCounter] = useState(0);
  const [counterMax, setCounterMax] = useState(10);
  const counterRef = useRef();
  const memoCounter = useMemo(() => {
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
  </div>;
}

function render() {
  // 每次 render 都需要让索引重置
  lastIndex = 0;
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )

}

render()