import { MiddlewareAction } from '../interfaces'
import CONST from './const'

export function userLogout(): MiddlewareAction {
  return {
    type: CONST.USER_LOGOUT,
  }
}

export function postUserLogin(email: any, password: any): MiddlewareAction {
  return {
    types: [ CONST.SEND, CONST.USER_LOGIN, CONST.ERROR, CONST.FAIL ],
    promise: (client: any) => client.API('postUserLogin', [
      email, password,
    ]),
  }
}