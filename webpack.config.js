const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const pkg = require("./package.json");
const isDev = process.env.NODE_ENV !== "production";
/**
 * @typedef { import("webpack").Configuration } Configuration
 * @type { Configuration }
 */
module.exports = {
  entry: {
    //진입 파일
    bundle: "./src/main.tsx",
  },
  //이것에 따라 웹팩 최적화가 달라짐 dev냐 prod 냐
  mode: isDev ? "development" : "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: `[name].[hash:8].js`,
    assetModuleFilename: "images/[hash][ext][query]",
    //publicPath: './',
  },
  // test: /\.tsx?$/, // ?는 있어도 되고 없어도되는 것 ts, tsx 라는 파일만나면 ts loader를 써라!
  // use: "ts-loader", 리콰이어를 안써도됨
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gig)$/i,
        type: "asset",
        // use: [
        //   {
        //     loader: "file-loader",
        //     options: {
        //       filename: "[name].[hash:8].[ext]",
        //     },
        //   },
        // ],
      },
      {
        test: /\.svg$/i,
        type: "asset/inline",
        use: [
          {
            loader: "svgo-loader",
          },
        ],
      },
      {
        test: /\.txt$/i,
        type: "asset",
      },
      {
        test: /\.(css|sass|scss)$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: {
                auto: true,
                localIdentName: isDev
                  ? "[path][name]__[local]"
                  : "[hash:base64]",
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".wasm", ".mjs", ".jsx", ".json"],
  },
  devtool: isDev ? "inline-source-map" : "source-map",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
  },
  plugins: [
    //배열 순서대로 실행이됨 순서가 중요,
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
      inject: "body",
      templateParameters: {
        title: "Test App23",
      },
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
    new MiniCssExtractPlugin({
      filename: isDev ? "[name].css " : "[name].[contenthash:8].css",
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};
