import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'


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

// 自定义 hooks 实现 useRequest
function useRequest(url) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [data, setData] = useState([]);

  const loadMore = () => {
    setData(null);

    console.log(`${url}?page=${page}&pageSize=${pageSize}`);

    fetch(`${url}?page=${page}&pageSize=${pageSize}`).then(res => res.json())
      .then(res => {
        setPage(page + 1)
        setData([...data, ...res.data]);
      })
  }

  useEffect(() => {
    loadMore();
  }, [])

  return [data, loadMore];

}

function useLayoutEffect(effect, deps) {
  if (hookStates[lastIndex]) {

    const [prevEffect, prevDestroy, prevDeps] = hookStates[lastIndex];

    const isUpdate = deps.length && prevDeps.every((item, index) => item !== deps[index]);

    if (isUpdate) {
      prevDestroy && prevDestroy();

      // 或者使用 Promise.resolve().then(()=>{ // 函数体 })
      // 开启一个微任务
      queueMicrotask(() => {
        const destroy = prevEffect();
        hookStates[lastIndex++] = [effect, destroy, deps];
      })

    }

  } else {
    queueMicrotask(() => {
      hookStates[lastIndex++] = [effect, effect(), deps];
    })
  }
}

function useImperativeHandle(ref, init) {
  ref.current = init();
}

// 自定义动画
function useAnimation(baseClassName) {

  const [className, setClassName] = useState(baseClassName)

  function start() {
    if (className === 'circle') {
      setClassName('circle-big')
    } else {
      setClassName('circle')
    }
  }

  return [className, start];
}

function App() {

  const [className, start] = useAnimation('circle')

  return <div>
    <div className={className}></div>
    <br />
    <button onClick={start} >加载更多</button>
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