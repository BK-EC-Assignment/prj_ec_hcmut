var HtmlWebpackPlugin = require('html-webpack-plugin')
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/public/js/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: [
    __dirname + '/public/js/index.js'
  ],
  output: {
    path: __dirname + '/views',
    filename: "index_bundle.js"
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
      {test: /\.css$/, loader: "style-loader!css-loader"}
    ]
  },
  plugins: [HTMLWebpackPluginConfig]
};
