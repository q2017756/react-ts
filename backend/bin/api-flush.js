#!/usr/bin/env node

process.env.DEBUG = '*'
const libPath = require('path')

const generator = require('sagitta').Bin.apiGenerator
const runType = 'api'
const path = libPath.join(__dirname, '..', 'lib', runType)

generator.run(path, runType)