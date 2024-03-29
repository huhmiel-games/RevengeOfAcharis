const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
    mode: "development",
    devtool: "eval-source-map",
    entry: {
        app: './src/index.ts',
        vendors: ['phaser']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                include: path.join(__dirname, '../src'),
                loader: 'ts-loader'
            },
            {
                test: [/\.vert$/, /\.frag$/],
                use: "raw-loader"
            },
            {
                test: /\.(gif|png|jpe?g|svg|xml|wav|ogg|world)$/i,
                use: "file-loader"
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                    filename: '[name].bundle.js'
                }
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(["dist"], {
            root: path.resolve(__dirname, "../")
        }),
        new webpack.DefinePlugin({
            CANVAS_RENDERER: JSON.stringify(true),
            WEBGL_RENDERER: JSON.stringify(true)
        }),
        new HtmlWebpackPlugin({
            template: "./index.html"
        })
    ],
    devServer: {
        host: '0.0.0.0', // your ip address
        port: 8080,
    },
};
