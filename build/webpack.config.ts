import * as webpack from 'webpack'
import * as path from 'path'
declare var __dirname

const config: webpack.Configuration = {
  entry: './foo.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'foo.bundle.js'
  }
}

export default config