require('babel-register')({
  presets: [ 'es2015-node5', 'stage-0' ],
})

require('babel-polyfill')

require('./lib')
