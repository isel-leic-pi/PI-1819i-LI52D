'use strict'

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    'entry': './app/js/entry.js',
    mode: 'development',
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'b4app'
        })
    ],
    module: {
        rules: [{
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        },{
            test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/,
            loader: 'url-loader?limit=100000',
        },
        {
            test: /\.(hbs)$/,
            use: 'raw-loader'
        },
        {
            test: /\.(html)$/,
            use: 'html-loader'
        }]
    }
}

