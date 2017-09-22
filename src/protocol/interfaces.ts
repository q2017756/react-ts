import { Middleware } from '../store/interfaces'

export class ApiPromiseType {
  public API: Function
  public middleware: Middleware
  constructor() {

  }
}

export interface ResponseProtocol {
  status: number,
  message: string,
  data: any
}

export interface SucceedProtocol {
  response: ResponseProtocol,
  statusCode: number
}

export interface ErrorProtocol {
  type: string,
  error: string,
  response: string,
  statusCode: string,
  statusText: string,
}
