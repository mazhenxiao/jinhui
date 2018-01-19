import "babel-polyfill";  //兼容ie
import iss from "../js/iss.js";
import React, { Component } from 'react';
import { Spin, Tabs, Row, Col, Button, Select,Input, Popconfirm  } from 'antd';
import { AreaService, PrimaryKey } from '../services';
import {WrapperSelect} from '../common';
import TableBlock from './table-block';
import "../css/tools-processBar.less";
import "../css/button.less";
import "../area/areaCss/areaManage.less";
class Index extends Component {
    state = {
        dataKey: this.props.location.query.dataKey || "", /*项目id或分期版本id*/
        mode: this.props.location.query.isProOrStage == "1" ? "Project" : this.props.location.query.isProOrStage == "2" ? "Stage" : "",//显示模式，项目或者分
        isApproal: false, //是否是审批
        loading: false,
        editstatus:false,
        savestatus:false,
        TableBlockDATA: {},//数据
        tableDate:""
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
        
        const {dataKey, mode} = this.state;
        const {location} = nextProps;
        const nextDataKey = location.query.dataKey || "";
        let nextMode = location.query.isProOrStage || "";
        nextMode = nextMode == "1" ? "Project" : "Stage";

        //切换路由之后，重新获取数据

        
            this.setState({
                    dataKey: nextDataKey,
                    mode: nextMode,
                    activeTapKey: "plan-quota",
                },()=>{
                    if (nextProps.location.query.isProOrStage ==2) {
                        this.PageInit();
                    } 
                }
            );
        
    }
    componentWillMount() {
        
     }
    componentDidMount(){
        if (this.props.location.query.isProOrStage ==2) {
            this.PageInit();
        }
        
    };
    PageInit=()=>{
       this.IGetDynamicBaseInfo()  
    }
    /**
     * 获取基础数据
     */
    IGetDynamicBaseInfo=()=>{
        
        let {dataKey}=this.state;
        PrimaryKey.IGetDynamicBaseInfo({
            stageVersionId:dataKey,
            quart:""
        })
        .then(tableDate=>{
            this.setState({
                tableDate
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
        }else{
            obj.baseinfo.Step = value
            PrimaryKey.IGetDynamicEditData({
                stageVersionId:dataKey,
                quart:"201701"
            })
            .then(tableDate=>{
                obj.baselist.dataSource.forEach((el,ind)=>{
                    el.QUARTVAL = tableDate[el[QUOTAID]]
                })
            })
        }
        this.setState({
            tableDate:obj
        })
    }
    
    //点击编辑
    handleBindEdit = () =>{
        this.setState({
            editstatus:true,
        });
    };

    //点击取消
    handleBindCancel = () =>{
        this.setState({
            editstatus:false,
        });
    }

    //点击保存
    handleBindSave = () =>{
        PrimaryKey.ISaveDynamciInfo({
            baseinfo:JSON.stringify(this.state.tableDate.baseinfo),
            data:JSON.stringify(this.state.tableDate.baselist.dataSource)
        })
        .then(arg=>{
            this.setState({
                editstatus:false,
            });
        })
        
        
    }

    //发起审批
    BIND_ROUTERCHANGE = () =>{
        console.log("发起审批")
    }

    
    
    
    
    /*渲染button*/
    renderButtonList = () => {
        const editstatus = this.state.editstatus;
        //判断是否是编辑状态  编辑状态
        if(!editstatus){
            return (
                <div>
                    <button type="button" onClick={this.handleBindEdit} className="jh_btn jh_btn22 jh_btn_add">编辑</button>
                    <button type="button" onClick={this.BIND_ROUTERCHANGE} className="jh_btn jh_btn22 jh_btn_apro">发起审批</button>
                </div>
            );
        }else{
            return (
                <div>
                        <button type="button" onClick={this.handleBindSave} className="jh_btn jh_btn22 jh_btn_add">保存</button>
                        <button type="button" onClick={this.handleBindCancel} className="jh_btn jh_btn22 jh_btn_add">取消</button>
                        <button type="button" onClick={this.BIND_ROUTERCHANGE} className="jh_btn jh_btn22 jh_btn_apro">发起审批</button>
                </div>  
            );
        } 
    };
    
    renderHeader = () => {
        return (
            <div>
            <div className="boxGroupTit">
                    <p><span>关键指标</span>(货值：万元)</p>
                    <div>
                        <div className="areaTopbtn jhBtn-wrap">
                            <div>
                                {this.renderButtonList()}
                            </div>
                            
                        </div>
                    </div>
            </div>
        </div> 
            
        );
    }
    /**
     *  渲染空页面
     */
    renderEmpty = () => {
        return (
            <div className="processBar">
                请点击项目或分期
            </div>
        );
    };
    render() {
        const {dataKey, current,isProOrStage} = this.props.location.query;
        const {loading}=this.state;
        if (isProOrStage !=2) {
            return this.renderEmpty();
        }
        return (
            <div className="processBar">
                <Spin size="large" spinning={loading} tip="加载中请稍后。。。">
                    <Row>
                        <Col span={24}>
                            <article> 
                                {this.renderHeader()}
                            </article>

                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <article>
                                <TableBlock tableDate={this.state.tableDate} editstatus={this.state.editstatus} callback={this.BIND_TableBlockDATA.bind(this)} />
                            </article>
                        </Col>
                    </Row>
                    </Spin>
            </div>
        );
    }
}
export default Index;