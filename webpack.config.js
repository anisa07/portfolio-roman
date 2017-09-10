var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var definePlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
    __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
});
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
    cache: true,
    entry: {main: './views/index.js'},
    //output: {path: 'public/build', filename: '[name].js'},
    output: {
      path: path.resolve(__dirname, 'public', 'build'),
      filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.jpg$/,
                loader: "file-loader"
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devServer: {
        historyApiFallback: true
    },
    plugins: [
        definePlugin,
        commonsPlugin,
        //     template: 'app/index.html'
        // }),
        new webpack.ProvidePlugin({
            'ReactDOM': 'react-dom',
            'React': 'react'
        }),
         new webpack.optimize.UglifyJsPlugin({
             mangle: true,
             compress: {
                 warnings: false, // Suppress uglification warnings
                pure_getters: true,
                 unsafe: true,
                 unsafe_comps: true,
                 screw_ie8: true
             },
             output: {
                 comments: false,
             },
             exclude: [/\.min\.js$/gi] // skip pre-minified libs
         }),
         new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/])]
};