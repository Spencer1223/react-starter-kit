const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const glob = require('glob');
const PurifyCSSPlugin = require('purifycss-webpack');

module.exports = {
  devtool: 'source-map',
  entry: {
    app: path.join(__dirname, 'src/index.js')
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: ""
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
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
        })
      },
      {
				test: /\.(scss|css)$/,
				exclude: [path.resolve(__dirname, 'src/components'), path.resolve(__dirname, 'src/containers'), path.resolve(__dirname, 'src/router')],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
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
              loader: 'sass-loader',
              options: { sourceMap: true }
            }
          ]
        }),
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
        use: "file-loader?limit=10000&name=./assets/[hash:16].[ext]"
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
    new CleanWebpackPlugin(['dist/']),
    new UglifyJSPlugin(),
    new webpack.NoEmitOnErrorsPlugin(), // 跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误
    new HtmlWebpackPlugin({
      title: "react-starter-kit",
      filename: 'index.html',
      template: path.join(__dirname, 'src/index.ejs')
    }),
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      '__UAT__': process.env.NODE_ENV === 'production-uat' ? true : false,
      '__PRD__': process.env.NODE_ENV === 'production' ? true : false
    }),
    // new PurifyCSSPlugin({
    //   paths: glob.sync(path.join(__dirname, 'src')),
    // }),
    // new webpack.optimize.UglifyJsPlugin({
		// 	output: {
		// 		comments: false
    //   },
    //   compress: {
		// 		unsafe_comps: true,
		// 		properties: true,
		// 		keep_fargs: false,
		// 		pure_getters: true,
		// 		collapse_vars: true,
		// 		unsafe: true,
		// 		warnings: false,
		// 		screw_ie8: true,
		// 		sequences: true,
		// 		dead_code: true,
		// 		drop_debugger: true,
		// 		comparisons: true,
		// 		conditionals: true,
		// 		evaluate: true,
		// 		booleans: true,
		// 		loops: true,
		// 		unused: true,
		// 		hoist_funs: true,
		// 		if_return: true,
		// 		join_vars: true,
		// 		cascade: true,
		// 		drop_console: true
		// 	}
    // }),
    new webpack.HashedModuleIdsPlugin(),
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
    port: 3000,
    contentBase: path.join(__dirname, './dist'),
    historyApiFallback: true,
    host: '0.0.0.0',
  }
}

console.log("process.env.NODE_ENV 的值是(webpack.prod.config.js)："+ process.env.NODE_ENV)