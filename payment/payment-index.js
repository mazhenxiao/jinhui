import "babel-polyfill";  //兼容ie
import iss from "../js/iss.js";
import React, {Component, Children} from 'react';
import {Spin, Tabs, Row, Col, Button, Select, Modal, Table, Popconfirm, message} from 'antd';
import {WrapperGroupTable, WrapperSelect} from '../common';
import {Payment} from '../services';
import {knife} from '../utils';
import ProcessApprovalTab from "../components/component-ProcessApproval-Tab.js"; //导航信息

import "../css/antd.min.css";
import "../css/payment.css";
import "../css/tools-processBar.less";
import "../css/button.less";
import "../area/areaCss/areaManage.less";
import "./css/sign.less";

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
            saveId:"",//张政所需从版本中过滤出来的id
            currentVersion: "",//当前版本
            versionData: [], //版本数据
            versionShow: false //是否显示版本
        },
        dialog: { //弹窗
            ModalVisible: false,
            dialogContent: [{Time:"2018-01-02",Price:"测试数据",key:1}],//弹出窗口content 
            dialogColumns: [
                {field:"Time",align:"center",name:"时间",width:80},
                {field:"Price",align:"center",name:"货值",width:80}
            ] //表头
        }


    };

    //protected 数据
    dynamicTable = { //动态表格私有仓储
        number: 0,//死循环记录
        dynamicRender: {
            "productName": (text, record) =>{ 
                return  <a href="javascript:;"
                           onClick={this.clickOpenDialog.bind(this, text, record)}>{text}</a>}

        }, //动态编辑表格
        status: "",//接口0 编制中 10提交 -1 退回，只有0可以编辑提交驳回
        startYear: "",//起始年
        signAContractVersionId: "",//调整版本id
        saveData: {},//保存数据临时存储
        dynamicHeaderData:[],
        dynamicDataSource:[],
        dynamicEditButtonShow: false,
    }
    planTable={ //同上
        planHeaderData: [],
        planDataSource: [],
        planEdit: false,
        loading: true
    }
    //版本信息私有数据
    version= { //版本
        saveId:"",//张政所需从版本中过滤出来的id
        currentVersion: "",//当前版本
        versionData: [], //版本数据
        versionShow: false //是否显示版本
    };

    antdTableScrollLock = null;//用来触发卸载原生事件

    componentDidMount() {
        let {dataKey} = this.props.location.query;
        this.SetisApproal();
        if (dataKey) {
            this.getFetData(true);
        }
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
        this.SetisApproal(location)
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
     * 当前是否是审批
     */
    SetisApproal = arg => {

        let stateData = arg ? arg.query : this.props.location.query;
        this.setState({
            isApproal: Boolean(stateData["current"])
        })
        return Boolean(stateData["current"])
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
            let {dynamicTable,planTable,version} = this.state;
            //判断如果
             this.dynamicTable.dynamicEditButtonShow=(this.getShowEidtButtonFilter(this.version.versionData)&&this.dynamicTable.dynamicEditButtonShow);
            dynamicTable = {...dynamicTable,...this.dynamicTable};
            planTable = {...planTable,...this.planTable};
            version = {...version,...this.version};
            this.setState({
                loading:false,
                version, //版本
                dynamicTable, //动态调整
                planTable,//考核版
            });
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
     * 张政=根据isNewVersion==1&&status==0 才显示button
     */
    getShowEidtButtonFilter=dataList=>{
        return dataList.some(arg=>{
            let {isNewVersion,status}=arg;
            if(isNewVersion=="1"&&status=="0"){
                this.version.saveId=arg.id;
                return true;
            }else{
                return false
            }
            
        })
    }
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
        let {dynamicTable, dataKey,mode} = this.state;
        //dataKey = "4100835d-2464-2f9e-5086-bc46a8af14f4";
        //回款
        //let title,data;
        //获取动态数据头部与数据
        
       return Payment.IGetIncomeListEditForAdjustment({dataKey,mode})
               .then(arg=>{
                   let {titleInfo:dynamicHeaderData,incomeDataList:dynamicDataSource}=arg
                   this.dynamicTable={...this.dynamicTable,dynamicHeaderData,dynamicDataSource,dynamicEditButtonShow:Boolean(dynamicDataSource.length)};
                   return "动态调整版本ok"
               }).catch(err=>{ iss.error(err)})
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

        let {planTable, version, dynamicTable, dataKey,mode} = this.state;
        let {dynamicHeaderData} = dynamicTable
        // dataKey = "4100835d-2464-2f9e-5086-bc46a8af14f4";
        //dynamicHeaderData:[],//动态调整版头部 dynamicDataSource:[],//动态调整版数据
        let currentVersion = "", versionData;
        //回款版本
       return Payment.IGetVersionListData({dataKey,mode})
                .then(versionData=>{  //获取select版本
                    this.version = {
                        ...this.version,
                        versionData,
                        currentVersion:this.getCurrentVertion(versionData),
                        versionShow:Boolean(versionData.length)
                    }
                
                    let {currentVersion}=this.version;
                    return Payment.IGetIncomeListEditForCheck({dataKey,currentVersion,mode}) 
                })
                .then(data=>{ //获取考核版数据
                    let {dynamicHeaderData:planHeaderData}=this.dynamicTable;
                    let {incomeDataList:planDataSource}=data;
                    this.planTable={...this.planTable,planHeaderData,planDataSource}
                    return "考核版ok"
                })
                .catch(err=>{
                    iss.error(err);
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
        let {dataKey, dynamicTable,mode} = this.state;
        let {dynamicDataSource} = dynamicTable;
        let {saveData, signAContractVersionId} = this.dynamicTable;//非stage存储保存数据

        saveData=this.filterSaveData(dynamicDataSource);//递归赋值    
        let _da = JSON.stringify({
                    projectLevel:mode,
                    saveList:saveData
            });
        
        let paramsData={  //张政与瑞涛约定传参paramsData为固定参数
            paramsData:_da
            }
     
        return Payment.ISaveIncomeInfo(paramsData)
            .then(arg => {
                iss.tip({
                    type: "success",
                    description: "保存成功"
                });
                return _da;
            })
            .then(arg => {
                this.setState({
                    loading:false
                })
                //this.getDynamicData();//重新拉去数据
            })
            .catch(err => {
                this.setState({
                    loading:false
                })
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
       let listdata =[]; 
       da.forEach(arg => {
              let reg = /month_\d{1,2}/;
             
              for(let li in arg){
                  if(reg.test(li)&&arg[li]!=null){  //张政所需数据
                    listdata.push({
                        filedId:li,
                        versionId:arg.versionId,
                        id:arg.key,
                        value:arg[li],
                        year:arg.yearD
                    })
                      
                  }
              }
        });
        
      return listdata;
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
        let {dialog}=this.state;
        let {signForIncome:dialogContent}=row;
        dialogContent=dialogContent.length? dialogContent:dialog.dialogContent;//测试数据
        if(dialogContent.length<=0){ iss.info(`${text}-暂无可查看信息`);return}
             dialog = {...dialog,dialogContent,ModalVisible:true};
             this.setState({
                dialog
             })
      

    }
    /**
     * talbe input
     */
    onDataChangeDynamic=arg=>{

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
     * 驳回
     */
    handleCancel = () => {
        const {saveId:versionId} = this.version;
        Payment.IVersionBack(versionId)
            .then(arg => {
                iss.tip({
                    type: "success",
                    description: "驳回成功"
                });
                this.getFetData();
            })
            .catch(err => {
                iss.error("驳回失败！")
            })

    }

    /**
     * 弹出窗口
     */
    renderDialog = () => {
        let {dialogContent, dialogColumns, ModalTile, ModalVisible} = this.state.dialog;
        dialogColumns = dialogColumns.map((arg,key)=>{
            let {field:dataIndex,name:title,width}=arg;
            return {
                dataIndex,title,width,key
            }
        })
        return <Modal
            title={ModalTile}
            visible={ModalVisible}
            onCancel={this.clickModalCancel}
            onOk={this.clickModalOk}
            style={{"top":0}}
            mask={false}
            footer={false}
        >
        

            <Table
                rowKey="key"
                bordered={true}
                size="small"
                scroll={{x:true,y:100}}
                dataSource={dialogContent}
                columns={dialogColumns}/>
                
        </Modal>

    }
    /**
     * 动态调整table
     */
    renderHistoryData = () => {
        const {versionData, versionId, editable, dynamicTable, loading} = this.state;
        const {dynamicHeaderData, dynamicDataSource, dynamicEdit, dynamicEditButtonShow, defaultHeight} = dynamicTable;
        
        return (
            <article className="toTable signPage">
                <header className="bottom-header-bar">
                    <Row>
                        <Col span={12}>
                            <span className="header-title">回款计划动态调整版（面积：平方米，货值：万元）</span>
                        </Col>
                        <Col span={12}>
                            <div className={dynamicEditButtonShow ? "RT" : "hidden"}>
                                <Popconfirm placement="top" title={"确定发起审批吗？"} onConfirm={this.handleApproval}>
                                    <button className="jh_btn jh_btn22 jh_btn_apro mgR20">发起审批</button>
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
                
                <WrapperGroupTable
                    rowKey="key"
                    loading={loading}
                    size="small"
                    defaultHeight={defaultHeight}
                    onDataChange={this.onDataChangeDynamic}
                    headerData={dynamicHeaderData || []}
                    editState={dynamicEdit}
                    editMode="LastLevel"
                    fixedAble={true}
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
                            <span className="header-title">回款计划考核版（面积：平方米，货值：万元）</span>
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
                <WrapperGroupTable
                    rowKey="key"
                    fixedAble={true}
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
                <ProcessApprovalTab current="payment" allSearchArg={stateData}/>
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
       // let versionId = this.state.versionId; //;
        let newProjectStatus = iss.getEVal("payment");
        const {isProOrStage} = this.props.location.query;
        const {saveId} = this.state.version;//版本id
        iss.hashHistory.push({
            pathname: "/ProcessApproval",
            search: `?e=${newProjectStatus}&dataKey=${saveId}&current=ProcessApproval&areaId=&areaName=&isProOrStage=${isProOrStage}`
        });
        /*      price.IGetProVersion(dataKey)
                 .then(arg => {
                
                 }) */


        //$(window).trigger("treeLoad");
    }
 
    render() {
        const {dataKey,current} = this.props.location.query;
        if (!dataKey&&!current) {
            return this.renderEmpty();
        }
        return (
            <div className="sign-wrapper">
                {this.isApproal()}    
                <Spin size="large" spinning={this.state.loading} tip="加载中请稍后。。。">
                    <article>
                        <Tabs defaultActiveKey="sign">
                            <TabPane tab="回款" key="sign">
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