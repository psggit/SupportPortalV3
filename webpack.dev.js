const { merge } = require("webpack-merge");
const path = require("path");
const common = require("./webpack.common.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    port: 8080,
    compress: true,
    host: "support-local.hipbar-dev.com",
    publicPath: "/",
    historyApiFallback: {
      index: "/",
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        loader: "style-loader!css-loader!sass-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: "url-loader",
            options: {
              mimetype: "image/png",
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "svg-url-loader",
            options: {
              limit: 50000,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
    alias: {
      Components: path.resolve(__dirname, "./src/components"),
      Container: path.resolve(__dirname, "./src/container"),
      Utils: path.resolve(__dirname, "./src/utils"),
      Sass: path.resolve(__dirname, "./src/sass"),
      Constants: path.resolve(__dirname, "./src/constants"),
    },
  },
});
