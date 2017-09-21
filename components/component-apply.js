/* 我的申请 */
import React from 'react';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
import AgentyTab from "./tools-agenty-tab.js";//引入头部
class Apply extends React.Component{
    constructor(arg){
        super(arg);
    }
    render(){
        return <article>
           <AgentyTab parent={this.props} />

        </article>
    }
}

export default Apply;