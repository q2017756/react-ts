'use strict'
const SzSdk = require('../../common/platform/SzSdk')

import _ from 'lodash'
import recommandModel from '../../orm/recommanduser-model'
import sagitta from 'sagitta'
import {MTYPE_POST, RESET_PWD_URL, THIRD_GOOGLE} from '../../common/constant'
import {ExistError, NotExistError, LoginError, ShinezoneApiError} from '../../utility/errors'

const Jwt = sagitta.Utility.JWT
const JwtSecret = sagitta.Instance.app.conf.app.jwtSecret || ''
const debug = require('debug')('app:service.user')

class UserService {

  constructor() {

  }

  async szUserPwdUpdate(params) {
    const {email, oldPwd, newPwd, szId} = params
    await SzSdk.user.init()
    debug('pwdUpdate', params)
    return await SzSdk.user.szUserPwdUpdate(szId, oldPwd, newPwd, email).then(res => {
      if (res.status !== 0) throw new ShinezoneApiError(res.message)
      return res.data
    })
  }

  async sendResetPwdEmail(params) {
    const {email, url = RESET_PWD_URL} = params
    await SzSdk.user.init()
    debug('sendResetPwdEmail', email, url)
    return await SzSdk.user.szUserSendResetPwdEmail(email, url).then(res => {
      if (res.status === -107) throw new NotExistError(res.message) // eslint-disable-line
      if (res.status !== 0) throw new ShinezoneApiError(res.message)
      return res.data
    })
  }

  async resetPwd(params) {
    const {token, pwd} = params
    await SzSdk.user.init()
    return await SzSdk.user.szUserResetPwd(token, pwd)
  }

  async szUserInfoUpdate(params) {
    const {szId, nickname, avatar, signature, email} = params
    await SzSdk.user.init()
    return await SzSdk.user.szUserInfoUpdate(szId, nickname, email, signature, avatar)
  }

  async szUserLoginThird(params) {
    const {token, password = THIRD_GOOGLE} = params
    await SzSdk.user.init()
    return await SzSdk.user.szUserLoginThird(token, password).then(res => {
      debug('szUserLoginThird', res)
      if (res.status !== 0) throw new LoginError(res.message)
      return {
        ...res.data,
        token: Jwt.create({id: res.data.sz_id}, JwtSecret, {expiresIn: '7d'}),
      }
    })
  }

  async Follow(params) {
    const {szId, userId} = params
    await SzSdk.user.init()
    return await SzSdk.user.socialFollow(szId, userId)
  }

  async unFollow(params) {
    const {szId, userId} = params
    await SzSdk.user.init()
    return await SzSdk.user.socialUnFollow(szId, userId)
  }

  async userFollowList(params) {
    const {szId} = params
    await SzSdk.user.init()
    return await SzSdk.user.socialFollowAll(szId).then(res => {
      if (res.status !== 0) throw new ShinezoneApiError(res.message)
      debug('userFollowList', res.data.follow)
      return res.data.follow
    })
  }

  async userFansList(params) {
    const {szId} = params
    await SzSdk.user.init()
    return await SzSdk.user.socialFollowAll(szId).then(res => {
      if (res.status !== 0) throw new ShinezoneApiError(res.message)
      debug('userFansList wtf', res.data)
      return res.data.fans
    })
  }

  async userFansAll(params) {
    const {szId, page} = params
    await SzSdk.user.init()
    return await SzSdk.user.socialMyFansAll(szId, page).then(res => {
      if (res.status !== 0) throw new ShinezoneApiError(res.message)
      debug('userFansAll', res.data.list)
      return res.data
    })
  }

  async szUserInfo(params) {
    const {szId} = params
    await SzSdk.user.init()
    return await SzSdk.user.szUserInfo(szId).then(res => {
      debug('szUserInfo', res)
      if (res.status !== 0) throw new ShinezoneApiError(`Data: ${res.data};\nMessage: ${res.message}`)
      return res.data
    })
  }

  async szUserLogin(params) {
    const {email, password} = params
    await SzSdk.user.init()
    return await SzSdk.user.szUserLogin(email, password).then(res => {
      if (res.status !== 0) throw new LoginError(res.message)
      return {
        ...res.data,
        token: Jwt.create({id: res.data.sz_id}, JwtSecret, {expiresIn: '7d'}),
      }
    })
  }

  async szUserRegister(params) {
    const {email, password} = params
    await SzSdk.user.init()
    return await SzSdk.user.szUserRegister(email, password).then(res => {
      if (res.status !== 0) throw new ExistError(res.message)
      return {
        ...res.data,
        'head_icon': '',
        token: Jwt.create({id: res.data.sz_id}, JwtSecret, {expiresIn: '7d'}),
      }
    })
  }

  async recommandUserList() {
    const limit = 6
    const szids = await recommandModel.instance.find().then(res => {
      return res.map(function (n) {
        return n.szid
      })
    })

    const promise_local = szids.map(szId => {
      return this.szUserInfo({szId})
    })
    const data_local = await Promise.all(promise_local)
      .then(res => {
        return res.map(r => {
          return _.pick(r, ['sz_id', 'head_icon', 'nickname'])
        })
      })
    await SzSdk.user.init()
    const data_remote = await SzSdk.user.recommandList(MTYPE_POST).then(res => {
      debug('res.data', res)
      if (res.status !== 0) throw new ShinezoneApiError(res.message)
      return res.data.map(r => {
        return {
          sz_id: r.sz_id,
          head_icon: r.head_icon,
          nickname: r.nickname,
          remote: true,
        }
      })
    })
    return data_local.concat(data_remote.slice(0, limit - szids.length))
  }

  async checkSzId(params) {
    debug('checkSzId', params)
    await SzSdk.user.init()
    return await SzSdk.user.checkSzId(params.szid).then(res => {
      debug('res', res)
      if (res.data === 'exist') { //TODO: what fuck api
        return res.data
      }
      throw new NotExistError('not exist')
    })
  }

}

const userService = new UserService()

module.exports = userService
