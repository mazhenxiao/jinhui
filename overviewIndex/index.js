/* 项目概览 */
import "babel-polyfill";  //兼容ie
import iss from "../js/iss.js";
import React, { Component } from 'react';
import { Spin, Tabs, Row, Col, Button, Select,Input} from 'antd';
import OverviewTab from "./overview-tab.js";//标签

class index extends React.Component {
    constructor(arg) {
        super(arg);
        this.state = {
            activeKey:"0",
        }
        this.handleChildChangeTab = this.handleChildChangeTab.bind(this);
    }
    
    componentWillReceiveProps(nextProps){
        let local = nextProps.location;
        let currentPosi = local.query["currentPosi"];
        let dataKey = local.query["dataKey"];
        this.setState({
            currentPosi:currentPosi,
            dataKey:dataKey,
            location:nextProps.location,
        });
        
    }
    componentDidMount() {
       
     }
    
     
    //渲染概览
    
    handleChildChangeTab = (newTabContentKey) => { //处理子函数传回来的state,改变自身的state
        if(newTabContentKey){
            this.setState(newTabContentKey);
        }
       
    }
    
    render() {
        return(<section>
            <Row>
                <Col span={24}>
                        <OverviewTab 
                            onChangeTab={this.handleChildChangeTab}
                            data = {this.state}
                            currentPosi={this.state.currentPosi}
                            location={this.state.location}
                        />
                </Col>
            </Row>
        </section>

        );
    }




}
export default index;