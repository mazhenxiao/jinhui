import "babel-polyfill";  //兼容ie
import iss from "../js/iss.js";
import React, {Component, Children} from 'react';
import {Spin, Tabs, Row, Col, Button, Select, Modal, Table, Popconfirm, message} from 'antd';
import {WrapperTreeTable, WrapperSelect} from '../common';
import {Payment} from '../services';
import {knife} from '../utils';

import "../css/antd.min.css";
import "../css/payment.css";
import "../css/tools-processBar.less";
import "../css/button.less";
import "../area/areaCss/areaManage.less";
import "./css/sign.less";

const TabPane = Tabs.TabPane;

class SignIndex extends Component {

    state = {
        loading: false,
        dataKey: this.props.location.query.dataKey || "", /*项目id或分期版本id*/
        mode: this.props.location.query.isProOrStage == "1" ? "Project" : this.props.location.query.isProOrStage == "2" ? "Stage" : "",//显示模式，项目或者分期
        versionId: "",
        versionData: [],
        editable: false,//是否可编辑
        dynamicTable: {
            dynamicHeaderData: [],//动态调整版头部
            dynamicDataSource: [],//动态调整版数据
            dynamicEdit: false, //动态调整是否可编辑
            dynamicEditButtonShow: false,
            loading: true
        },
        planTable: { //同上
            planHeaderData: [],
            planDataSource: [],
            planEdit: false,
            loading: true
        },
        version: { //版本
            currentVersion: "",//当前版本
            versionData: [], //版本数据
            versionShow: false //是否显示版本
        },
        dialog: { //弹窗
            ModalVisible: false,
            dialogContent: [],//弹出窗口content
            dataSource: [], //数据
            columns: [] //表头
        }


    };

    //protected 数据
    dynamicTable = { //动态表格私有仓储
        number: 0,//死循环记录
        dynamicRender: {
            "showName": (text, record) => <a href="javascript:;"
                                             onClick={this.clickOpenDialog.bind(this, text, record)}>{text}</a>

        }, //动态编辑表格
        startYear: "",//起始年
        signAContractVersionId: "",//调整版本id
        saveData: {}//保存数据临时存储
    }


    antdTableScrollLock = null;//用来触发卸载原生事件

    componentDidMount() {
        this.getFetData(true);
    }

    componentWillUnmount() {
        if (this.antdTableScrollLock) {
            this.antdTableScrollLock.remove();//注销双向绑定
        }
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
        nextMode = nextMode == "1" ? "Project" : nextMode == "2" ? "Stage" : "";

        //切换路由之后，重新获取数据

        if (dataKey != nextDataKey) {
            this.setState({
                    dataKey: nextDataKey,
                    mode: nextMode,
                    activeTapKey: "plan-quota",
                }, arg => {
                    this.getFetData();
                }
            );
        }
    }

    /**
     * 获取动态数据，获取签约计划数据，获取版本数据
     * first 判断是否第一次加载dom,如果第一次加载返回promise
     */
    getFetData = (first) => {
        this.dynamicTable.saveData = {};
        //获取动态调整表格数据
        let dynamicTable = this.getDynamicData();
        //获取比对版数据   
        let planTable = this.getPlanData();

        return Promise.all([dynamicTable, planTable]).then(arg => {
            //获取弹窗数据如果需要，因为张权说要给一个获取的id不知道依赖在哪里，先放到这,估计需要从动态表获取
            this.getFetDialogData();
            this.bindScrollLock();
        }).catch(error => {
            iss.error(error);
        })
    }

    /**
     * 获取弹窗数据
     */
    getFetDialogData(key) {//获取弹窗及校验数据
        let title = this.getDynamicTitle(key);
        let data = this.getDynamicDialogData(key);
        let {dialog} = this.state;
        Promise.all([title, data])
            .then(([title, data]) => {
                let newData = {
                    columns: title || [],
                    dataSource: data || [],
                    ModalVisible: false
                };
                dialog = {...dialog, ...newData};

                this.setState({
                    dialog
                })
            })
            .catch(err => {
                iss.error(err);
                // iss.error("getFetDialogData获取数据失败")
            })
    }

    getApprovalState = () => {

        if (this.props.location.query["current"] == "ProcessApproval") {
            return true;
        }
        return false;
    };

