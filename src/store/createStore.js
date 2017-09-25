import { applyMiddleware, compose, createStore as createReduxStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import createBrowserHistory from 'history/createBrowserHistory'
const browserHistory = createBrowserHistory()
import makeRootReducer from './reducers'
import { updateLocation } from './location'

const createStore = (api = {}, history={}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================

  const trackLocationChanged = (store) => (next) => (action) => {
    const { type, payload } = action
    const admintest = /(^\/admin)|(^\/bk)/
    if (type === 'LOCATION_CHANGED' && !admintest.test(payload.pathname)) {
      const state = store.getState()
      const { base } = state
      if (base.userinfo.token) {
        return store.dispatch(getMe(base.userinfo.token)).then(() => {
          return next(action)
        })
      }
    }
    return next(action)
  }

  const middleware = [
    trackLocationChanged,
    thunkMiddleware,
    api.middleware,
    routerMiddleware(history),
  ]

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []
  let composeEnhancers = compose

  if (__DEV__) {
    if (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    }
  }
  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createReduxStore(
    makeRootReducer(),
    // initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )
  store.asyncReducers = {}

  // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
  store.unsubscribeHistory = browserHistory.listen(updateLocation(store))
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}

export default createStore
