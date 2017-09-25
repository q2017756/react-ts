const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const tsImportPluginFactory = require('ts-import-plugin')
const project = require('../project.config.ts')

const inProject = path.resolve.bind(path, project.basePath)
const inProjectSrc = (file) => inProject(project.srcDir, file)

const __DEV__ = project.env === 'development'
const __PROD__ = project.env === 'production'

var ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
var HappyPack = require('happypack');
var happyThreadPool = HappyPack.ThreadPool({ size: 4 });

const config = {
  entry: {
    normalize: [
      inProjectSrc('normalize'),
    ],
    main: [
      inProjectSrc(project.main),
    ],
  },
  devtool: __DEV__ ? 'source-map' : false,
  output: {
    path: inProject(project.outDir),
    filename: __DEV__ ? '[name].js' : '[name].[chunkhash].js',
    publicPath: project.publicPath,
  },
  resolve: {
    modules: [
      inProject(project.srcDir),
      'node_modules',
    ],
    extensions: [".ts", ".tsx", '.js', '.jsx', '.json'],
    alias: {
      'g-common': path.resolve(__dirname, './src/common/'),
      'g-components': path.resolve(__dirname, './src/components/'),
      'g-containers': path.resolve(__dirname, './src/containers/'),
      'g-store': path.resolve(__dirname, './src/store/'),
      'g-src': path.resolve(__dirname, './src/'),
    }
  },
  externals: project.externals,
  module: {
    rules: [
    ],
  },
  plugins: [
    new webpack.DefinePlugin(Object.assign({
      'process.env': { NODE_ENV: JSON.stringify(project.env) },
      __DEV__,
      __PROD__,
    }, project.globals))
  ],
  performance: {
    hints: "error",
    assetFilter: function(assetFilename) {
      return assetFilename.endsWith('.js') && assetFilename.endsWith('.tsx') && assetFilename.endsWith('.ts')
    }
  }
}

// JavaScript
// ------------------------------------
config.module.rules.push({
    enforce: "pre",
    test: /\.js$/,
    loader: "source-map-loader"
  });
config.module.rules.push({
  test: /\.js?$/,
  enforce: 'pre',
  loader: 'eslint-loader',
});
// config.module.rules.push({
//   test: /\.(tsx|ts)$/,
//   loader: 'ts-loader',
//   options: {
//     transpileOnly: true,
//     getCustomTransformers: () => ({
//       before: [ tsImportPluginFactory( { libraryName: "antd", style: "css" }) ]
//     }),
//     compilerOptions: {
//       module: 'es2015'
//     }
//   },
//   exclude: /node_modules/
// });
// config.module.rules.push({
//   test: /\.ts|tsx?$/,
//   enforce: 'pre',
//   // loader: 'happypack/loader?id=happyts'
//   loader: 'tslint-loader',
// });
config.module.rules.push({
  test: /\.ts|tsx?$/,
  // loader: "awesome-typescript-loader",
  loader: 'happypack/loader?id=happyts',
  exclude: /node_modules/,
});

config.module.rules.push({
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: [{
    loader: 'babel-loader',
    query: {
      cacheDirectory: true,
      plugins: [
        'babel-plugin-transform-class-properties',
        'babel-plugin-syntax-dynamic-import',
        [
          'babel-plugin-transform-runtime',
          {
            helpers: true,
            polyfill: false, // we polyfill needed features in src/normalize.js
            regenerator: true,
          },
        ],
        [
          'babel-plugin-transform-object-rest-spread',
          {
            useBuiltIns: true // we polyfill Object.assign in src/normalize.js
          },
        ],
        ["babel-plugin-import", { libraryName: "antd", style: "css" }]
      ],
      presets: [
        'babel-preset-react',
        ['babel-preset-env', {
          modules: false,
          targets: {
            ie9: true,
          },
          uglify: true,
        }],
      ]
    },
  }],
})

// Styles
// ------------------------------------
const extractStyles = new ExtractTextPlugin({
  filename: 'styles/[name].[contenthash].css',
  allChunks: true,
  disable: __DEV__,
})

config.module.rules.push({
  test: /\.(sass|scss)$/,
  loader: extractStyles.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader',
        options: {
          sourceMap: project.sourcemaps,
          minimize: {
            autoprefixer: {
              add: true,
              remove: true,
              browsers: ['last 2 versions'],
            },
            discardComments: {
              removeAll : true,
            },
            discardUnused: false,
            mergeIdents: false,
            reduceIdents: false,
            safe: true,
            sourcemap: project.sourcemaps,
          },
        },
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: project.sourcemaps,
          includePaths: [
            inProjectSrc('styles'),
          ],
        },
      }
    ],
  })
})

config.module.rules.push({   // .css 解析
    test: /\.css$/,
    loaders: ['style-loader', 'css-loader']
})


config.plugins.push(extractStyles)

// Images
// ------------------------------------
config.module.rules.push({
  test    : /\.(png|jpg|gif)$/,
  loader  : 'url-loader',
  options : {
    limit : 8192,
  },
})

// Fonts
// ------------------------------------
;[
  ['woff', 'application/font-woff'],
  ['woff2', 'application/font-woff2'],
  ['otf', 'font/opentype'],
  ['ttf', 'application/octet-stream'],
  ['eot', 'application/vnd.ms-fontobject'],
  ['svg', 'image/svg+xml'],
].forEach((font) => {
  const extension = font[0]
  const mimetype = font[1]

  config.module.rules.push({
    test    : new RegExp(`\\.${extension}$`),
    loader  : 'url-loader',
    options : {
      name  : 'fonts/[name].[ext]',
      limit : 10000,
      mimetype,
    },
  })
})

// HTML Template
// ------------------------------------
config.plugins.push(new HtmlWebpackPlugin({
  template: inProjectSrc('index.html'),
  inject: true,
  minify: {
    collapseWhitespace: true,
  },
}))

// config.plugins.push(new HappyPack({
//   id: 'happyts',
//   loaders: ['tslint-loader'],
//   threadPool: happyThreadPool,
//   cache: true,
//   verbose: true
// }))
config.plugins.push(new ForkTsCheckerNotifierWebpackPlugin ({
  excludeWarnings: true
}))
config.plugins.push(new ForkTsCheckerWebpackPlugin ({
  checkSyntacticErrors: true
}))

config.plugins.push(new HappyPack({
  id: 'happyts',
  threadPool: happyThreadPool,
  threads: 4,
  cache: true,
  verbose: true,
  loaders: [
    {
        path: 'ts-loader',
        query: { happyPackMode: true }
    }
]
}))

// Development Tools
// ------------------------------------
if (__DEV__) {
  config.entry.main.push(
    `webpack-hot-middleware/client.js?path=${config.output.publicPath}__webpack_hmr`
  )
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  )
}

// Production Optimizations
// ------------------------------------
if (__PROD__) {
  config.plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    // new webpack.optimize.OccurenceOrderPlugin(),
    // new ExtractTextPlugin('/css/[name].[chunkhash:8].css'),
    // new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: '/js/[name].[chunkhash:8].js'}),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: !!config.devtool,
      comments: true, // 是否删除代码中所有的注释
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        drop_console: true, // 是否删除所有的console
      },
    })
  )
}

module.exports = config
