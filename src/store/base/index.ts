import CONST from './const';
import * as objectAssign from 'object-assign'
import { Configs } from '../../common'
import { MiddlewareAction } from '../interfaces'

const STATUS_SUCCESS = 200

const isNode = typeof window === 'undefined'


export interface BaseState {
  userinfo: object,
}

const initialState = (!isNode && window.__INITIAL_STATE__.hasOwnProperty('base'))
? window.__INITIAL_STATE__.base
: { userinfo: {
    headicon: '',
    signature: '',
    email: '',
    szid: '',
    nickname: '',
    token: '',
    collectList: [],
    thumpList: [],
    thumpCommentList: [],
    newMessageCount: 0,
    followed: 0,
    fans: 0,
    feed: 0,
  },
}

export default function(state:BaseState = initialState, action: MiddlewareAction={}): BaseState {
  const { response } = action
  switch(action.type) {

    case CONST.USER_LOGIN:
  console.log(response)
  
    return state;
  
    
    default:
      return state;
  }
}
