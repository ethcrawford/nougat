"use strict";

const { resolve } = require("path");

function setMode(env) {
  if (env === "development") {
    return {
      mode: "development",
      entry: "./src/index",
      output: {
        path: resolve(__dirname, "build"),
        filename: "static/js/[name].js",
        chunkFilename: "static/js/[name].chunk.js",
        publicPath: "/"
      },
      devServer: {
        contentBase: resolve(__dirname, "build")
      }
    };
  }
  return {
    mode: "production",
    entry: "./src/index",
    output: {
      path: resolve(__dirname, "build"),
      filename: "static/js/[name].[chunkhash:8].js",
      chunkFilename: "static/js/[name].[chunkhash:8].chunk.js",
      publicPath: "./"
    }
  };
}

module.exports = setMode;
