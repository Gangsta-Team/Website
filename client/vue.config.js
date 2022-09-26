var webpack = require('webpack');
module.exports = {
    publicPath: (process.env.NODE_ENV === 'production') ? '/Website/' : '/',
    pages: {
        index: {
          entry: 'src/main.js',
          title: 'Scarface The World Is Yours',
        },
      }
}