    /**
     * 绑定锁定
     */
    bindLockTable() {
        // knife.ready(".toTable .ant-table-body,.pkTable .ant-table-body", arg => {
        this.bindScrollLock();
        //  })
    }

    /**
     * 获取弹窗头部数据
     * 分开写防止万一数据需要二次编辑
     */
    getDynamicTitle(key) {
        return Payment.IGetSupplyVersionTitle(key)
    }

    /**
     * 获取弹窗及校验数据
     * 分开写防止万一数据需要二次编辑
     */
    getDynamicDialogData(key) {
        return Payment.IGetSupplyVersionData(key)
    }

    /**
     * 获取动态调整版数据
     * return promise
     */
    getDynamicData = () => {
        let {dynamicTable, dataKey} = this.state;
        //dataKey = "4100835d-2464-2f9e-5086-bc46a8af14f4";

        //dynamicHeaderData:[],//动态调整版头部 dynamicDataSource:[],//动态调整版数据
        let title = Payment.IGetSignAContractTableTitle(dataKey)
            .then((dynamicColum) => {
                //this.setDynamicRender(dynamicColum);//创建编辑表
                return dynamicColum;
            });

        let data = Payment.IGetSignAContractData(dataKey)

        Payment.IGetSignAContractBaseInfo(dataKey).then(arg => {
            let {signAContractVersionId, startYear} = arg;
            this.dynamicTable.signAContractVersionId = signAContractVersionId;
            this.dynamicTable.startYear = startYear;
        }).catch(error => {
            iss.error(error);
        });

        return Promise.all([title, data])
            .then(arg => {
                let [dynamicHeaderData, dynamicDataSource] = arg,
                    newData = {
                        dynamicHeaderData,
                        dynamicDataSource,
                        dynamicEdit: false,
                        dynamicEditButtonShow: Boolean(dynamicDataSource && dynamicDataSource.length)
                    },
                    dynamicTable = {...this.state.dynamicTable, ...newData};
                this.setState({dynamicTable});
            })
    }
    /**
     * 返回当前id
     * AList 返回当前版本
     */
    getCurrentVertion = AList => {
        if (typeof AList == "string") {
            return this.state.version.versionData.filter(arg => arg.id == AList);

        } else {
            return AList && AList.length ? AList[0].id : ""
        }
    }
    /**
     * 获取当前版本下比对版本数据
     * currentVersion 当前版本 返回Promise
     */
    getCurrentVersionPlanData = currentVersion => {
        return Payment.IGetBudgetList(currentVersion); //获取数据

    }
    /**
     * 获取计划版数据
     * return promise 884dd5a6-ff48-4628-f4fa-294472d49b37
     */
    getPlanData = () => {

        let {planTable, version, dynamicTable, dataKey} = this.state;
        let {dynamicHeaderData} = dynamicTable
        // dataKey = "4100835d-2464-2f9e-5086-bc46a8af14f4";
        //dynamicHeaderData:[],//动态调整版头部 dynamicDataSource:[],//动态调整版数据
        let currentVersion = "", versionData;

        return Payment.IGetBudgetList(dataKey)
            .then(Adata => { //获取版本
                currentVersion = this.getCurrentVertion(Adata);
                versionData = Adata;
                return Payment.IGetSignAContractData(currentVersion)
            })
            .then((planDataSource) => {

                let newData = { //table数据
                        dynamicHeaderData,
                        planDataSource,
                        // planEditButtonShow:Boolean(planDataSource&&planDataSource.length)
                    },
                    newVersion = { //版本数据
                        currentVersion,
                        versionData,
                        versionShow: true
                    }
                planTable = {...planTable, ...newData};
                version = {...version, ...newVersion};

                this.setState({planTable, version});

            })
    }

    /**
     * 是否编辑行
     * 递归查询此处如果数据有问题容易出现bug目前先不用
     */
    setDynamicRender(text, record, index) {


        /* if (this.dynamicTable.number += 1, this.dynamicTable.number > 1000) {
            console.log("强制判断如果列数据大于1000或死循环强制推出防止如果后台数据有误造成的死循环");
            return
        }

        dynamicColum.forEach(arg => {
            if (arg.children) {
                this.setDynamicRender(arg.children);
            } else {
                this.dynamicTable.dynamicRender[arg.field] = this.setDynamicColumns;
            }
        }) */

    }

    /**
     * 动态编辑数据
     */
    setDynamicColumns(text, value, index) {

        return text;
    }

