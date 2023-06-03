const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const LicenseCheckerWebpackPlugin = require('license-checker-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = (env, argv) => ({
  entry: {
    app: './src/app/index.js',
    loader: './src/loader/loader.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: ({ chunk }) => {
      if (chunk.name === 'app') {
        return '[name].[contenthash].js'
      }
      return '[name].js'
    },
    chunkFilename: '[name].js', // Neu hinzugefügt
    publicPath: ''
  },
  target: 'web',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /(?!node_modules).*\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader?cacheDirectory=false',
            options: {
              babelrc: true
            }
          }
        ]
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][contenthash].[ext]',
              publicPath: '../'
            }
          }
        ]
      },
      {
        test: /\.(otf)$/,
        use: {
          loader: 'url-loader'
        }
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg)(\?[\s\S]+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][contenthash].[ext]',
              publicPath: '../'
            }
          }
        ]
      }
    ]
  },
  devServer: {
    port: 8080,
    devMiddleware: {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/app/template.html',
      excludeChunks: ['loader'],
      templateParameters: {
        host: 'http://localhost:8080'
      }
    }),
    new LicenseCheckerWebpackPlugin({
      outputFilename: 'licenses.txt',
      allow: '(Apache-2.0 OR BSD-2-Clause OR BSD-3-Clause OR MIT OR 0BSD)',
      filter: /(^.*[/\\]node_modules[/\\]((?:@[^/\\]+[/\\])?(?:[^@/\\][^/\\]*)))/
    }),
    new CleanWebpackPlugin()
  ]
}
)
