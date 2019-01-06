"use strict";

const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const paths = {
  build: resolve(__dirname, "build")
};

function setMode(env) {
  if (env === "development") {
    return {
      mode: "development",
      entry: "./src/index",
      output: {
        path: paths.build,
        filename: "static/js/[name].js",
        chunkFilename: "static/js/[name].chunk.js",
        publicPath: "/"
      },
      devServer: {
        contentBase: paths.build
      },
      module: {
        rules: [
          {
            oneOf: [
              {
                test: [/\.html$/],
                loader: "html-loader",
                options: {
                  minimize: false,
                  attrs: ["img:src", "link:href", ":data-src"]
                }
              },
              {
                exclude: [/\.js$/, /\.html$/, /\.json$/],
                loader: "file-loader",
                options: {
                  name: "static/media/[name].[hash:8].[ext]"
                }
              }
            ]
          }
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: resolve(__dirname, "src/index.html"),
          filename: "index.html",
          title: ""
        })
      ]
    };
  }
  const minHtmlConfig = {
    removeComments: true,
    collapseWhitespace: false,
    removeRedundantAttributes: true,
    caseSensitive: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    removeStyleLinkTypeAttributes: true,
    keepClosingSlash: false,
    sortAttributes: true,
    sortClassName: true,
    minifyJS: true,
    minifyCSS: true,
    minifyURLs: true
  };
  return {
    mode: "production",
    entry: "./src/index",
    output: {
      path: paths.build,
      filename: "static/js/[name].[chunkhash:8].js",
      chunkFilename: "static/js/[name].[chunkhash:8].chunk.js",
      publicPath: "./"
    },
    module: {
      rules: [
        {
          oneOf: [
            {
              test: [/\.html$/],
              loader: "html-loader",
              options: {
                minimize: false,
                attrs: ["img:src", "link:href", ":data-src"]
              }
            },
            {
              exclude: [/\.js$/, /\.html$/, /\.json$/],
              loader: "file-loader",
              options: {
                name: "static/media/[name].[hash:8].[ext]"
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: resolve(__dirname, "src/index.html"),
        filename: "index.html",
        title: "",
        minify: minHtmlConfig
      })
    ]
  };
}

module.exports = setMode;
