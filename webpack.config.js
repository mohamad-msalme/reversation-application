const { merge } = require('webpack-merge')
const common = require('./webpack.common')

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production'
  const config = isProduction
    ? require('./webpack.prod')
    : require('./webpack.dev')
  const mergedConfig =  merge(common, config)
  return mergedConfig
}
