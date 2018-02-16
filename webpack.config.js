'use strict'
let webpack = require('webpack')

module.exports = {
  entry: './app/main.jsx',
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  context: __dirname,
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '*']
  },
  module: {
    rules: [{
      test: /jsx?$/,
      exclude: /(node_modules|bower_components)/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['react', 'es2015', 'stage-2']
        }
      }]
    }]
  }
  // ,
  // plugins: {
    
  // }
  // devMode
  //   ? [new LiveReloadPlugin({appendScriptTag: true})]
  //   : []
}

//new webpack.DefinePlugin({mode: {NODE_ENV: JSON.stringify(process.env.NODE_ENV)}})

new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV)
  },
})