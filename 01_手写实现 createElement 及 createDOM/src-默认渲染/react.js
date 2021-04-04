/**
 * 创建元素
 * @param {String} type 元素类型
 * @param {{}} config 元素属性
 * @param {*} children 子元素
 * @returns { type: string, props: { children: any, }
 */
export function createElement(type, config, children) {
  if (config) {
    delete config._owner;
    delete config._store;
  }

  // 第三个元素后面都是子元素
  if (arguments.length > 3) {
    children = Array.prototype.splice.call(arguments, 2);
  }

  return { type, props: { ...config, children } };
}

const React = {
  createElement,
};

export default React;
