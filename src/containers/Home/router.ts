import * as Loadable from 'react-loadable'
import Component from './index';


const AsyncLogin = Loadable({
  loader: () => import('./Components/Login'),
  loading: ({isLoading, error}) => { return isLoading && !error ? 'loading...' : error ? 'error' : null}
})

// 同步路由组件
export const Home:Array<any> = [
  {
    path: '/',
    component: Component,
  },
  {
    path: '/login',
    component:  AsyncLogin
  }
]