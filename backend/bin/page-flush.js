#!/usr/bin/env node

process.env.DEBUG = '*'
const path = require('path')

const generator = require('sagitta').Bin.apiGenerator
const runType = 'page'
const tpath = path.join(__dirname, '..', 'lib', runType)

generator.run(tpath, runType)