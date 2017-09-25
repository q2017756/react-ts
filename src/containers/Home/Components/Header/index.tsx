import * as React from 'react'
import BaseComponent from 'g-src/BaseComponent'
import { Link } from "react-router-dom"
import "./index.scss"

interface Props{

}

class Header extends BaseComponent  {
  constructor(props: Props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <header className="menu">
        <ul>
          <li>React Shinezone ts</li>
          <li><Link to="/">首页</Link></li>
          <li><Link to={{pathname:'/use'}}>构建与使用</Link></li>
          <li><a href="https://github.com/stefaniepei/react-ts" target="_blank" rel="noopener noreferrer">GitHub</a></li>
        </ul>
      </header>
    )
  }
}

export default Header
