import "babel-polyfill";  //兼容ie
import iss from "../js/iss.js";
import React, {Component, Children} from 'react';
import {Spin, Tabs, Row, Col, Button, Select, Modal, Table, Popconfirm, message} from 'antd';
import {WrapperTreeTable, WrapperSelect} from '../common';
import {Payment} from '../services';
import {knife} from '../utils';
import ProcessApprovalTab from "../components/component-ProcessApproval-Tab.js"; //导航信息
import "../css/antd.min.css";
import "../css/payment.css";
import "../css/tools-processBar.less";
import "../css/button.less";
import "../area/areaCss/areaManage.less";
import "./css/sign.less";
import '../source/jquery-easyui-1.5.2/themes/bootstrap/dialog.css';
import '../source/jquery-easyui-1.5.2/themes/gray/dialog.css';
import '../source/jquery-easyui-1.5.2/themes/default/dialog.css';
import '../common/css/view.css';

const TabPane = Tabs.TabPane;

class SignIndex extends Component {

    state = {
        loading: true,
        dataKey: this.props.location.query.dataKey || "", /*项目id或分期版本id*/
        mode: this.props.location.query.isProOrStage == "1" ? "Project" : this.props.location.query.isProOrStage == "2" ? "Stage" : "",//显示模式，项目或者分期
        versionId: "",
        versionData: [],
        editable: false,//是否可编辑
        isApproal: false, //是否是审批
        dynamicTable: {
            DynamicDate:"",//title显示
            SupplyVersionId:"",//在弹出时需要获取的id
            dynamicHeaderData: [],//动态调整版头部
            dynamicDataSource: [],//动态调整版数据
            dynamicEdit: false, //动态调整是否可编辑
            dynamicEditButtonShow: false,
            loading: true,
            defaultHeight: 200
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
            columns: [
                {dataIndex:"SupplyDate",title:"日期",width:80,key:"SupplyDate"},
                {dataIndex:"SourceSaleArea",title:"可售面积（㎡）",width:80,key:"SourceSaleArea"},
                {dataIndex:"SourceMonery",title:"货值（万元）",width:80,key:"SourceMonery"},
                {dataIndex:"SourceNumber",title:"套数（套）",width:80,key:"SourceNumber"},
            ] //表头
        }


    };
    //版本信息私有数据
    version = { //版本
        currentVersion: "",//当前版本
        versionData: [], //版本数据
        versionShow: false //是否显示版本
    };

    //protected 数据
    dynamicTable = { //动态表格私有仓储
        DynamicDate:"",//titile显示
        TitleList:[],//在inof中获取表头数据
        SupplyVersionId:"",//在弹出时需要获取的id
        DynamicId: "",//新加入的id，用此id获取动态调整版数据
        Permission: "",//新加入是否可以编辑
        Status: "",//新加入当前阶段,接口0 编制中 10提交 -1 退回，只有0可以编辑提交驳回
        Permission:"edit",//瑞涛添加通过是否为edit判断是否可以编辑
        VersionList: [],//新加入不知道是什么
        StartYear: "",//新加入起始年份
        number: 0,//死循环记录
        dynamicRender: {
            "showName": (text, record) => {
            let {LEVELS,children}=record;
           return children? <span>{text}</span>:<a href="javascript:;" onClick={this.clickOpenDialog.bind(this, text, record)}>{text}</a>
        }

        }, //动态编辑表格
        status: "",//接口0 编制中 10提交 -1 退回，只有0可以编辑提交驳回
        startYear: "",//起始年
        signAContractVersionId: "",//调整版本id
        saveData: {}//保存数据临时存储
    }
    antdTableScrollLock = null;//用来触发卸载原生事件

    componentDidMount() {
        let {dataKey} = this.props.location.query;
        let isApproal = this.SetisApproal();
        this.setApproalDataKeyState(isApproal)
            .then(({VERSIONID,DATAKEY,DATALEVEL})=>{
                if (dataKey) {
                    this.getFetData(true);
                }
            })
     
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
        this.SetisApproal(location);
        //切换路由之后，重新获取数据

        if (dataKey != nextDataKey) {
            this.setState({
                    loading: true,
                    dataKey: nextDataKey,
                    mode: nextMode,
                    activeTapKey: "plan-quota",
                }, arg => {
                    if (nextDataKey) {
                        this.getFetData();
                    }
                }
            );
        }
    }
     /**
     * 判断如果时审批页面则重新设置id
     * 因为setStage方式直接赋值，会异步和刷新整个视图，此时操作不想惊动到视图，用非标准写法
     */
    setApproalDataKeyState=(check)=>{
        let {dataKey} = this.props.location.query;
        if(check){
            return Payment.IGetApprovedInfo(dataKey,"payment")
                   .then(({VERSIONID,DATAKEY,DATALEVEL})=>{
                      
                   })
        }else{
            return Promise.resolve("ok非审批");
        }
      

    }

