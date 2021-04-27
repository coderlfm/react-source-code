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


function useImperativeHandle(ref, init) {
  ref.current = init();
}



function App() {

  const [counter, setCounter] = useState(0);
  const divRef = React.useRef();
  const inputRef = React.useRef();

  useEffect(() => {
    console.log('重新渲染');


    console.log(divRef.current.style.trans);

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

    <div style={{ width: 50, height: 50, background: '#cccg' }} ref={divRef}>

    </div>

    <RefChild ref={inputRef} />
    <button onClick={
      () => {
        console.log(inputRef.current)
        inputRef.current.focus()
        inputRef.current.style.color = 'red'
      }
    }>聚焦</button>
  </div>;
}


const RefChild = React.forwardRef((props, ref) => {

  const childRef = React.useRef();

  // 限制对外暴露的方法或者变量
  useImperativeHandle(ref, () => (
    {
      focus: () => {
        childRef.current.focus();
      }
    }
  ))

  return <input ref={childRef} />
})




function render() {
  // 每次 render 都需要让索引重置
  lastIndex = 0
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )

}

render()