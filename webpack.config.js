const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const devtool = devMode ? 'source-map' : false;

module.exports = {
  devtool,
  entry: {
    index: ['./src/js/pages/index.js', './src/scss/pages/home.scss', './src/js/global.js', './src/scss/global.scss'],
    about: ['./src/js/pages/about.js', './src/scss/pages/about.scss', './src/js/global.js', './src/scss/global.scss'],
    blog: ['./src/js/pages/blog.js', './src/scss/pages/blog.scss', './src/js/global.js', './src/scss/global.scss'],
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            "presets": [
              [
                "@babel/preset-env"
              ]
            ]
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('postcss-preset-env')({
                    stage: 3,
                    features: {
                      'nesting-rules': false,
                    },
                  }),
                ],
              }
            }
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/html/index.html',
      filename: 'index.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      template: './src/html/about.html',
      filename: 'about.html',
      chunks: ['about']
    }),
    new HtmlWebpackPlugin({
      template: './src/html/blog/post.html',
      filename: 'blog/post.html',
      chunks: ['blog']
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].min.css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './src/assets',
          to: 'assets',
        },
      ],
    }),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    compress: true,
    port: 8080,
    open: true,
    watchFiles: ['src/**/*.html'],
  },
};
