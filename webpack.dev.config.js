const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//console.log(process.env.NODE_ENV, '1111');
//const ENV = "development";
// const isPRD = process.env.NODE_ENV.indexOf('production') !== -1 ? 'production' : null;
// const isUAT = process.env.NODE_ENV.indexOf('uat') !== -1;

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    app: [
      'react-hot-loader/patch',
      path.join(__dirname, 'src/index.js')
    ],
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: path.resolve(__dirname, 'src'),
        enforce: 'pre',
        use: 'source-map-loader'
      },
      {
        test: /\.(jsx|js)?$/,
        use: ['babel-loader?cacheDirectory=true'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.(scss|css)$/,
        include: [path.resolve(__dirname, 'src/components'), path.resolve(__dirname, 'src/containers'), path.resolve(__dirname, 'src/router')],
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:8]',
              importLoaders: 2
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              config: {
                path: 'postcss.config.js'
              }
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              //data: '@import "global.common.scss";',
              includePaths: [
                path.resolve(__dirname, "src/style")
              ]
            }
          }
        ]
      },
      {
				test: /\.(scss|css)$/,
				exclude: [path.resolve(__dirname, 'src/components'), path.resolve(__dirname, 'src/containers'), path.resolve(__dirname, 'src/router')],
				use: [
          {
            loader: "style-loader",
          },
          {
            loader: 'css-loader',
            options: { sourceMap: true, importLoaders: 1, minimize: true }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              config: {
                path: 'postcss.config.js'
              }
            }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true }
          }
        ]
			},
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        test: /\.(xml|html|txt|md)$/,
        use: 'raw-loader'
      },
      {
        test: /\.(svg|woff2?|ttf|eot)(\?.*)?$/i,
        use: 'url-loader'
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: "url-loader"
      }
    ]
  },
  resolve: {
    extensions: [
      '.jsx',
      '.js',
      '.json',
      '.scss',
      '.css'
    ],
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules'
    ],
    alias: {
      components: path.resolve(__dirname, "src/components"),
      containers: path.resolve(__dirname, 'src/containers'),
      router: path.resolve(__dirname, 'src/router'),
      style: path.resolve(__dirname, 'src/style'),
      core: path.resolve(__dirname, 'src/core'),
      '~': path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(), // 跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误
    new HtmlWebpackPlugin({
      title: "react-starter-kit",
      filename: 'index.html',
      template: path.join(__dirname, 'src/index.ejs')
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      '__UAT__': process.env.NODE_ENV === 'production-uat' ? true : false,
      '__PRD__': process.env.NODE_ENV === 'production' ? true : false
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor'
    // }),
  ],
  stats: {
    colors: true
  },
  //使用 polyfill 或 mock 来自定义 NodeJS 环境：

  node: {
    console: false,
    global: true,
    process: true,
    Buffer: true,
    __filename: "mock",
    __dirname: "mock",
    setImmediate: true
  },
  devServer: {
    port: 3001,
    contentBase: path.join(__dirname, './dist'),
    historyApiFallback: true,
    hot: true,
    host: '192.168.114.150',
    proxy: {
			'/mf': {
				target: 'http://wx-test1.by-health.com',
				changeOrigin: true
      },
      '/kugou': {
        target: 'http://m.kugou.com/',
        changeOrigin:true,
        pathRewrite: {"^/kugou" : ""}
      },
			'/common': {
				target: 'http://wx-test.by-health.com',
				changeOrigin: true
			},
			'/repurchase': {
				target: 'http://wx-test.by-health.com',
				changeOrigin: true
			}
		}
  }
}