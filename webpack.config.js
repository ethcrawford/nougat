"use strict";

const { resolve } = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index",
  output: {
    path: resolve(__dirname, "build"),
    filename: "static/js/[name].[chunkhash:8].js",
    chunkFilename: "static/js/[name].[chunkhash:8].chunk.js",
    publicPath: "./"
  }
};