    handleEdit = () => {
        let {dynamicTable} = this.state;
        let dynamicEdit = !dynamicTable.dynamicEdit;
        dynamicTable = {...dynamicTable, ...{dynamicEdit}}
        this.setState({
            dynamicTable
        });
        if (!dynamicEdit) { //保存
            this.saveDynamicTableData();
        }

    };

    /**
     * 保存数据
     */
    saveDynamicTableData() {
        this.dynamicTable.saveData = {};//清场
        let {dataKey, dynamicTable} = this.state;
        let {dynamicDataSource,} = dynamicTable;
        let {saveData} = this.dynamicTable;//非stage存储保存数据
        this.filterSaveData(dynamicDataSource);//递归赋值    
        let _da = JSON.stringify(Object.values(saveData));
        let postData = {
            versionId: dataKey,
            signAContractSaveData: _da
        }
        return Payment.ISaveSignAContractData(postData)
            .then(arg => {
                iss.tip({
                    type: "success",
                    description: "保存成功"
                });
                return _da;
            }).catch(err => {
                iss.tip({
                    type: "error",
                    description: "保存失败请重试！"
                })
            })

    }

    /**
     * 返回数据
     */
    filterSaveData = da => {
        da.map(arg => {
            if (arg.children && arg.children.length) {
                this.filterSaveData(arg.children)
            } else {
                for (let key in arg) {
                    let reg = /^Y\d{3}/ig;
                    if (reg.test(key) && arg[key] !== "") {
                        let {startYear} = this.dynamicTable;
                        startYear = eval(startYear - key.substr(1, 1))
                        let _da = {
                            dataType: key.substr(4),
                            titlename: `${startYear}-${key.substr(2, 2)}-01`,
                            productTypeID: arg["showId"] || "",
                            GROUPID: arg["GROUPID"],
                            val: arg[key]
                        }
                        this.dynamicTable.saveData[_da.titlename + "-" + key + "-" + arg.key] = _da;
                    }
                }

            }
        })
    }


    /**
     * 绑定双向滚动
     */
    bindScrollLock() {

        let toTable = document.querySelector(".toTable .ant-table-body"),
            pkTable = document.querySelector(".pkTable .ant-table-body");
        if (toTable && pkTable) {
            toTable.scrollTop = toTable.scrollLeft = 0;
            pkTable.scrollTop = pkTable.scrollLeft = 0;
            this.antdTableScrollLock = knife.AntdTable_ScrollLock(toTable, pkTable);
        }


    }

    /**
     * 弹出点击取消
     */
    clickModalCancel = () => {
        let dialog = {...this.state.dialog, ...{ModalVisible: false}}
        this.setState({dialog})
    }
    /**
     * 弹出确定
     */
    clickModalOk = () => {
        let dialog = {...this.state.dialog, ...{ModalVisible: false}}
        this.setState({dialog})
    }
    renderContent = (arg) => {
        let {dialogContent} = this.state.dialog;

    }

    clickOpenDialog(text, row, index) {

        let {showId} = row;
        let {dialog} = this.state;
        let dialogContent = dialog.dataSource.filter(arg => {

            if (arg.showId == showId) {
                return arg.value;
            }
        });
        for (var i = 0; i < 50; i++) {
            dialogContent.push(dialog.dataSource[0]["value"]);//有真实数据后删除
        }

        if (dialogContent.length <= 0) {
            // iss.info("暂无数据");
            return
        }
        let newData = {
            dialogContent,
            ModalVisible: true
        }
        dialog = {...dialog, ...newData};
        this.setState({
            dialog
        })

    }

