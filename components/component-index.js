/* 项目概览 首页 */
import "babel-polyfill";  //兼容ie
import React from 'react';
import ReactDOM from 'react-dom';
import ToolsStateNode from "../components/tools-stateNode.js";
import IndexTab from "../components/tools-index-tab.js";//标签
class index extends React.Component {
    echarts=null;
    componentWillMount() {
        var th = this;
        require.ensure([], function (require) {  //异步加载js
            th.echarts = require('../source/echarts.min.js');//============================首页
            th.bind_echars();
         }, "component-echarts");
    }
    componentDidMount() {
        
       
       // this.bind_echars();
        this.bind_table();
    }
    addTodo(text) {

    }
    Event_fullMap(){ //项目总图
        this.bind_bigmap();
    }
    Event_fullMapPartition(){//分区总图
        this.bind_bigmap();
    }
    Event_fullMapPlate(){ //推盘图
        this.bind_bigmap();
    }
    bind_bigmap(){
        let fee = this.refs.iframe,
            w = window.screen.availWidth,
            h = window.screen.availHeight,
            src = fee.src;
            /* fee.style.width = w+"px";
            fee.style.height = h+"px";
            fee.style.position="fixed";
            fee.style.left=0;
            fee.style.top=0;
            fee.style.zIndex=200; */
            window.open(src+"?fullScreen=true","newWindow",`height=${h},width=${w},status=no,toolbar=no,menubar=no,location=no,left=0,top=0`);
    }
    bind_table(){//绑定项目指标
        let _data=[
            {area:"建设用地面积",number:"-",count:"",group:""},
            {area:"建设用地面积",number:"-",count:"",group:""},
            {area:"建设用地面积",number:"-",count:"",group:""},
            {area:"建设用地面积",number:"-",count:"",group:""}
        ];
         let table = $("#areas");
             table.datagrid({
                 width:"auto",
                 nowrap:true,
                 fitColumns:true,
                // rownumbers:true,
                 singleSelect:true,
                columns:[[
                    {field:'area',align:"center",title:'面积指标',rowspan:1,width:350,fixed:true},
                    {field:'number',align:"center",title:'面积指标',rowspan:1,width:120,fixed:true},
                    {field:'count',align:"center",title:'面积指标',rowspan:1,width:120,fixed:true},
                    {field:'group',align:"center",title:'面积指标',rowspan:1,width:90}
                ]],
                data:_data
             });
             $(".icon-bar").on("EVENT_TOGGLEBAR",ev=>{
                if(iss.getQuert("index")){
                    setTimeout(()=>{
                        table.datagrid("resize");   
                    },500);
                }
               // myChart.setOption(option);
            })
    }
    bind_echars(){ //绑定图标
        var myChart = this.echarts.init(document.getElementById('main'));
        
                // 指定图表的配置项和数据
                var option = {
                    title:{
                        bottom:0
                    },
                    grid: {
                        left: '0',
                        right: '0',
                        bottom:0,
                        containLabel: true
                    },
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data:['','',''],
                        right:0
                    },
                    xAxis: {
                        type : 'category',
                        data: ["","","",""]
                    },
                    yAxis: {
                        
                            type : 'value',
                            interval:10
                    },
                    splitArea:0,
                    color:["#2979ff","#ff9100","#e53935","#673ab7","#00e676"],
                    series: [{
                        name: '销量',
                        type: 'bar',
                        barWidth :15,
                        data: [5, 20, 36, 10, 10, 20]
                    },
                    {
                        name: '销量2',
                        type: 'bar',
                        barWidth :15,
                        data: [15, 25, 15, 3, 18, 15]
                    },
                    {
                        name: '销量3',
                        type: 'bar',
                        barWidth :15,
                        data: [15, 25, 15, 3, 18, 15]
                    }]
                };
        
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);

                $(".icon-bar").on("EVENT_TOGGLEBAR",ev=>{
                    setTimeout(()=>{
                        myChart.resize();
                    },500);
                   // myChart.setOption(option);
                })
    }
    render() {
        return <section>
             <IndexTab parent={this.props} />
            <ToolsStateNode location={this.props.location} title="关键节点" />
            <article className="index-iframe mgT20">
                <section className="index-left">
                    <header className="HeaderBar">
                        <h5>
                            <span>项目总图</span>
                            <ul>
                                <li onClick={this.Event_fullMap.bind(this)}>项目总图</li>
                                <li onClick={this.Event_fullMapPartition.bind(this)}>分区总图</li>
                                <li onClick={this.Event_fullMapPlate.bind(this)}>推盘图</li>
                            </ul>
                        </h5>
                    </header>
                    <div>
                        <iframe ref="iframe" id="iframe" src="/Content/Components/map.html" frameBorder="no" width="400" height="300" />
                    </div>
                </section>
                <section className="index-right">
                    <header className="HeaderBar">
                        <h5>
                            <span>关键性指标</span>
                        </h5>
                    </header>
                    <div id="main" className="echarBox">
                    </div>
                </section>
            </article>
            <article className="mgT20">
                <section>
                <header className="HeaderBar">
                        <h5>
                            <span>项目面积指标（单位：平方米）</span>
                        </h5>
                    </header>
                    <div>
                        <table id="areas"></table>
                    </div>
                </section>
            </article>
        </section>
    }




}
export default index;