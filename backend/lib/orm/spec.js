'use strict'

const OrmSpec = [
  /*{
    name: 'mysample',
    cacheKey: 'id',
    schema: `{
      migrate: 'safe',
      identity: 'usermessage',
      connection: 'mongo',
      attributes: {
        id: {type: 'string', required: true, primaryKey: true, notEmpty: true, unique: true, defaultsTo: function() { let uuid = require('uuid'); return uuid.v4()}},
        fromSzId: {type: 'string', required: false},
        fromSzNickname: {type: 'string', required: false},
        fromSzAvatar: {type: 'string', required: false},
        toSzId: {type: 'string', required: true},
        toSzNickname: {type: 'string', required: true},
        toSzAvatar: {type: 'string', required: true},
        message: {type: 'string', required: true},
        readFlag: {type: 'boolean', defaultsTo: false},
        deleteFlag: {type: 'boolean', defaultsTo: false},
      },
      autoCreatedAt: true,
      afterCreate: function(values, cb) {
          console.log("after create");// eslint-disable-line
          cb();
        },
      testFunc: function() {
          console.log("print"); // eslint-disable-line
        }
    }`,
  },*/
  // todo add orm spec

]


module.exports = OrmSpec
