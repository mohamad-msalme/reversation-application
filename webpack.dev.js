const Dotenv = require('dotenv-webpack')

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new Dotenv({
      path: './.env.development' // Specify the path to your development environment file
    })
  ],
  devServer: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://www.modernlock-dev.biz/api', // Target server (your API server)
        changeOrigin: true, // Change the origin of the host header to the target URL
        pathRewrite: { '^/api': '' } // Remove the '/api' prefix when forwarding the request
      }
    }
  }
}
