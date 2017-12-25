import "babel-polyfill";  //兼容ie
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from "react-router";
import iss from "./iss.js";//公共类
import rootRout from "./router";//路由
class Openmain extends React.Component{
    constructor(arg){
        super(arg)
     
    }
    render(){
        return <article>
          
            <section className="JH-Content" >
                <article className="JH-RightBox" style={{"marginLeft":"0"}}>
                    <section className="JH-Content">
                        <article id="JH-Router">
                            <Router history={hashHistory} routes={rootRout}></Router>
                        </article>
                    </section>
                </article>
            </section>
        </article> 
    }
}

ReactDOM.render(<Openmain />, document.querySelector("#jinhuiMain"))
