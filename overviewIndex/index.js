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
            location:this.props.location,
            dataKey:this.props.location.query["dataKey"],//左侧树当前级id
            parentid:iss.id.parentid,//左侧树当前父id
            currentPosi:this.props.location.query["currentPosi"],//左侧树当前区域位置
            activeKey:"0",
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            location:nextProps.location,
            dataKey:nextProps.location.query["dataKey"],//左侧树当前级id
            parentid:iss.id.parentid,//左侧树当前父id
            currentPosi:nextProps.location.query["currentPosi"],//左侧树当前区域位置
        })
    }
    componentDidMount() {
        let local = this.props.location;
        let currentPosi = local.query["currentPosi"];
        let dataKey = local.query["dataKey"];
        if(currentPosi=="project" || currentPosi=="intallment"){
            this.setState({
                loading:false,
                currentPosi:currentPosi,
                dataKey:dataKey,
                location:local,
            });
        }
        
    }
    render() {
        return(<section>
            <Row>
                <Col span={24}>
                        <OverviewTab
                            dataKey={this.state.dataKey}
                            parentid={this.state.parentid}
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