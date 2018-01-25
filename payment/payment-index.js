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
        supperShow:true,
        loading: true,
        dataKey: this.props.location.query.dataKey || "", /*项目id或分期版本id*/
        mode: this.props.location.query.isProOrStage == "1" ? "Project" : this.props.location.query.isProOrStage == "2" ? "Stage" : "",//显示模式，项目或者分
        isApproal: false, //是否是审批
        dynamicTable: {
            versionId:"",//或取数据版本id
            dynamicHeaderData: [],//动态调整版头部
            dynamicDataSource: [],//动态调整版数据
            dynamicEdit: false, //动态调整是否可编辑
            dynamicEditButtonShow: false,
            loading: true,
            defaultHeight: 200,
            adjustmentDataStr:""//title
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
            dialogContent: [{dateInfo:"2018-01-02",signValue:"测试数据",key:1}],//弹出窗口content 
            dialogColumns: [
                {field:"dateInfo",align:"center",name:"时间",width:80,key:"dateInfo"},
                {field:"signValue",align:"center",name:"货值",width:80,key:"signValue"}
            ] //表头
        }


    };
    Jurisdiction=iss.Jurisdiction("payment");
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
        adjustmentDataStr:""//title需要
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
        let {dataKey} = this.state;
        let isApproal =this.SetisApproal();
        if(dataKey){
            this.pageInit(isApproal);
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
            this.dynamicTable.versionId="";
            this.setState({
                    supperShow:true,
                    loading: true,
                    dataKey: nextDataKey,
                    mode: nextMode,
                    activeTapKey: "plan-quota",
                }, arg => {
                    if (nextDataKey) {
                        this.pageInit();
                       // this.getFetData();
                    }
                }
            );
        }
    }
    /**
     * 页面初始化入口
     */
    pageInit=(isApproal=false)=>{
        this.setApproalDataKeyState(isApproal)
        .then(arg=>{   //获取基础数据
           return this.getBaseInfo();
        })
        .then(arg=>{  //获取表格数据
          return this.getFetData();
        })
    }
    /**
     * 判断如果时审批页面则重新设置id
     * 因为setStage方式直接赋值，会异步和刷新整个视图，此时操作不想惊动到视图，用非标准写法
     */
    setApproalDataKeyState=(isApproal)=>{
        let {dataKey} = this.props.location.query;
        if(isApproal){
            return Payment.IGetApprovedInfo(dataKey,"payment")
                   .then(({VERSIONID:versionId,DATAKEY:dataKey,DATALEVEL:mode})=>{
                       this.dynamicTable.versionId=versionId||"";
                       this.state.dataKey=dataKey;  //非法赋值不刷新视图只更改状态
                       this.state.mode=mode;//非法赋值不刷新视图只更改状态

                   })
        }else{
            return Promise.resolve("ok非审批");
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
     * 获取基础数据
     * dataKey,projectLevel,versionId
     */
    getBaseInfo=()=>{   
        //let {dataKey} = this.props.location.query;
        let {dataKey,mode:projectLevel} =this.state;
        let {versionId}=this.dynamicTable;  //如果时审批页面已经赋值了
        versionId=versionId||"";
        return Payment.IGetBaseInomeInfo({dataKey,projectLevel,versionId})
               .then(arg=>{  //versionId会再次返回
                
                   let {isEdit:dynamicEditButtonShow,adjustmentDataStr,versionId}=arg;
                 
                   dynamicEditButtonShow = Boolean(dynamicEditButtonShow);
                    this.dynamicTable={...this.dynamicTable,versionId,dynamicEditButtonShow,adjustmentDataStr}
                   
               }) 
    }
    /**
     * 获取动态数据，获取签约计划数据，获取版本数据
     */
    getFetData = () => {
        this.dynamicTable.saveData = {};
        //获取动态调整表格数据
        let {dataKey,mode}=this.state;
        let dynamicTable = this.getDynamicData({dataKey,mode});
        //获取比对版数据   
        let planTable = this.getPlanData({dataKey,mode});

        return Promise.all([dynamicTable, planTable]).then(arg => {
            //获取弹窗数据如果需要，因为张权说要给一个获取的id不知道依赖在哪里，先放到这,估计需要从动态表获取
            let {dynamicTable,planTable,version} = this.state;
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
    getDynamicData = ({dataKey,mode}) => {
        let {current}=this.props.location.query;
        let edit = this.dynamicTable.dynamicEditButtonShow;
        let {versionId}=this.dynamicTable;
        let {supperShow}=this.state;
        //dataKey = "4100835d-2464-2f9e-5086-bc46a8af14f4";
        //回款
        //let title,data;
        //获取动态数据头部与数据
        
       return Payment.IGetIncomeListEditForAdjustment({dataKey,versionId,mode})
               .then(arg=>{
                   let {titleInfo:dynamicHeaderData,incomeDataList:dynamicDataSource}=arg
                   this.dynamicTable={
                       ...this.dynamicTable,
                       dynamicHeaderData,
                       dynamicDataSource,
                       dynamicEditButtonShow:supperShow&&!current&&edit&&Boolean(dynamicDataSource.length)};
                   return "动态调整版本ok"
               })
               .catch(err=>{ iss.error(err)})
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
    getPlanData = ({dataKey,mode}) => {

        
        let {dynamicHeaderData,versionId} = this.dynamicTable
        // dataKey = "4100835d-2464-2f9e-5086-bc46a8af14f4";
        //dynamicHeaderData:[],//动态调整版头部 dynamicDataSource:[],//动态调整版数据
        let currentVersion = "", versionData;
        //回款版本
       return Payment.IGetVersionListData({dataKey,mode})
                .then(versionData=>{  //获取select版本
                    this.version = {
                        ...this.version,
                        versionData,
                        saveId:versionId,//改造成为当前版本id
                        currentVersion:this.getCurrentVertion(versionData),
                        versionShow:Boolean(versionData.length)
                    }
                    let {currentVersion}=this.version;
                    
                    return Payment.IGetIncomeListEditForCheck({dataKey,currentVersion,mode}) 
                })
                .then(data=>{ //获取考核版数据
                    let {incomeDataList:planDataSource}=data;
                    this.planTable={...this.planTable,planHeaderData:dynamicHeaderData,planDataSource}
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
        let currentVersion = params; // _da.length? _da[0].id:"";
        let {version,dataKey,mode,planTable} = this.state;
        let {dynamicHeaderData} = this.state.dynamicTable
        version = {...version, currentVersion: params}
        if (currentVersion) {
            Payment.IGetIncomeListEditForCheck({dataKey,currentVersion,mode})
                    .then(({incomeDataList:planDataSource}) => {
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
                this.state.supperShow=false;//非法赋值为了不刷新view
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
                pagination={false}
                scroll={{x:true,y:100}}
                dataSource={dialogContent}
                columns={dialogColumns}/>
                
        </Modal>

    }
    /**
     * 动态调整table
     */
    renderHistoryData = () => {
        const {dynamicTable, loading} = this.state;
        const {dynamicHeaderData, dynamicDataSource, dynamicEdit, dynamicEditButtonShow, defaultHeight,adjustmentDataStr} = dynamicTable;
        
        return (
            <article className="toTable signPage">
                <header className="bottom-header-bar">
                    <Row>
                        <Col span={12}>
                            <span className="header-title">回款计划{adjustmentDataStr}动态调整版（单位：万元）</span>
                        </Col>
                        <Col span={12}>
                            <div className={dynamicEditButtonShow ? "RT" : "hidden"}>
                                {
                                    Boolean(this.Jurisdiction.includes("approval"))&& 
                                    <Popconfirm placement="top" title={"确定发起审批吗？"} onConfirm={this.handleApproval}>
                                    <button className="jh_btn jh_btn22 jh_btn_apro mgR20">发起审批</button>
                                </Popconfirm>
                                }
                                {
                                     Boolean(this.Jurisdiction.includes("revert"))&&
                                     <Popconfirm placement="top" title={"确定退回吗？"} onConfirm={this.handleCancel}>
                                    <button className="jh_btn jh_btn22 refresh-icon mgR20">退回</button>
                                    </Popconfirm>
                                }
                                {
                                     Boolean(this.Jurisdiction.includes("edit"))&&
                                     <button className="jh_btn jh_btn22 jh_btn_edit"
                                    onClick={this.handleEdit}>{dynamicEdit ? "保存" : "编辑"}
                                    </button>
                                }
                               
                              
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
        const {dynamicHeaderData, defaultHeight,adjustmentDataStr} = dynamicTable;
        return (
            <article className="pkTable mgT10 signPage">
                <header className="top-header-bar">
                    <Row>
                        <Col span={12}>
                            <span className="header-title">回款计划历史版本（单位：万元）</span>
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
                <h3>回款计划操作指引</h3>
                <p>1、前置条件：签约计划已排完，并已提交。</p>
                <p>2、点击【编辑】按钮，以分期维度填写本月及未来的回款计划。</p>
                <p>3、排完回款计划，点击【发起审批】按钮，并审批通过。</p>
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
        const {isProOrStage,dataKey} = this.props.location.query;  //businessId 用来点击返回时退回
        const {saveId} = this.state.version;//版本id
        iss.hashHistory.push({
            pathname: "/ProcessApproval",
            search: `?e=${newProjectStatus}&dataKey=${saveId}&businessId=${dataKey}&current=ProcessApproval&areaId=&areaName=&isProOrStage=${isProOrStage}`
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