'use strict'
// var md5 = require('js-md5');
let moment = require('moment')
const loggerConfig = require('../../config/open-api')
const env = process.env.NODE_ENV || 'development'
class DataLoggerConstruction {
  constructor(loggerId)
  {
    this.loggerId = loggerId
    this.utcTime = moment().utcOffset('-04:00').format('YYYY-MM-DD HH:MM:SS')
  }

  loggerDataConstruction (act) {
    return {
      game_id: this.loggerId,
      ip: 0,
      cookie: '',
      sz_uid: '',
      act: act,
      c_time: this.utcTime,
      c_value: 0,
      c_value2: 0,
      uid: '',
      tid: '',
      browser: '',
      source: '',
      token: this.utcTime,
      //Logger API need
      rtime: this.utcTime,
      value: '0',
      value2: '0',
      time: this.utcTime,
      item: '0',
      uuid: Math.floor(Date.now() / 1000), // eslint-disable-line
    }
  }
	
	
}

const dataLoggerConstruction = new DataLoggerConstruction(loggerConfig[env].loggerId)

module.exports = dataLoggerConstruction
