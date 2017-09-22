import { Switch,Route } from "react-router-dom";
import { Store, ReducersMapObject } from "redux";

/**
 * Store Interface
 */
export interface StoreAsync<S> extends Store<S> {
  asyncReducers?: ReducersMapObject
}

/**
 * Router Interface
 */
// export type RouteConfig = Route | Route[];

/**
 * Middleware Interface
 */
export interface Middleware {
  <S>(api: MiddlewareAPI<S>): (next: Dispatch<S>) => Dispatch<S>;
}

export interface MiddlewareAPI<S> {
  dispatch: any;
  getState(): S;
}

/**
 * Action Interface
 */
export interface Action {
  type?: number;
  response?: any;
  extra?: {[key:string]: any};
}

export interface MiddlewareAction extends Action {
  types?: number[],
  promise?: Function,
}

export interface Dispatch<S> {
  (action: any): any;
}
