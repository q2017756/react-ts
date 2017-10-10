module.exports = {
  // ======================================================
  // Overrides when NODE_ENV === 'development'
  // ======================================================
  // todo open api setting
  development: {
    cpId: 30,
    gameId: 1070,
    cpKey: '!iCIzh8GeGkn',
    // apiUrl: 'http://api-qa.shinezone.com/1.0',
    apiUrl: 'http://172.16.0.68/1.0',
    loggerId: 9001,
    loggerToken: 'd3dddeee38a3f25c4cc8c8921f0e72fc',
  },

  // ======================================================
  // Overrides when NODE_ENV === 'qa'
  // ======================================================
  qa: {
    cpId: 30,
    gameId: 1070,
    cpKey: '!iCIzh8GeGkn',
    // apiUrl: 'http://api-qa.shinezone.com/1.0',
    apiUrl: 'http://172.16.0.68/1.0',
    loggerId: 9001,
    loggerToken: 'd3dddeee38a3f25c4cc8c8921f0e72fc',
  },

  // ======================================================
  // Overrides when NODE_ENV === 'production'
  // ======================================================
  production: {
    cpId: 4,
    gameId: 72,
    cpKey: 'dm68ke09GFDm',
    apiUrl: 'https://api.shinezone.com/1.0',
    loggerId: 9001,
    loggerToken: 'd3dddeee38a3f25c4cc8c8921f0e72fc',
  },

  // ======================================================
  // Overrides when NODE_ENV === 'preview'
  // ======================================================
  preview: {
    cpId: 4,
    gameId: 72,
    cpKey: 'dm68ke09GFDm',
    apiUrl: 'https://api.shinezone.com/1.0',
    loggerId: 9001,
    loggerToken: 'd3dddeee38a3f25c4cc8c8921f0e72fc',
  },

  // ======================================================
  // Other API Config
  // ======================================================
  // payApi: {
  //   cpId: 4,
  //   cpKey: "m&ZhajuG!lJg",
  //   apiUrl: "http://pay.shinezone.com",
  //   gameId: 0
  // }
  payApi: {
    cpId: 4,
    cpKey: 'm&ZhajuG!lJg',
    apiUrl: 'https://pay.shinezone.com',
    gameId: 0,
    payToken: 'fe8683b1f920b2dc45c3b1f7xip3e9a5',
    loggerToken: 'd3dddeee38a3f25c4cc8c8921f0e72fc',
    loggerId: 9001,
  },


}
