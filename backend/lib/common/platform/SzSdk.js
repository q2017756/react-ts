'use strict'

const ShinezoneSdk = require('shinezone-js-sdk')
const apiConfig = require('../../config/open-api')

const env = process.env.NODE_ENV || 'development'

const SzSdk = new ShinezoneSdk(
  apiConfig[env].cpId,
  apiConfig[env].cpKey,
  apiConfig[env].gameId,
  apiConfig[env].apiUrl || undefined,
  apiConfig[env].payToken || undefined,
  apiConfig[env].loggerToken || undefined
)

module.exports = SzSdk
