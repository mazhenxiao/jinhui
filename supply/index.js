import "babel-polyfill";  //兼容ie
import iss from "../js/iss.js";
import React, {Component} from 'react';
import BuildingAdjust from './building-adjust';
import PercentAdjust from './percent-adjust';
import {Spin, Tabs, Row, Col, Button, Select, Table, Modal} from 'antd';
import {WrapperSelect, WrapperTreeTable} from '../common';
import {SupplyService} from "../services";
import "../css/button.less";
import "./css/supply.less";


const TabPane = Tabs.TabPane;

class Index extends Component {

    state = {
        loading: false,
        dataKey: this.props.location.query.dataKey || "", /*项目id或分期版本id*/
        mode: this.props.location.query.isProOrStage == "1" ? "Project" : "Stage",//显示模式，项目或者分期
        //供货分类: Building:楼栋供货, Land:项目比例供货, Stage:分期比例供货
        supplyType: "Land",//TODO 删除默认值
        //权限: Show:只允许查看, Add:新增, Edit:编辑, Upgrade:版本升级
        permission: "Edit",// TODO 删除默认值
        dynamicId: "",//动态调整版本Id
        versionId: [],//当前选中的计划版本
        versionData: [],//版本数据
        baseInfo: null,//基础数据, 包括 调整月份, 切换年份
        planData: {},//计划版数据
        adjustData: {},//动态调整板数据
        modalKey: "",//弹窗的key
    };

    componentDidMount() {
        //判断是否是审批, 真:审批状态; 假:普通状态
        // if (this.getApprovalStatus()) {
        //     this.changeVersionIdToDataKey();
        // } else {
        //     this.loadVersionData();
        // }
        this.loadBaseData();
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
            this.loadBaseData(nextDataKey, nextMode);
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
    loadBaseData = (dataKey, mode) => {
        if (dataKey === undefined) {
            dataKey = this.state.dataKey;
            mode = this.state.mode;
        }

        this.setState({
            loading: true,
        });

        return SupplyService.getBaseData(dataKey, mode)
            .then(({supplyType, permission, dynamicId, versionId, versionData, baseInfo}) => {
                this.setState({
                    supplyType,
                    permission,
                    dynamicId,
                    versionId,
                    versionData,
                    baseInfo,
                });

                return {
                    versionId,
                    dynamicId,
                };
            })
            .then(({versionId, dynamicId}) => {
                const allPromise = [
                    SupplyService.getPlanData(versionId),
                    SupplyService.getDynamicAdjustData(dynamicId),
                ];
                return Promise.all(allPromise);
            })
            .then(([planData, adjustData]) => {
                this.setState({
                    loading: false,
                    planData,
                    adjustData,
                });
            })
            .catch(error => {
                this.setState({
                    loading: false,
                });
                iss.error(error);
            })
    };

    handleVersionChange = (versionId) => {
        this.setState({
            loading: true,
            versionId,
        });
        SupplyService.getPlanData(versionId)
            .then(planData => {
                this.setState({
                    loading: false,
                    planData,
                });
            })
            .catch(error => {
                this.setState({
                    loading: false,
                });
                iss.error(error);
            })
    };

    // /**
    //  * 处理
    //  */
    // handleEditClick = (key) => () => {
    //     //supplyType 供货分类: Building:楼栋供货, Land:项目比例供货, Stage:分期比例供货
    //     const {supplyType} = this.state;
    //     if (supplyType === "Building") {
    //         this.setState({
    //             modalKey: "building-adjust",
    //         });
    //     } else {
    //         this.setState({
    //             modalKey: "percent-adjust",
    //         });
    //     }
    // };

    /**
     * 处理
     */
    handleEditClick = (key) => () => {
        //supplyType 供货分类: Building:楼栋供货, Land:项目比例供货, Stage:分期比例供货
        if (key === "Building") {
            this.setState({
                modalKey: "building-adjust",
            });
        } else {
            this.setState({
                modalKey: "percent-adjust",
            });
        }
    };

    handleHideModal = (param) => {
        this.setState({
            modalKey: "",
        });
        if (param == "reload") {

        }
    };

    renderDynamicAdjust = () => {
        return (
            <article>
                <Row className="top-header">
                    <Col span={12}>
                        <span className="title">动态调整版（面积：平方米，货值：万元）</span>
                    </Col>
                    <Col span={12} className="text-align-right">
                        <button className="jh_btn jh_btn22 jh_btn_edit" onClick={this.handleEditClick("Building")}>
                            编辑楼栋供货
                        </button>
                        <button className="jh_btn jh_btn22 jh_btn_edit" onClick={this.handleEditClick()}>编辑比例供货</button>
                    </Col>
                </Row>
                <WrapperTreeTable></WrapperTreeTable>
            </article>
        );
    };

    renderPlanVersion = () => {
        const {versionId, versionData} = this.state;
        return (
            <article>
                <Row className="bottom-header">
                    <Col span={12}>
                        <span className="title">计划版（面积：平方米，货值：万元）</span>
                    </Col>
                    <Col span={12} className="text-align-right">
                        <WrapperSelect labelText="版本:" className="plan-version"
                                       showDefault={false}
                                       value={versionId}
                                       dataSource={versionData}
                                       onChange={this.handleVersionChange}
                        ></WrapperSelect>
                    </Col>
                </Row>
                <WrapperTreeTable></WrapperTreeTable>
            </article>
        );
    };

    /**
     *  显示调整窗口
     */
    renderAdjustModal = () => {
        const {modalKey, baseInfo} = this.state;
        switch (modalKey) {
            case "building-adjust":
                return <BuildingAdjust onHideModal={this.handleHideModal} baseInfo={baseInfo}/>;
            case "percent-adjust":
                return <PercentAdjust onHideModal={this.handleHideModal} baseInfo={baseInfo}/>;
            default:
                return null;
        }
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
                    {this.renderAdjustModal()}
                </Spin>
            </div>
        );
    }
}

export default Index