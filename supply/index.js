import "babel-polyfill";  //兼容ie
import iss from "../js/iss.js";
import React, {Component} from 'react';
import BuildingAdjust from './building-adjust';
import PercentAdjust from './percent-adjust';
import {Spin, Tabs, Row, Col, Button, Select, Table, Modal} from 'antd';
import {WrapperSelect, WrapperTreeTable} from '../common';
import {AreaService, SupplyService} from "../services";
import {knife} from '../utils';
import ProcessApprovalTab from "../components/component-ProcessApproval-Tab.js"; //导航信息
import "../css/button.less";
import "./css/supply.less";


const TabPane = Tabs.TabPane;

class Index extends Component {

    state = {
        loading: true,
        dataKey: this.props.location.query.dataKey || "", /*项目id或分期版本id*/
        mode: this.props.location.query.isProOrStage == "1" ? "Project" : "Stage",//显示模式，项目或者分期
        supplyType: "",//供货分类: Building:楼栋供货, Land:项目比例供货, Stage:分期比例供货
        permission: "Show",//权限: Show:只允许查看, Add:新增, Edit:编辑, Upgrade:版本升级
        dynamicId: "",//动态调整版本Id
        adjustDateShow: "", //供货计划的日期
        versionId: "",//当前选中的计划版本
        versionData: [],//版本数据
        baseInfo: {},//基础数据, 包括 调整月份, 切换年份
        planData: {},//计划版数据
        adjustData: {},//动态调整板数据
        modalKey: "",//弹窗的key
        isApproal: false, //是否是审批
    };

    antdTableScrollLock = null;

    componentDidMount() {
        // 判断是否是审批, 真:审批状态; 假:普通状态
        if (this.getApprovalStatus()) {
            this.changeVersionIdToDataKey();
        } else {
            this.loadBaseData();
        }
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

    componentWillUnmount() {
        if (this.antdTableScrollLock) {
            this.antdTableScrollLock.remove();//注销双向绑定
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
     * 转换数据: 回款版本id → 项目Id/分期Id
     */
    changeVersionIdToDataKey = () => {
        const versionId = this.props.location.query.dataKey;
        SupplyService.getBaseInfoByVersionId(versionId)
            .then(baseInfo => {
                const dataKey = baseInfo["datakey"];
                const mode = baseInfo["datalevel"];
                const dynamicId = baseInfo["SupplyId"];
                this.setState({
                    dataKey,
                    mode,
                    dynamicId,
                });

                this.loadBaseData(dataKey, mode, dynamicId);
            })
            .catch(error => {
                iss.error(error);
            });
    };

    /**
     * 加载版本数据
     * @param dataKey
     * @param mode
     */
    loadBaseData = (dataKey, mode, dynamicId) => {
        if (dataKey === undefined) {
            dataKey = this.state.dataKey;
            mode = this.state.mode;
        }

        if (!dataKey) {
            return;
        }

        //变量, 延迟setState
        let nextState = {};

        return SupplyService.getBaseData(dataKey, mode, dynamicId)
            .then(({supplyType, permission, dynamicId, versionId, versionData, baseInfo, error, adjustDateShow}) => {
                console.log("supplyType=" + supplyType, "(供货分类: Building:楼栋供货, Land:项目比例供货, Stage:分期比例供货)");
                if (error) {
                    iss.error(error);
                }
                nextState = {
                    supplyType,
                    permission,
                    dynamicId,
                    versionId,
                    versionData,
                    baseInfo,
                    adjustDateShow,
                };

                return {
                    versionId,
                    dynamicId,
                };
            })
            .then(({dynamicId, versionId}) => {
                const allPromise = [
                    SupplyService.getDynamicAdjustData(dynamicId),
                    SupplyService.getPlanData(versionId),
                ];
                return Promise.all(allPromise);
            })
            .then(([adjustData, planData]) => {
                this.setState({
                    loading: false,
                    ...nextState,
                    adjustData,
                    planData,
                }, () => {
                    this.bindScrollLock();
                });
            })
            .catch(error => {
                this.setState({
                    loading: false,
                    permission: "Show",
                    versionId: "",
                    dynamicId: "",
                    versionData: [],
                    baseInfo: {},
                    planData: {},
                    adjustData: {},
                });
                iss.error(error);
            })
    };

    /**
     * 绑定双向滚动
     */
    bindScrollLock = () => {

        let toTable = document.querySelector(".toTable .ant-table-body"),
            pkTable = document.querySelector(".pkTable .ant-table-body");
        if (toTable && pkTable) {
            toTable.scrollTop = toTable.scrollLeft = 0;
            pkTable.scrollTop = pkTable.scrollLeft = 0;
            this.antdTableScrollLock = knife.AntdTable_ScrollLock(toTable, pkTable);
        }
    }

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
        const {adjustData, dataKey, permission, adjustDateShow} = this.state;
        //非审批状态下 并且 permission不等于Show时，才可以编辑
        let buttonPermission = !this.getApprovalStatus() && permission.toLowerCase() != "show";

        if (Array.isArray(adjustData.dataSource) && adjustData.dataSource.length === 0) {
            buttonPermission = false;
        }

        return (
            <article className="toTable">
                <Row className="top-header">
                    <Col span={12}>
                        <span className="title">供货计划 {adjustDateShow} 动态调整版（面积：平方米，货值：万元）</span>
                    </Col>
                    <Col span={12} className="text-align-right">
                        {
                            buttonPermission ?
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
            <article className="pkTable">
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
                <h3>供货计划操作指引</h3>
                <p>1、前置条件：该项目或分期的价格管理已审批通过。</p>
                <p>2、编排供货计划可分为两种情况：按比例供货和勾楼供货。</p>
                <div className="Prompt">
                    <p>2.1、按比例供货：</p>
                    <p>a、拿地后，未在系统中创建分期，可按项目排供货，点击编辑供货，按项目各业态比例排供货计划。</p>
                    <p>b、在系统中已创建分期，但未在面积管理中创建楼栋，点击编辑供货，按分期各业态比例排供货计划。</p>
                    <p className="Prompt"> 【按比例供货如下图，红色部分为可操作内容，蓝色部分为查看内容。</p>
                    <p className="Prompt"> 可点击“添加” 按钮将一个业态按比例拆分成多个批次，再设定供货日期，保存时要求必须将每种业态的供货100%全部排完，否则无法保存。】</p>
                    <img width="90%" src="../img/supply_guide.png"/>
                    <p>2.2 勾楼供货：已创建分期，已在面积管理中创建楼栋，且已在分期中将楼栋划分至组团，点击编辑供货，按楼栋排供货计划。</p>
                    <p className="Prompt">【勾楼供货如下图，红色部分为可操作内容，蓝色部分为查看内容。</p>
                    <p className="Prompt">可按组团、业态、楼栋进行筛选，并批量设置供货日期；也可按楼栋逐一设置供货日期。</p>
                    <p className="Prompt">点击年份标签可查看月度计划供货的楼栋。】</p>
                    <img width="90%" src="../img/supply_guide2.png"/>
                </div>
                <p>3、排完供货计划，点击【提交】按钮，即可排签约计划。</p>

            </div>
        );
    };

    renderApproval = () => {
        let searchArg = this.props.location.query;
        if (this.getApprovalStatus()) {
            return <section className="padB20">
                <ProcessApprovalTab current="supply" allSearchArg={searchArg}/>
            </section>
        }
    };

    render() {
        const {dataKey, current} = this.props.location.query;
        const {loading} = this.state
        if (!dataKey && !current) {
            return this.renderEmpty();
        }
        return (
            <div className="supply-wrapper">
                {this.renderApproval()}
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