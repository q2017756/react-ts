#!/usr/bin/env node

process.env.DEBUG = '*'
const libPath = require('path')

const generator = require('sagitta').Bin.swaggerDocGenerator
const path = libPath.join(__dirname, '..', 'lib', 'api')

generator.run(path)