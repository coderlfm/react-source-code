import React from 'react'
import RouterContext from './RouterContext'

export class Router extends React.Component {

  constructor(props) {
    super(props);

    const { history } = props;

    // 取到路由容器传过来的 props 
    this.state = {
      location: history.location
    }

    // 监听路由改变
    props.listen(({ location }) => {
      console.log('location:', location);
    })

  }


  render() {

    const value = {
      location: this.state.location
    }

    return <RouterContext.Provider value={value}> {this.props.children} </RouterContext.Provider>
  }
}

export default Router;