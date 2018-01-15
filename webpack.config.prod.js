var path = require("path");
var webpack = require("webpack");
var compress = require("webpack/lib/optimize/UglifyJsPlugin"); //压缩
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin"); //thunk
var CompressionWebpackPlugin = require('compression-webpack-plugin');

var config = {
    entry: {
        "jinhui-Index": path.join(__dirname, '/js/main.js'), //主入口文件
        // "jinhui-newOpen":path.join(__dirname, '/js/openmain.js') //暂用open
    },
    output: {
        path: path.join(__dirname, '/dist/js/'),
        filename: "[name].js",
        publicPath: '/dist/js/',
        chunkFilename: 'chunk-[name].js'
    },
    module: {
        //加载器配置
        loaders: [
            {
                test: /\.css$/,
                loader: "style-loader!css-loader",
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader"
            },
            {
                test: /\.scss$/,
                loader: "style-loader!css-loader!sass-loader"
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192
                }
            },
            {
                test: /\.js$/,
                loaders: ['babel-loader?presets[]=es2015,presets[]=react,presets[]=stage-0'],
                exclude: /node_modules/

            }
        ]
    },
    plugins: [
        new CommonsChunkPlugin({
            name: "chunk",
            minChunks: 2
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new compress({
            output: {
                comments: false,   // remove all comments
                warnings: false,
                drop_debugger: true,
                drop_console: true
            },
            compress: {
                warnings: false
            }
        }),
        new CompressionWebpackPlugin({ //gzip 压缩
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(js|css)$'    //压缩 js 与 css
            ),
            threshold: 10240,
            minRatio: 0.8
        }),
    ],
};

module.exports = config;