var path = require("path");
var webapck = require("webpack");
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin"); //thunk
var compress = require("webpack/lib/optimize/UglifyJsPlugin"); //压缩
var DedupePlugin = require("webpack/lib/optimize/DedupePlugin"); //多文件
// var ImageminPlugin = require('imagemin-webpack-plugin').default;//图片压缩
var ExtractTextPlugin = require("extract-text-webpack-plugin");
// console.log(path.join(__dirname,"/source/"));
const extractLESS = new ExtractTextPlugin('./Content/dist/css/[name].min.css');
var config = {
    entry: {
        "jinhui-Index": path.join(__dirname, '/js/main.js'),
        "jinhui-OpenIndex":path.join(__dirname, '/js/openmain.js')
    },
    output: {
        path: path.join(__dirname, '/dist/js/'),
        filename: "[name].js",
        publicPath:'/Content/dist/js/',
        chunkFilename: 'chunk-[name].js'
    },
    module: {
        //加载器配置
        loaders: [
            {
                test: /\.css$/,
                loader:"style-loader!css-loader",
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                loader:"style-loader!css-loader!less-loader"
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
                loaders: ['babel-loader?presets[]=es2015,presets[]=react'],
                exclude: /node_modules/
              
            }
        ]
    },
     plugins: [
        new CommonsChunkPlugin({
            name: "chunk"
        }),
        extractLESS,
        /*  new compress({
            output: {
                comments: false,  // remove all comments
              },
              compress: {
                warnings: false
              }
        }), */
        new DedupePlugin({
            'process.env': {NODE_ENV: '"production"'}
        }),
        // new ImageminPlugin({
        //     disable: process.env.NODE_ENV !== 'production', // Disable during development 
        //     pngquant: {
        //       quality: '95-100'
        //     }
        //   })
    ],
    resolve:{   
       // modules:[path.resolve(__dirname,"/source/"),"node_modules"],
        alias:{
            echarts:path.join(__dirname,"/source/echarts.min.js")
        }
    }, 
}
module.exports = config;