    /**
     * 初始化数据
     */
    setStartData = () => {
        let {dynamicTable, planTable, version,dialog} = this.state;
        dynamicTable = {...dynamicTable, dynamicDataSource: [], dynamicEditButtonShow: false}
        planTable = {...planTable, planDataSource: []}
        version = {...version, versionData: [], versionShow: false}
        dialog = {...dialog,ModalVisible:false}
        this.setState({
            dynamicTable,
            planTable,
            version,
            dialog
        });
    }

    /**
     * 获取动态数据，获取签约计划数据，获取版本数据
     * first 判断是否第一次加载dom,如果第一次加载返回promise
     */
    getFetData = (first) => {
        let {dataKey, mode} = this.state;
        this.dynamicTable.saveData = {};
        //获取基础数据=瑞涛
        Payment.IGetSignBaseInfo({dataKey, mode})
            .then(arg => {  //进行错误判断
                let {DynamicId, StartYear, VersionList, Permission, Error,SupplyVersionId,TitleList,DynamicDate} = arg;
                
                if (!DynamicId) {
                    this.setStartData();//初始化数据
                    return Promise.reject(Error);
                }
                if(Error){ iss.error(Error)}
                this.version = {...this.version, versionData: VersionList, versionShow: Boolean(VersionList.length)}
                this.dynamicTable = {...this.dynamicTable, DynamicId, StartYear, VersionList, Permission,SupplyVersionId,TitleList,DynamicDate}
                this.PromiseAllAndLockScroll();//调用
                // return arg
            }).catch(err => {

            err && iss.Info(err);
            this.setState({
                loading: false
            })
        })

    }
    /**
     * 获取动态数据、比对数据并锁定表格
     */
    PromiseAllAndLockScroll = params => {
        //获取动态调整表格数据
        let dynamicTable = this.getDynamicData();
        //获取比对版数据   
        let planTable = this.getPlanData();

        return Promise.all([dynamicTable, planTable]).then(arg => {
            //获取弹窗数据如果需要，因为张权说要给一个获取的id不知道依赖在哪里，先放到这,估计需要从动态表获取
            this.bindScrollLock();
        }).catch(error => {
            this.setState({
                loading: false,
            });
            iss.error(error);
        })
    }


    getApprovalState = () => {

        if (this.props.location.query["current"] == "ProcessApproval") {
            return true;
        }
        return false;
    };

    /**
     * 获取弹窗头部数据
     * 分开写防止万一数据需要二次编辑
     */
    getDynamicTitle(key) {
        return Payment.IGetSupplyVersionTitle(key)
    }

