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
        loading: true,
        dataKey: this.props.location.query.dataKey || "", /*项目id或分期版本id*/
        mode: this.props.location.query.isProOrStage == "1" ? "Project" : "Stage",//显示模式，项目或者分期
        //供货分类: Building:楼栋供货, Land:项目比例供货, Stage:分期比例供货
        supplyType: "",//TODO 删除默认值
        permission: "Show",//权限: Show:只允许查看, Add:新增, Edit:编辑, Upgrade:版本升级
        dynamicId: "",//动态调整版本Id
        versionId: "",//当前选中的计划版本
        versionData: [],//版本数据
        baseInfo: {},//基础数据, 包括 调整月份, 切换年份
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
        if (nextDataKey != dataKey && !!nextDataKey) {
            this.setState({
                    loading: true,
                    dataKey: nextDataKey,
                    mode: nextMode,
                    planData: {},
                    adjustData: {},
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

        if (!dataKey) {
            return;
        }

        //变量, 延迟setState
        let nextState = {};

        return SupplyService.getBaseData(dataKey, mode)
            .then(({supplyType, permission, dynamicId, versionId, versionData, baseInfo}) => {
                console.log("supplyType=" + supplyType, "(供货分类: Building:楼栋供货, Land:项目比例供货, Stage:分期比例供货)");

                nextState = {
                    supplyType,
                    permission,
                    dynamicId,
                    versionId,
                    versionData,
                    baseInfo,
                };

                return {
                    versionId,
                    dynamicId,
                };
            })
            .then(({versionId, dynamicId}) => {
                const allPromise = [
                    SupplyService.getDynamicAdjustData(dynamicId),
                    // SupplyService.getPlanData(versionId),
                    SupplyService.getPlanData(dynamicId),//TODO 测试 临时处理
                ];
                return Promise.all(allPromise);
            })
            .then(([adjustData, planData]) => {
                this.setState({
                    loading: false,
                    ...nextState,
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
    }
    ;

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

    handleSubmitClick = () => {
        const {dataKey, mode} = this.state;
        SupplyService.submitSupplyData(dataKey, mode)
            .then(() => {
                iss.info("提交成功!");
                this.loadBaseData(dataKey, mode);
            })
            .catch(error => {
                this.setState({
                    loading: false,
                });
                iss.error(error);
            });
    };

    /**
     * 处理编辑
     */
    handleEditClick = () => {
        //supplyType 供货分类: Building:楼栋供货, Land:项目比例供货, Stage:分期比例供货
        const {supplyType, dynamicId} = this.state;
        if (!dynamicId) {
            iss.error("未获取到动态调整版数据!");
            return;
        }
        if (supplyType === "Building") {
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
            this.loadBaseData();
        }
    };

    renderDynamicAdjust = () => {
        const {adjustData, dataKey, permission} = this.state;

        return (
            <article>
                <Row className="top-header">
                    <Col span={12}>
                        <span className="title">供货计划动态调整版（面积：平方米，货值：万元）</span>
                    </Col>
                    <Col span={12} className="text-align-right">
                        {
                            permission != "Show" ?
                                <div>
                                    <button className="jh_btn jh_btn22 jh_btn_edit" onClick={this.handleEditClick}>
                                        编辑供货
                                    </button>
                                    <button className="jh_btn jh_btn22 jh_btn_save" onClick={this.handleSubmitClick}>
                                        提交
                                    </button>
                                </div>
                                : null
                        }
                    </Col>
                </Row>
                <WrapperTreeTable key={dataKey + "-dynamic"} rowKey="ID" dataSource={adjustData.dataSource}
                                  fixedAble={true} firstColumnWidth={240}
                                  headerData={adjustData.headerData}></WrapperTreeTable>
            </article>
        )
    };

    renderPlanVersion = () => {
        const {versionId, versionData, planData, dataKey} = this.state;
        return (
            <article>
                <Row className="bottom-header">
                    <Col span={12}>
                        <span className="title">供货计划考核版（面积：平方米，货值：万元）</span>
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
                <WrapperTreeTable key={dataKey + "-plan"} rowKey="ID" dataSource={planData.dataSource}
                                  fixedAble={true} firstColumnWidth={240}
                                  headerData={planData.headerData}></WrapperTreeTable>
            </article>
        );
    };

    /**
     *  显示调整窗口
     */
    renderAdjustModal = () => {
        const {modalKey, baseInfo, dataKey, mode} = this.state;
        switch (modalKey) {
            case "building-adjust":
                return <BuildingAdjust dataKey={dataKey} mode={mode} baseInfo={baseInfo}
                                       onHideModal={this.handleHideModal}/>;
            case "percent-adjust":
                return <PercentAdjust dataKey={dataKey} mode={mode} baseInfo={baseInfo}
                                      onHideModal={this.handleHideModal}/>;
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
        const {loading, dataKey, dynamicId} = this.state;
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