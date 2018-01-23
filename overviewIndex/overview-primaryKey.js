import "babel-polyfill";  //兼容ie
import iss from "../js/iss.js";
import React, { Component } from 'react';
import { Spin, Tabs, Row, Col, Button, Select,Input, Popconfirm  } from 'antd';
import { AreaService, PrimaryKey } from '../services';
import {WrapperSelect} from '../common';
import TableBlock from '../primaryKey/table-block';
import ProcessApprovalTab from "../components/component-ProcessApproval-Tab.js"; //导航信息
import "../css/tools-processBar.less";
import "../css/button.less";
import "../area/areaCss/areaManage.less";
class Index extends Component {
    state = {
        dataKey: iss.id.id || "", /*项目id或分期版本id*/
        loading: false,
        editstatus:false,
        savestatus:false,
        TableBlockDATA: {},//数据
        tableDate:"",
        step:"请选择"
    };//绑定数据
    //私有数据
    baseInfo={
        ID:"",
        StepList:[]
    }
    baselist={
        headerData:[],
        dataSource:[]
    }
    
    /**
     * 在组件接收到一个新的prop时被调用,这个方法在初始化render时不会被调用
     * param nextProps 下一阶段的props
     */
    componentWillReceiveProps(nextProps) {
        //切换路由之后，重新获取数据
        if(iss.id.level_id == 5){
            this.setState({
              dataKey: iss.id.id,
              activeTapKey: "plan-quota",
              editstatus:false,
            },()=>{
                      this.PageInit();
                  
              }
            );
        }
            
        
    }
    componentWillMount() {
     }
    componentDidMount(){
            this.PageInit();
        
        
    };
    PageInit=()=>{
       this.IGetDynamicBaseInfo()  
    }
    /**
     * 获取基础数据
     */
    IGetDynamicBaseInfo=()=>{
        var primarykey = this.GetQueryString("primarykey")
        let {dataKey}=this.state,json={};
        if (primarykey) {
            json = {
                stageVersionId:"",
                vid:dataKey,
                quart:""
            }
        }else{
            json = {
                stageVersionId:dataKey,
                quart:""
            }
        }
        PrimaryKey.IGetDynamicBaseInfo(json)
        .then(tableDate=>{
            var sttep="请选择";
            var step = tableDate.baseinfo.FillQuart;
            tableDate.baselist.headerData.forEach((el,i)=>{
                if(el.field == "QUARTVAL"){
                    el.data.forEach((e,i)=>{
                        if(step == e.val){
                            sttep = e.label
                        }
                    })
                    return
                }
                    
            })
            this.setState({
                tableDate,
                step:sttep
            })
        })
                 
    }
    //获取数据
    BIND_TableBlockDATA = (value,key,keyName)=> {
        var obj = this.state.tableDate;
        let {dataKey}=this.state;
        if(key != undefined){
            obj.baselist.dataSource.forEach((el,ind)=>{
                if(el.key == key){
                    el[keyName] = value
                    return
                }
            })
            this.setState({
                tableDate:obj
            })
        }else{
            var sttep="请选择";
            var step = obj.baseinfo.FillQuart;
            obj.baselist.headerData.forEach((el,i)=>{
                if(el.field == "QUARTVAL"){
                    el.data.forEach((e,i)=>{
                        if(step == e.val){
                            sttep = e.label
                        }
                    })
                    return
                }     
            })
            PrimaryKey.IGetDynamicEditData({
                stageVersionId:dataKey,
                quart: value
            })
            .then(tableDate=>{
                obj.baseinfo = tableDate.baseinfo;
                obj.baseinfo.FillQuart = value
                obj.baselist.dataSource.forEach((el,ind)=>{
                    el.QUARTVAL = tableDate.baselist.dataSource[el.QUOTAID]
                })
                this.setState({
                    tableDate:obj,
                    step:sttep
                })
            })
        }
        
    }
    

    //校验是否数据完整
    TestData = (arr) =>{
        var bool = true;
        arr.forEach((el,ind)=>{
            if(el.QUARTVAL == null || el.QUARTVAL == ""){
                bool = false
                return
            }
        })
        return bool
    }

    //点击保存
    handleBindSave = () =>{
        if(this.state.editstatus){
            if(!this.TestData(this.state.tableDate.baselist.dataSource)){
                iss.error("请完善数据！！");
                return
            }
        }
        
        PrimaryKey.ISaveDynamciInfo({
            baseinfo:JSON.stringify(this.state.tableDate.baseinfo),
            data:JSON.stringify(this.state.tableDate.baselist.dataSource)
        })
        .then(arg=>{
            this.PageInit();
            this.setState({
                editstatus:false,
            });
        })
        
        
    }

    //发起审批
    BIND_ROUTERCHANGE = () =>{
        if(this.state.editstatus){
            if(!this.TestData(this.state.tableDate.baselist.dataSource)){
                iss.error("请完善数据！！");
                return
            }
        }
        
        
        PrimaryKey.ISaveDynamciInfo({
            baseinfo:JSON.stringify(this.state.tableDate.baseinfo),
            data:JSON.stringify(this.state.tableDate.baselist.dataSource)
        })
        .then(arg=>{
            const {dataKey} = this.state;
            var status = iss.getEVal("primarykey");
            $(window).trigger("treeLoad");
            location.href=`/Index/#/ProcessApproval?e=`+status+`&dataKey=`+this.state.tableDate.baseinfo.ID+`&vid=`+dataKey+`&current=ProcessApproval&areaId=&areaName=&primarykey=primarykey&isProOrStage=2`;
            this.setState({
                editstatus:false,
            });
        })
    }

    
    
    GetQueryString(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.href.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    }
    
  
    /**
     *  渲染空页面
     */
    renderEmpty = () => {
        return (
            <div className="processBar">
                请选择分期
            </div>
        );
    };
    render() {
        if(iss.id=="" || iss.id.level_id != 5){
          this.renderEmpty()
        }
        return (
            <div className="processBar">
                <Spin size="large" spinning={false} tip="加载中请稍后。。。">
                    <Row>
                        <Col span={24}>
                            <article> 
                            </article>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <article>
                                <TableBlock step={this.state.step} tableDate={this.state.tableDate} editstatus={this.state.editstatus} callback={this.BIND_TableBlockDATA.bind(this)} />
                            </article>
                        </Col>
                    </Row>
                    </Spin>
            </div>
        );
    }
}
export default Index;