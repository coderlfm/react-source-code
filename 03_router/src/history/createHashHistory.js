export default function () {

  const oldHistory = window.history;
  let listens = [];
  let action = 'POP';
  let stack = []; // 路由栈
  let lastIndex = -1;


  function back() {
    go(-1);
  }

  function forwardRef() {

  }


  function go(n) {
    action = 'POP'

    lastIndex += n;

    const location = stack[lastIndex];

    history.location = location;
    window.location.hash = location.pathname;
    setStaet(location.state);
  }

  function listen(listen) {
    listens.push(listen);

    return function () {
      listens = listens.filter(l => l != listen)
    }
  }

  addEventListener('hashchange', function () {

    if (action === 'PUSH') {
      stack[++lastIndex] = history.location
    }

  })

  function setStaet(newState) {
    Object.assign(history, { location: { ...history.location, ...newState } });
    listens.forEach(listen => listen(history.location));

  }

  function push(pathname, state) {
    // debugger;
    action = 'PUSH'
    window.location.hash = pathname;
    history.location = { ...history.location, pathname };
    setStaet({ state })

  }

  function replace() {

  }


  const history = {
    action: "POP",
    back,
    forwardRef,
    go,
    listen,
    location: { pathname: window.location.hash ? window.location.hash.slice(1) : '/', state: oldHistory.state },
    push,
    replace,
  }

  // debugger;

  // 如果当前是第一次进入，则需要把当前页面push进去，记录第一页
  if (!stack.length) {
    const pathname = window.location.pathname;
    push(pathname);
    stack[++lastIndex] = { pathname }
  }

  // console.log('history:', history);
  window.myHistory = history;
  return history
}