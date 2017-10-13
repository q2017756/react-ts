import {Home} from '../containers/Home/router';
import HomeIndex from '../containers/HomeIndex';
import {LoginRouter} from '../containers/Home/Components/Login/router';
import {UseRouter} from '../containers/Use/router';
import Header from '../components/Header/index'
import Footer from '../components/Footer/index'
import * as React from 'react'
import * as Loadable from 'react-loadable'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
const supportsHistory = 'pushState' in window.history

interface Props {
  
}
//
// const AsyncHome = Loadable({
//   loader: () => import('../containers/HomeIndex'),
//   loading: ({isLoading, error}) => { return isLoading && !error ? <div>loading...</div> : error ? <div>error</div> : null}
// })
//
// const AsyncUse = Loadable({
//   loader: () => import('../containers/Use'),
//   loading: ({isLoading, error}) => { return isLoading && !error ? <div>loading...</div> : error ? <div>error</div> : null}
// })
//
// const AsyncLogin = Loadable({
//   loader: () => import('../containers/Home/Components/Login'),
//   loading: ({isLoading, error}) => { return isLoading && !error ? <div>loading...</div> : error ? <div>error</div> : null}
// })

export default class RouteConfig extends React.Component<any, any> {
  
  constructor(props: Props) {
		super(props)
		this.state = {
    }
  }
  
  render() {

    return (
      <Router>
        <div>
          <nav>
            <Link to="/">home</Link>
            <Link to="/about">about</Link>
            <Link to="/contact">contact</Link>
            <Link to="/other">other</Link>
            <Link to="/use">user</Link>
            <Link to="/login">login</Link>
          </nav>
          <Header />
          <Switch>
            {Home.map((route:any, i:number) => <Route key={i} component={route.component} path={route.path} exact={router.path === '/'} />)}
            <Route component={()=><h1>momatch</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
    )
  }
}

