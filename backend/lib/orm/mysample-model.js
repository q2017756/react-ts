'use strict'

const OrmModel = require('sagitta').Orm.OrmModel

class MysampleModel extends OrmModel {

  constructor() {
    super()
    this.name = 'usermessage'
    this.cacheKey = 'id'
    this.schema = {
      migrate: 'safe',
      identity: 'usermessage',
      connection: 'mongo',
      attributes: {
        id: {
          type: 'string', required: true, primaryKey: true, notEmpty: true, unique: true, defaultsTo: function () {
            let uuid = require('uuid');
            return uuid.v4()
          }
        },
        fromSzId: {type: 'string', required: false},
        fromSzNickname: {type: 'string', required: false},
        // fromSzAvatar: { type: 'string', required: false },
        toSzId: {type: 'string', required: true},
        toSzNickname: {type: 'string', required: true},
        // toSzAvatar: { type: 'string', required: true },
        message: {type: 'string', required: true},
        readFlag: {type: 'boolean', defaultsTo: false},
        deleteFlag: {type: 'boolean', defaultsTo: false},
      },
      autoCreatedAt: true,
      afterCreate: function (values, cb) {
        console.log('after create');// eslint-disable-line
        cb()
      },
      testFunc: function () {
        console.log('print');// eslint-disable-line
      },
    }
  }

  afterCreate(createdValues, next) {
    OrmModel.removeCacheAfterRecordChanged('usermessage', 'id', createdValues, next)
  }

  // afterUpdate(updatedRecord, next) {
  //   OrmModel.removeCacheAfterRecordChanged('usermessage', 'id', updatedRecord, next);
  // }

  afterDestroy(deletedRecord, next) {
    OrmModel.removeCacheAfterRecordChanged('usermessage', 'id', deletedRecord, next)
  }

}

const model = new UsermessageModel()

module.exports = model
