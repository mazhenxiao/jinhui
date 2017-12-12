import "babel-polyfill";  //兼容ie
import iss from "../js/iss.js";
import React, {Component} from 'react';
import {Spin, Tabs, Row, Col, Button, Select, Table, Modal} from 'antd';
import {WrapperSelect, WrapperTreeTable} from '../common';
import "../css/button.less";
import "./css/supply.less";


const TabPane = Tabs.TabPane;
const Option = Select.Option;

class Index extends Component {

    state = {
        loading: false,
    };

    renderDynamicAdjust = () => {
        return (
            <article>
                <Row className="top-header">
                    <Col span={12}>
                        <span className="title">动态调整版（面积：平方米，货值：万元）</span>
                    </Col>
                    <Col span={12} className="text-align-right">
                        <button className="jh_btn jh_btn22 jh_btn_edit" onClick={this.handleEdit}>编辑供货</button>
                    </Col>
                </Row>
                <WrapperTreeTable></WrapperTreeTable>
            </article>
        );
    };

    renderPlanVersion = () => {
        return (
            <article>
                <Row className="bottom-header">
                    <Col span={12}>
                        <span className="title">计划版（面积：平方米，货值：万元）</span>
                    </Col>
                    <Col span={12} className="text-align-right">
                        <WrapperSelect labelText="版本:" className="plan-version" dataSource={[]}></WrapperSelect>
                    </Col>
                </Row>
                <WrapperTreeTable></WrapperTreeTable>
            </article>
        );
    };

    render() {
        const {loading} = this.state;
        return (
            <div className="supply-wrapper">
                <Spin size="large" spinning={loading}>
                    <Tabs defaultActiveKey="history">
                        <TabPane tab="供货" key="history">
                            {this.renderDynamicAdjust()}
                            {this.renderPlanVersion()}
                        </TabPane>
                    </Tabs>
                </Spin>
            </div>
        );
    }
}

export default Index