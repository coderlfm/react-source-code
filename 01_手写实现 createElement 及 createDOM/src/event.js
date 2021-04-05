/**
 * 合成事件
 * @param {*} dom dom元素
 * @param {String} eventType 事件类型
 * @param {Function} lister 事件的处理函数
 */
export function addEvent(dom, eventType, lister) {
  // let store = dom.store || (dom.soter = {});

  // 1. 先在需要绑定事件的元素中添加 store 属性
  dom.store = dom.store || {};

  // 2. 将事件处理函数挂到 元素中的 store属性中
  dom.store[eventType.slice(2)] = lister;

  // 3. 将事件代理到 [document] 中，在 react17 会代理到根节点上
  document.addEventListener(eventType.slice(2), dispatchEvent, false);
}

// 事件对象
let synthesisEvent = {};

/**
 * 合成事件
 * @param {Object} nativeEvent 原生事件对象
 */
function dispatchEvent(nativeEvent) {
  // . 取出 事件目标 及 事件类型
  const { target, type } = nativeEvent;

  // . 从 事件目标中 取出 store
  const { store } = target;

  // . 创建合成事件对象
  synthesisEvent = createSynthesisEvent(nativeEvent);

  // . 取出事件对象，将 合成事件对象 传入
  store[type].call(target, synthesisEvent);

  // . 清空 合成事件对象
  clearSynthesisEvent(synthesisEvent);
  
  // console.log("event：", synthesisEvent);
}

/**
 * 创建合成事件对象
 * @param {Object} nativeEvent 原生事件对象
 * @returns {Object} synthesisEvent 合成事件对象
 */
function createSynthesisEvent(nativeEvent) {
  const synthesisEvent = {};

  for (const key in nativeEvent) {
    synthesisEvent[key] = nativeEvent[key];
  }

  return synthesisEvent;
}

/**
 * 清空事件对象
 * @param {Object} synthesisEvent 合成事件对象
 */
function clearSynthesisEvent(synthesisEvent) {
  for (const key in synthesisEvent) {
    synthesisEvent[key] = null;
  }
}
