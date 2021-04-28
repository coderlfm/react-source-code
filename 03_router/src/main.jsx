import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from './react-router-dom'

function App() {


  return <div>
    <BrowserRouter>

    </BrowserRouter>
    <div >div</div>
    <br />
    <button >加载更多</button>
  </div>;
}




function render() {
  // 每次 render 都需要让索引重置
  // lastIndex = 0
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )

}

render()