import { addEvent } from './event';

/**
 * 渲染元素
 * @param {Object} vdom 虚拟dom
 * @param {*} container 容器
 */
function render(vdom, container) {
  const dom = createDOM(vdom);
  dom && container.appendChild(dom);
}

/**
 * 函数组件和类组件
 * @typedef {Class} ClassComponent
 * @property  {Boolean} [isReactComponent]  是否类组件，可选参数
 */

/**
 * 创建真实dom
 * @param {Object} vdom 创建dom
 * @param {Object} vdom.props 元素属性
 * @param {(String|ClassComponent)} vdom.type  元素类型
 * @param {Object} [vdom.ref]  元素ref
 * @param {null} vdom.ref.current  元素ref current
 */
export function createDOM(vdom) {
  // 1. 如果 vdom 是字符串或者数字，则创建一个文本节点
  if (typeof vdom === 'string' || typeof vdom === 'number') {
    return document.createTextNode(vdom);
  }

  // 2. 如果 vdom 是 null 或者 undefined 则返回空串
  if (!vdom) {
    return '';
  }

  // 3. 以上都不是，则 children 是一个元素
  const { type, props, ref } = vdom;

  if (typeof vdom.type === 'function') {
    // 3.1 vdom 是一个 类组件组件， 通过 isReactComponent 来判断
    if (vdom.type.isReactComponent) {
      return updateClassComponent(vdom);
      // 3.2 vdom 是一个 函数组件， 例如：<Welcome  />
    } else {
      // 3.2.1 直接通过 [updateFunctionComponent] 来生成真实 dom
      return updateFunctionComponent(vdom);
    }
  }

  // 3.2.1 vdom 是一个 原生元素 通过 React.createElement 创建的
  const dom = document.createElement(type);

  // 3.2.2 将属性挂载到元素上
  updateProps(dom, {}, props);

  // 4. 渲染 props.children

  // 4.1 props.children 是字符串或者数字，则创建一个文本节点
  if (typeof props.children === 'string' || typeof props.children === 'number') {
    dom.textContent = props.children;
    // dom.appendChild(document.createTextNode(props.children));
  }

  // 4.2 props.children 只有一个子元素，则直接递归调用 render 来创建子元素
  if (typeof props.children === 'object' && props.children.type) {
    render(props.children, dom);
  }

  // 4.3 props.children 是一个数组，则表示有多个子元素
  if (Array.isArray(props.children)) {
    reconcileChilren(props.children, dom);
  }

  if (ref) {
    ref.current = dom;
  }

  // 给类组件的vdom身上加上dom属性，在组件更新的时候才能获取到
  // debugger;
  vdom.dom = dom;
  return dom;
}

/**
 * 类组件创建真实 dom
 * 1. new 一个组件的实例
 * 2. 调用 实例的 render 方法得到 vdom(虚拟dom)
 * 3. 调用 [createDOM] 将 vdom 传入，得到真实 dom
 * @param {Object} vdom 虚拟dom
 * @param {ClassComponent}  vdom.type 元素类型，类
 * @param {Object} vdom.props 元素属性
 */
function updateClassComponent(vdom) {
  const { type, props } = vdom;
  const classInstance = new type(props);

  vdom.classInstance = classInstance;

  // 组件即将挂载
  if (classInstance.componentWillMount) {
    classInstance.componentWillMount();
  }

  const renderVdom = classInstance.render();
  const dom = createDOM(renderVdom);

  // 此处将真实 dom 添加到 类组件 的实例身上，在 setState 进行组件数据更新时需要用的

  vdom.dom = renderVdom.dom = dom;
  classInstance.oldVdom = renderVdom;
  classInstance.dom = dom;
  // classInstance.dom = dom;

  // 组件挂载完毕，此逻辑应该在 dom.appendChild 中再调用
  if (classInstance.componentDidMount) {
    classInstance.componentDidMount();
  }

  return dom;
}

/**
 * 函数组件创建真实 dom
 * 如果函数式组件返回的不是原生元素，也会递归调用 createDOM
 * @param {Object} vdom 虚拟dom
 * @param {Function} vdom.type  元素类型，函数
 * @param {Object} vdom.props 元素属性
 * @returns 真实 dom
 */
function updateFunctionComponent(vdom) {
  const { type, props } = vdom;
  const dom = createDOM(type(props));
  return dom;
}

/**
 * 递归渲染子元素
 * @param {Object[]} childernVdom 虚拟dom
 * @param {*} container 容器
 */
function reconcileChilren(childernVdom, container) {
  childernVdom.forEach(vdom => render(vdom, container));
}

/**
 * 将属性挂载到元素上
 * @param {*} dom   目标dom
 * @param {*} odlProps 需要挂载到 dom 上的属性
 * @param {*} newProps 需要挂载到 dom 上的属性
 */
function updateProps(dom, oldProps, newProps) {
  for (let key in newProps) {
    // 1. 如果是 chilren 则跳过，需要单独处理
    if (key === 'children') {
      continue;

      // 2. 如果是样式，则遍历添加上去
    } else if (key === 'style') {
      const styleObj = newProps[key];
      for (let key in styleObj) {
        dom.style[key] = styleObj[key]; // div.style.color = 'color'
      }

      // 3. 如果属性是以 on 开头的，则为事件处理函数
    } else if (key.startsWith('on')) {
      // 给 dom 绑定事件需要为小写 div.onclick
      // dom[key.toLocaleLowerCase()] = newProps[key];

      // 使用事件合成来添加事件
      addEvent(dom, key.toLocaleLowerCase(), newProps[key]);
      // 4. 如果是 ref 则跳过
    } else if (key === 'ref') {
      continue;
      // 5. 如果是其它的，则直接添加
    } else {
      dom[key] = newProps[key];
    }
  }
}

