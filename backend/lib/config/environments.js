// Here is where you can define configuration overrides based on the execution environment.
// Supply a key to the default export matching the NODE_ENV that you wish to target, and
// the base configuration will apply your overrides before exporting itself.
'use strict'

const libPath = require('path')
const objectAssign = require('object-assign')

const apiConfig = require('./sagitta-api')

module.exports = {
  // ======================================================
  // Overrides when NODE_ENV === 'development'
  // ======================================================
  development: (config) => ({
    app: objectAssign({}, config.app, {
      hostname:       `http://${apiConfig.development.domain}/`,
      host:           apiConfig.development.host,
      port:           apiConfig.development.port,
      enableJWT:      false,
      enableVhost:    true,
      enableCors:     true,
      jwtSecret:      'fengjie', // todo jwtSecret
    }),
    router: [
      {
        path:         libPath.join(__dirname, '..', 'api'),
        apiVer:       apiConfig.development.apiVer,
        prefix:       '/api/' + apiConfig.development.apiVer,
      },
    ],
    orm: objectAssign({}, config.orm, {
      connections: {
        default: {
          adapter:    'memory',
        },
        mongo: {
          adapter:    'mongodb',
          host:       'dev-mongodb', // todo mongodb host
          port:       27017,
          database:   'xxxx', // todo database name
        },
      },
    }),
  }),

  // ======================================================
  // Overrides when NODE_ENV === 'qa'
  // ======================================================
  qa:(config) => ({
    app: objectAssign({}, config.app, {
      hostname:       `http://${apiConfig.qa.domain}/`,
      host:           apiConfig.qa.host,
      port:           apiConfig.qa.port,
      enableJWT:      false,
      enableVhost:    true,
      enableCors:     true,
      jwtSecret:      '9uzDIC7cxv18',
    }),
    router: [
      {
        path:         libPath.join(__dirname, '..', 'api'),
        apiVer:       apiConfig.qa.apiVer,
        prefix:       '/api/' + apiConfig.qa.apiVer,
      },
    ],
    orm: objectAssign({}, config.orm, {
      connections: {
        default: {
          adapter:    'memory',
        },
        mongo: {
          adapter:    'mongodb',
          host:       '127.0.0.1',
          port:       27017,
          database:   'xxxx', // todo database name
        },
      },
    }),
  }),

  // ======================================================
  // Overrides when NODE_ENV === 'production'
  // ======================================================
  production: (config) => ({
    app: objectAssign({}, config.app, {
      hostname:       `http://${apiConfig.production.domain}/`,
      host:           apiConfig.production.host,
      port:           apiConfig.production.port,
      enableJWT:      false,
      enableVhost:    true,
      enableCors:     true,
      jwtSecret:      'fengjie',
    }),
    router: [
      {
        path:         libPath.join(__dirname, '..', 'api'),
        apiVer:       apiConfig.production.apiVer,
        prefix:       '/api/' + apiConfig.production.apiVer,
      },
    ],
    orm: objectAssign({}, config.orm, {
      connections: {
        default: {
          adapter:    'memory',
        },
        mongo: {
          adapter:    'mongodb',
          host:       '127.0.0.1',
          port:       27017,
          database:   'playShineZone',
        },
      },
    }),
  }),
  // ======================================================
  // Overrides when NODE_ENV === 'preview'
  // ======================================================
  preview: (config) => ({
    app: objectAssign({}, config.app, {
      hostname:       `http://${apiConfig.preview.domain}/`,
      host:           apiConfig.preview.host,
      port:           apiConfig.preview.port,
      staticPath:     libPath.join(__dirname, '..', '..', 'dist', 'preview'),
      enableJWT:      false,
      enableVhost:    true,
      enableCors:     true,
      jwtSecret:      'fengjie',
    }),
    router: [
      {
        path:         libPath.join(__dirname, '..', 'api'),
        apiVer:       apiConfig.preview.apiVer,
        prefix:       '/api/' + apiConfig.preview.apiVer,
      },
    ],
    orm: objectAssign({}, config.orm, {
      connections: {
        default: {
          adapter:    'memory',
        },
        mongo: {
          adapter:    'mongodb',
          host:       '127.0.0.1',
          port:       27017,
          database:   'playShineZone',
        },
      },
    }),
  }),

}
