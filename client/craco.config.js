const CracoLessPlugin = require('craco-less')

// Refer to here: https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
// for list of theme variables that can be changed.

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@rate-star-bg': '#bfbfbf' },
            javascriptEnabled: true
          }
        }
      }
    }
  ]
}
