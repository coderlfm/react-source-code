import Component from "./component";

/**
 * 创建元素
 * @param {String} type 元素类型
 * @param {Object} config 元素属性
 * @param {*} children 子元素
 * @returns {{ type: string, props: { children: any }, ref?: { current: null }}}
 */
export function createElement(type, config, children) {
  // console.log('config:', config);

  let ref = undefined;

  if (config) {
    delete config._owner;
    delete config._store;

    if (config.ref) {
      ref = config.ref;
      delete config.ref;
    }
  }

  // 第三个元素后面都是子元素
  if (arguments.length > 3) {
    children = Array.prototype.splice.call(arguments, 2);
  }

  return { type, props: { ...config, children }, ref };
}

/**
 * 创建 ref
 * @param {*} defaultVal 默认值
 * @returns {{current: defaultVal | null}}
 */
export function createRef(defaultVal) {
  return { current: defaultVal };
}

const React = {
  createElement,
  Component,
  createRef,
};

export default React;
