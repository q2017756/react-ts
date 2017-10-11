'use strict'

let Promise = require('bluebird')
let Joi = require('joi')
let config = require('./config')

function getErr(res, code) {
  let error = config.error
  if (error.hasOwnProperty(code) === false) {
    res.message = 'error code undefined!'
  } else {
    res.message = error[code]
  }
  res.status = code

  return res
}

function buildData(cpId, sign, timestamp, params) {
  params = params || {}
  if (typeof timestamp === 'object') {
    params = timestamp
    const microSeconds = 1000
    timestamp = Math.floor(Date.now() / microSeconds)
  }
  let data = {
    cp_id: cpId,
    timestamp: timestamp,
    sign: sign,
  }
  return Object.assign(data, params)
}


module.exports = {
  getErr: getErr,
  buildData: buildData,
  joiValidate: Promise.promisify(Joi.validate),
}
