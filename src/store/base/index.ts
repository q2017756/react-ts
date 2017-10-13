import CONST from './const';
import * as objectAssign from 'object-assign'
import { Configs } from '../../common'
import { MiddlewareAction } from '../interfaces'

const STATUS_SUCCESS = 200

const isNode = typeof window === 'undefined'


export interface BaseState {
  fans: number
}

const initialState = isNode
? window.__INITIAL_STATE__.base
: {
  fans: 0
}

export default function(state:BaseState = initialState, action: MiddlewareAction={}): BaseState {
  const { response } = action
  switch(action.type) {

    case CONST.USER_LOGIN:
  
    return state;

    case CONST.ADD:
      let fans = state.fans + 1
      return objectAssign({}, state, {
        fans,
      })
  
    
    default:
      return state;
  }
}
