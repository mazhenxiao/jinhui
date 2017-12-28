// 重点事项
import "babel-polyfill";  //兼容ie
import iss from "../js/iss.js";
import React, { Component } from 'react';
import { Spin, Tabs, Row, Col, Button, Select,Input,Progress} from 'antd';
import { AreaService } from '../services';
import PriorityTable from './priority-table.js';
import PriorityForm from './priority-form.js';
require("../css/tools-processBar.less");
require("../css/button.less");
require("../area/areaCss/areaManage.less");


class Index extends Component {
    state = {
        addAatterStatus:false,
        dataList:[],
        entityJson:{ 
            "ID": null,
            "AREANAME": null,
            "COMPANYNAME": null,
            "PROJECTID": null,
            "PROJECTNAME": null,
            "STAGEID": null,
            "STAGENAME": null,
            "RISKDESC": null,
            "RISKEFFECT": null, 
            "PROGRESS": null, 
            "SUPPORT": null, 
            "POINTLEVEL": -1, 
            "ISOLVE": -1, 
            "REPORTTIME": '0001-01-01', 
            "OWNER": null, 
            "USERNAME": null, 
            "POST": null, 
            "SOLVETIME": '0001-01-01', 
            "CREATETIME": '0001-01-01', 
            "CREATEUSER": null, 
            "APPROVESTATUS":-1
        },
        sundryId:"",
        level_id:""
    }
    
    PROJECTNAME=null; //项目
    USERNAME=null; //负责人
    POINTLEVEL=-1; //重要级别
    ISOLVE=-1; //是否解决
    SOLVETIME='0001-01-01'; //最迟解决时间
    /**
     * 在组件接收到一个新的prop时被调用,这个方法在初始化render时不会被调用
     * param nextProps 下一阶段的props
     */
    componentWillReceiveProps(nextProps) {
        
        //debugger;
        console.log(nextProps)
        const {location} = nextProps;
        if(location.state != undefined){
            const nextDataKey = location.state.id || "";
            const nextLevel_id = location.state.level_id || "";
            
            //切换路由之后，重新获取数据
                this.setState({
                    sundryId: nextDataKey,
                    level_id:nextLevel_id
                },()=>{
                    this.getAjax(this.state.entityJson);
                });
        }
        

    }
    componentWillMount() {
        if(this.state.sundryId != ""){
            this.getAjax(this.state.entityJson);
        }
        
    }
    componentDidMount(){
        console.log(this.props)
    };

    getLocalTime(nS) {     
        return new Date(parseInt((/\d+/ig).exec(nS)[0])).Format("yyyy-MM-dd")     
    }     
     

