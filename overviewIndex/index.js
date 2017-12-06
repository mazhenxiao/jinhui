/* 项目概览 */
import "babel-polyfill";  //兼容ie
import iss from "../js/iss.js";
import React, { Component } from 'react';
import { Spin, Tabs, Row, Col, Button, Select,Input} from 'antd';
import OverviewTab from "./overview-tab.js";//标签
import OverviewIndex from "./overview-index.js";//首页
import OverviewPriority from './overview-priority.js';//重点事项
import OverviewPrimaryKey from './overview-primaryKey.js';//关键指标
import OverviewPayment from './overview-payment.js';//回款
import OverviewSign from './overview-sign.js';//签约
import OverviewSupply from './overview-supply.js';//供货
class index extends React.Component {
    constructor(arg) {
        super(arg);
        this.state = {
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
            tabContentKey:"index",
            currentPosi:"group",
        }
    }
    
    componentWillReceiveProps(nextProps){
        let local = nextProps.location;
        let currentPosi = local.query["currentPosi"];
        this.setState({
            currentPosi:currentPosi,
            tabContentKey:"index",
        },()=>{
            this.renderRightContent();
           
        });
        
    }
    componentDidMount() {
       
     }
    
     //左侧树变更切换右侧数据内容
    renderRightContent = () => {
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
    //渲染tab菜单
    renderTabMenu = () =>{
        let currentPosi = this.state.currentPosi;
        return  this.state.data.map((da,ind)=>{
            if(ind == 0){
                return <li key={ind} className="J-List active" onClick={this.Event_click.bind(this,da.tap)}>{da.text}</li>
            }else{
                return <li key={ind} className="J-List" onClick={this.Event_click.bind(this,da.tap)}>{da.text}</li>
            }
            
        });
    }
    
    //点击tab菜单
    Event_click = (data,ev) =>{
        let el = $(ev.target);
        el.parent().find("li").removeClass("active");
        setTimeout(()=>{el.addClass("active")});
        switch(data){
            case "index"://项目概览
                this.setState({
                    tabContentKey:"index"
                });
            break;
            case "identity"://项目身份证
                this.setState({
                    tabContentKey:"identity"
                })
            break;
            case "supply"://供货
                this.setState({
                    tabContentKey:"supply"
                })
            break;
            case "sign"://签约
                this.setState({
                    tabContentKey:"sign"
                })
            break;  
            case "payment"://回款
                this.setState({
                    tabContentKey:"payment"
                })
            break;
            case "plan"://计划
                this.setState({
                    tabContentKey:"plan"
                })
            break;
            case "matter"://重点事项
                this.setState({
                    tabContentKey:"matter"
                })
            break; 
            case "keyPoint"://关键指标
                this.setState({
                    tabContentKey:"keyPoint"
                })
            break;    
            
        } 
    }
    
    //渲染概览
    renderTabContent = () =>{
        let tabContentKey = this.state.tabContentKey;
        switch(tabContentKey){
            case "index"://项目概览
                return <OverviewIndex />
            break;
            case "identity"://项目身份证
                return <div>项目身份证</div>
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
    
    render() {
        return(<section>
            <header className="JH-HeadTab" style={{marginBottom:"20px"}}>
            <Row>
                <Col span={24}>
                    <ul className="JH-HeadList"> 
                        {this.renderTabMenu()}
                    </ul>

                </Col>
            </Row>
            </header>
            <Row>
                <Col span={24}>
                    {this.renderTabContent()}
                </Col>
            </Row>
        </section>

        );
    }




}
export default index;