const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const SentryWebpackPlugin = require("@sentry/webpack-plugin");

module.exports = (env, argv) => {
  const ARGS_SENTRY_ENV = JSON.stringify(env.SENTRY_ENV || "local");
  const ARGS_SENTRY_RELEASE = JSON.stringify(env.SENTRY_RELEASE || "local");
  const ARGS_BUILD_ENV = JSON.stringify(env.BUILD_ENV || "local");
  const ARGS_BASE_DOMAIN = JSON.stringify(env.BASE_DOMAIN || "hipbar-dev.com");
  const config = {
    entry: ["react-hot-loader/patch", "./src/index.js"],
    output: {
      path: path.resolve(__dirname, "dist/"),
      publicPath: "/",
      filename: "[name].[contenthash].js",
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: "babel-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.(ttf|eot|woff|woff2)$/,
          use: {
            loader: "file-loader",
            options: {
              name: "fonts/[name].[contenthash].[ext]",
            },
          },
        },
        {
          test: /\.s[ac]ss$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
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
      ],
    },
    resolve: {
      extensions: [".js", ".jsx"],
      alias: {
        "react-dom": "@hot-loader/react-dom",
      },
    },
    devServer: {
      host: "0.0.0.0",
      contentBase: "./dist",
      public: "fk-local.hipbar-dev.com",
      allowedHosts: ["*"],
      historyApiFallback: {
        index: "/",
      },
    },
    plugins: [
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "[name].[contenthash].css",
        chunkFilename: "[id].[contenthash].css",
      }),
      new CopyPlugin({
        patterns: [{ from: "src/index.html" }],
      }),
      new HtmlWebpackPlugin({
        template: "src/index.html",
        filename: "index.html",
      }),
      new CleanWebpackPlugin(),
      new webpack.DefinePlugin({
        ARGS_SENTRY_ENV: ARGS_SENTRY_ENV,
        ARGS_SENTRY_RELEASE: ARGS_SENTRY_RELEASE,
        ARGS_BUILD_ENV: ARGS_BUILD_ENV,
        ARGS_BASE_DOMAIN: ARGS_BASE_DOMAIN,
      }),
      //Must always be the last plugin to run
      new SentryWebpackPlugin({
        url: "https://sty.hipbar.com/",
        // sentry-cli configuration
        authToken: env.SENTRY_AUTH_TOKEN,
        org: "hipbar",
        project: "support-web",
        // webpack specific configuration
        include: ".",
        ignore: ["node_modules", "webpack.config.js"],
      }),
    ],
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          extractComments: false,
          terserOptions: {
            output: {
              comments: false,
            },
          },
        }),
        new OptimizeCSSAssetsPlugin({}),
      ],
      moduleIds: "hashed",
      runtimeChunk: "single",
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
        },
      },
    },
  };

  if (argv.hot) {
    // Cannot use 'contenthash' when hot reloading is enabled.
    config.output.filename = "[name].[hash].js";
  }

  return config;
};
