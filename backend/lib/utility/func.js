'use strict'

var debug = require('debug')('shinezone-js-sdk-api'); // eslint-disable-line
let Promise = require('bluebird')
let request = require('request')
let crypto = require('crypto')
let joi = require('joi') // lower case
var config = require('./config'); // eslint-disable-line
let utility = require('./utility')
let postAsync = Promise.promisify(request.post)
let getAsync = Promise.promisify(request.get)
let constructUrl = 'http://172.17.0.15:9000/v1.0/' //todo constructUrl
const localIp = require('ip').address()
const port = process.env.PORT || 80; // eslint-disable-line


// delete object key
function deleteObjectKey(obj, keys) {
  keys = keys || ''
  if (keys.length !== 0) {
    for (let i in keys) {
      delete obj[keys[i]]
    }
  }

  return obj
}

function getInitRes() {
  return {
    data: {},
    message: '',
    status: 0,
  }
}

function getTimeStamp() {
  return Math.floor(Date.now() / 1000); // eslint-disable-line
}

function getImageBase64(origin) {
  let fs = require('fs')
  let path = require('path')
  return fs.readFileSync(path.join(__dirname, origin)).toString('base64')
}

function getImageUri(siteNode) { // eslint-disable-line
                                 // const fsp = require('fs-promise');
                                 // const configPath = require("../../config");
                                 // const libPath = require('path');
                                 // const appCfg = fsp.readJsonSync(libPath.join(configPath, 'app.json'));
                                 // const imgPath = appCfg.sourceHost+"/"+libPath.join('public','bkImage')+"/";
                                 // console.log(localIp,port);
                                 // return imgPath;
  return localIp + ':' + port + '/bkImage/'
}


function getDetailUri(path) {
  // const fsp = require('fs-promise');
  // const configPath = require("../../config");
  // const libPath = require('path');
  // const appCfg = fsp.readJsonSync(libPath.join(configPath, 'app.json'));
  // const imgPath = appCfg.sourceHost+"/"+libPath.join('public',path)+"/";
  // return imgPath;
  return localIp + ':' + port + '/attachment/' + path + '/'
}


// check JWT
function checkJWT(ctx) {
  let jwtSecret = require('sagitta').Instance.app.conf.app.jwtSecret || undefined
  let authorizations = ctx.headers.authorization.split(' ')
  let decodeToken = require('sagitta').Utility.JWT.verify(authorizations[1], jwtSecret)
  if (decodeToken === false) {
    ctx.throw('no access', 403); // eslint-disable-line
  }
  if ((ctx.params.szId !== undefined && decodeToken.szId != ctx.params.szId)
    || (ctx.request.body.szId !== undefined && decodeToken.szId != ctx.request.body.szId)) {
    ctx.throw('unauthorized', 401); // eslint-disable-line
  }

  return decodeToken
}

function mobile2Country(mobile, country) {
  let patten = /^[1-9]{8,20}$/
  if (patten.test(mobile)) {
    if (country == 0) {
      throw new Error('country is invalid')
    }
    mobile = country + mobile
  }

  // handle pass country is string
  mobile = mobile.replace(':country', '')

  return mobile
}

function readJson(fileName) {
  //Async
  // jsonFile.readFile(file, function(err, obj) {
  //   return obj;
  // })

  //Sync

  let jsonFile = require('jsonfile')
  return jsonFile.readFileSync(__dirname + fileName)
}

function writeJson(fileName, obj, _opt) {
  let jsonFile = require('jsonfile')
  let option = _opt ? _opt : {}
  return jsonFile.writeFileSync(__dirname + fileName, obj, option)
}

function sendMail(name, mail, title, content) {
  let nodemailer = require('nodemailer')
  let smtpTransport = require('nodemailer-smtp-transport')

  let mailOptions = {
    from: 'business@shinezone.com',
    to: 'liuchuangang@shinezone.com,business@shinezone.com,zhuyunli@shinezone.com',
    subject: title,
    html: '以下邮件内容,来自于炫踪网站的\'联系我们\'页面的提交<p>' + content + ' FROM:' + name + '@' + mail + '</p>',
  }

  // 发送邮件
  nodemailer.createTransport(smtpTransport({
    host: 'smtp.exmail.qq.com',
    secureConnection: false,
    port: 465,
    auth: {
      user: 'business@shinezone.com',
      pass: 'Shinezone2016',
    },
  })).sendMail(mailOptions, function (error, response) { // eslint-disable-line
    if (error) {
      return false
    }
    smtpTransport.close()
    return true
  })
}

