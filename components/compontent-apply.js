/* 我的待审 */
import React from 'react';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
import AgentyTab from "./tools-agenty-tab.js";//引入头部
class Apply extends React.Component {
    constructor(arg) {
        super(arg);
    }
    componentDidMount() {
        this.agentyTabel();//绑定表哥 
    }
    agentyTabel() {
        let opens=(arg,data)=>{
        }
        let formatter=(txt,data)=>{
            return `<a href='javascript:;' >${txt}</a>`
        }
        let tabel = $("#agentyBoxTabel"),
            col = [[
                {field:"type",title:"审批类型",align:"center" ,width: 120, fixed: true,formatter:formatter},
                {field:"content",title:"审批内容",align:"center",width:120},
                {field:"time",title:"提交时间",align:"center", width: 120, fixed: true},
                {field:"status",title:"审批状态",align:"center", width: 120, fixed: true},
                {field:"current",title:"当前节点",align:"center", width: 120, fixed: true},
                {field:"people",title:"当前审批人",align:"center", width: 120, fixed: true}
            ]],
            da={
                total:20,
                rows:[
                {type:"审批类型",content:"1审批内容",time:"2017-20-20",status:"审批中",current:"当前节点",people:"提交人"},
                {type:"审批类型",content:"2审批内容",time:"2017-20-20",status:"审批中",current:"当前节点",people:"提交人"},
                {type:"审批类型",content:"3审批内容",time:"2017-20-20",status:"审批中",current:"当前节点",people:"提交人"},
                {type:"审批类型",content:"4审批内容",time:"2017-20-20",status:"审批中",current:"当前节点",people:"提交人"},
                {type:"审批类型",content:"5审批内容",time:"2017-20-20",status:"审批中",current:"当前节点",people:"提交人"},
                {type:"审批类型",content:"6审批内容",time:"2017-20-20",status:"审批中",current:"当前节点",people:"提交人"},
                {type:"审批类型",content:"7审批内容",time:"2017-20-20",status:"审批中",current:"当前节点",people:"提交人"},
                {type:"审批类型",content:"8审批内容",time:"2017-20-20",status:"审批中",current:"当前节点",people:"提交人"},
                {type:"审批类型",content:"9审批内容",time:"2017-20-20",status:"审批中",current:"当前节点",people:"提交人"},
                {type:"审批类型",content:"0审批内容",time:"2017-20-20",status:"审批中",current:"当前节点",people:"提交人"},
            ]
        };
        tabel.datagrid({
            width: "auto",
            nowrap: true,
            fitColumns: true,
            rownumbers: true,
            singleSelect: true,
            striped:true,
            pagination:true,
            columns: col,
            data:da
         
        });
      
    }
    render() {
        return <article>
            <AgentyTab parent={this.props} />
            <section className="agentyBox mgT20">
                <table id="agentyBoxTabel"></table>
            </section>
        </article>
    }
}

export default Apply;