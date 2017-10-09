import React from 'react';

import "../js/iss.js";
import "babel-polyfill";  //兼容ie

class Winopen extends React.Component{
    constructor(arg){
        super(arg);
        this.state={
            GetLandQuotaByProId:[]
        }
        this.getAjax(this.props.guid);
    }
 
    BIND_CreateUL(){
        let th = this;
        
    }
    getAjax(id){
        var th = this;
        iss.ajax({ //分期列表
            url: "/Stage/GetLandQuotaByProId",
            type: "get",
            data: { projectId:id },
            sucess(d) {
                th.setState({
                    "GetLandQuotaByProId": d.rows
                })
                console.log(d);
            },
            error() { }
        })
    }
    render(){
        return <div className="">
                {this.BIND_CreateUL()}
        </div>
    }
    
}

export default Winopen;