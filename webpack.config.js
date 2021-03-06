const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry: {
        demo: __dirname + '/demo.jsx',
    },
    output: {
        path: __dirname + '/docs',
        publicPath: '/dayz',
        filename: 'demo.js',
    },
    resolve: {
        extensions: [".js", ".json", ".jsx"],
    },
    module: {
        rules: [
            {
                loader: 'babel-loader',
                test: /\.jsx?$/,
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/, use: [
                    { loader: "style-loader" },
                    { loader: "css-loader"   },
                    { loader: "sass-loader"  },
                ]
            },
        ],
    },
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
        new HtmlWebpackPlugin({
            title: 'Dayz React Calendar',
        }),
    ],
    node: {
        fs: 'empty',
    },
    devServer: {
        hot: false,
        inline: true,
        port: 2222,
        historyApiFallback: true,
        stats: {
            colors: true,
            profile: true,
            hash: false,
            version: false,
            timings: false,
            assets: true,
            chunks: false,
            modules: false,
            reasons: true,
            children: false,
            source: true,
            errors: true,
            errorDetails: false,
            warnings: true,
            publicPath: false,
        },
    },
};

if (process.env.NODE_ENV === 'production') {
    const uglify = new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
    });
    config.plugins.push(uglify);
}


// console.log(config)

module.exports = config;
