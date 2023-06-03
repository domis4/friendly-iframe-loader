module.exports = {
  presets: [
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: 'iOS >= 9, IE 10, > 1%, not dead'
        },
        useBuiltIns: 'entry',
        corejs: {
          version: '3',
          proposals: true
        }
      }
    ]
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-transform-modules-commonjs',
    ['styled-components', { ssr: true }]
  ],
  exclude: [
    /\bcore-js\b/,
    /\bwebpack\/buildin\b/,
    /\node_modules\/(?!(ol)\/).*/
  ]

}
