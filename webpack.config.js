"use strict";

const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractWebpackPlugin = require("mini-css-extract-plugin");
const ManifestWebpackPlugin = require("webpack-manifest-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const SpritesmithWebpackPlugin = require("webpack-spritesmith");
const flexbugsFixesPostcssPlugin = require("postcss-flexbugs-fixes");
const autoprefixerPostcssPlugin = require("autoprefixer");
const gifsicleImageminPlugin = require("imagemin-gifsicle");
const mozjpegImageminPlugin = require("imagemin-mozjpeg");
const optipngImageminPlugin = require("imagemin-optipng");
const svgoImageminPlugin = require("imagemin-svgo");

const paths = {
  build: resolve(__dirname, "build"),
  merge: resolve(__dirname, "src/merge"),
  spritesmithSprite: resolve(__dirname, "src/img/spritesmith-sprite.png"),
  spritesmithStylesheet: resolve(__dirname, "src/spritesmith-stylesheet.scss"),
};

const shouldUseSoftHtmlProcessMode = true;

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
        publicPath: "/",
      },
      devServer: {
        port: 9000,
        contentBase: paths.build,
      },
      module: {
        rules: [
          {
            oneOf: [
              {
                test: /\.js$/,
                exclude: /^node_modules\//,
                loader: "babel-loader",
                options: {
                  cacheDirectory: true,
                  cacheCompression: false,
                },
              },
              {
                test: /\.css$/,
                use: [
                  "style-loader",
                  {
                    loader: "css-loader",
                    options: {
                      importLoaders: 1,
                    },
                  },
                  {
                    loader: "postcss-loader",
                    options: {
                      plugins: [
                        flexbugsFixesPostcssPlugin(),
                        autoprefixerPostcssPlugin({
                          flexbox: "no-2009",
                        }),
                      ],
                    },
                  },
                ],
              },
              {
                test: /\.scss$/,
                use: [
                  "style-loader",
                  {
                    loader: "css-loader",
                    options: {
                      importLoaders: 2,
                    },
                  },
                  {
                    loader: "postcss-loader",
                    options: {
                      plugins: [
                        flexbugsFixesPostcssPlugin(),
                        autoprefixerPostcssPlugin({
                          flexbox: "no-2009",
                        }),
                      ],
                    },
                  },
                  "sass-loader",
                ],
              },
              {
                test: /\.svg$/,
                include: paths.merge,
                loader: "svg-sprite-loader",
                options: {
                  extract: false,
                },
              },
              {
                exclude: [/\.js$/, /\.html$/, /\.json$/],
                loader: "file-loader",
                options: {
                  name: "static/media/[name].[hash:8].[ext]",
                },
              },
            ],
          },
        ],
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: resolve(__dirname, "src/index.html"),
          filename: "index.html",
          title: "",
        }),
        new SpritesmithWebpackPlugin({
          src: {
            cwd: paths.merge,
            glob: "*.png",
          },
          target: {
            image: paths.spritesmithSprite,
            css: paths.spritesmithStylesheet,
          },
          apiOptions: {
            cssImageRef: "img/spritesmith-sprite.png",
          },
          spritesmithOptions: {
            padding: 4,
          },
          retina: "@2x",
          logCreatedFiles: true,
        }),
      ],
    };
  }
  function setHtmlProcessMode(isSoftMode) {
    if (isSoftMode) {
      return {
        minifyCSS: true,
        minifyJS: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
      };
    }
    return {
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      removeComments: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
    };
  }
  return {
    mode: "production",
    devtool: "source-map",
    entry: "./src/index",
    output: {
      path: paths.build,
      filename: "static/js/[name].[chunkhash:8].js",
      chunkFilename: "static/js/[name].[chunkhash:8].chunk.js",
      publicPath: "./",
    },
    optimization: {
      minimizer: [
        new TerserWebpackPlugin({
          terserOptions: {
            parse: {
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
          },
          parallel: true,
          cache: true,
          sourceMap: true,
        }),
        new OptimizeCssAssetsWebpackPlugin({
          cssProcessorOptions: {
            map: {
              inline: false,
              annotation: true,
            },
          },
        }),
      ],
    },
    module: {
      rules: [
        {
          oneOf: [
            {
              test: /\.js$/,
              exclude: /^node_modules\//,
              loader: "babel-loader",
              options: {
                cacheDirectory: true,
                cacheCompression: true,
                compact: true,
              },
            },
            {
              test: /\.css$/,
              use: [
                {
                  loader: MiniCssExtractWebpackPlugin.loader,
                  options: {
                    publicPath: "../../",
                  },
                },
                {
                  loader: "css-loader",
                  options: {
                    importLoaders: 1,
                  },
                },
                {
                  loader: "postcss-loader",
                  options: {
                    plugins: [
                      flexbugsFixesPostcssPlugin(),
                      autoprefixerPostcssPlugin({
                        flexbox: "no-2009",
                      }),
                    ],
                  },
                },
              ],
            },
            {
              test: /\.scss$/,
              use: [
                {
                  loader: MiniCssExtractWebpackPlugin.loader,
                  options: {
                    publicPath: "../../",
                  },
                },
                {
                  loader: "css-loader",
                  options: {
                    importLoaders: 2,
                  },
                },
                {
                  loader: "postcss-loader",
                  options: {
                    plugins: [
                      flexbugsFixesPostcssPlugin(),
                      autoprefixerPostcssPlugin({
                        flexbox: "no-2009",
                      }),
                    ],
                  },
                },
                "sass-loader",
              ],
            },
            {
              test: /\.svg$/,
              include: paths.merge,
              use: [
                {
                  loader: "svg-sprite-loader",
                  options: {
                    extract: false,
                  },
                },
                {
                  loader: "img-loader",
                  options: {
                    plugins: [svgoImageminPlugin()],
                  },
                },
              ],
            },
            {
              test: [/\.gif$/, /\.jpe?g/, /\.png$/, /\.svg$/],
              use: [
                {
                  loader: "file-loader",
                  options: {
                    name: "static/media/[name].[hash:8].[ext]",
                  },
                },
                {
                  loader: "img-loader",
                  options: {
                    plugins: [
                      gifsicleImageminPlugin(),
                      mozjpegImageminPlugin(),
                      optipngImageminPlugin(),
                      svgoImageminPlugin(),
                    ],
                  },
                },
              ],
            },
            {
              exclude: [/\.js$/, /\.html$/, /\.json$/],
              loader: "file-loader",
              options: {
                name: "static/media/[name].[hash:8].[ext]",
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: resolve(__dirname, "src/index.html"),
        filename: "index.html",
        title: "",
        minify: setHtmlProcessMode(shouldUseSoftHtmlProcessMode),
      }),
      new SpritesmithWebpackPlugin({
        src: {
          cwd: paths.merge,
          glob: "*.png",
        },
        target: {
          image: paths.spritesmithSprite,
          css: paths.spritesmithStylesheet,
        },
        apiOptions: {
          cssImageRef: "img/spritesmith-sprite.png",
        },
        spritesmithOptions: {
          padding: 4,
        },
        retina: "@2x",
        logCreatedFiles: true,
      }),
      new MiniCssExtractWebpackPlugin({
        filename: "static/css/[name].[contenthash:8].css",
        chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
      }),
      new ManifestWebpackPlugin({
        fileName: "assets-manifest.json",
      }),
    ],
  };
}

module.exports = setMode;
