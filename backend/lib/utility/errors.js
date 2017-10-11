export class NotFoundError extends Error {
  constructor(msg) {
    super(msg)
    this.status = 404
  }
}

export class ExistError extends Error {
  constructor(msg) {
    super(msg)
    this.status = 403
  }
}

export class NotExistError extends Error {
  constructor(msg) {
    super(msg)
    this.status = 403
  }
}


export class OperationFailedError extends Error {
  constructor(msg) {
    super(msg)
    this.status = 403
  }
}

export class LoginError extends Error {
  constructor(msg) {
    super(msg)
    this.status = 403
  }
}

export class ShinezoneApiError extends Error {
  constructor(msg) {
    // super(`From Shinezone Api;\n${msg};`)
    super(msg)
    this.status = 500
  }
}
