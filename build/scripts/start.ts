const logger = require('../lib/logger.ts')

logger.info('Starting server...')
require('../../server/main.ts').listen(4000, () => {
  logger.success('Server is running at http://localhost:4000')
})
