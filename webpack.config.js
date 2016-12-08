const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  entry: {
    main: './index.js',
    'project-bookmarklet': './bookmarklet/project.bookmarklet.js'
  },
  output: {
    path: path.join(__dirname, 'static'),
    filename: '[name].js',
    publicPath: 'http://localhost:3000/static/'
  },
  plugins: [
    new CleanWebpackPlugin(['static'], { verbose: false }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel'
      },
      {
        test: /\.sass$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 10000
        }
      }
    ]
  }
}
