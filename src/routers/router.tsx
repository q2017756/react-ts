import {HomeIndexRouter} from '../containers/HomeIndex/router';
import {LoginRouter} from '../containers/Home/Components/Login/router';
import {UseRouter} from '../containers/Use/router';
import * as React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
const supportsHistory = 'pushState' in window.history

interface Props {
  
}

export default class RouteConfig extends React.Component<any, any> {
  
  constructor(props: Props) {
		super(props)
		this.state = {
    }
  }
  
  render() {

    return (
      <div>
        <Router forceRefresh={!supportsHistory}>
          <Switch>
              {LoginRouter.map((route:any, i:number) => (<Route key={i} path={route.path} component={route.component}/>))}
              {UseRouter.map((route:any, i:number) => (<Route key={i} path={route.path} component={route.component}/>))}
              {HomeIndexRouter.map((route:any, i:number) => (<Route key={i} path={route.path} component={route.component}/>))}
          </Switch>
        </Router>
      </div>
    )
  }
}




/// / 异步路由组件
// import { StoreAsync, RouteConfig } from "../../store/interfaces";
// import { injectReducer } from '../../store/reducers';
// export default (store: StoreAsync<any>): RouteConfig => ({
//   path: '/',
//   getComponent (nextState: any, cb: Function) {
//     (require as any).ensure([], (require: any) => {
//       injectReducer(store, 'base', require('../../store/base').default);
//       const Component = require('./index').default;
//       cb(null, Component);
//     }, 'home');
//   },
//   Route: HomeIndexRouter(store),
//   childRoutes: [
//     UseRouter(store),
//   ]
// });
