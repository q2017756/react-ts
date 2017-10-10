#!/usr/bin/env node

process.env.DEBUG = '*'
const libPath = require('path')

const generator = require('sagitta').Bin.ormGenerator
const runType = 'orm'
const path = libPath.join(__dirname, '..', 'lib', runType)
const targetArgv = 2
const targetOrms= process.argv.slice(targetArgv)

generator.run(path, targetOrms)