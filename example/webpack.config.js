var path = require('path')
const webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: [
    path.resolve(__dirname, './App.js')
  ],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        context: '/',
        postcss: [
          require('postcss-simple-vars')(), // ...then replace the variables...
          require('precss')(),
          require('autoprefixer')
        ]
      }
    }),
    new ExtractTextPlugin({filename: 'style.css',allChunks: true}),
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new webpack.ProvidePlugin({
      // make fetch available
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ],
  devServer: {
    port: 2000
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react']
      }
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          `css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]`,
          `postcss-loader`
        ].join('!')
      })
    }]
  }
}
