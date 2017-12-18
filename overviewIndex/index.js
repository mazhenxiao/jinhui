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
            
            loading:false,
            activeKey:"0",
        }
        this.handleChildChangeTab = this.handleChildChangeTab.bind(this);
    }
    
    componentWillReceiveProps(nextProps){
        let local = nextProps.location;
        let currentPosi = local.query["currentPosi"];
        let dataKey = local.query["dataKey"];
        let parentid = iss.id.parentid;
        if(currentPosi==undefined){
            this.setState({
                loading:false,
                currentPosi:"group",
                dataKey:"1E1CB1E95A864AFA961392C3E3644642",
            });
        }else{
            this.setState({
                loading:false,
                currentPosi:currentPosi,
                dataKey:dataKey,
                location:nextProps.location,
            });
        }
        
        
    }
    componentDidMount() {
        let local = this.props.location;
        let currentPosi = local.query["currentPosi"];
        let dataKey = local.query["dataKey"];
        if(currentPosi=="project"){
            this.setState({
                loading:false,
                currentPosi:currentPosi,
                dataKey:dataKey,
                location:local,
            });
        }
        
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