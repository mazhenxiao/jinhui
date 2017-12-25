import React from 'react';
//import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from "react-router";
import "babel-polyfill";  //兼容ie
import iss from "./iss.js";//公共类
import {projectRouter,areaRouter,basicRouter} from "./toRouter";//导入两个router

/* 路由 */
var rootRout = {
  path: "/",
  childRoutes: [...projectRouter,...areaRouter,...basicRouter] 
}
 
//ReactDOM.render(<Router history={hashHistory} routes={rootRout}></Router>, document.querySelector("#JH-Router"));
export default rootRout;