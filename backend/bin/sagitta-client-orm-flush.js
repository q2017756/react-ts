#!/usr/bin/env node

process.env.DEBUG = '*'
const libPath = require('path')

const generator = require('sagitta').Bin.ormValidationGenerator
const runType = 'orm'
const path = libPath.join(__dirname, '..', 'lib', runType)
const outputPath= libPath.join(__dirname, '..', 'src', 'sagitta')

generator.run(path, outputPath)