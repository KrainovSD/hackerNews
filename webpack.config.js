const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        exclude: "/node_modules/",
        use: "babel-loader",
      },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.(css|scss)$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 30 * 1024,
          },
        },
        generator: {
          filename: "static/media/[name].[ext]",
        },
      },
      {
        test: /\.(eot|ttf|woff)$/i,
        type: "asset/resource",
        generator: {
          filename: "static/fonts/[name].[ext]",
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[fullhash].js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "assets", "index.html"),
      //filename: "index.[fullhash].html",  // ДЛЯ PRODUCTION
      favicon: "./src/assets/icons/favicon.ico",
    }),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    static: "./src",
    hot: true,
    port: 3000,
    historyApiFallback: true,
  },
};
