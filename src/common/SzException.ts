export interface ErrorType {
  err: any,
  statusCode: any
}

export class SzException {
  /**
   * Handle error.
   *
   * @param {Object} err
   * {
   *  err:xhr.responseText,
   *  statusCode:xhr.status
   * }
   * @return {void}
   */
  public static handleError(err: ErrorType): void {
    //console.error('Loading failed! Msg:' + SzException._getExMsg(err), err)
  }

  /**
   * Get formatted exception message.
   *
   * @param {Object} err
   * {
   *  err:xhr.responseText,
   *  statusCode:xhr.status
   * }
   * @return {String}
   */
  protected static _getExMsg(err: ErrorType): string {
    return (!err.hasOwnProperty('statusCode')) ? 'Error code not defined! response:' + err.toString() : err.err
  }
}

export default SzException
