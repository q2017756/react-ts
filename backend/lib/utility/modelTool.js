'use strict'

function createUserInfoInitData() {
  let now = new Date()
  return {
    username: '',
    employee_id: 0,
    last_login: now,
    department: '',
    create_date: now,
    permission: [],
  }
}

function createConditionObject(select, where, skip, limit, sort) {
  return {
    select: select || [],
    where: where || {},
    skip: skip || 0,
    limit: limit || 0,
    sort: sort || 'updatedAt DESC',
  }
}


module.exports = {
  createUserInfoInitData: createUserInfoInitData,
  createConditionObject: createConditionObject,
}


