const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = function () {
    return {
        entry: {
            main: './src/index.js',
        },
        output: {
            filename: '[chunkhash].[name].js',
            path: path.resolve(__dirname, 'dist')
        },
        module: {
            rules: [{
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                })
            }]
        },
        devtool: 'source-map',
        plugins: [
            new ExtractTextPlugin({ filename: '[chunkhash].[name].css', disable: false, allChunks: true }),
            new webpack.optimize.CommonsChunkPlugin({
                names: ['manifest'],
                minChunks: function (module) {
                    // this assumes your vendor imports exist in the node_modules directory
                    return module.context && module.context.indexOf('node_modules') !== -1;
                }
            }),
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            }),
            new webpack.optimize.UglifyJsPlugin({
                beautify: false,
                mangle: {
                    screw_ie8: true,
                    keep_fnames: true
                },
                compress: {
                    screw_ie8: true
                },
                comments: false
            })
        ]
    };
};