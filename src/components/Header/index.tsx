import * as React from 'react'
import BaseComponent from '../../BaseComponent'
import { Link, NavLink } from "react-router-dom"
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
          <li><NavLink to="/" activeClassName="active">首页</NavLink></li>
          <li><NavLink to={{pathname:'/use'}} activeClassName="active">构建与使用</NavLink></li>
          <li><a href="https://github.com/stefaniepei/react-ts" target="_blank" rel="noopener noreferrer">GitHub</a></li>
        </ul>
      </header>
    )
  }
}

export default Header
