// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')


const dir = path.resolve(__dirname, 'src/assets/icons')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ?
    '/canvas-paint-line/' : '/',
}