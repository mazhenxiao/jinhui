import "babel-polyfill";  //兼容ie
import iss from "../js/iss.js";
import React, {Component} from 'react';
import {Spin, Tabs, Row, Col, Button, Select,Modal} from 'antd';
import {WrapperTreeTable, WrapperSelect} from '../common';
import {Payment} from '../services';
import  {knife} from '../utils';

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
        mode: this.props.location.query.isProOrStage == "1" ? "Project" : "Stage",//显示模式，项目或者分期
        versionId: "",
        versionData: [],
        editable: false,//是否可编辑
        ModalVisible:false,
        dynamicHeaderData:[],//动态调整版头部
        dynamicDataSource:[],//动态调整版数据
        planHeaderData:[],
        planDataSource:[],

        
    };
    antdTableScrollLock=null;//用来触发卸载原生事件
    visible=false;
    bindLockArray = [];//promise
    componentDidMount() {
        this.getFetData();//拉去数据
        this.renderDialog();//弹出
    }
    componentWillUnmount(){
       // this.antdTableScrollLock.remove();//注销双向绑定
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
        this.getFetData();
    /*     knife.ready(".toTable .ant-table-body,.pkTable .ant-table-body",arg=>{
            this.bindScrollLock();
        }) */
    }
    /**
     * 获取动态数据，获取签约计划数据，获取版本数据
     */
    getFetData=()=>{
     
            let dynamicTable = this.getDynamicData(); //获取动态调整表格数据
     //   this.bindLockArray.push(dynamicData);
      //  this.bindScrollLock(bindLockArray);  //锁定滚动
    }
    getApprovalState = () => {
        if (this.props.location.query["current"] == "ProcessApproval") {
            return true;
        }
        return false;
    };
    /**
     * 获取动态调整版数据 
     */
    getDynamicData=()=>{
        let {dataKey}=this.props.location.query;
             dataKey = "884dd5a6-ff48-4628-f4fa-294472d49b37";
             //dynamicHeaderData:[],//动态调整版头部 dynamicDataSource:[],//动态调整版数据
        let title = Payment.IGetSignAContractTableTitle(dataKey)
                           .catch(e=>{
                            return e                               
                           })
        let data = Payment.IGetSignAContractData(dataKey)
                          .catch(e=>{
                            return e
                          });
      return Promise.all([title,data])
                    .then(arg=>{
                        let [dynamicHeaderData,dynamicDataSource]=arg;
                        console.log("dynamicHeaderData,dynamicDataSource",dynamicHeaderData,dynamicDataSource)
                        this.setState({
                            dynamicHeaderData,
                            dynamicDataSource
                        })
                        
                    })
                    .catch(arg=>{
                        console.log("动态调整版未拿到数据")
                    })
    }

    handleEdit = () => {
        let editable = !this.state.editable;
        this.setState({
            editable: editable,
        });
        if(editable){ //保存

        }else{  //编辑

        }
        
    };
    /**
     * 绑定双向滚动
     */
    bindScrollLock(arr){
        Promise.all(arr)
               .then(arg=>{
                let toTable = document.querySelector(".toTable .ant-table-body"),
                    pkTable = document.querySelector(".pkTable .ant-table-body");
                    toTable&&pkTable&&(this.antdTableScrollLock=knife.AntdTable_ScrollLock(toTable,pkTable));
               })
       
    }
    /**
     * 点击取消
     */
    clickModalCancel=()=>{

    }
    
    
    renderContent=()=>{

    }
    renderDialog=()=>{
        <article className="Dialog">
           <Modal
                title={this.state.ModalTile}
                visible={this.state.ModalVisible}
                onCancel={this.clickModalCancel}
            >
                
            </Modal>
        </article>
    }
    renderHistoryData = () => {
        const {versionData, versionId,editable,dynamicHeaderData,dynamicDataSource} = this.state;
        return (
            <article className="toTable">
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
                <WrapperTreeTable headerData={dynamicHeaderData} dataSource={dynamicDataSource} />
            </article>
        );
    };

    renderCurrentData = () => {
        const {editable,versionData} = this.state;
        return (
            <article className="pkTable mgT10">
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
                请点击左侧树，分期
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
                <Spin size="large" spinning={this.state.loading} >
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