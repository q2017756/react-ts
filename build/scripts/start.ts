const loggerTs = require('../lib/logger.ts')

loggerTs.info('Starting server...')
require('../../server/main.ts').listen(4000, () => {
  loggerTs.success('Server is running at http://localhost:4000')
})
