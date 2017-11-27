import React from 'react';
import ReactDOM from 'react-dom';
import "babel-polyfill";  //兼容ie
import iss from "./iss.js";//公共类
import rootRout from "./router.js";//路由 
class Openmain extends React.Component{
    constructor(arg){
        super(arg)
        this.data={
            a:1,
            b:2
        }
    }
    render(){

    }
}

export default Openmain;