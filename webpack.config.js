var path = require("path");
var webapck = require("webpack");
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin"); //thunk
var compress = require("webpack/lib/optimize/UglifyJsPlugin"); //压缩
var DedupePlugin = require("webpack/lib/optimize/DedupePlugin"); //多文件
// var ImageminPlugin = require('imagemin-webpack-plugin').default;//图片压缩
var ExtractTextPlugin = require("extract-text-webpack-plugin");
// console.log(path.join(__dirname,"/source/"));
//const extractLESS = new ExtractTextPlugin('./Content/dist/css/[name].min.css');
//var WebpackDevServer = require('webpack-dev-server');
var c = require('child_process');

var config = {
    entry: {
      //  "WebpackDevServer": "webpack-dev-server/client?http://localhost:5001/",
        "jinhui-Index": path.join(__dirname, '/js/main.js'), //主入口文件
        "jinhui-areaMa": path.join(__dirname, '/js/areaMa.js'),/*面积管理*/
        "jinhui-newOpen": path.join(__dirname, '/js/newOpen.js') //无框架文件
    },
    output: {
        path: path.join(__dirname, '/dist/js/'),
        filename: "[name].js",
        publicPath:path.join(__dirname,'/'),
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
        /*      new compress({
              output: {
                  comments: false,   // remove all comments
                },
                compress: {
                  warnings: false
                }
          }), */
        new DedupePlugin({
            'process.env': { NODE_ENV: '"production"' }
        }),
       /*  new webapck.DefinePlugin({  //热替换
            'process.env.NODE_ENV': '"development"'
        }), */
        new webapck.HotModuleReplacementPlugin() //热替换
        /*  new ImageminPlugin({
             disable: process.env.NODE_ENV !== 'production', // Disable during development 
             pngquant: {
               quality: '95-100'
             }
           }) */
        /*   new ExtractTextPlugin('[name].bundle.css', {
            allChunks: true
          }) */
    ],
    resolve: {
        // modules:[path.resolve(__dirname,"/source/"),"node_modules"],
        /* alias:{
            echarts:path.join(__dirname,"/source/echarts.min.js")
        } */
    },
}
c.exec("npm run build");
module.exports = config;