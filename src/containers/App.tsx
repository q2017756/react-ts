import * as React from 'react'
import {Router, Route, Link} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
const browserHistory = createBrowserHistory()
import { Provider } from 'react-redux';
import RouteConfig from 'routers/router'

import '../public/css/main.scss'
import '../public/css/core.scss'
import 'antd/dist/antd.css'

class App extends React.Component<any, any> {

  shouldComponentUpdate () {
    return false
  }

  render () {
    return (
      <Provider store={this.props.store}>
        <RouteConfig history={browserHistory}/>
      </Provider>
    )
  }
}

export default App
