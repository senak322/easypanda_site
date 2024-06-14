const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx", // Убедитесь, что указываете правильный входной файл
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i, // Добавляем правило для .css файлов
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader", // добавляет CSS в DOM через тег style
          "css-loader", // переводит CSS в CommonJS
          "postcss-loader", // PostCSS магия
          "sass-loader", // компилирует SASS в CSS
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[name][ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html", // Указывает на шаблонный HTML-файл
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "public/images", to: "images" }, // Копируем все изображения из public/images в dist/images
        { from: "public/icons", to: "icons" }, // Копируем все иконки из public/icons в dist/icons
        { from: "public/manifest.json", to: "manifest.json" }, // Копируем manifest.json
        { from: "public/favicon.ico", to: "favicon.ico" }, // Копируем favicon.ico
        { from: "public/browserconfig.xml", to: "browserconfig.xml" }, 
        { from: "public/robots.txt", to: "robots.txt" }, 
        { from: "public/sitemap.xml", to: "sitemap.xml" }, 
      ],
    }),
  ],
  devServer: {
    static: path.join(__dirname, "public"),
    compress: true,
    port: 3000,
    historyApiFallback: true,
    open: true,
  },
};
