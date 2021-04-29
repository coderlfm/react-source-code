import React from 'react'
import RouterContext from './RouterContext'

export class Route extends React.Component {




  render() {


    return <RouterContext.Consumer >
      {
        (routerVal) => {

          const { component: RouterComponent, path } = this.props;
          const { history, location } = routerVal;
          const match = location.pathname === path;

          {/* debugger; */}
          
          if (!match) {
            return null
          }

          return <RouterComponent {...{ history, location,match }} />
        }
      }
    </RouterContext.Consumer>
  }
}
export default Route;