#!/usr/bin/env node

process.env.DEBUG = '*'
const libPath = require('path')

const generator = require('sagitta').Bin.apiGenerator
const runType = process.argv[2]
const path = libPath.join(__dirname, '..', 'lib', runType)
const targets = process.argv[3]

try{
  generator.run(path, runType, targets)
} catch(err) {
  console.log(err); // eslint-disable-line
}