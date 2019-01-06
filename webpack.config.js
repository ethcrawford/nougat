"use strict";

const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PostcssFlexbugsFixes = require("postcss-flexbugs-fixes");
const Autoprefixer = require("autoprefixer");
const ManifestPlugin = require("webpack-manifest-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const paths = {
  build: resolve(__dirname, "build")
};

function setMode(env) {
  if (env === "development") {
    return {
      mode: "development",
      devtool: "cheap-module-source-map",
      entry: "./src/index",
      output: {
        path: paths.build,
        filename: "static/js/[name].js",
        chunkFilename: "static/js/[name].chunk.js",
        publicPath: "/"
      },
      devServer: {
        port: 9000,
        contentBase: paths.build
      },
      module: {
        rules: [
          {
            oneOf: [
              {
                test: /\.html$/,
                loader: "html-loader",
                options: {
                  attrs: ["img:src", "link:href", ":data-src"]
                }
              },
              {
                test: /\.js$/,
                exclude: /^node_modules\//,
                loader: "babel-loader",
                options: {
                  cacheDirectory: true,
                  cacheCompression: false
                }
              },
              {
                test: /\.css$/,
                use: [
                  "style-loader",
                  {
                    loader: "css-loader",
                    options: {
                      importLoaders: 1
                    }
                  },
                  {
                    loader: "postcss-loader",
                    options: {
                      plugins: [
                        PostcssFlexbugsFixes(),
                        Autoprefixer({
                          flexbox: "no-2009"
                        })
                      ]
                    }
                  }
                ]
              },
              {
                test: /\.scss$/,
                use: [
                  "style-loader",
                  {
                    loader: "css-loader",
                    options: {
                      importLoaders: 2
                    }
                  },
                  {
                    loader: "postcss-loader",
                    options: {
                      plugins: [
                        PostcssFlexbugsFixes(),
                        Autoprefixer({
                          flexbox: "no-2009"
                        })
                      ]
                    }
                  },
                  "sass-loader"
                ]
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
    devtool: "source-map",
    entry: "./src/index",
    output: {
      path: paths.build,
      filename: "static/js/[name].[chunkhash:8].js",
      chunkFilename: "static/js/[name].[chunkhash:8].chunk.js",
      publicPath: "./"
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 8
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2
            },
            mangle: {
              safari10: true
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true
            }
          },
          parallel: true,
          cache: true,
          sourceMap: true
        }),
        new OptimizeCssAssetsPlugin({
          cssProcessorOptions: {
            map: {
              inline: false,
              annotation: true
            }
          }
        })
      ]
    },
    module: {
      rules: [
        {
          oneOf: [
            {
              test: /\.html$/,
              loader: "html-loader",
              options: {
                minimize: false,
                attrs: ["img:src", "link:href", ":data-src"]
              }
            },
            {
              test: /\.js$/,
              exclude: /^node_modules\//,
              loader: "babel-loader",
              options: {
                cacheDirectory: true,
                cacheCompression: true,
                compact: true
              }
            },
            {
              test: /\.css$/,
              use: [
                {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    publicPath: "../../"
                  }
                },
                {
                  loader: "css-loader",
                  options: {
                    importLoaders: 1
                  }
                },
                {
                  loader: "postcss-loader",
                  options: {
                    plugins: [
                      PostcssFlexbugsFixes(),
                      Autoprefixer({
                        flexbox: "no-2009"
                      })
                    ]
                  }
                }
              ]
            },
            {
              test: /\.scss$/,
              use: [
                {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    publicPath: "../../"
                  }
                },
                {
                  loader: "css-loader",
                  options: {
                    importLoaders: 2
                  }
                },
                {
                  loader: "postcss-loader",
                  options: {
                    plugins: [
                      PostcssFlexbugsFixes(),
                      Autoprefixer({
                        flexbox: "no-2009"
                      })
                    ]
                  }
                },
                "sass-loader"
              ]
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
      }),
      new MiniCssExtractPlugin({
        filename: "static/css/[name].[contenthash:8].css",
        chunkFilename: "static/css/[name].[contenthash:8].chunk.css"
      }),
      new ManifestPlugin({
        fileName: "assets-manifest.json"
      })
    ]
  };
}

module.exports = setMode;
