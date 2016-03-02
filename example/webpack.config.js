module.exports = {
  entry: './App.js',
  output: {
    filename: 'public/bundle.js'
  },
  module: {
    loaders: [{
      exclude: /(node_modules)/,
      loader: 'babel',
      query: {
        presets: ['react']
      }
    }]
  }
}
