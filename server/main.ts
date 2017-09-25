const express = require('express')
const nodePath = require('path')
const npmWebpack = require('webpack')
const logger = require('../build/lib/logger.ts')
const webpackConfig = require('../build/webpack.config.ts')
const currProject = require('../project.config.ts')
const compress = require('compression')

const app = express()
app.use(compress())

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (currProject.env === 'development') {
  const compiler = npmWebpack(webpackConfig)

  logger.info('Enabling webpack development and HMR middleware')
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath  : webpackConfig.output.publicPath,
    contentBase : nodePath.resolve(currProject.basePath, currProject.srcDir),
    hot         : true,
    quiet       : false,
    noInfo      : false,
    lazy        : false,
    timings     : true,
    warnings    : true,
    errors      : true,
    errorDetails: true,
    stats: {
      colors: true
    },
  }))
  app.use(require('webpack-hot-middleware')(compiler, {
    path: '/__webpack_hmr'
  }))

  // Serve static assets from ~/public since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  app.use(express.static(nodePath.resolve(currProject.basePath, 'public')))

  // This rewrites all routes requests to the root /index.html file
  // (ignoring file requests). If you want to implement universal
  // rendering, you'll want to remove this middleware.
  app.use('*', function (req, res, next) {
    const filename = nodePath.join(compiler.outputPath, 'index.html')
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err)
      }
      res.set('content-type', 'text/html')
      res.send(result)
      res.end()
    })
  })
} else {
  logger.warn(
    'Server is being run outside of live development mode, meaning it will ' +
    'only serve the compiled application bundle in ~/dist. Generally you ' +
    'do not need an application server for this and can instead use a web ' +
    'server such as nginx to serve your static files. See the "deployment" ' +
    'section in the README for more information on deployment strategies.'
  )

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(express.static(nodePath.resolve(currProject.basePath, currProject.outDir)))
}

module.exports = app
