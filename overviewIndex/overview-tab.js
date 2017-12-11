// import React from 'react';
// import ReactDOM from 'react-dom';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
import React, { Component } from 'react';
import { Spin, Tabs, Row, Col, Button, Select,Input} from 'antd';

import OverviewIndex from "./overview-index.js";//首页
import OverviewPriority from './overview-priority.js';//重点事项
import OverviewPrimaryKey from './overview-primaryKey.js';//关键指标
import OverviewPayment from './overview-payment.js';//回款
import OverviewSign from './overview-sign.js';//签约
import OverviewSupply from './overview-supply.js';//供货
import OverviewProject from './overview-project.js'//项目
import OverviewIntallment from './overview-intallment.js'//分期
import { setTimeout } from "timers";
const TabPane = Tabs.TabPane;
class OverviewTab extends React.Component {
    
    constructor(arg) {
        super(arg);
        
        this.state={
            data:[
                // { "guid":"1","text":"项目概览","tap":"index"},
                //{ "guid":"2","text":"项目身份证","tap":"identity"},
                { "guid":"2","text":"供货","tap":"supply"},
                { "guid":"3","text":"签约","tap":"sign"},
                { "guid":"4","text":"回款","tap":"payment"},
                { "guid":"5","text":"计划","tap":"plan"},
                // { "guid":"6","text":"重点事项","tap":"matter"},
                // { "guid":"7","text":"关键指标","tap":"keyPoint"},
            ],
            //dataKey:"1E1CB1E95A864AFA961392C3E3644642",
            iframeUrl:"http://plantest.radiance.com.cn:7001/wpmplan/planindex.html?orgid=",
            ...this.state,
            ...this.props.data,
        
        };//通过props初始化tab菜单子组件的state
    }
    componentWillReceiveProps(nextProps){
        let allSearchArg = nextProps.data;
        let currentPosi = nextProps.currentPosi;//获取左侧树当前级别
        let dataKey = nextProps.dataKey;//获取左侧树当前id
        this.setState({
            currentPosi:currentPosi,
            activeKey:"0",
            
        },()=>{
            this.renderRightTab();
            this.renderTabs();
            
        })
    }
   //
    //左侧树变更切换右侧数据内容
    renderRightTab = () => {
        let currentPosi = this.state.currentPosi;//当前级别
        switch(currentPosi){
            case "group"://集团
                this.setState({
                    data:[
                        // { "guid":"1","text":"项目概览","tap":"index"},
                        // { "guid":"2","text":"项目身份证","tap":"identity"},
                        { "guid":"2","text":"供货","tap":"supply"},
                        { "guid":"3","text":"签约","tap":"sign"},
                        { "guid":"4","text":"回款","tap":"payment"},
                        { "guid":"5","text":"计划","tap":"plan"},
                        // { "guid":"6","text":"重点事项","tap":"matter"},
                        // { "guid":"7","text":"关键指标","tap":"keyPoint"},
                    ],
                })
            break;
            case "area"://区域
                this.setState({
                    data:[
                        // { "guid":"1","text":"项目概览","tap":"index"},
                        // { "guid":"2","text":"项目身份证","tap":"identity"},
                        { "guid":"2","text":"供货","tap":"supply"},
                        { "guid":"3","text":"签约","tap":"sign"},
                        { "guid":"4","text":"回款","tap":"payment"},
                        { "guid":"5","text":"计划","tap":"plan"},
                        // { "guid":"6","text":"重点事项","tap":"matter"},
                        // { "guid":"7","text":"关键指标","tap":"keyPoint"},
                        
                    ],
                })
            break;
            case "branchOffice"://分公司
                this.setState({
                    data:[
                        // { "guid":"1","text":"项目概览","tap":"index"},
                        // { "guid":"2","text":"项目身份证","tap":"identity"},
                        { "guid":"2","text":"供货","tap":"supply"},
                        { "guid":"3","text":"签约","tap":"sign"},
                        { "guid":"4","text":"回款","tap":"payment"},
                        { "guid":"5","text":"计划","tap":"plan"},
                        // { "guid":"6","text":"重点事项","tap":"matter"},
                        // { "guid":"7","text":"关键指标","tap":"keyPoint"},
                    ],
                })
            break;
            case "project"://项目
                this.setState({
                    data:[
                        //{ "guid":"1","text":"项目概览","tap":"index"},
                        { "guid":"2","text":"项目身份证","tap":"identity"},
                        { "guid":"3","text":"供货","tap":"supply"},
                        { "guid":"4","text":"签约","tap":"sign"},
                        { "guid":"5","text":"回款","tap":"payment"},
                        { "guid":"6","text":"计划","tap":"plan"},
                        // { "guid":"7","text":"重点事项","tap":"matter"},
                        // { "guid":"8","text":"关键指标","tap":"keyPoint"},
                    ],
                })
            break;
            case "intallment"://分期
                this.setState({
                    data:[
                        //{ "guid":"1","text":"项目概览","tap":"index"},
                        { "guid":"2","text":"分期身份证","tap":"identity"},
                        { "guid":"3","text":"供货","tap":"supply"},
                        { "guid":"4","text":"签约","tap":"sign"},
                        { "guid":"5","text":"回款","tap":"payment"},
                        { "guid":"6","text":"计划","tap":"plan"},
                        // { "guid":"7","text":"重点事项","tap":"matter"},
                        // { "guid":"8","text":"关键指标","tap":"keyPoint"},
                    ],
                })
            break;
        }
    }
    iframeLoad = () =>{
        let iframeUrl = this.state.iframeUrl;
        let dataKey  = this.props.data.dataKey;
        iframeUrl = iframeUrl+dataKey;
        
        if(dataKey==""){
            return <div></div>
        }else{
            //setTimeout(this.refs.outheIframe.window.reload(),3000);
            return <iframe ref="outheIframe" src={iframeUrl} scrolling="no" width="100%" height="700" style={{border: 0}}></iframe>
            console.log(this.refs.outheIframe);
            setTimeout(this.refs.outheIframe.window.reload(),3000);
        }
        
    }
   
