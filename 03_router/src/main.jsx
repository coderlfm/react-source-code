import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, HashRouter, Route, Link } from './react-router-dom'

function App() {


  return <div>
    <h4>实现react-router</h4>
    <HashRouter>
      <div>
        <Link to='/'>首页</Link>
        <Link to='/about'>关于</Link>
      </div>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
    </HashRouter>

  </div>;
}


function Home(props) {
  console.log(props);
  return <>
    <h1>home</h1>
  </>
}

function About() {
  return <>
    <h1>About</h1>
  </>
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