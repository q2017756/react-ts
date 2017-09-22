import { combineReducers } from 'redux';
import locationReducer from './location';
import base from './base'

export const makeRootReducer = (asyncReducers: any) => {
  return combineReducers({
    location: locationReducer,
    base,
    ...asyncReducers
  });
}



export const injectReducer = (store: any, key: any, reducer: any ) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
}

export default makeRootReducer;
