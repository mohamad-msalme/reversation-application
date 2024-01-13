const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js',
    clean: true,
    assetModuleFilename: 'assets/images/[name][ext]'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      pages: path.join(__dirname, 'src/pages'),
      'auth/pages': path.join(__dirname, 'src/pages/auth'),
      'dashboard/pages': path.join(__dirname, 'src/pages/dashboard'),
      services: path.join(__dirname, 'src/api/services'),
      client: path.join(__dirname, 'src/api/client'),
      icons: path.join(__dirname, 'src/components/icons'),
      hooks: path.join(__dirname, 'src/hooks'),
      context: path.join(__dirname, 'src/context'),
      models: path.join(__dirname, 'src/models'),
      providers: path.join(__dirname, 'src/providers'),
      theme: path.join(__dirname, 'src/theme'),
      components: path.join(__dirname, 'src/components'),
      assets: path.join(__dirname, 'assets'),
      constants: path.join(__dirname, 'src/constants'),
      utils: path.join(__dirname, 'src/utils')
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|mp4|webp)$/i,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: 'Modern lock',
      fontUrl:
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
      meta: [
        { property: 'og:title', content: 'Open Graph Title' },
        { name: 'description', content: 'Your description here' }
      ]
    })
  ]
}
