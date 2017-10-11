'use strict'
let md5 = require('js-md5')
let moment = require('moment')
// delete object key
function deleteObjectKey(obj, keys) {
  keys = keys || ''
  if (keys.length !== 0) {
    for (let i in keys) {
      delete obj[keys[i]]
    }
  }
  return obj
}

// get timestamp
function getTimeStamp() {
  return Math.floor(Date.now() / 1000); // eslint-disable-line
}

function mobile2Country(mobile, country) {
  let patten = /^[1-9]{8,20}$/
  if (patten.test(mobile)) {
    if (country == 0) {
      throw new Error('country is invalid')
    }
    mobile = country + mobile
  }

  // handle pass country is string
  mobile = mobile.replace(':country', '')

  return mobile
}

function flushFakeCookieForLoggerData(IP, token) {
  return md5(IP, token, this.getTimeStamp())
}

function buildDataUseTimestamp(timestamp) {
  timestamp = Number(timestamp) || new Date()
  let date = new Date(timestamp * 1000); // eslint-disable-line
  return moment(date).format('YYYY-MM-DD HH:mm:ss')
}


module.exports = {
  deleteObjectKey: deleteObjectKey,
  getTimeStamp: getTimeStamp,
  mobile2Country: mobile2Country,
  flushFakeCookieForLoggerData: flushFakeCookieForLoggerData,
  buildDataUseTimestamp: buildDataUseTimestamp,
}


