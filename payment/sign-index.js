import "babel-polyfill";  //兼容ie
import iss from "../js/iss.js";
import React, {Component} from 'react';
import {Spin, Tabs, Row, Col, Button, Select} from 'antd';
import {WrapperTreeTable, WrapperSelect} from '../common';
import {AreaService} from '../services';
import  {knife} from '../utils';

import "../css/antd.min.css";
import "../css/payment.css";
import "../css/tools-processBar.less";
import "../css/button.less";
import "../area/areaCss/areaManage.less";
import "./sign.less";

const TabPane = Tabs.TabPane;

class SignIndex extends Component {

    state = {
        loading: false,
        dataKey: this.props.location.query.dataKey || "", /*项目id或分期版本id*/
        mode: this.props.location.query.isProOrStage == "1" ? "Project" : "Stage",//显示模式，项目或者分期
        versionId: "",
        versionData: [],
        editable: false,//是否可编辑
    };
    antdTableScrollLock=null;//用来触发卸载原生事件
    componentDidMount() {
      
          
        this.bindScrollLock();
       
    }
    componentWillUnmount(){
        this.antdTableScrollLock.remove();//注销双向绑定
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
        
        this.bindScrollLock();
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
    /**
     * 绑定双向滚动
     */
    bindScrollLock(){
        let toTable = document.querySelector(".toTable .ant-table-body"),
            pkTable = document.querySelector(".pkTable .ant-table-body");
            toTable&&pkTable&&(this.antdTableScrollLock=knife.AntdTable_ScrollLock(toTable,pkTable));
    }
    renderHistoryData = () => {
        const {versionData, versionId} = this.state;
        return (
            <article className="toTable">
                <header className="top-header-bar">
                    <Row>
                        <Col span={12}>
                            <span className="header-title">签约计划版（面积：平方米，货值：万元）</span>
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
            <article className="pkTable">
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
                            <TabPane tab="签约" key="sign">
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

export default SignIndex;