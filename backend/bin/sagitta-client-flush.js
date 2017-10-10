#!/usr/bin/env node

process.env.DEBUG = '*'
const libPath = require('path')
const apiConfig = require('../lib/config/sagitta-api')
const env = process.env.NODE_ENV || 'development'

const generator = require('sagitta').Bin.clientGenerator

const runType = 'api'
const path = libPath.join(__dirname, '..', 'lib', runType)
const outputPath= libPath.join(__dirname, '..', '..', 'src', 'protocol', 'client')
const options = {
  host:     apiConfig[env].domain,
  protocol: apiConfig[env].protocol,
  apiVer:   apiConfig[env].apiVer,
}

generator.run(path, outputPath, options)