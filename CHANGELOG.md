# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.2.0](https://github.com/coderlfm/react-source-code/compare/v1.1.0...v1.2.0) (2021-04-24)


### Features

* **cloneElement:** 新增 cloneElement 和 反向继承 ([13f748c](https://github.com/coderlfm/react-source-code/commit/13f748c1f835e4641d1ec10d3dd2b304bcba0457))
* **component:** 实现 PureComponent ([7758334](https://github.com/coderlfm/react-source-code/commit/7758334bcfc9bb870a1673ec74237f702a0b8e92))
* **createContext:** 完成 createContext ([9d57bf6](https://github.com/coderlfm/react-source-code/commit/9d57bf64c3898ed176318298f213d3bb128301f9))
* **dom:** 实现 组件嵌套时递归查找真实dom的 ([65f245e](https://github.com/coderlfm/react-source-code/commit/65f245ed674cbeec7cb3cc0892ff3b9340460fb8))
* 新增 高阶组件 ([54330b9](https://github.com/coderlfm/react-source-code/commit/54330b976031726f5dcaee71f70f17359b9db59b))
* **event:** 新增 合成事件对象 ([9b109b4](https://github.com/coderlfm/react-source-code/commit/9b109b4eb9d6906de17f6cedb6adb6a490076556))
* **lifecycle:** 实现 类组件 基本生命周期 ([45cae01](https://github.com/coderlfm/react-source-code/commit/45cae0144657b53d3b9f250127cc3ab775da8694))
* **lifecycle:** 实现 类组件更新阶段生命周期 ([116d8ef](https://github.com/coderlfm/react-source-code/commit/116d8ef2895b2b73d0a5ee86bfd1a7ed373b7db7))
* **lifecycle:** 实现 类组件更新阶段生命周期 ([99a77b3](https://github.com/coderlfm/react-source-code/commit/99a77b315a11394611e6aaec91c413eea10df29a))
* **lifecycle:** 完成 组件插入的位置 ([6ddfa34](https://github.com/coderlfm/react-source-code/commit/6ddfa34644107949de19d9ab7d3fb5258472cd62))
* **lifecycle:** 优化生命周期实现 ([3487c5b](https://github.com/coderlfm/react-source-code/commit/3487c5b7ce017e3ae9bacbb5183de3bb1194498b))
* **lifeCycle:** 新增 getDerivedStateFromProps 生命周期 ([8f69c46](https://github.com/coderlfm/react-source-code/commit/8f69c46160ddb6c4390fff3221bd59c7747dd36d))
* **lifycycle:** 实现完整 生命周期 ([8d3c029](https://github.com/coderlfm/react-source-code/commit/8d3c02980599bd05acf1714994b0afae865e83bf))
* **ref:** 新增 实现 ref ([a80226e](https://github.com/coderlfm/react-source-code/commit/a80226e12337669469df421e918e3d8635430cc5))


### Bug Fixes

* **lifycycle:** 修改基本生命周期实现 ([89d383c](https://github.com/coderlfm/react-source-code/commit/89d383ced11c6cbb8d569597d3a01efe77c76ce6))
* **lifycycle:** 修改基本生命周期实现 ([b1353c8](https://github.com/coderlfm/react-source-code/commit/b1353c865e2f0b9f8a3b7c1063aae2ab4ad7ba8d))
* **react-dom:** 优化渲染 ([bb13143](https://github.com/coderlfm/react-source-code/commit/bb131437fbe2286c4086249f22832662b5ac4c1f))
* **react-dom:** 优化diff更新 ([2c86856](https://github.com/coderlfm/react-source-code/commit/2c86856808c73837d9c6b4343122b75eb9cbce6b))

## [1.1.0](https://github.com/coderlfm/react-source-code/compare/v1.0.0...v1.1.0) (2021-04-05)


### Features

* **event:** 新增 事件冒泡 ([ec02f02](https://github.com/coderlfm/react-source-code/commit/ec02f0236754fac557c673c9a700a499173c4046))
* 新增 事件合成 ([2853ead](https://github.com/coderlfm/react-source-code/commit/2853ead709e7c24e2f1d9205d84e230dfdb2ffac))
* 异步更新 state 新增为内部操作 ([47729a8](https://github.com/coderlfm/react-source-code/commit/47729a8e1d35a93de258c92ac86d1826a830d463))


### Bug Fixes

* **state:** 优化 点击事件处理，有点击事件才触发 点击事件 ([6fcc9da](https://github.com/coderlfm/react-source-code/commit/6fcc9dab4ff295938f5e4924923f4f0f9a8b780f))

## 1.0.0 (2021-04-05)


### Features

* **init:** 项目初始化 ([2a7e08b](https://github.com/coderlfm/react-source-code/commit/2a7e08b86bf71c6a240adeb466fff0450752742c))
* **react:** 新增 事件处理函数 及 类组件同步更新 state ([8995f63](https://github.com/coderlfm/react-source-code/commit/8995f630f47ff0a9a76ddec69227820245aa79ea))
* **react:** 新增 手写实现 createElement 和 reacteDOM ([16e17e5](https://github.com/coderlfm/react-source-code/commit/16e17e5d578eea4e73c7f373fdbf8c66a665f755))
* **react:** 新增 异步更新 state ([44ba29f](https://github.com/coderlfm/react-source-code/commit/44ba29f81ff071a6ac31660525837db30a6f8b26))
* **react:** 新增 支持函数式组件 渲染 ([effe2be](https://github.com/coderlfm/react-source-code/commit/effe2be429a4d2b15477ec2fa4d9ab2d8635bf4d))
* **react:** 新增 支持类组件 渲染 ([501998b](https://github.com/coderlfm/react-source-code/commit/501998b4fafff78c9400570ffab3b666ebf0bcc2))


### Bug Fixes

* **react:** 更新state后 updates长度设为0 ([68c8569](https://github.com/coderlfm/react-source-code/commit/68c85690ccc33578d9abbfab16ae4f917522402d))
