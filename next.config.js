/** @type {import('next').NextConfig} */

const regexEqual = (x, y) =>
  x instanceof RegExp &&
  y instanceof RegExp &&
  x.source === y.source &&
  x.global === y.global &&
  x.ignoreCase === y.ignoreCase &&
  x.multiline === y.multiline

const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    const sassRules = config.module.rules
      .find(rule => typeof rule.oneOf === 'object')
      .oneOf.find(
        rule =>
          rule.sideEffects === false &&
          regexEqual(rule.test, /\.module\.(scss|sass)$/)
      )
    sassRules.use = sassRules.use.map(rule =>
      rule.loader.includes('sass-loader')
        ? {
            ...rule,
            options: {
              ...rule.options,
              //引入你的全局样式
              additionalData: `@import '@/style/indexStyle.scss';`,
            },
          }
        : rule
    )
    return config
  },
}

module.exports = nextConfig
