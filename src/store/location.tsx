import createBrowserHistory from 'history/createBrowserHistory'
const browserHistory = createBrowserHistory()
// ------------------------------------
// Constants
// ------------------------------------
export const LOCATION_CHANGE = 'LOCATION_CHANGE'

// ------------------------------------
// Actions
// ------------------------------------
export function locationChange (location = '/') {
  return {
    type    : LOCATION_CHANGE,
    payload : location
  }
}

// ------------------------------------
// Specialized Action Creator
// ------------------------------------
export const updateLocation = (store: any) => {
  return (nextLocation: any) => store.dispatch(locationChange(nextLocation))
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = browserHistory.location.pathname
export default function locationReducer (state = initialState, action: any) {
  return action.type === LOCATION_CHANGE
    ? action.payload
    : state
}
