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
//import StageControl from '../components/component-newProjectStage.js'//分期
const TabPane = Tabs.TabPane;
class OverviewTab extends React.Component {
    
    constructor(arg) {
        super(arg);
        
        this.state={
            data:[
                { "guid":"1","text":"项目概览","tap":"index"},
                { "guid":"2","text":"项目身份证","tap":"identity"},
                { "guid":"3","text":"供货","tap":"supply"},
                { "guid":"4","text":"签约","tap":"sign"},
                { "guid":"5","text":"回款","tap":"payment"},
                { "guid":"6","text":"计划","tap":"plan"},
                { "guid":"7","text":"重点事项","tap":"matter"},
                { "guid":"8","text":"关键指标","tap":"keyPoint"},
            ],
            ...this.state,
            ...this.props.data,
        
        };//通过props初始化tab菜单子组件的state
    }
    componentWillReceiveProps(nextProps){
        let currentPosi = nextProps.currentPosi;//获取左侧树当前级别
        let dataKey = nextProps.dataKey;//获取左侧树当前id
        this.setState({
            currentPosi:currentPosi,
        },()=>{
            this.renderRightTab();
        })
    }

    //左侧树变更切换右侧数据内容
    renderRightTab = () => {
        let currentPosi = this.state.currentPosi;//当前级别
        switch(currentPosi){
            case "group"://集团
                this.setState({
                    data:[
                        { "guid":"1","text":"项目概览","tap":"index"},
                        { "guid":"2","text":"项目身份证","tap":"identity"},
                        { "guid":"3","text":"供货","tap":"supply"},
                        { "guid":"4","text":"签约","tap":"sign"},
                        { "guid":"5","text":"回款","tap":"payment"},
                        { "guid":"6","text":"计划","tap":"plan"},
                        { "guid":"7","text":"重点事项","tap":"matter"},
                        { "guid":"8","text":"关键指标","tap":"keyPoint"},
                    ],
                })
            break;
            case "area"://区域
                this.setState({
                    data:[
                        { "guid":"1","text":"项目概览","tap":"index"},
                        { "guid":"2","text":"项目身份证","tap":"identity"},
                        { "guid":"3","text":"供货","tap":"supply"},
                        { "guid":"4","text":"签约","tap":"sign"},
                        { "guid":"5","text":"回款","tap":"payment"},
                        { "guid":"6","text":"计划","tap":"plan"},
                        { "guid":"7","text":"重点事项","tap":"matter"},
                        { "guid":"8","text":"关键指标","tap":"keyPoint"},
                        
                    ],
                })
            break;
            case "branchOffice"://分公司
                this.setState({
                    data:[
                        { "guid":"1","text":"项目概览","tap":"index"},
                        { "guid":"2","text":"项目身份证","tap":"identity"},
                        { "guid":"3","text":"供货","tap":"supply"},
                        { "guid":"4","text":"签约","tap":"sign"},
                        { "guid":"5","text":"回款","tap":"payment"},
                        { "guid":"6","text":"计划","tap":"plan"},
                        { "guid":"7","text":"重点事项","tap":"matter"},
                        { "guid":"8","text":"关键指标","tap":"keyPoint"},
                    ],
                })
            break;
            case "project"://项目
                this.setState({
                    data:[
                        { "guid":"1","text":"项目概览","tap":"index"},
                        { "guid":"2","text":"项目身份证","tap":"identity"},
                        { "guid":"3","text":"供货","tap":"supply"},
                        { "guid":"4","text":"签约","tap":"sign"},
                        { "guid":"5","text":"回款","tap":"payment"},
                        { "guid":"6","text":"计划","tap":"plan"},
                        { "guid":"7","text":"重点事项","tap":"matter"},
                        { "guid":"8","text":"关键指标","tap":"keyPoint"},
                    ],
                })
            break;
            case "intallment"://分期
                this.setState({
                    data:[
                        { "guid":"1","text":"项目概览","tap":"index"},
                        { "guid":"2","text":"分期身份证","tap":"identity"},
                        { "guid":"3","text":"供货","tap":"supply"},
                        { "guid":"4","text":"签约","tap":"sign"},
                        { "guid":"5","text":"回款","tap":"payment"},
                        { "guid":"6","text":"计划","tap":"plan"},
                        { "guid":"7","text":"重点事项","tap":"matter"},
                        { "guid":"8","text":"关键指标","tap":"keyPoint"},
                    ],
                })
            break;
        }
    }
   
    //切换tab菜单渲染内容
    renderSyncEele=arg=>{
         let currentPosi=this.state.currentPosi;
         switch(arg){
            case "index"://项目概览
                return <OverviewIndex />
            break;
            case "identity"://项目身份证
                if(currentPosi=="project"){
                    return <div>项目身份证</div>          
                }else if (currentPosi =="intallment"){
                    return <div>分期身份证</div>
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
                return <div>计划</div>
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

    }

    renderTabs = () =>{
        return(
            <Tabs onChange={this.callback} defaultActiveKey="0" type="card">
                {this.renderTabMenu1()}
            </Tabs>
        );
    }
    renderTabContent = (tap) =>{
        
        
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


