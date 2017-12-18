import "babel-polyfill";  //兼容ie
import iss from "../js/iss.js";
import React, {Component} from 'react';
import {Spin, Tabs, Row, Col, Button, Select} from 'antd';
import {WrapperTreeTable, WrapperSelect} from '../common';
import {AreaService} from '../services';

import "../css/antd.min.css";
import "../css/payment.css";
import "../css/tools-processBar.less";
import "../css/button.less";
import "../area/areaCss/areaManage.less";
import "./css/sign.less";

const TabPane = Tabs.TabPane;

class PaymentIndex extends Component {

    state = {
        loading: false,
        dataKey: this.props.location.query.dataKey || "", /*项目id或分期版本id*/
        mode: this.props.location.query.isProOrStage == "1" ? "Project" : "Stage",//显示模式，项目或者分期
        versionId: "",
        versionData: [],
        editable: false,//是否可编辑
    };

    componentDidMount() {

    }

    /**
     * 在组件接收到一个新的prop时被调用,这个方法在初始化render时不会被调用
     * param nextProps 下一阶段的props
     */
    componentWillReceiveProps(nextProps) {
        const {dataKey} = this.state;
        const {location} = nextProps;
        const nextDataKey = location.query.dataKey || "";
        let nextMode = location.query.isProOrStage || "";
        nextMode = nextMode == "1" ? "Project" : "Stage";

        //切换路由之后，重新获取数据

        if (dataKey != nextDataKey) {
            this.setState({
                    dataKey: nextDataKey,
                    mode: nextMode,
                    activeTapKey: "plan-quota",
                }
            );
        }
    }

    getApprovalState = () => {
        if (this.props.location.query["current"] == "ProcessApproval") {
            return true;
        }
        return false;
    };

    handleEdit = () => {
        this.setState({
            editable: !this.state.editable,
        });
    };

    renderHistoryData = () => {
        const {versionData, versionId} = this.state;
        return (
            <article>
                <header className="top-header-bar">
                    <Row>
                        <Col span={12}>
                            <span className="header-title">回款计划版（面积：平方米，货值：万元）</span>
                        </Col>
                        <Col span={12} className="action-section">
                            <WrapperSelect className="select-version" labelText="版本:"
                                           showDefault={false}
                                           dataSource={versionData}></WrapperSelect>
                        </Col>
                    </Row>
                </header>
                <WrapperTreeTable/>
            </article>
        );
    };

    renderCurrentData = () => {
        const {editable} = this.state;
        return (
            <article>
                <header className="bottom-header-bar">
                    <Row>
                        <Col span={12}>
                            <span className="header-title">动态调整版（面积：平方米，货值：万元）</span>
                        </Col>
                        <Col span={12}>
                            <div className="RT">
                                <button className="jh_btn jh_btn22 jh_btn_edit"
                                        onClick={this.handleEdit}>{editable ? "保存" : "编辑"}
                                </button>
                            </div>
                        </Col>
                    </Row>
                </header>
                <WrapperTreeTable
                    rowKey="key"
                    editState={editable}
                />
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
        const {dataKey} = this.state;
        if (!dataKey) {
            return this.renderEmpty();
        }

        return (
            <div className="sign-wrapper">
                <Spin size="large" spinning={this.state.loading}>
                    <article>
                        <Tabs defaultActiveKey="sign">
                            <TabPane tab="回款" key="sign">
                                {this.renderHistoryData()}
                                {this.renderCurrentData()}
                            </TabPane>
                        </Tabs>
                    </article>
                </Spin>
            </div>
        );
    }
}

export default PaymentIndex;