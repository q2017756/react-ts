import * as React from "react";
import { Link } from "react-router-dom";
import "./index.scss";

interface Props{

}

class Header extends React.Component<any, any>  {
  constructor(props: Props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <header className="menu">
        <ul>
          <li>React Darkness</li>
          <li><Link to="/">首页</Link></li>
          <li><Link to={{pathname:'/use/a/123/b/abc'}}>构建与使用</Link></li>
          <li><a href="https://github.com/javaLuo/react-darkness" target="_blank" rel="noopener noreferrer">GitHub</a></li>
        </ul>
      </header>
    );
  }
}

export default Header;