function userOaAccountLogin(username, pwd) { // eslint-disable-line
  return {
    status: 0,
    userInfo: {
      username: 'ZhuYunLi' + getTimeStamp(),
      dept: '程序部',
      employeeId: Math.round(Math.random() * 100) // eslint-disable-line
    },
  }
}

/**
 * create request signature
 */
function createSign(params) {
  let md5 = crypto.createHash('md5')
  md5.update(params.toString())
  return md5.digest('hex')
}

/**
 * user login
 * module user
 */
function userLogin(username, pwd) {
  let url = constructUrl + 'login'
  let signParams = [username]
  let otherData = {user: username, password: pwd}
  let schema = {
    user: joi.string().required(),
    password: joi.string().required(),
  }
  var sign = this.createSign(signParams); // eslint-disable-line
  return handleRequest(url, otherData, schema, otherData)
}


/**
 * user login
 * module user
 */
function getCompanyConstruct() {
  let url = constructUrl + 'get_part_all'
  let otherData = {}
  let schema = {}

  let res = {
    data: {},
    message: '',
    status: 0,
  }

  return new Promise(function (resolve, reject) {
    utility.joiValidate(otherData, schema, {allowUnknown: true})
      .then(function (val) { // eslint-disable-line
        return getAsync({
          url: url,
          form: JSON.stringify(otherData),
        }).then(function (response) {
          try {
            let body = JSON.parse(response.body)
            res.status = body.code
            res.timestamp = body.timestamp
            delete body.code
            delete body.timestamp
            delete body.msg
            resolve(body)
          } catch (e) {
            throw new Error('invalid json body!')
          }
        })
          .catch(function (err) { // eslint-disable-line
            reject(utility.getErr(res, '9999'))
          })
      })
      .catch(function (err) { // eslint-disable-line
        resolve(utility.getErr(res, '9998'))
      })
  })
}

function handleRequest(url, schemaData, schema, formData) {
  let res = {
    data: {},
    message: '',
    status: 0,
  }

  return new Promise(function (resolve, reject) {
    utility.joiValidate(schemaData, schema, {allowUnknown: true})
      .then(function (val) { // eslint-disable-line
        return postAsync({
          url: url,
          form: JSON.stringify(formData),
        })
          .then(function (response) {
            try {
              let body = JSON.parse(response.body)
              res.status = body.code
              res.timestamp = body.timestamp
              delete body.code
              delete body.timestamp
              delete body.msg
              // res.data = body;
              resolve(body)
            } catch (e) {
              throw new Error('invalid json body!')
            }

          })
          .catch(function (err) { // eslint-disable-line
            reject(utility.getErr(res, '9999'))
          })
      })
      .catch(function (err) { // eslint-disable-line
        resolve(utility.getErr(res, '9998'))
      })
  })
}

// function buildData(cpId, sign, timestamp, params) {
//   params = params || {};
//   if (typeof timestamp  === 'object') {
//     params = timestamp;
//     timestamp = Math.floor(Date.now() / 1000);
//   }
//   var data = {
//     cp_id: cpId,
//     timestamp: timestamp,
//     sign: sign
//   };
//   return Object.assign(data, params);
// }

module.exports = {
  deleteObjectKey: deleteObjectKey,
  getTimeStamp: getTimeStamp,
  checkJWT: checkJWT,
  mobile2Country: mobile2Country,
  readJson: readJson,
  writeJson: writeJson,
  getImageBase64: getImageBase64,
  getInitRes: getInitRes,
  getImageUri: getImageUri,
  sendMail: sendMail,
  userOaAccountLogin: userOaAccountLogin,
  createSign: createSign,
  getDetailUri: getDetailUri,
  handleRequest: handleRequest,
  userLogin: userLogin,
  getCompanyConstruct: getCompanyConstruct,
}


