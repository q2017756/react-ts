/* eslint-disable */
'use strict';
const now = new Date();
const env = process.env.NODE_ENV || 'development';

const _debug = require('debug');
const libPath = require('path');

const debug = _debug('sagitta:server');
debug('Creating default configuration.');

// ========================================================
// Default Configuration
// ========================================================
const config = {
  app: {
    formLimit:      '4096',
    maxAge:         7*86400*1000, // ms
    enableJWT:      true,
    enableVhost:    true,
    staticPath:     libPath.join(__dirname, '..', '..', '..', 'dist'),
    enableCors:     true,
    enableRender:   false,
    jwtSecret:      '/',
    jwtPaths:       [ /^\/api/ ],
    compressOpt: {
      threshold:    '100kb'
    },
    errorHandle: function *(next) {
      try {
        yield next;
      } catch(e) {
        let status = e.status || 500;
        let message = e.message || 'Internal Server Error';
        debug('errorHandle', status, message)
        this.status = status
        this.body = message
        this.app.emit('error', e, this);
      }
    }
  },
  orm: {
    path:           libPath.join(__dirname, '..', 'orm'),
    adapters: {
      memory:       require('sails-memory'),
      mongodb:      require('sails-mongo')
    },
    connections: {
      default: {
        adapter:    'memory'
      }
    }
  },
  router: [
    {
      path:   libPath.join(__dirname, '..', 'api'),
      apiVer: '1.0',
      prefix: '/api/1.0'
    }
  ],
  logger: {
    path:           libPath.join(__dirname, '..', '..', 'logs', 'debug' + now.getFullYear() + (now.getMonth() + 1) + now.getDate() + '.log'),
    level:          'verbose',
    timestamp:      true,
    showLevel:      true,
    maxsize:        1024 * 1024, // 1m
    maxFiles:       1000,
    json:           true,
    tailable:       true
  },
  cache: {
    host:           '127.0.0.1',
    port:           6370,
    family:         4,
    db:             0
  },
  config: {
    path:           __dirname
  },
  template: {

  }
};

/************************************************
 -------------------------------------------------

 All Internal Configuration Below
 Edit at Your Own Risk

 -------------------------------------------------
 ************************************************/

// ========================================================
// Environment Configuration
// ========================================================
debug(`Looking for environment overrides for NODE_ENV "${env}".`);
const environments = require('./environments');
const overrides = environments[env];
if (overrides) {
  debug('Found overrides, applying to default configuration.');
  Object.assign(config, overrides(config))
} else {
  debug('No environment overrides found, defaults will be used.')
}

module.exports = config;
