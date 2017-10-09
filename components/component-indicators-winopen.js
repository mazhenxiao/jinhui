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
    open(){
        iss.Alert({
            title:"选择地块",
            width:1000,
            height:400,
            content:`<div id="selectMassif"></div>`,
            ok(){
                return false
            }
        });
         
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