    /**
     * 版本下拉菜单事件
     */
    selectChangeVersion = params => {
        // let _da= this.getCurrentVertion(params);
        let versionId = params; // _da.length? _da[0].id:"";
        let {version} = this.state;
        let {dynamicHeaderData} = this.state.dynamicTable
        version = {...version, currentVersion: params}
        if (versionId) {

            this.getCurrentVersionPlanData(versionId)
                .then((planDataSource) => {

                    let {planTable} = this.state;
                    let newData = {
                        dynamicHeaderData,
                        planDataSource
                    }
                    planTable = {...planTable, ...newData};
                    this.setState({
                        planTable,
                        version
                    })

                })
                .catch(error => {
                    iss.error(error);
                })
        }

    }
    /**
     * 提交
     */
    handleSubmit = arg => {
        let {signAContractVersionId} = this.dynamicTable;
        this.saveDynamicTableData()
            .then(da => {

                return Payment.ISubmitSignAContractData(signAContractVersionId);
            })
            .then(arg => {

            })
            .catch(err => {
                iss.error("提交失败")
            })
    }
    /**
     * 驳回
     */
    handleCancel = () => {
        const {dynamicTable} = this.state;
        let {signAContractVersionId, dynamicEdit} = this.dynamicTable;
        let newData = {...dynamicTable, dynamicEditButtonShow: false, dynamicEdit: false};

        Payment.ISendBackSignAContractData(signAContractVersionId)
            .then(arg => {
                iss.tip({
                    type: "success",
                    description: "驳回成功"
                });
                this.setState({
                    dynamicTable: newData
                })
            })
            .catch(err => {
                iss.error("驳回失败！")
            })

    }

    /**
     * 弹出窗口
     */
    renderDialog = () => {
        let {dialogContent, columns, ModalTile, ModalVisible} = this.state.dialog;

        return <Modal
            title={ModalTile}
            visible={ModalVisible}
            onCancel={this.clickModalCancel}
            onOk={this.clickModalOk}
            footer={false}
        >


            <Table
                rowKey="key"
                bordered={true}
                size="small"
                dataSource={dialogContent}
                columns={columns}/>

        </Modal>

    }
    /**
     * 动态调整table
     */
    renderHistoryData = () => {
        const {versionData, versionId, editable, dynamicTable, loading} = this.state;
        const {dynamicHeaderData, dynamicDataSource, dynamicEdit, dynamicEditButtonShow} = dynamicTable;

        return (
            <article className="toTable signPage">
                <header className="bottom-header-bar">
                    <Row>
                        <Col span={12}>
                            <span className="header-title">签约计划动态调整版（面积：平方米，货值：万元）</span>
                        </Col>
                        <Col span={12}>
                            <div className={dynamicEditButtonShow ? "RT" : "hidden"}>
                                <Popconfirm placement="top" title={"确定提交吗？"} onConfirm={this.handleSubmit}>
                                    <button className="jh_btn jh_btn22 jh_btn_apro mgR20">提交</button>
                                </Popconfirm>
                                <Popconfirm placement="top" title={"确定退回吗？"} onConfirm={this.handleCancel}>
                                    <button className="jh_btn jh_btn22 refresh-icon mgR20">退回</button>
                                </Popconfirm>
                                <button className="jh_btn jh_btn22 jh_btn_edit"
                                        onClick={this.handleEdit}>{dynamicEdit ? "保存" : "编辑"}

                                </button>
                            </div>
                        </Col>
                    </Row>
                </header>

                <WrapperTreeTable
                    loading={loading}
                    size="small"
                    //  onDataChange={this.onDataChangeDynamic}
                    headerData={dynamicHeaderData || []}
                    editState={dynamicEdit}
                    editMode="LastLevel"
                    dataSource={dynamicDataSource || []}
                    columnRender={this.dynamicTable.dynamicRender}
                />
            </article>
        );
    };
    /**
     * 比对table
     */
    renderCurrentData = () => {
        const {planTable, dynamicTable, version} = this.state;
        const {planHeaderData, planDataSource} = planTable;
        const {versionData, versionShow, versionId, currentVersion} = version;
        const {dynamicHeaderData, dynamicDataSource, dynamicEdit, dynamicEditButtonShow, loading} = dynamicTable;
        return (
            <article className="pkTable mgT10">
                <header className="top-header-bar">
                    <Row>
                        <Col span={12}>
                            <span className="header-title">签约计划考核版（面积：平方米，货值：万元）</span>
                        </Col>
                        <Col span={12} className="action-section">

                            <WrapperSelect className={versionShow ? "select-version" : "hide"} labelText="版本:"
                                           dataSource={versionData}
                                           value={currentVersion}
                                           onChange={this.selectChangeVersion}></WrapperSelect>
                        </Col>
                    </Row>
                </header>
                <WrapperTreeTable
                    loading={loading}
                    headerData={dynamicHeaderData || []}
                    dataSource={dynamicDataSource || []}/>
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
                {this.renderDialog()}
            </div>
        );
    }
}

export default SignIndex;