#!/usr/bin/env node

process.env.DEBUG = '*'
const libPath = require('path')

const generator = require('sagitta').Bin.swaggerApiGenerator
const runType = 'api'
const path = libPath.join(__dirname, '..', 'lib', runType)

generator.run(path, runType)