    //切换tab菜单渲染内容
    renderSyncEele=arg=>{
         let currentPosi=this.state.currentPosi;
         let location = this.props.data.location;
        
         switch(arg){
            case "index"://项目概览
                return <OverviewIndex />
            break;
            case "identity"://项目身份证
                if(currentPosi=="project"){
                    return <OverviewProject location={location} />          
                }else if (currentPosi =="intallment"){
                    return <OverviewIntallment location={location} />
                }else{
                    return <div>***身份证</div>
                }
                
            break;
            case "supply"://供货
                return <OverviewSupply />
            break;
            case "sign"://签约
                return <OverviewSign />
            break;  
            case "payment"://回款
                return <OverviewPayment />
            break;
            case "plan"://计划
                return this.iframeLoad();
            break;
            case "matter"://重点事项
                return <OverviewPriority />
            break; 
            case "keyPoint"://关键指标
                return <OverviewPrimaryKey />
            break;
        } 

    }
    renderTabMenu1 = () =>{
             return  this.state.data.map((da,ind)=>{
                return <TabPane tab={da.text} key={ind}>{this.renderSyncEele(da.tap)}</TabPane>
             });
    }
    
    callback = (key) => {
        this.setState({
            activeKey:key,
        })
    }

    renderTabs = () =>{
        let currentPosi=this.state.currentPosi;
        return(
            <Tabs onChange={this.callback} defaultActiveKey="0" activeKey={this.state.activeKey} type="card">
                {this.renderTabMenu1()}
            </Tabs>
        );
    }
    

    render() {
        return(<div>
                <Row>
                    <Col span={24}>
                        {this.renderTabs()}
                    </Col>
                </Row>
                    
            </div>
        );
    }

}

export default OverviewTab;


