const localIp = '127.0.0.1' // todo service ip and port
const port = process.env.PORT || 8000; // eslint-disable-line

module.exports = {
  // ======================================================
  // Overrides when NODE_ENV === 'development'
  // ======================================================
  development: {
    domain: localIp + ':' + port,
    host: '0.0.0.0',
    port: port,
    protocol: 'http',
    apiVer: '1.0',
  },

  qa: {
    domain: localIp + ':' + port,
    host: '0.0.0.0',
    port: port,
    protocol: 'http',
    apiVer: '1.0',
  },
  // ======================================================
  // Overrides when NODE_ENV === 'production'
  // ======================================================
  // production: {
  //   domain: localIp + ':' + port,
  //   host: localIp,
  //   port: port,
  //   protocol: 'http',
  //   apiVer: '1.0'
  // },
  production: {
    domain: 'play.shinezone.com',
    host: '0.0.0.0',
    port: '9081',
    protocol: 'http',
    apiVer: '1.0',
  },

  // ======================================================
  // Overrides when NODE_ENV === 'preview'
  // ======================================================
  preview: {
    domain: 'play.shinezone.com',
    host: '0.0.0.0',
    port: '9082',
    protocol: 'http',
    apiVer: '1.0',
  },
}
