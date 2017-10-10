#!/usr/bin/env node

process.env.DEBUG = '*'
const libPath = require('path')

const generator = require('sagitta').Bin.serverGenerator
const runType = 'api'
const path = libPath.join(__dirname, '..', 'lib', runType)
const outputPath= libPath.join(__dirname, '..', 'resources', 'sagitta')
const options = {
  rootPath: libPath.join(__dirname, '..'),
}

generator.run(path, outputPath, options)
