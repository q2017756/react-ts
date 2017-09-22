/* tslint:disable */
import * as htmlToText from 'html-to-text'
import * as moment from 'moment'
import Configs from './Configs'
import i18n, { i18nType } from './i18n'

//import dialog from 'uxcore-dialog'
const isNode = typeof window === 'undefined'

class SzLib {

  /**
   * Load i18n config
   *
   * @params (String) locale
   * @return (i18nStruct)
   */
  public static loadLocale(locale?: string): i18nType {
    return i18n.instance.get(locale)
  }

  /**
   * Get url param.
   *
   * @param {String} name the name of the param
   * @returns {String} param
   */
  public static getUrlParam(name: string): string | null {
    if (typeof window === 'undefined') { return null }
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    const r = window.location.search.substr(1).match(reg)
    if (r != null) return unescape(r[2]); return null
  }

  /**
   * Reload page.
   *
   * @return {void}
   */
  public static reloadPage(): void {
    if (typeof window === 'undefined') { return }
    window.location.reload()
  }

  /**
   * Refresh page.
   *
   * @param {String} url
   * @return {void}
   */
  public static refreshPage(url: string): void {
    if (typeof window === 'undefined') { return }
    window.location.href = url
  }

  /**
   * Log message.
   *
   * @param {String|Object} msg
   * @return {void}
   */
  public static log(msg: string): void {
    if (Configs.DEFAULT.ENV == 'LIVE') {
      return
    }
    if (typeof console == 'object') {
    }
  }

  /**
   * Convert the first character of the given string to upper case
   *
   * @type {String} str
   * @return (String)
   */
  public static ucfirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  /**
   * Uint8 array to string
   *
   * @param {Uint8Array} ua
   * @return {String}
   */
  public static byteArrayToString(ua: Uint8Array): string {
    let s = ''
    for (let i = 0; i < ua.length; i++) {
      s += String.fromCharCode(ua[i])
    }
    return s
  }

  /**
   * String replace via argus
   *
   * @param {String} str
   * @param {Object} argus
   * @return {String}
   */
  public static strReplace(str: string, argus: string[]) {
    if (argus.length === 0) {
      return str
    }

    for (let i = 0; i < argus.length; i++) {
      str = str.replace(/%s/, argus[i])
    }

    return str
  }

  /**
   * Get window protocol
   *
   * @return {String}
   */
  public static getWindowProtocol(): string | null {
    if (typeof window === 'undefined') { return null }
    return window.location.protocol
  }

  public static isEmpty(obj: any): boolean {
    if (obj == null || obj == undefined || obj == '') return true
    if (obj.length > 0) return false
    if (obj.length === 0)  return true
    if (typeof obj == 'number' && obj > 0) return false
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) return false
    }

    return true
  }

  public static formatDate(timestamp: any): string {
    const date = new Date(timestamp)

    const month: number = date.getMonth() + 1
    const monthValue: string = (month >= 1 && month <= 9) ? '0' + month : month.toString()
    const day: number = date.getDate()
    const dayValue: string = (day >= 0 && day <= 9) ? '0' + day : day.toString()
    const hours: number = date.getHours()
    const hoursValue: string = (hours >= 0 && hours <= 9) ? '0' + hours : hours.toString()
    const minutes: number = date.getMinutes()
    const minutesValue: string = (minutes >= 0 && minutes <= 9) ? '0' + minutes : minutes.toString()
    const seconds: number = date.getSeconds()
    const secondsValue: string = (seconds >= 0 && seconds <= 9) ? '0' + seconds : seconds.toString()

    return `${date.getFullYear()}-${monthValue}-${dayValue}`
  }

  public static dateToTimestamp(date: Date): number {
    return date.getTime() / 1000
  }

  public static sprintf(): string {
    const arg = arguments
    let str = arg[0] || ''
    let i, n

    for (i = 1, n = arg.length; i < n; i++) {
      str = str.replace(/%s/, arg[i])
    }

    return str
  }

  public static parseHttpCode(httpCode: number): string {
    const httpCodeList = i18n.instance.get().HttpCode
    if (httpCodeList.hasOwnProperty(httpCode)) {
      return httpCodeList[httpCode]
    }

    return httpCodeList.UNKNOWN
  }

  public static loadImage(imgName: string): string {
    return isNode ? '/' + imgName : imgName
  }

  public static generatePageData(responseData: any, positionPage: string) {   
    if (!!responseData === false || responseData.length === 0) {
      return [];
    }
    const dataArr: any[] = []
    let imgList: any[] = []
    let type: any = ''
    let video: any = ''
    const reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|\&|-)+)/g

    responseData.forEach((item: any, index: any) => {
      const text = htmlToText.fromString(item.content)
      const textIgnoreImg = htmlToText.fromString(item.content, { ignoreImage: true })
      const iContent = item.content || ''

      if (iContent.indexOf('<iframe') > -1) {
        type = 'videoCard'
        video = item.content.split('<iframe')[1].split('<\/iframe>')[0].split('src=\"')[1].split('\"')[0]
      }
      else {
        if (text.match(reg) === null) {
          type = 'textCard'
        }
        else {
          type = 'textImgCard'
          imgList = text.match(reg)
        }
      }

      dataArr.push({
        id: item.post_id,
        szId: item.sz_id || item.szId,
        title: item.title,
        nickname: item.nickname || false,
        update_date: item.update_date,
        headicon: item.head_icon,
        created_date: moment(item.created_date * 1000).format('lll'),
        content: textIgnoreImg.replace(/\s/g, '') || '',
        reply: item.reply,
        respsNum: item.resps_num,
        positionpage: positionPage,
        collectNum: item.coll_num,
        thumpNum: item.thump_num,
        imgList,
        video,
        type,
      })
    })

    return dataArr
  }
}

export default SzLib
