export default function () {

  const oldHistory = window.history;
  const listens = [];
  let action = 'POP';
  let stack = []; // 路由栈
  let lastIndex = -1;


  function back() {
    go(-1);
  }

  function forwardRef() {

  }


  function go(n) {
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
    listens.forEach(listen => listen(History.location.state));

  }

  function push(pathname, state) {
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

  // 如果用户当前不是hash则设置为hash 环境
  !window.location.hash && (window.location.hash = window.location.pathname)

  // console.log('history:', history);
  return history
}