/**
 *  面积管理 index
 */
import "babel-polyfill";  //兼容ie
import React, {Component} from 'react';
import {Spin, Tabs, Row, Col, Button, Select} from 'antd';
import {AreaConstants} from '../constants';
import ComBlock from './com-block'; //规划方案指标
import ComBuilding from './com-building';
import ComBuildingAdjust from './com-building-adjust';
import ComFormat from './com-format';
import PlanQuota from './plan-quota';
import BlockFormatEdit from './block-format-edit';
import BlockFormatAdjust from './block-format-adjust';
import BuildingFormatEdit from './building-format-edit';
import SaveVersion from "./com-save-version";  //保存按钮
import {AreaService} from '../services';
import iss from '../js/iss';
import {knife} from '../utils';
import ProcessApprovalTab from "../components/component-ProcessApproval-Tab.js"; //导航信息

import "../css/tools-processBar.less";
import "../css/button.less";
import "../area/areaCss/areaManage.less";

const TabPane = Tabs.TabPane;
const {Legend} = AreaConstants;

const {Option} = Select;

class Index extends Component {
    /**
     * 建议显示值
     */
    state = {  //绑定数据
        loading: false,
        stepData: [],
        versionId: "",//当前版本id
        defaultStepId: "",//默认显示的阶段,(只用在创建新版本时 和 审批状态时)
        step: {}, /*当前阶段*/
        dataKey: this.props.location.query.dataKey || "", /*项目id或分期版本id*/
        mode: this.props.location.query.isProOrStage == "1" ? "Project" : "Stage",//显示模式，项目或者分期
        current: this.props.location.query["current"],
        //方案指标数据，面积数据
        areaData: {},
        //面积数据里的查询
        searchKey: {},
        //版本数据
        versionData: [],
        //生成业态的条件数据
        conditionData: {},

        activeTapKey: "plan-quota",//tab页当前标签
        modalKey: "",//模态窗口的key
        modalParam: "",//打开模态窗口时的额外参数
        record: null,//面积调整时，点击的那一行数据
    };

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
     * 获取当前版本数据
     */
    getVersionStatus = () => {
        const {versionId, versionData} = this.state;
        if (!versionId) {
            return "";
        }
        const currentVersion = versionData.filter(version => version.id == versionId)[0];
        if (currentVersion) {
            return currentVersion["statusCode"];
        }
        return "";
    };