    getAjax(obj) {
        var th = this;
        
        iss.ajax({
            url: "/ProjectKayPoint/GetListPage",
            data:{
              "SELECTEDID":th.state.sundryId,
              "SELECTEDLEVEL":th.state.level_id,
              "pageIndex":1,
              "pageSize":10,
              "entityJson":JSON.stringify(obj)
            },
            success(data) {
                if(data.errorcode == 200 || data.errorcode == 202){
                    data.rows.forEach((el,ind) => {
                       if(el.ISOLVE == 1){
                           el.ISOLVE = "是"
                       }else{
                        el.ISOLVE = "否"
                       }
                       if(el.POINTLEVEL == 0){
                        el.POINTLEVEL = "低"
                       }else if(el.POINTLEVEL == 1){
                        el.POINTLEVEL = "中"
                       }else{
                        el.POINTLEVEL = "高"
                       }

                       el.REPORTTIME=th.getLocalTime(el.REPORTTIME)
                       el.CREATETIME=th.getLocalTime(el.CREATETIME)
                       el.SOLVETIME=th.getLocalTime(el.SOLVETIME)
                    })
                    th.setState({
                        dataList:data.rows  
                    }
                );
                }
            },
            error() {
                console.log('失败')
            }
        })
    }
    BIND_AddAatter = () =>{
        this.setState({
            addAatterStatus:true,
        })
    }
    BIND_Save = () =>{
        this.setState({
            addAatterStatus:false,
        })
    }

    
    renderButton = () =>{
        const addAatterStatus=this.state.addAatterStatus;
        if(addAatterStatus){
            return(
                <div>
                    <button type="button" onClick={this.BIND_Save} className="jh_btn jh_btn22 jh_btn_add">暂存</button>
                    <button type="button" className="jh_btn jh_btn22 jh_btn_add">发起审批</button>
                </div>
            )
        }else{
            return(
                <div>
                    <button type="button" onClick={this.BIND_AddAatter} className="jh_btn jh_btn22 jh_btn_add">新增事项</button>
                    <button type="button" className="jh_btn jh_btn22 jh_btn_add">导出EXCEL</button>
                </div>
            )
        }
    }
    renderHeader = () => {
        return (
            <div>
            <div className="boxGroupTit">
                    <p><span>重点事项</span></p>
                    <div>
                        <div className="areaTopbtn jhBtn-wrap">
                            {this.renderButton()}
                        </div>
                    </div>
            </div>
        </div> 
            
        );
    }
    projectValue_FN = (e) =>{
        const { value } = e.target;
        this.PROJECTNAME = value;
    }
    ownerValue_FN = (e) =>{
        const { value } = e.target;
        this.USERNAME = value;
    }
    SOLVETIME_FN = (e) =>{
        const { value } = e.target;
        if(value == ""){
            this.SOLVETIME='0001-01-01';
        }else{
            this.SOLVETIME=value
        }
    }
    POINTLEVEL_FN = (value) =>{
        this.POINTLEVEL = value;
    }
    ISOLVE_FN = (value) =>{
        this.ISOLVE = value;
    }
    handleLocalSearch = () =>{
        if(this.PROJECTNAME != "" || this.USERNAME!="" || this.SOLVETIME != "" || this.POINTLEVEL!="" || this.ISOLVE!=""){
            let {PROJECTNAME,POINTLEVEL,ISOLVE,USERNAME,SOLVETIME}=this;
            
            let obj = {...this.state.entityJson,...{PROJECTNAME,POINTLEVEL,ISOLVE,USERNAME,SOLVETIME}}
            console.log("objs",obj);
            console.log(obj)
            this.getAjax(obj);
            
        }
    }
    renderContent = () =>{
        const addAatterStatus=this.state.addAatterStatus;
        if(addAatterStatus){
           return(
               <div>
                   <Row>
                        <Col span={24}>
                            <article>
                                <PriorityForm />
                            </article>
                        </Col>
                    </Row>
               </div>
           )
        }else{
            return(
                <div className="PriorityTable">
                    <Row>
                        <Col span={4}>
                            项目：<Input onChange={this.projectValue_FN} />
                        </Col>
                        <Col span={4}>
                            责任人：<Input onChange={this.ownerValue_FN} />
                        </Col>
                        <Col span={4}>
                            重要级别：<Select onChange={this.POINTLEVEL_FN} defaultValue="请选择" style={{ width: 100 }}>
                                <Option value="-1">请选择</Option>
                                <Option value="0">低</Option>
                                <Option value="1">中</Option>
                                <Option value="2">高</Option>
                            </Select>
                        </Col>
                        <Col span={4}>
                            是否解决：<Select onChange={this.ISOLVE_FN} defaultValue="请选择" style={{ width: 100 }}>
                                <Option value="-1">请选择</Option>
                                <Option value="1">是</Option>
                                <Option value="0">否</Option>
                            </Select> 
                        </Col>
                        <Col span={5}>
                            最迟解决时间：<Input onChange={this.SOLVETIME_FN} placeholder="格式：yyyy-mm-dd" style={{ width: 125 }} />
                        </Col>
                        <Col span={3} style={{textAlign: "left", paddingLeft: "10px"}}>
                            <Button onClick={this.handleLocalSearch}>查询</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <article>
                                <PriorityTable dataList={this.state.dataList}/>
                            </article>
                        </Col>
                    </Row>
                </div>
            )
        }
    }
    renderEmpty = () => {
        return (
            <div className="processBar">
                <p>请点击左侧树</p>
            </div>
        );
    };
    render() {
        if (this.props.location.state == undefined) {
            return this.renderEmpty();
        }
        return (
            <div className="processBar">
                   <Row>
                        <Col span={24}>
                            <article> 
                                {this.renderHeader()}
                            </article>
                        </Col>
                    </Row>
                    {this.renderContent()}
            </div>
        );
    }

}
export default Index;