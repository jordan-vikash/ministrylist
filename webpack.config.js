"use strict";

const webpack = require("webpack");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

const postCSSLoaderPlugins = [
    require("autoprefixer")(),
    require("cssnano")({
        preset: [
            "default",
            {
                discardComments: {
                    removeAll: true,
                },
            },
        ],
    }),
];

module.exports = {
    context: process.cwd(),
    mode: "development",
    entry: {
        app: path.join(
            __dirname,
            "assets",
            "src",
            "js",
            "index.js"
        ),
    },
    output: {
        path: path.join(
            __dirname,           
            "assets",
            "dist"
        ),
        publicPath: "",
        filename: "js/[name].js",
    },
    externals: {
        jquery: "jQuery",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss|\.css/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            modules: false,
                            sourceMap: !isProduction,
                            importLoaders: 2,
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: !isProduction,
                            ident: "postcss",
                            plugins: postCSSLoaderPlugins,
                        },
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: !isProduction,
                            implementation: require("sass"),
                            sassOptions: {
                                outputStyle: "expanded",
                            },
                        },
                    },
                ],
            },
            {
                // only include svg that doesn't have font in the path or file name by using negative lookahead
                test: /(\.(png|jpe?g|gif)$|^((?!font).)*\.svg$)/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 15000, // bytes
                            fallback: "file-loader",
                            // file-loader options
                            name: "[name]-[hash:8].[ext]",
                            outputPath: "images/",
                            publicPath: "../images",
                        },
                    },
                ],
            },
            {
                // include fonts svg files only
                test: /(\.(woff2?|ttf|eot|otf)$|font.*\.svg$)/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name]-[hash:8].[ext]",
                            outputPath: "fonts/",
                            publicPath: "../fonts",
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false,
            verbose: true,
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
        }),
    ].concat(
        isProduction
            ? [
                  // https://webpack.js.org/guides/caching/
                  new webpack.HashedModuleIdsPlugin(),
              ]
            : [
                  //
              ]
    ),
    devtool: isProduction ? false : "source-map",
    watchOptions: {
        ignored: /node_modules/,
    },
    performance: {
        hints: false,
    },
    stats: {
        modules: false,
        children: false,
        entrypoints: false,
    },
    bail: isProduction,
};

if (isProduction) {
    module.exports.plugins.push(
        new TerserPlugin({
            cache: true,
            parallel: true,
            sourceMap: false,
            terserOptions: {
                output: {
                    comments: false,
                    beautify: false,
                },
                compress: {
                    drop_debugger: true,
                    drop_console: true,
                    dead_code: true,
                },
            },
        })
    );
}