    /**
     *  规划方案指标更新数据
     */
    planQuotaUpdateData = [];

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
            this.loadStep(nextDataKey, nextMode);
        }
    }

    componentDidMount() {

        //判断是否是审批, 真:审批状态; 假:普通状态
        if (this.getApprovalStatus()) {
            this.changeVersionIdToDataKey();
        } else {
            this.loadStep();
        }
    }

    /**
     * 转换数据: 版本id → 项目Id/分期Id
     */
    changeVersionIdToDataKey = () => {
        const versionId = this.props.location.query.dataKey;
        AreaService.getBaseInfoByVersionId(versionId)
            .then(baseInfo => {
                const dataKey = baseInfo["parentid"];
                const mode = baseInfo["projectlevel"] == "1" ? "Project" : "Stage";
                const defaultStepId = baseInfo["step"];

                this.setState({
                    dataKey,
                    mode,
                    defaultStepId,
                });

                this.loadStep(dataKey, mode, defaultStepId);
            })
            .catch(error => {
                iss.error(error);
            });
    };

    /**
     * 加载步骤
     * @param dataKey
     * @param mode
     * @param defaultStepId  默认显示的阶段Id
     */
    loadStep = (dataKey, mode, defaultStepId) => {

        if (dataKey === undefined) {
            dataKey = this.state.dataKey;
            mode = this.state.mode;
            defaultStepId = this.state.defaultStepId;
        }

        if (!dataKey) {
            return;
        }

        //临时存储当前的step
        let step = undefined;
        let versionId = undefined;
        this.setState({
            loading: true,
            versionId: "",
        });

        /**
         * 先获取阶段数据 => 然后根据阶段获取版本数据 => 最后获取 规划方案指标和面积数据
         */
        AreaService.getStep(dataKey, mode)
            .then(stepData => {
                if (defaultStepId) {
                    step = stepData.filter(item => item.guid == defaultStepId)[0];
                } else {
                    const filterStep = stepData.filter(item => item.statusCode == "draft"
                        || item.statusCode == "approvaling"
                        || item.statusCode == "approvaled");
                    if (filterStep.length > 0) {
                        step = filterStep[filterStep.length - 1];
                    }
                }
                if (!step) {
                    step = stepData[0];
                }
                if (!step) {
                    return Promise.reject("发生错误: 未获取到阶段信息!");
                }

                this.setState({
                    stepData,
                    step: step,
                });

                if (step) {
                    return AreaService.getVersion(step, dataKey, mode);
                }
                return Promise.reject("未获取到阶段数据！");
            })
            .then(versionData => {

                versionId = this.getDefaultVersionId(versionData);
                this.setState({
                    versionData,
                    versionId,
                });
                this.loadData(true, step, mode, dataKey, versionId);
            })
            .catch(error => {
                iss.error(error);
            })
    };

    /**
     *  加载数据
     */
    loadData = (isInit, step, mode, dataKey, versionId) => {

        this.setState({
            loading: true,
        });

        const allPromise = [];
        //获取规划方案指标数据
        const planQuotaPromise = AreaService.getAreaPlanQuota(step, versionId);
        allPromise.push(planQuotaPromise);

        if (parseInt(step.guid) <= 2) {
            //获取地块·面积数据
            const blockPromise = AreaService.getAreaList(step, mode, versionId);
            allPromise.push(blockPromise);
        } else {
            allPromise.push(Promise.resolve({}));
        }

        if (parseInt(step.guid) > 2) {
            //获取楼栋·面积数据
            const buildingPromise = AreaService.getAreaList(step, mode, versionId, "Building");
            allPromise.push(buildingPromise);
            //获取业态·面积数据
            const formatPromise = AreaService.getAreaList(step, mode, versionId, "ProductType");
            allPromise.push(formatPromise);
        } else {
            allPromise.push(Promise.resolve({}));
            allPromise.push(Promise.resolve({}));
        }

        if (isInit) {
            //获取生成业态数据的筛选条件
            const getCreateConditionPromise = AreaService.getCreateCondition(step, dataKey, mode);
            allPromise.push(getCreateConditionPromise);
        }

        Promise.all(allPromise)
            .then(([planData, blockData, buildingData, formatData, conditionData]) => {
                //模拟景观软硬比正则校验，后台添加后移除
                planData.forEach(arg => {

                    if (arg.id == "SCENERYHARDSOFTRATE") {

                        arg.regExp = `{
                            type:"regExp",
                            regExp:"^#d+#\:#\d+$"
                        }`
                    }
                })

                this.setState({
                    loading: false,
                    areaData: {
                        planData,
                        blockData,
                        buildingData,
                        formatData
                    }
                });
                if (conditionData) {
                    this.setState({
                        conditionData
                    });
                }
            })
            .catch(error => {
                this.setState({
                    loading: false,
                });
                iss.error(error);
            });
    };

    /**
     * 处理版本切换
     */
    handleVersionChange = (versionId) => {
        this.setState({
            loading: true,
            versionId,
        });
        const {step, mode} = this.state;

        const allPromise = [];
        //获取规划方案指标数据
        const planQuotaPromise = AreaService.getAreaPlanQuota(step, versionId);
        allPromise.push(planQuotaPromise);

        if (parseInt(step.guid) <= 2) {
            //获取地块·面积数据
            const blockPromise = AreaService.getAreaList(step, mode, versionId);
            allPromise.push(blockPromise);
        } else {
            allPromise.push(Promise.resolve({}));
        }

        if (parseInt(step.guid) > 2) {
            //获取楼栋·面积数据
            const buildingPromise = AreaService.getAreaList(step, mode, versionId, "Building");
            allPromise.push(buildingPromise);
            //获取业态·面积数据
            const formatPromise = AreaService.getAreaList(step, mode, versionId, "ProductType");
            allPromise.push(formatPromise);
        } else {
            allPromise.push(Promise.resolve({}));
            allPromise.push(Promise.resolve({}));
        }

        Promise.all(allPromise)
            .then(([planData, blockData, buildingData, formatData]) => {

                this.setState({
                    loading: false,
                    areaData: {
                        planData,
                        blockData,
                        buildingData,
                        formatData
                    },
                });
            })
            .catch(error => {
                this.setState({
                    loading: false,
                });
                iss.error(error);
            });
    };

    /**
     * 创建新版本
     */
    handleCreateVersion = () => {
        this.setState({
            loading: true,
        });
        const {step, mode, dataKey} = this.state;
        AreaService.createVersion(step, dataKey, mode)
            .then(res => {
                if (res.rows === "success") {
                    iss.info("版本创建成功!");
                } else {
                    return Promise.reject(res.message || "版本创建失败");
                }
            })
            .then(() => {
                this.loadStep(dataKey, mode, step.guid);
            })
            .catch(error => {
                this.setState({
                    loading: false,
                });
                iss.error(error);
            })
    };

    /**
     * 获取默认显示的版本Id
     * @param versionData
     * @returns {*}
     */
    getDefaultVersionId = (versionData) => {
        if (!versionData || !Array.isArray(versionData) || versionData.length === 0) {
            return "";
        }

        return versionData[0]["id"];
    };


    /**
     *  保存当前版本的规划方案指标数据
     */
    handleSavePlanQuotaData = (showTip = true) => {
        const {step, versionId} = this.state;
        if (!versionId) {
            if (showTip) {
                iss.error("请先创建新版本");
            }
            return;
        }
        let data = [];
        this.planQuotaUpdateData = this.planQuotaUpdateData.filter(arg => arg["val"]);
        this.planQuotaUpdateData.forEach((arg, ind) => {
            if (arg.val) {
                data.push({
                    "id": arg["id"],
                    "val": arg["val"],
                    "label": arg["label"],
                    "valueId": arg["valueId"]
                });
            }
        });

        return AreaService.areaInfoISaveAreaPlanInfo(versionId, step.code, data)
            .then(res => {
                if (showTip) {
                    iss.info("保存成功");
                }
            })
            .catch(err => {
                iss.error(err);
            })
    };

    /**
     * 删除当前版本所有的数据
     */
    handleDeleteVersionData = () => {
        this.setState({
            loading: true,
        });
        const {step, mode, dataKey, versionId} = this.state;
        AreaService.deleteVersion(versionId)
            .then(res => {
                if (res.rows === "success") {
                    iss.info("版本删除成功!");
                } else {
                    return Promise.reject(res.message || "版本删除失败");
                }
            })
            .then(() => {
                this.loadStep(dataKey, mode, step.guid);
            })
            .catch(error => {
                this.setState({
                    loading: false,
                });
                iss.error(error);
            })
    };

    /**
     * 处理步骤切换
     * 根据阶段获取版本数据 => 再获取 规划方案指标和面积数据
     */
    handleStepClick = (newStep) => {
        return () => {
            const {step, dataKey, mode} = this.state;
            if (newStep.code === step.code) return;

            let versionId = undefined;

            //保存当前版本的规划方案指标数据
            this.handleSavePlanQuotaData(false);

            this.setState({
                loading: true,
                versionId: "",
                step: newStep,
                record: null,
                modalKey: "",
                activeTapKey: "plan-quota",
            });

            AreaService.getVersion(newStep, dataKey, mode)
                .then(versionData => {
                    versionId = this.getDefaultVersionId(versionData);
                    this.setState({
                        versionData,
                        versionId
                    });

                    this.loadData(false, newStep, mode, dataKey, versionId);
                })
                .catch(error => {
                    this.setState({
                        loading: false,
                    });
                    iss.error(error);
                })

        };
    };

    /**
     * 处理弹窗
     */
    handleModalClick = (modalKey, modalType) => {
        return (record, param) => {
            if (modalType === "edit") {
                const {versionId} = this.state;
                if (!versionId) {
                    iss.error("请先创建新版本");
                    return;
                }

                const versionStatus = this.getVersionStatus();
                if (versionStatus == "approvaling") {
                    iss.error("当前版本在审批中, 不能编辑!");
                    return;
                }
                if (versionStatus == "approvaled") {
                    iss.error("当前版本已审批通过, 请创建新版本后进行编辑!");
                    return;
                }

                this.handleSavePlanQuotaData(false);
            }
            this.setState({
                modalKey,
                record,
                modalParam: param,
            });
        };
    };

    /**
     * 隐藏弹窗
     */
    handleHideModal = (param) => {
        const {step, mode, dataKey, versionId} = this.state;
        this.setState({
            modalKey: "",
            record: null,
        });
        if (param == "reload") {
            this.loadData(false, step, mode, dataKey, versionId);
        }
    };

    /**
     * 处理Tab切换
     */
    handleTabChange = (activeTapKey) => {
        this.handleSavePlanQuotaData(false);
        this.setState({activeTapKey});
    };

    /**
     * 处理规划方案指标 数据改变事件
     */
    handlePlanQuotaDataChange = (postData) => {
        this.planQuotaUpdateData = postData || [];
    };
    /**
     * 发起审批
     */
    handleApproval = () => {
        const {versionId, dataKey, step, stepData} = this.state;
        const {isProOrStage} = this.props.location.query;
        if (!versionId) {
            iss.error("当前阶段还没有创建版本");
            return;
        }
        const approvalingStep = stepData.filter(item => item.statusCode == "draft" || item.statusCode == "approvaling")[0];
        if (approvalingStep && approvalingStep.code != step.code) {
            iss.error("同一时间只允许有一个阶段处于草稿或审批状态!");
            return;
        }

        //TODO 保存数据

        let approvalCode = iss.getEVal("area");

        //先保存数据再进行跳转
        this.handleSavePlanQuotaData(false)
            .then(params => {
                iss.hashHistory.push({
                    pathname: "/ProcessApproval",
                    search: `?e=${approvalCode}&dataKey=${versionId}&current=ProcessApproval&areaId=&areaName=&businessId=${dataKey}&isProOrStage=${isProOrStage}`
                });
            })
            .catch(err => {
                iss.error("保存失败请重试！")
            })


    };

    /**
     * 渲染步骤UI
     */
    renderStepList = () => {

        //阶段
        const {step, stepData} = this.state;
        const len = stepData.length;
        const classNameObj = {
            "undraft": "legend-white",
            "draft": "legend-blue",
            "approvaling": "legend-yellow",
            "approvaled": "legend-green",
        };
        const stepArray = stepData.map((item, index) => {
            if (this.getApprovalStatus()) {
                return (
                    <li key={item.guid} style={{zIndex: len - index}}
                        className={item.guid == step.guid ? "active " : ""}>
                        <span className={classNameObj[item.statusCode]}></span>{item.name}</li>
                );
            } else {
                return (
                    <li key={item.guid} style={{zIndex: len - index}}
                        className={item.guid == step.guid ? "active " : ""}
                        onClick={this.handleStepClick(item)}><span
                        className={classNameObj[item.statusCode]}></span>{item.name}</li>
                );
            }
        });

        return (
            <Row gutter={0}>
                <Col>
                    <ul className="processBar-List">
                        {stepArray}
                    </ul>
                </Col>

            </Row>
        );
    };

    /**
     * 渲染button
     */
    // renderButtonList = () => {

    //     //审批状态时,不显示阶段按钮
    //     if (this.getApprovalStatus()) {
    //         return null;
    //     }

    //     const {step} = this.state;
    //     return (
    //         <div>
    //             {/* <div className="areaTopbtn jhBtn-wrap"> */}
    //                 <button type="button" className="jh_btn jh_btn28 jh_btn_add" onClick={this.handleCreateVersion}>
    //                     生成新版本
    //                 </button>
    //                 {
    //                     parseInt(step.guid) <= 2 ?
    //                         <button type="button" className="jh_btn jh_btn28 jh_btn_save"
    //                                 onClick={this.handleModalClick("block-format-edit", "edit")}>业态维护
    //                         </button> :
    //                         <button type="button" className="jh_btn jh_btn28 jh_btn_save"
    //                                 onClick={this.handleModalClick("building-format-edit", "edit")}>业态/楼栋维护
    //                         </button>
    //                 }

    //             {/* </div> */}
    //         </div>
    //     );
    // };


    /**
     * 渲染Tab 保存按钮显示部分
     */
    renderTabList = () => {
        const {step, areaData, activeTapKey, dataKey, versionId} = this.state;
        const panelArray = [];
        const planData = areaData["planData"] || [];
        this.planQuotaUpdateData = planData.filter(arg => arg.val);
        panelArray.push(
            <TabPane tab="规划方案指标" key="plan-quota">
                <PlanQuota planData={planData}
                           versionId={versionId}
                           versionStatus={this.getVersionStatus()}
                           dataKey={dataKey}
                           onPlanQuotaDataChange={this.handlePlanQuotaDataChange}
                           approvalStatus={this.getApprovalStatus()}
                />
            </TabPane>);

        if (parseInt(step.guid) <= 2) {
            const blockData = areaData["blockData"] || {};
            panelArray.push(
                <TabPane tab="产品构成--按地块" key={step.code + "com-block"}>
                    <ComBlock
                        step={step}
                        dataKey={dataKey}
                        versionId={versionId}
                        versionStatus={this.getVersionStatus()}
                        dataSource={blockData["areadataInfo"]}
                        headerData={blockData["titleInfo"]}
                        onBlockFormatClick={this.handleModalClick("block-format-adjust")}
                        approvalStatus={this.getApprovalStatus()}
                    />
                </TabPane>);
        } else {
            const buildingData = areaData["buildingData"] || {};
            const formatData = areaData["formatData"] || {};

            panelArray.push(
                <TabPane tab="产品构成--按楼栋" key={step.code + "com-building"}>
                    <ComBuilding
                        step={step}
                        dataKey={dataKey}
                        versionId={versionId}
                        versionStatus={this.getVersionStatus()}
                        dataSource={buildingData["areadataInfo"]}
                        headerData={buildingData["titleInfo"]}
                        onBuildingClick={this.handleModalClick("com-building-adjust")}
                        approvalStatus={this.getApprovalStatus()}
                    />
                </TabPane>);
            panelArray.push(
                <TabPane tab="产品构成--按业态" key={step.code + "com-format"}>
                    <ComFormat
                        step={step}
                        dataKey={dataKey}
                        versionId={versionId}
                        dataSource={formatData["areadataInfo"]}
                        headerData={formatData["titleInfo"]}
                        onFormatClick={this.handleModalClick("com-format-adjust")}
                    />
                </TabPane>);
        }

        return (
            <Tabs defaultActiveKey="plan-quota" activeKey={activeTapKey}
                  animated={false}
                  onChange={this.handleTabChange}>
                {panelArray}
            </Tabs>
        );
    };

    /**
     * 渲染步骤的颜色状态
     */
    renderStepLend = () => {

        //审批状态时,不显示状态提示
        if (this.getApprovalStatus()) {
            return null;
        }
        const legendArray = Legend.map((el, ind) => {
            return (
                <li key={ind} data-guid={el.guid} className={el.class}>{el.text}</li>
            );
        });

        return (
            <ul className="processBar-header">
                {legendArray}
            </ul>
        );
    };

    /**
     * 渲染维护或修改弹窗
     * @returns {*}
     */
    renderEditOrAdjust = () => {
        const {modalKey, modalParam, record, conditionData, step, mode, versionId, dataKey} = this.state;
        switch (modalKey) {
            case "block-format-edit"://业态维护
                return (
                    <BlockFormatEdit
                        conditionData={conditionData}
                        onHideModal={this.handleHideModal}
                        step={step}
                        mode={mode}
                        versionId={versionId}
                        dataKey={dataKey}
                    />
                );
            case "block-format-adjust"://地块·业态面积调整
                return (
                    <BlockFormatAdjust
                        onHideModal={this.handleHideModal}
                        record={record}
                        step={step}
                        mode={mode}
                        versionId={versionId}
                    />
                );
            case "building-format-edit"://业态/楼栋维护
                return (
                    <BuildingFormatEdit
                        conditionData={conditionData}
                        onHideModal={this.handleHideModal}
                        step={step}
                        mode={mode}
                        versionId={versionId}
                        dataKey={dataKey}
                    />
                );
            case "com-building-adjust"://按楼栋·面积调整
                return (
                    <ComBuildingAdjust
                        onHideModal={this.handleHideModal}
                        record={record}
                        step={step}
                        mode={mode}
                        versionId={versionId}
                        modalParam={modalParam}
                    />
                );
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

    renderApproval = () => {
        let stateData = this.props.location.query;
        if (this.getApprovalStatus()) {
            return <ProcessApprovalTab current="area" allSearchArg={stateData}/>
        }

    };

    render() {
        const {loading, dataKey, step, versionId, versionData, current} = this.state;
        if (!dataKey) {
            return this.renderEmpty();
        }
        return (
            <div className="processBar">
                {this.renderApproval()}
                <Spin size="large" spinning={loading}>
                    <Row>
                        <Col span={8}>
                            {this.renderStepLend()}
                        </Col>
                        <Col span={16}>
                            <SaveVersion versionId={versionId}
                                        current={current}
                                        versionData={versionData}
                                        versionStatus={this.getVersionStatus()}
                                        approvalStatus={this.getApprovalStatus()}
                                        step={step}
                                        onSaveVersionData={this.handleSavePlanQuotaData}
                                        onDeleteVersionData={this.handleDeleteVersionData}
                                        onVersionChange={this.handleVersionChange}
                                        onHandleCreateVersion={this.handleCreateVersion}
                                        onHandleApproval={this.handleApproval}
                                        onHandleBlockFormatEdit={this.handleModalClick("block-format-edit", "edit")}
                                        onHandleBuildingFormatEdit={this.handleModalClick("building-format-edit", "edit")}
                            />
                        </Col>
                    </Row>
                    {this.renderStepList()}
                    <Row gutter={0}>
                        
                    </Row>
                    {this.renderTabList()}
                    {this.renderEditOrAdjust()}
                </Spin>
            </div>
        );
    }
}

export default Index;