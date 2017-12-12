import "babel-polyfill";  //兼容ie
import iss from "../js/iss.js";
import React, {Component} from 'react';
import {Spin, Tabs, Row, Col, Button, Select, Table, Modal} from 'antd';
import {WrapperSelect, WrapperTreeTable} from '../common';
import {SupplyService} from "../services";
import "../css/button.less";
import "./css/supply.less";


const TabPane = Tabs.TabPane;
const Option = Select.Option;

class Index extends Component {

    state = {
        loading: false,
        dataKey: this.props.location.query.dataKey || "", /*项目id或分期版本id*/
        mode: this.props.location.query.isProOrStage == "1" ? "Project" : "Stage",//显示模式，项目或者分期
        versionData: [],//版本数据
    };

    componentDidMount() {
        //判断是否是审批, 真:审批状态; 假:普通状态
        if (this.getApprovalStatus()) {
            //this.changeVersionIdToDataKey();
        } else {
            this.loadVersionData();
        }
    }

    componentWillReceiveProps(nextProps) {
        const {dataKey} = this.state;
        const {location} = nextProps;
        const nextDataKey = location.query.dataKey || "";
        const nextMode = location.query.isProOrStage == "1" ? "Project" : "Stage";

        //切换路由之后，重新获取数据
        if (dataKey != nextDataKey) {
            this.setState({
                    dataKey: nextDataKey,
                    mode: nextMode
                }
            );
            this.loadVersionData(nextDataKey, nextMode);
        }
    }

    /**
     * 获取是否是审批状态
     * @returns {boolean} 真:审批状态; 假:普通状态
     */
    getApprovalStatus = () => {
        if (this.props.location.query["current"]) {
            return true;
        }
        return false;
    };

    /**
     * 加载版本数据
     * @param dataKey
     * @param mode
     */
    loadVersionData = (dataKey, mode) => {
        if (dataKey === undefined) {
            dataKey = this.state.dataKey;
            mode = this.state.mode;
        }

        return SupplyService.getVersionData(dataKey, mode)
            .then(versionData => {
                this.setState({
                    versionData
                });
            })
            .catch(error => {
                iss.error(error);
            })
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
        const {versionData} = this.state;
        return (
            <article>
                <Row className="bottom-header">
                    <Col span={12}>
                        <span className="title">计划版（面积：平方米，货值：万元）</span>
                    </Col>
                    <Col span={12} className="text-align-right">
                        <WrapperSelect labelText="版本:" className="plan-version"
                                       dataSource={versionData}></WrapperSelect>
                    </Col>
                </Row>
                <WrapperTreeTable></WrapperTreeTable>
            </article>
        );
    };

    /**
     *  渲染空页面
     */
    renderEmpty = () => {
        return (
            <div className="processBar">
                请点击左侧树，项目/分期
            </div>
        );
    };

    render() {
        const {loading, dataKey} = this.state;
        if (!dataKey) {
            return this.renderEmpty();
        }

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