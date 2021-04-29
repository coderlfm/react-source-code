import { forwardRef } from "react";

export default function () {

  const oldHistory = window.history;
  const listens = [];

  function back() {
    oldHistory.back();
  }

  function block() {

  }

  function createHref() {

  }

  function go(n) {
    oldHistory.go(n)
  }

  function listen(listen) {
    listens.push(listen);

    return function () {
      listens = listens.filter(l => l != listen)
    }
  }

  function setStaet(newState) {
    Object.assign(history, newState);
    listens.forEach(listen => listen(history.location));
  }

  function push(pathname, state) {
    oldHistory.pushState(state, null, pathname);
    const action = 'PUSH';
    const location = { pathname, state };
    setStaet({ action, location })

  }

  function replace() {

  }


  const history = {
    action: "POP",
    back,
    block,
    createHref,
    forwardRef,
    go,
    listen,
    location: { pathname: window.location.pathname, state: oldHistory.state },
    push,
    replace,
  }

  return history
}