/**
 * 比较两个vdom
 * @param {*} parentDom 父节点
 * @param {*} oldVdom 旧的dom
 * @param {*} newVdom 新的dom
 * @param {*} nextDom 当前dom 的后一个dom
 * @returns {*} 新的vdom
 */
export function compareTwoVdom(parentDom, oldVdom, newVdom, nextDom) {
  // console.log(oldVdom, newVdom);
  // console.log(oldVdom.classInstance);
  // debugger;

  // 1. 如果新旧都是 null
  if (oldVdom === null && newVdom === null) {
    return null;

    // 2.老的没有，新的有
  } else if (oldVdom === null && newVdom) {
    const dom = createDOM(newVdom);
    newVdom.dom = dom;
    // 暂时使用该方式插入
    // parentDom.appendChild(dom);

    if (nextDom) {
      parentDom.insertBefore(dom, nextDom);
    } else {
      parentDom.appendChild(dom);
    }

    return newVdom;

    // 3.如果老的有，新的没有
  } else if (oldVdom && newVdom === null) {
    parentDom.removeChild(oldVdom.dom);

    // 这个 oldVdom.classInstance 纠结了很久是怎么获取到的，这里记录一下，在当前例子中，只有childrenCount 才有 classInstance
    // 1. 在Counter 用 children 创建真实dom的时候，第二个 child 是 类组件，类组件会走到 updateClassComponent() ,并且将该组件的 vdom传进去
    // 2. updateClassComponent 中给该组件的vdom添加了 vdom.classInstance，可以通过该 vdom 获取该类组件的实例
    // 3. 但是这里却是从 oldVdom 中取的 classInstance，原因是 当从 updateChildren 中调用 compareTwoVdom 时，这个 oldVdom 其实是组件的 Vdom，那组件的Vdom，我们在第二步已经给组件的vdom身上添加了 vdom.classInstance，所以在类组件身上是可以获取的，原生的元素是没有这个属性的

    if (oldVdom.classInstance && oldVdom.classInstance.componentWillMount) {
      oldVdom.classInstance.componentWillMount();
    }

    console.log('触发卸载生命周期');
    // 3.1 触发卸载生命周期

    return null;

    // 4. 老的虚拟dom和新的 虚拟dom都有
  } else {
    // debugger;
    domDiff(parentDom, oldVdom, newVdom);
    return newVdom;
  }

  return newVdom;
}

/**
 * 进行diff比较
 * @param {*} oldVdom
 * @param {*} newVdom
 * @returns
 */
function domDiff(parentDom, oldVdom, newVdom) {
  // debugger;
  // 说明是原生元素
  if (
    (typeof oldVdom === 'string' && typeof newVdom === 'string') ||
    (typeof oldVdom === 'number' && typeof newVdom === 'number')
  ) {
    if (oldVdom !== newVdom) {
      // parentDom.repliceChild(oldVdom, newVdom);
      // repli innerText = newVdom;

      return;
    }
    return;
  }

  // 复用 旧的dom
  const currentDOM = (newVdom.dom = oldVdom.dom);
  newVdom.classInstance = oldVdom.classInstance;

  if (typeof oldVdom.type === 'string') {
    // 更新元素上的属性
    updateProps(currentDOM, oldVdom.props, newVdom.props);

    // 更新 children
    updateChildren(currentDOM, oldVdom.props.children, newVdom.props.children);

    return;

    // 说明是一个组件
  } else if (typeof oldVdom.type === 'function') {
    updateClassInstance(oldVdom, newVdom);
  }
}

/**
 * 更新组件实例
 * @param {*} oldVdom
 * @param {*} newVdom
 */
function updateClassInstance(oldVdom, newVdom) {
  const classInstance = oldVdom.classInstance;

  classInstance.componentWillReceiveProps && classInstance.componentWillReceiveProps();

  classInstance.update.emitUpdate(newVdom.props);
}

/**
 * 更新子节点
 * @param {*} parentDom
 * @param {*} oldChildren
 * @param {*} newChildren
 */
function updateChildren(parentDom, oldChildren, newChildren) {
  // 单节点
  if (!oldChildren && !newChildren) {
    return;
  }

  // 1. children 是文本或者字符串，则直接覆盖
  if (
    (typeof oldChildren === 'string' && typeof newChildren === 'string') ||
    (typeof oldChildren === 'number' && typeof newChildren === 'number')
  ) {
    if (oldChildren !== newChildren) {
      parentDom.innerText = newChildren;
    }
    return;
  }

  // children 是单节点或者多节点
  !Array.isArray(oldChildren) && (oldChildren = [oldChildren]);
  !Array.isArray(newChildren) && (newChildren = [newChildren]);

  const maxLength = Math.max(oldChildren.length, newChildren.length);

  // debugger;
  for (let index = 0; index < maxLength; index++) {
    // const element = maxLength[index];
    // 在旧的 vdom 身上查找 当前 [index] 的vdom 是否有下一个 dom，有的话需要在这一步查找出来
    const nextDom = oldChildren.find((item, itemIndex) => item && itemIndex > index && item.type);
    compareTwoVdom(parentDom, oldChildren[index], newChildren[index], nextDom && nextDom.dom);
  }
}

const reactDOM = {
  render,
  compareTwoVdom,
};

export default reactDOM;
