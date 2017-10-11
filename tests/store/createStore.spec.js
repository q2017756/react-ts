import {
  default as createStore
} from '../../src/store/createStore'
import ApiPromise from '../../src/protocol/client/ApiPromise'
import createBrowserHistory from 'history/createBrowserHistory'
const browserHistory = createBrowserHistory()
const api = new ApiPromise()

describe('(Store) createStore', () => {
  let store

  before(() => {
    store = createStore(api, browserHistory)
  })

  it('should have an empty asyncReducers object', () => {
    expect(store.asyncReducers).to.be.an('object')
    expect(store.asyncReducers).to.be.empty()
  })
 
  describe('(Location)', () => {
    it('store should be initialized with Location state', () => {
      const location = {
        pathname : '/echo'
      }
      store.dispatch({
        type    : 'LOCATION_CHANGE',
        payload : location
      })
      expect(store.getState().location).to.deep.equal(location)
    })
  })
})
