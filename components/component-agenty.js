/* 我的待审 */
import React from 'react';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
import AgentyTab from "./tools-agenty-tab.js";//引入头部
class Agenty extends React.Component {
    constructor(arg) {
        super(arg);
        var th = this;
    }
    componentDidMount() {
        var th = this;
        
        $(window).on("EVENT_CLOSELEFTBAR",t=>{
            th.agentyTabel();//绑定表哥
        })
    }
    EventClickCell(txt,da,val){
        var tar = event.target||event.srcElement;
        let w = window.screen.availWidth,
            h =window.screen.availHeight-50;
        if(da=="type"&&tar.nodeName.toLocaleLowerCase()=="a"){
            window.open("/Home/MYTodo/#/","",`width=${w},height=${h},left=0,top=0`)
        }
    }
    agentyTabel() {
        var th = this;
        let formatter = (txt, data) => {
            return `<a href='javascript:;' class="J_EventClick" >${txt}</a>`
        }
        let tabel = this.tabel = $("#agentyBoxTabel"),
            col = [[
                { field: "type", title: "审批类型", align: "center", width: 120, fixed: true, formatter: formatter },
                { field: "content", title: "审批内容", align: "center", width: 120 },
                { field: "people", title: "提交人", align: "center", width: 120, fixed: true },
                { field: "time", title: "提交时间", align: "center", width: 120, fixed: true }
            ]],
            da = {
                total: 20,
                rows: [
                    { type: "审批类型", content: "1审批内容", people: "提交人", time: "2017-20-20" },
                    { type: "审批类型", content: "2审批内容", people: "提交人", time: "2017-20-20" },
                    { type: "审批类型", content: "3审批内容", people: "提交人", time: "2017-20-20" },
                    { type: "审批类型", content: "4审批内容", people: "提交人", time: "2017-20-20" },
                    { type: "审批类型", content: "5审批内容", people: "提交人", time: "2017-20-20" },
                    { type: "审批类型", content: "6审批内容", people: "提交人", time: "2017-20-20" },
                    { type: "审批类型", content: "7审批内容", people: "提交人", time: "2017-20-20" },
                    { type: "审批类型", content: "8审批内容", people: "提交人", time: "2017-20-20" },
                    { type: "审批类型", content: "9审批内容", people: "提交人", time: "2017-20-20" },
                    { type: "审批类型", content: "0审批内容", people: "提交人", time: "2017-20-20" }
                ]
            };
        tabel.datagrid({
            width: "auto",
            nowrap: true,
            fitColumns: true,
            rownumbers: true,
            singleSelect: true,
            striped: true,
            pagination: true,
            columns: col,
            data: da,
            onClickCell:th.EventClickCell

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

export default Agenty;