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
  }

  function setStaet(newState) {
    Object.assign(history, newState);
  }

  function push(pathname, state) {
    oldHistory.pushState(state, null, pathname);
    listens.forEach(listen => listen());
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
    location: { pathname: window.location.pathname },
    push,
    replace,
  }

  return history
}