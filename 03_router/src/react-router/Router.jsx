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

    if (props.listen) {

      // 监听路由改变
      this.unlisten = props.history.listen(location => {
        console.log('location:', location);
        this.setState(location);
      })

    }

  }


  componentWillUnmount() {
    this.unlisten && this.unlisten();
  }

  render() {

    const value = {
      location: this.state.location,
      history: this.props.history
    }

    return <RouterContext.Provider value={value}>
      {this.props.children}
    </RouterContext.Provider>

  }

}

export default Router;