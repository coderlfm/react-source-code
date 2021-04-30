import React from 'react'
import { __RouterContext as RouterContext } from '../react-router'

export default function Link({ children, to }) {
  return (
    <RouterContext.Consumer>
      {
        ({ history }) => {
          return <a onClick={(e) => {
            e.preventDefault();
            history.push(to);
          }}>
            {children}
          </a>
        }
      }

    </RouterContext.Consumer>
  )
}
