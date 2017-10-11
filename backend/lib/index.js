'use strict'

import Sagitta from 'sagitta'
import config from'./config'

const app = Sagitta.Instance.app

app.init(config).then(() => {
  app.start()
  app.logger.info(`Server is now running at http://${config.app.host}:${config.app.port}.`)
  app.logger.info('Server started ...')
}).catch((err) => {
  console.log(err.stack);// eslint-disable-line
})
