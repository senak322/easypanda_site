const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.tsx', // Убедитесь, что указываете правильный входной файл
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        },
        {
            test: /\.css$/i, // Добавляем правило для .css файлов
            use: ['style-loader', 'css-loader'],
          },
        {
          test: /\.scss$/,
          use: [
            'style-loader', // добавляет CSS в DOM через тег style
            'css-loader',   // переводит CSS в CommonJS
            'postcss-loader', // PostCSS магия
            'sass-loader'  // компилирует SASS в CSS
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'public/index.html' // Указывает на ваш шаблонный HTML-файл
      })
    ],
    devServer: {
      static: path.join(__dirname, 'public'),
      compress: true,
      port: 3000,
      historyApiFallback: true, 
      open: true
    }
  };