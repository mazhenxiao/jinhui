// import React from 'react';
// import ReactDOM from 'react-dom';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
import React, { Component } from 'react';
import { Spin, Tabs, Row, Col, Button, Select,Input} from 'antd';

import OverviewIndex from "./overview-index";//首页
import OverviewPriority from './overview-priority';//重点事项
import OverviewPrimaryKey from './overview-primaryKey';//关键指标
import OverviewPayment from './overview-payment';//回款
import OverviewSign from './overview-sign.js';//签约
import OverviewSupply from './overview-supply';//供货
import OverviewProject from './overview-project'//项目
import OverviewIntallment from './overview-intallment'//分期
import { setTimeout } from "timers";
const TabPane = Tabs.TabPane;
class OverviewTab extends React.Component {
    
    constructor(arg) {
        super(arg);
        
        this.state={
            dataTabHeader:[
                { "guid":"1","text":"项目概览","tap":"index"},
                //{ "guid":"2","text":"项目身份证","tap":"identity"},
                { "guid":"2","text":"供货","tap":"supply"},
                { "guid":"3","text":"签约","tap":"sign"},
                { "guid":"4","text":"回款","tap":"payment"},
                { "guid":"5","text":"计划","tap":"plan"},
                { "guid":"6","text":"重点事项","tap":"matter"},
                { "guid":"7","text":"关键指标","tap":"keyPoint"},
            ],
            planUrl:"http://plantest.radiance.com.cn:7001/wpmplan/planindex.html?orgid=",
        
        };//通过props初始化tab菜单子组件的state
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            currentPosi:nextProps.currentPosi,//获取左侧树当前级别,
            activeKey:"0",
            dataKey:nextProps.dataKey,//获取左侧树当前id
            parentid:nextProps.parentid,
            location:nextProps.location,
        },()=>{
            this.renderLeftTab();
            this.renderTabs();
            
        })
    }

    componentDidMount(){
        this.renderLeftTab();
        this.renderTabs();
    }
   //
    //左侧树变更切换右侧数据内容
    renderLeftTab = () => {
        let currentPosi = this.state.currentPosi;//当前级别
        if(currentPosi == undefined){
            currentPosi = "group";
        }
        switch(currentPosi){
            case "group"://集团
                this.setState({
                    dataTabHeader:[
                        { "guid":"1","text":"项目概览","tap":"index"},
                        // { "guid":"2","text":"项目身份证","tap":"identity"},
                        { "guid":"2","text":"供货","tap":"supply"},
                        { "guid":"3","text":"签约","tap":"sign"},
                        { "guid":"4","text":"回款","tap":"payment"},
                        { "guid":"5","text":"主项计划","tap":"plan"},
                        { "guid":"6","text":"重点事项","tap":"matter"},
                        { "guid":"7","text":"关键指标","tap":"keyPoint"},
                    ],
                })
            break;
            case "area"://区域
                this.setState({
                    dataTabHeader:[
                        { "guid":"1","text":"项目概览","tap":"index"},
                        // { "guid":"2","text":"项目身份证","tap":"identity"},
                        { "guid":"2","text":"供货","tap":"supply"},
                        { "guid":"3","text":"签约","tap":"sign"},
                        { "guid":"4","text":"回款","tap":"payment"},
                        { "guid":"5","text":"主项计划","tap":"plan"},
                        { "guid":"6","text":"重点事项","tap":"matter"},
                        { "guid":"7","text":"关键指标","tap":"keyPoint"},
                    ],
                })
            break;
            case "branchOffice"://分公司
                this.setState({
                    dataTabHeader:[
                        { "guid":"1","text":"项目概览","tap":"index"},
                        // { "guid":"2","text":"项目身份证","tap":"identity"},
                        { "guid":"2","text":"供货","tap":"supply"},
                        { "guid":"3","text":"签约","tap":"sign"},
                        { "guid":"4","text":"回款","tap":"payment"},
                        { "guid":"5","text":"主项计划","tap":"plan"},
                        { "guid":"6","text":"重点事项","tap":"matter"},
                        { "guid":"7","text":"关键指标","tap":"keyPoint"},
                    ],
                })
            break;
            case "project"://项目
                this.setState({
                    dataTabHeader:[
                        { "guid":"1","text":"项目概览","tap":"index"},
                        { "guid":"2","text":"项目身份证","tap":"identityProject"},
                        { "guid":"3","text":"供货","tap":"supply"},
                        { "guid":"4","text":"签约","tap":"sign"},
                        { "guid":"5","text":"回款","tap":"payment"},
                        { "guid":"6","text":"主项计划","tap":"plan"},
                        { "guid":"7","text":"重点事项","tap":"matter"},
                        { "guid":"8","text":"关键指标","tap":"keyPoint"},
                    ],
                })
            break;
            case "intallment"://分期
                this.setState({
                    dataTabHeader:[
                        { "guid":"1","text":"项目概览","tap":"index"},
                        { "guid":"2","text":"分期身份证","tap":"identityIntallment"},
                        { "guid":"3","text":"供货","tap":"supply"},
                        { "guid":"4","text":"签约","tap":"sign"},
                        { "guid":"5","text":"回款","tap":"payment"},
                        { "guid":"6","text":"主项计划","tap":"plan"},
                        { "guid":"7","text":"重点事项","tap":"matter"},
                        { "guid":"8","text":"关键指标","tap":"keyPoint"},
                    ],
                })
            break;
        }
    }
    iframeLoad = () =>{
        const {dataKey}  = this.state;
        let iframeUrl=this.state.planUrl+dataKey;
        if(dataKey == undefined ){
            return <iframe ref="outheIframe" src={"http://plantest.radiance.com.cn:7001/wpmplan/planindex.html?orgid=1E1CB1E95A864AFA961392C3E3644642"} scrolling="no" width="100%" height="700" style={{border: 0}}></iframe>
        }else{
            let att = <iframe ref="outheIframe" scrolling="no" width="100%" height="700" src={iframeUrl} style={{border: 0,width:"100%",height:"700px"}}></iframe>;
            return att;
        } 
        
    }
   
   
    //切换tab菜单渲染内容
    renderSyncEele = (arg) =>{
         const {currentPosi, dataKey,location,parentid} = this.props;
         switch(arg){
            case "index"://项目概览
                //return <OverviewIndex />
                return <div  style={{fontSize:"16px"}}>项目概览建设中。。。</div>
            break;
            case "identityProject"://项目身份证
                 if(currentPosi=="project"){
                    return <OverviewProject 
                        location={location}
                        dataKey={dataKey}  
                    />  
                 }
            break;
            
            case "identityIntallment"://分期身份证
                if(currentPosi=="intallment"){
                    return <div>
                            <OverviewIntallment dataKey={dataKey} parentid={this.state.parentid} />
                    </div>
                    
                }
                    
            break;
            case "supply"://供货
                //return <OverviewSupply location={location} />
                return <div style={{fontSize:"16px"}}>供货建设中。。。</div>
            break;
            case "sign"://签约
                //return <OverviewSign location={location} />
                return <div style={{fontSize:"16px"}}>签约建设中。。。</div>
            break;  
            case "payment"://回款
                //return <OverviewPayment />
                return <div style={{fontSize:"16px"}}>回款建设中。。。</div>
            break;
            case "plan"://计划
                // return <div className="iframeLoad"> 
                //         {this.iframeLoad()}
                //     </div>
                 return <div style={{fontSize:"16px"}}>主项计划建设中。。。</div>
            break;
            case "matter"://重点事项
                // return <OverviewPriority />
                return <div style={{fontSize:"16px"}}>重点事项建设中。。。</div>
            break; 
            case "keyPoint"://关键指标
                return <div style={{fontSize:"16px"}}>关键指标建设中。。。</div>
                //return <OverviewPrimaryKey />
            break;
        } 

    }
    renderTabMenu1 = () =>{
            const {dataTabHeader} = this.state;
             return  dataTabHeader.map((da,ind)=>{
                return <TabPane tab={da.text} key={ind}>{this.renderSyncEele(da.tap)}</TabPane>
             });
    }
    
    callback = (key) => {
        const {dataKey}  = this.state;
        let iframeUrl=this.state.planUrl+dataKey;
        this.setState({
            activeKey:key,
        });

        //切换概览计划刷新加载
      
        if(this.state.dataTabHeader.some( obj => obj.tap == "plan")){
            let outheIframe = this.refs.outheIframe;
            if(outheIframe != undefined){
                outheIframe.src = iframeUrl;
            }
        }
        
    }

    renderTabs = () =>{
        return(
            <Tabs onChange={this.callback} onTabClick={this.tabClick} defaultActiveKey="0" activeKey={this.state.activeKey} type="card">
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


