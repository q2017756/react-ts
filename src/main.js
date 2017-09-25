import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './store/createStore'
import ApiPromise from './protocol/client/ApiPromise'
import createBrowserHistory from 'history/createBrowserHistory'
const browserHistory = createBrowserHistory()
import 'babel-polyfill';
// Store Initialization
// ------------------------------------
const api = new ApiPromise()
const store = createStore(api,browserHistory)

// Render Setup
// ------------------------------------
const MOUNT_NODE = document.getElementById('root')

let render = () => {
  const App = require('./containers/App').default
  // const routes = require('./containers/rootRouter').default(store)  

  ReactDOM.render(
    <App store={store}/>,// routes={routes} 
    MOUNT_NODE
  )
}

// Development Tools
// ------------------------------------
if (__DEV__) {
  if (module.hot) {
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react').default

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    }

    render = () => {
      try {
        renderApp()
      } catch (e) {
        console.error(e)
        renderError(e)
      }
    }

    // Setup hot module replacement  
      // './containers/rootRouter',
    module.hot.accept([
      './containers/App',
    ], () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE)
        render()
      })
    )
  }
}

// Let's Go!
// ------------------------------------
render()
