import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from "react-router";
import "babel-polyfill";  //兼容ie
import iss from "./iss.js";//公共类
iss.use({ Router, Route, hashHistory }) 
var rootRout = {
    path: "/",
    childRoutes: [
      {
        path: "/peripheral",
        getComponent: function (next, callback) {
          require.ensure([], function (require) {
            var peripheral = require('../iframeComponents/IC_peripheral.js');//============================首页
            callback(null, peripheral.default);
          }, "IC-peripheral");
        }
      }
    ]
}
ReactDOM.render(<Router history={hashHistory} routes={rootRout}></Router>, document.querySelector("#JH-Router"));
export default rootRout;