    /**
     * 获取动态调整版数据
     * return promise
     */
    getDynamicData = () => {
        let {dynamicTable, dataKey, mode} = this.state;
        let {DynamicId} = this.dynamicTable;

        //dynamicHeaderData:[],//动态调整版头部 dynamicDataSource:[],//动态调整版数据
        //瑞涛版数据
        return Payment.IGetSignDataByVersionId({DynamicId, mode})
        .then(dynamicDataSource => {
            
            let {Permission,TitleList:dynamicHeaderData} = this.dynamicTable;
            let  newData = {
                    dynamicHeaderData,
                    dynamicDataSource,
                    dynamicEdit: false,
                    dynamicEditButtonShow: Boolean(Permission ==`edit`&& dynamicDataSource && dynamicDataSource.length),
                },
                dynamicTable = {...this.state.dynamicTable, ...newData};
            this.setState({dynamicTable, loading: false});
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
        let {mode} = this.state;
        return Payment.IGetSignDataByVersionId({DynamicId: currentVersion, mode}); //获取数据

    }
    /**
     * 获取计划版数据
     * return promise 884dd5a6-ff48-4628-f4fa-294472d49b37
     */
    getPlanData = () => {

        let {planTable, version, dynamicTable, dataKey, mode} = this.state;
        let {dynamicHeaderData} = dynamicTable;
        let {versionData} = this.version;
        // dataKey = "4100835d-2464-2f9e-5086-bc46a8af14f4";
        //dynamicHeaderData:[],//动态调整版头部 dynamicDataSource:[],//动态调整版数据
        let currentVersion = this.getCurrentVertion(versionData);

        //瑞涛获取数据版本
        return Payment.IGetSignDataByVersionId({DynamicId: currentVersion, mode})
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
            this.setState({
                loading: true
            })
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
        let {saveData,DynamicId} = this.dynamicTable;//非stage存储保存数据

        this.filterSaveData(dynamicDataSource);//递归赋值    
        let _da = JSON.stringify(Object.values(saveData));
        
        let postData = {
            versionId: DynamicId,
            signAContractSaveData: _da
        }

        return Payment.ISaveSignAContractData(postData)
            .then(arg => {
                iss.tip({
                    type: "success",
                    description: "保存成功"
                });
                return _da;
            })
            .then(arg => {
                this.getDynamicData();//重新拉去数据
            })
            .catch(err => {
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
            } else if(!arg.children) {
                //console.log(`${arg.GROUPNAME}=>${arg.PROJECTNAME}=>${arg.TYPENAME}`)
               // debugger
                for (let key in arg) {
                    let reg = /^Y\d{3}/ig,mon=key.substr(2, 2),reg3=/Y3\d{2}Q\w/,yearNum=key.substr(1,1);
                     if(yearNum=="3"&&!reg3.test(key)){ //用来处理第三年非带Q字段不获取-瑞涛版
                        continue 
                    } 
                    if (reg.test(key) && arg[key] !== "") {
                        let {StartYear} = this.dynamicTable;
                        StartYear = eval(StartYear + "-1+" + yearNum)
                        let _da = {
                            dataType: key.substr(4),
                            titlename: `${StartYear}-${mon}-01`,
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
        let dialog = {...this.state.dialog,ModalVisible: false}
        this.setState({dialog})
    }
    /**
     * 弹出确定
     */
    clickModalOk = () => {
        let dialog = {...this.state.dialog,ModalVisible: false}
        this.setState({dialog})
    }
    renderContent = (arg) => {
        let {dialogContent} = this.state.dialog;

    }

    clickOpenDialog(text, row, index) {
        let {dialog}=this.state;
        let {SupplyVersionId:supplyid}=this.dynamicTable;
        let {columns}=dialog;
        //supplyid,producttypeid
        let {PRODUCTTYPEID:producttypeid}=row;
        
        Payment.ISingSupplyData({supplyid,producttypeid})
               .then(dialogContent=>{
                    dialog = {...dialog,columns,dialogContent,ModalVisible: true};
                    this.setState({
                        dialog
                    })
               })
               .catch(err=>{
                   iss.error(err);
               })
        
       

    }

    /**
     * 版本下拉菜单事件
     */
    selectChangeVersion = params => {
        // let _da= this.getCurrentVertion(params);
        let versionId = params; // _da.length? _da[0].id:"";
        let {version, planTable} = this.state;
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
        } else {
            planTable = {...planTable, planDataSource: []};
            this.setState({planTable, version})
        }

    }
    /**
     * 提交
     */
    handleSubmit = arg => {
    
        let {dataKey,mode:projectLevel}=this.state;
        let {DynamicId:signAContractVersionId} = this.dynamicTable;
        this.saveDynamicTableData()
            .then(da => {
                return Payment.ISubmitSignAContractData({signAContractVersionId,dataKey,projectLevel});
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
        let {DynamicId} = this.dynamicTable;
        let newData = {...dynamicTable, dynamicEditButtonShow: false, dynamicEdit: false};

        Payment.ISendBackSignAContractData(DynamicId)
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
            mask={false}
            width={800}
            footer={false}
            style={{"top":0}}
        >


            <Table
                rowKey="key"
                bordered={true}
                size="small"
                dataSource={dialogContent}
                scroll={{x:true,y:100}}
                columns={columns}/>
                
        </Modal>

    }
    /**
     * 动态调整table
     */
    renderHistoryData = () => {
        const {versionData, versionId, editable, dynamicTable, loading} = this.state;
        const {dynamicHeaderData, dynamicDataSource, dynamicEdit, dynamicEditButtonShow, defaultHeight,DynamicDate} = dynamicTable;

        return (
            <article className="toTable signPage">
                <header className="bottom-header-bar">
                    <Row>
                        <Col span={12}>
                            <span className="header-title">签约计划{DynamicDate}动态调整版（面积：平方米，货值：万元）</span>
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
                    defaultHeight={defaultHeight}
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
        const {dynamicHeaderData, defaultHeight} = dynamicTable;
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
                                           defaultHeight={defaultHeight}
                                           onChange={this.selectChangeVersion}></WrapperSelect>
                        </Col>
                    </Row>
                </header>
                <WrapperTreeTable
                    headerData={dynamicHeaderData || []}
                    dataSource={planDataSource || []}/>
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
    /**
     * 发起审批
     */
    isApproal = arg => {
        let stateData = this.props.location.query;
        if (this.state.isApproal) {
            return <section className="padB20">
                <ProcessApprovalTab current="sign" allSearchArg={stateData}/>
            </section>
        }

    }
    /**
     * 发起审批
     */
    handleApproval = params => {
        this.saveDynamicTableData()
            .then(arg => {
                this.goToApplroal();
            })

    }
    /**
     * 审批跳转
     */
    goToApplroal = arg => {
        //获取小版本跳转
        let versionId = this.state.versionId; //;
        let newProjectStatus = iss.getEVal("payment");
        const {isProOrStage} = this.props.location.query;
        iss.hashHistory.push({
            pathname: "/ProcessApproval",
            search: `?e=${newProjectStatus}&dataKey=${versionId}&current=ProcessApproval&areaId=&areaName=&businessId=${this.props.location.query["dataKey"]}&isProOrStage=${isProOrStage}`
        });
    }
    /**
     * 当前是否是审批
     */
    SetisApproal = arg => {

        let stateData = arg ? arg.query : this.props.location.query;
        this.setState({
            isApproal: Boolean(stateData["current"])
        })
        return Boolean(stateData["current"])
    }

    render() {
        const {dataKey, current} = this.props.location.query;
        if (!dataKey && !current) {
            return this.renderEmpty();
        }

        return (
            <div className="sign-wrapper">
                {this.isApproal()}
                <Spin size="large" spinning={this.state.loading} tip="加载中请稍后。。。">
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