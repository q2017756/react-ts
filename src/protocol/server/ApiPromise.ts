import SagittaClient from './sagitta-server.js'

import { Dispatch, MiddlewareAction, MiddlewareAPI } from '../../store/interfaces'
import { ApiPromiseType, ErrorProtocol, SucceedProtocol } from '../interfaces'

export class ApiPromise extends ApiPromiseType {
  constructor() {
    super()
    this.API = (api: string, params: string[]) => (SagittaClient as any)[api](...params)
    this.middleware = ({ dispatch, getState }: MiddlewareAPI<any>): Dispatch<any> => (next: Dispatch<any>): Dispatch<any> => (action: MiddlewareAction): MiddlewareAction => {
      const { promise } = action

      if (typeof promise !== 'function') {
        return next(action)
      }

      // Retreive the actions of different stages from the action object
      const [ REQUEST, SUCCESS, ERROR, FAILURE ] = action.types

      // We first dispatch the REQUEST action
      next({ type: REQUEST, response: null, extra: action.extra })

      return promise(this)
        .then((result: SucceedProtocol) => {
          const response: any = result.response
          response.statusCode = result.statusCode
          if (result.response.status == 0) {
            return dispatch({ type: SUCCESS, response, extra: action.extra })
          } else {
            return dispatch({ type: ERROR, response, extra: action.extra })
          }
        })
        .catch((error: ErrorProtocol) => {
          return dispatch({ type: FAILURE, response: error, extra: action.extra })
        })
    }
  }
}

export default ApiPromise
