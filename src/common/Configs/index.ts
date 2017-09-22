export enum ENV { DEV, LIVE, STAGE }
export enum LOCALE { zh_CN, en_US }

const Host: any = {
    production:   'http://api.game4us.com/',
    test:     'http://api-qa.game4us.com/',
    development:      'http://172.16.0.240:8000/',//http://172.17.94.239:3333
    localhost:      'http://172.16.0.240:8000/',//boss: 172.16.50.102:3000/ qa:  172.16.0.240:8000  shen 172.16.50.42:3000
    // "dev":      'http://localhost:3000/'
}

const APPKEYS: any = {
  base: {
    facebook: '479783402383921',
    google: '748200586524-mlfkqg9q896p1hdt4i49mj7fhf1p4kpv.apps.googleusercontent.com',
  },
  production: {
    facebook: '479783402383921',
    google: '748200586524-mlfkqg9q896p1hdt4i49mj7fhf1p4kpv.apps.googleusercontent.com',
  },
  test: {
    facebook: '479783402383921',
    google: '748200586524-mlfkqg9q896p1hdt4i49mj7fhf1p4kpv.apps.googleusercontent.com',
  },
  localhost: {
    facebook: '479783402383921',
    google: '748200586524-mlfkqg9q896p1hdt4i49mj7fhf1p4kpv.apps.googleusercontent.com',
  },
}

//http://172.17.242.134:3000/
//http://172.17.94.239:3333/

// import * as process from 'process'
// let env
// try {
//   env = process.env.NODE_ENV || 'localhost'
// } catch (error) {
//   env = 'localhost'
// }
// const ENABLE_ENV = 'localhost'
const ENABLE_ENV = (process as any).env.NODE_ENV || 'localhost'
const Server = { API_HOST: Host[ENABLE_ENV] }
const appkey = Object.assign({}, APPKEYS['base'], APPKEYS[ENABLE_ENV])

class Configs {
  private static _env: string = ENV[ENV.DEV] // DEBUG 模式
  private static _locale: string = LOCALE[LOCALE.zh_CN] // 默认语言
  private static _server: {[key: string]: any} = Server // 域名配置
  private static _appkey: {[key: string]: any} = appkey // APPKEY配置
  private static _enable_env: string = ENABLE_ENV

  public static get DEFAULT(): {[key: string]: any} {
    return {
      ENV: this._env,
      LOCALE: this._locale,
      SERVER: this._server,
      APPKEY: this._appkey,
      ENABLE_ENV: this._enable_env,
    }
  }
}

export default Configs
