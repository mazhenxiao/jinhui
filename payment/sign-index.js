import "babel-polyfill";  //兼容ie
import iss from "../js/iss.js";
import React, {Component, Children} from 'react';
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
        mode: this.props.location.query.isProOrStage == "1" ? "Project" : this.props.location.query.isProOrStage == "2"?"Stage":"",//显示模式，项目或者分期
        versionId: "",
        versionData: [],
        editable: false,//是否可编辑
        dynamicTable:{
            dynamicHeaderData:[],//动态调整版头部
            dynamicDataSource:[],//动态调整版数据
            dynamicEdit:false, //动态调整是否可编辑
            dynamicEditButtonShow:false
        },
        planTable:{ //同上
            planHeaderData:[],
            planDataSource:[],
            planEdit:false,
           
        },
        version:{ //版本
            currentVersion:"",//当前版本
            versionData:[], //版本数据
            versionShow:false //是否显示版本
        },
        dialog:{ //弹窗
            ModalVisible:false,
            dialogContent:[],//弹出窗口content
        }
  
        
    };
    //protected 数据
    dynamicTable={ //动态表格私有仓储
        number:0,//死循环记录
        dynamicRender:{}, //动态编辑表格
    }

    antdTableScrollLock=null;//用来触发卸载原生事件
    visible=false;
    bindLockArray = [];//promise
    componentDidMount() {
        this.getFetData(true);
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
        nextMode = nextMode == "1" ? "Project" : nextMode == "2"?"Stage":"";

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
      
    }
    /**
     * 获取动态数据，获取签约计划数据，获取版本数据
     * first 判断是否第一次加载dom,如果第一次加载返回promise
     */
    getFetData=(first)=>{
            let dynamicTable = this.getDynamicData(); //获取动态调整表格数据
            let planTable = this.getPlanData();//获取比对版数据
            if(first){ //第一次加载绑定锁定
              return Promise.all([dynamicTable,planTable])
              this.bindScrollLock();        
            }
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
    bindLockTable(){
      knife.ready(".toTable .ant-table-body,.pkTable .ant-table-body",arg=>{
            this.bindScrollLock();
        }) 
    }
    /**
     * 获取动态调整版数据 
     * return promise
     */
    getDynamicData=()=>{
        let {dataKey}=this.props.location.query;
        let {dynamicTable}=this.state;
             dataKey = "f8a6f4a8-ff9b-731b-0c54-53ca93df980a";
             //dynamicHeaderData:[],//动态调整版头部 dynamicDataSource:[],//动态调整版数据
        let title = Payment.IGetSignAContractTableTitle(dataKey)
                           .then(dynamicColum=>{
                           // this.setDynamicRender(dynamicColum);//创建编辑表格
                               return dynamicColum;
                           })
                           .catch(e=>{
                            return e                               
                           })
        let data = Payment.IGetSignAContractData(dataKey)
                          .catch(e=>{
                            return e
                          });
      return Promise.all([title,data])
                    .then(arg=>{
                        let [dynamicHeaderData,dynamicDataSource]=arg,
                            newData ={ 
                                dynamicHeaderData,
                                dynamicDataSource,
                                dynamicEditButtonShow:Boolean(dynamicDataSource&&dynamicDataSource.length)
                            },
                        dynamicTable={...this.state.dynamicTable,...newData};
                        this.setState({dynamicTable});
                        
                    })
                    .catch(arg=>{
                        console.log("动态调整版未拿到数据")
                    })
    }
    /**
     * 返回当前id
     * AList 返回当前版本
     */
    getCurrentVertion=AList=>{
        if(typeof AList =="string"){
            return this.state.version.versionData.filter(arg=>arg.id==AList);

        }else{
            return AList&&AList.length? AList[0].id:""
        }
    }
    /**
     * 获取当前版本下比对版本数据
     * currentVersion 当前版本 返回Promise
     */
    getCurrentVersionPlanData=currentVersion=>{
        let title = Payment.IGetSignAContractTableTitle(currentVersion);//获取表头
        let data = Payment.IGetSignAContractData(currentVersion); //获取数据
        return Promise.all([title,data]);
    }
    /**
     * 获取计划版数据
     * return promise 884dd5a6-ff48-4628-f4fa-294472d49b37
     */
    getPlanData=()=>{
        let {dataKey}=this.props.location.query;
        let {planTable,version}=this.state;
             dataKey = "f8a6f4a8-ff9b-731b-0c54-53ca93df980a";
             //dynamicHeaderData:[],//动态调整版头部 dynamicDataSource:[],//动态调整版数据
        let currentVersion = "",versionData;
        
         return  Payment.IGenerateBudgetVersion(dataKey)
                   .then(Adata=>{
                    currentVersion = this.getCurrentVertion(Adata);
                    versionData = Adata;
                    
                    //假数据后台数据玩成后取消dataKey
                    return this.getCurrentVersionPlanData(dataKey||currentVersion);
                   })
                    .then(([planHeaderData,planDataSource])=>{
                           let newData ={ 
                                planHeaderData,
                                planDataSource,
                               // planEditButtonShow:Boolean(planDataSource&&planDataSource.length)
                            },
                            newVersion={
                                currentVersion,
                                versionData,
                                versionShow:true
                            }
                        planTable={...planTable,...newData};
                        version = {...version,...newVersion};
                        
                        this.setState({planTable,version});
                        
                    })
                    .catch(arg=>{
                        console.log("动态调整版未拿到数据")
                    })
    }
    /**
     * 是否编辑行
     * 递归查询此处如果数据有问题容易出现bug目前先不用
     */
    setDynamicRender=(dynamicColum)=>{
          if(this.dynamicTable.number+=1,this.dynamicTable.number>1000){ console.log("强制判断如果列数据大于1000或死循环强制推出防止如果后台数据有误造成的死循环"); return}
          
          dynamicColum.forEach(arg=>{
                if(arg.children){
                    this.setDynamicRender(arg.children);
                }else if(arg.edit&&arg.edit.indexOf("+w")>=0){
                    
                   this.dynamicTable.dynamicRender[arg.field]=this.renderContent;
                }
        })
        
    }

    handleEdit = () => {
        let {dynamicTable}=this.state;
        let dynamicEdit = !dynamicTable.dynamicEdit;
        dynamicTable={...dynamicTable,...{dynamicEdit}}
        this.setState({
            dynamicTable
        });
        if(dynamicEdit){ //保存

        }
        
    };
    /**
     * 绑定双向滚动
     */
    bindScrollLock(){
      
                let toTable = document.querySelector(".toTable .ant-table-body"),
                    pkTable = document.querySelector(".pkTable .ant-table-body");
                    toTable&&pkTable&&(this.antdTableScrollLock=knife.AntdTable_ScrollLock(toTable,pkTable));
               
    }
    /**
     * 弹出点击取消
     */
    clickModalCancel=()=>{
        let  dialog = {...this.state.dialog,...{ModalVisible:false}}
        this.setState({dialog})
    }
    /**
     * 弹出确定
     */
    clickModalOk=()=>{
        let  dialog = {...this.state.dialog,...{ModalVisible:false}}
        this.setState({dialog})
    }
    renderContent=(arg)=>{
        debugger
    }
    /**
     * 版本下拉菜单事件
     */
    selectChangeVersion=params=>{
        let _da= this.getCurrentVertion(params);
        let versionId = _da.length? _da[0].id:"";
        if(versionId){
            this.getCurrentVersionPlanData(versionId)
                .then(([planHeaderData,planDataSource])=>{
                    let {planTable}=this.state;
                    let newData={
                        planHeaderData,
                        planDataSource
                    }
                    planTable={...planTable,...newData};
                    this.setState({
                        planTable
                    })
                   
                })
        }
        
    }
    
    /**
     * 弹出窗口
     */
    renderDialog=()=>{
        
      return  <article className="Dialog">
           <Modal
                title={this.state.dialog.ModalTile}
                visible={this.state.dialog.ModalVisible}
                onCancel={this.clickModalCancel}
                onOk={this.clickModalOk}
            >
                {this.state.dialogContent}
            </Modal>
        </article>
    }
    /**
     * 动态调整table
     */
    renderHistoryData = () => {
        const {versionData, versionId,editable,dynamicTable} = this.state;
        const {dynamicHeaderData,dynamicDataSource,dynamicEdit,dynamicEditButtonShow}=dynamicTable;
        
        return (
            <article className="toTable">
               <header className="bottom-header-bar">
                    <Row>
                        <Col span={12}>
                            <span className="header-title">签约计划动态调整版（面积：平方米，货值：万元）</span>
                        </Col>
                        <Col span={12}>
                            <div className={dynamicEditButtonShow? "RT":"hidden"}>
                                <button className="jh_btn jh_btn22 jh_btn_edit"
                                        onClick={this.handleEdit}>{dynamicEdit ? "保存" : "编辑"}

                                </button>
                            </div>
                        </Col>
                    </Row>
                </header>
                <WrapperTreeTable 
                    headerData={dynamicHeaderData} 
                    editState={dynamicEdit} 
                    dataSource={dynamicDataSource}  />
            </article>
        );
    };
  /**
   * 比对table
   */
    renderCurrentData = () => {
        const {planTable,dynamicTable,version} = this.state;
        const {planHeaderData,planDataSource}=planTable;
        const {versionData,versionShow,versionId}=version;
        const {dynamicHeaderData,dynamicDataSource,dynamicEdit,dynamicEditButtonShow}=dynamicTable;
        return (
            <article className="pkTable mgT10">
                 <header className="top-header-bar">
                    <Row>
                        <Col span={12}>
                            <span className="header-title">签约计划考核版（面积：平方米，货值：万元）</span>
                        </Col>
                        <Col span={12} className="action-section">
                            
                            <WrapperSelect className={versionShow? "select-version":"hide" } labelText="版本:"
                                           dataSource={versionData} onChange={this.selectChangeVersion}></WrapperSelect>
                        </Col>
                    </Row>
                </header>
                <WrapperTreeTable
                    headerData={dynamicHeaderData} 
                    dataSource={dynamicDataSource}  />
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
                {this.renderDialog()}
            </div>
        );
    }
}

export default SignIndex;