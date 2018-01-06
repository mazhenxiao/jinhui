// 重点事项
import "babel-polyfill";  //兼容ie
import iss from "../js/iss.js";
import React, { Component } from 'react';
import { Spin, Tabs, Row, Col, Button, Select,Input,Progress,Alert,DatePicker} from 'antd';
import { AreaService,Priority } from '../services';
import PriorityTable from './priority-table.js';
import PriorityForm from './priority-form.js';
import ProcessApprovalTab from "../components/component-ProcessApproval-Tab.js"; //导航信息
require("../css/tools-processBar.less");
require("../css/button.less");
require("../area/areaCss/areaManage.less");


class Index extends Component {
    state = {
        addAatterStatus:false,
        dataList:[],
        isApproal:false,
        editStatus:false,
        lookStatus:false,
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
            "APPROVESTATUS":-1,
            "SELECTEDID": null,
            "SELECTEDLEVEL": 1,
            "CONTENTID":null
        },
        editData:"",
        historyData:"",
        sundryId:this.props.location.state==undefined?"":this.props.location.state.id||"",
        level_id:this.props.location.state==undefined?"":this.props.location.state.level_id||"",
        projectID:"",
        index:0
    }

    formData={
        projectName:"",
        areaName:"",
        companyName:"",
        stageName:"" 
    }    
    PROJECTNAME=null; //项目
    USERNAME=null; //负责人
    POINTLEVEL=-1; //重要级别
    ISOLVE=-1; //是否解决
    SOLVETIME='0001-01-01'; //最迟解决时间
    PriorityFormDat={
        RISKDESC:"",    //*
        RISKEFFECT:"",  //*
        PROGRESS:"",    //*
        SUPPORT:"",
        POINTLEVEL:"",   //*
        ISOLVE:"",       //*
        REPORTTIME:"",    //*
        OWNER:"",         //*
        POST:"",          //*
        SOLVETIME:"",     //*
        PROJECTID:"",     //*
        STAGEID:null
    }

    /**
     * 在组件接收到一个新的prop时被调用,这个方法在初始化render时不会被调用
     * param nextProps 下一阶段的props
     */
    componentWillReceiveProps(nextProps) {
        
        const {location} = nextProps;
        this.SetisApproal(location);
        if(location.state != undefined){
            const nextDataKey = location.state.id || "";
            const nextLevel_id = location.state.level_id || "";
            const text = location.state.id || "";
            var nextProjectID = null,areaID = null, companyID=null,stageId=null;
            if(nextLevel_id == 2){
                areaID = text
            }else if(nextLevel_id == 3){
                companyID = text
            }
            if(nextLevel_id == 5){
                 nextProjectID = null;
                 stageId=location.state.id;
                 this.PriorityFormDat.STAGEID = location.state.id;
            }else if(nextLevel_id == 4){
                 stageId=null
                 nextProjectID = location.state.id;
                 this.PriorityFormDat.STAGEID = null;
            }else{
                nextProjectID = null
            }
            //切换路由之后，重新获取数据
                this.setState({
                    sundryId: nextDataKey,
                    level_id:nextLevel_id,
                    projectID:nextProjectID,
                    addAatterStatus: false,
                    lookStatus:false,
                    editStatus:false
                },()=>{
                    var entityJson={ 
                        "ID": null,
                        "AREANAME": null,
                        "AREAID": null,
                        "COMPANYNAME": null,
                        "COMPANYID":null,
                        "PROJECTID": nextProjectID,
                        "PROJECTNAME": null,
                        "STAGEID": stageId,
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
                        "APPROVESTATUS":-1,
                        "CONTENTID":null,
                        "SELECTEDID": this.state.sundryId,
                        "SELECTEDLEVEL": this.state.level_id
                    }
                    this.getAjax(entityJson);
                });
        }
        

    }
    componentWillMount() {
        this.SetisApproal();
        this.getAjax(this.state.entityJson);
    }
    componentDidMount(){
        this.rowSelection()
    };

    getLocalTime(nS) {     
        return new Date(parseInt((/\d+/ig).exec(nS)[0])).Format("yyyy-MM-dd")     
    }     
    rowSelection =()=> {
        var th =this;
        
        var tbody = $(".priorityData").find(".ant-table-tbody tr");
        this.state.dataList.forEach((el,ind)=>{
            if(el.APPROVESTATUS == "1"){
                tbody.eq(ind).find("td:last").addClass("underWay")
            }else if(el.APPROVESTATUS == "99"){
                tbody.eq(ind).find("td:last").addClass("success")
            }else if(el.APPROVESTATUS == 0 || el.APPROVESTATUS == -1){
                tbody.eq(ind).find("td:last").addClass("edit")
            }
        })
        tbody.on("click",function(e){
          var index= $(this).index();
          th.index = index;
          if(e.target.nodeName.toLowerCase() == 'div'){
              th.editChange("look")
          }else{
              th.setState({editStatus:true})
          }
          
        })
    };

    getAjax=(obj)=>{
        var th = this;
        let {sundryId:SELECTEDID,level_id:SELECTEDLEVEL}=this.state;
        
        Priority.GetListPage({
            "pageIndex":1,"pageSize":100,"entityJson":JSON.stringify(obj)
        }).then(dataList=>{
            dataList.forEach((el,ind) => {
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
                el.SOLVETIME=th.getLocalTime(el.SOLVETIME)
                el.LASTUPDATETIME=th.getLocalTime(el.LASTUPDATETIME)
             })
             th.setState({dataList},()=>{
                this.rowSelection()
              })
        }).catch(err=>{
        })

    }
    BIND_AddAatter = () =>{
        
        var th=this;
        let {projectID} = this.state;
        Priority.GetOrganization({projectID})
                .then(data=>{
                    data.forEach((el,ind) => {
                        if(el.ORGLEVEL == 4){
                            this.formData.projectName = el.ORGNAME
                            this.PriorityFormDat.PROJECTID = el.ID
                        }
                        if(el.ORGLEVEL == 3){
                            this.formData.companyName = el.ORGNAME
                        }
                        if(el.ORGLEVEL == 2){
                            this.formData.areaName = el.ORGNAME
                        }
                        if(el.ORGLEVEL == 5){
                            this.formData.stageName = el.ORGNAME
                            this.PriorityFormDat.STAGEID = el.ID
                        }
                    })
                    this.setState({
                        addAatterStatus:true,
                        editData : "",
                        historyData:""
                    })
                })
                .catch(err=>{
                    
                })

    }
    //编辑
    editChange = (look) =>{
        var id=this.state.dataList[this.index].ID;
        var th = this;
        iss.ajax({
            url: "/ProjectKayPoint/GetHistoryList",
            data:{
                "id": id
            },
            success(data) {
                if(data.rows.length>0){
                    if(data.rows[0].APPROVESTATUS==1){
                        iss.popover({ content: "审批中，不能编辑！！"});
                    }else{
                        
                        if(data.rows[0].APPROVESTATUS == 99){
                            if(data.rows.length>1){
                                if(data.rows[1].CONTENTID != null){
                                    data.rows[0].CONTENTID = data.rows[1].CONTENTID
                                }else{
                                    data.rows[0].CONTENTID = data.rows[1].ID 
                                }
                            }else{
                                data.rows[0].CONTENTID = data.rows[0].ID 
                            }
                            data.rows[0].ID = null
                        }
                        data.rows[0].APPROVESTATUS = 0
                        var el = data.rows[0];
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
                        el.SOLVETIME=th.getLocalTime(el.SOLVETIME)
                        el.LASTUPDATETIME=th.getLocalTime(el.LASTUPDATETIME)
                    if(look == "look"){
                        th.setState({
                            addAatterStatus:true,
                            editData : el,
                            historyData: data.rows,
                            lookStatus:true
                        })
                    }else{
                        th.setState({
                            addAatterStatus:true,
                            editData : el,
                            historyData: data.rows
                        })
                    }
                    
                    }
                    
                }else{
                    iss.popover({ content: "数据为空，联系后台人员"});
                }
                    
            },
            error() {
                console.log('失败')
            }
        })
        
    }
    //返回
    return_Save = () => {
        this.setState({
            addAatterStatus:false,
            lookStatus:false
        })
        this.handleLocalSearch();
    }
    //暂存
    BIND_Save = (approval) =>{
        
        var entityJson="";
        if(this.state.editData == ""){
           
            for(let key in this.PriorityFormDat){
                if(key != "SUPPORT" && key != "STAGEID"){
                    if(this.PriorityFormDat[key] == ""){
                        iss.popover({ content: " * 为必填项！！"});
                        // iss.tip({
                        //     type: "error",
                        //     description: "*为必填项！！"
                        // })
                         return 
                    }
                }  
            } 
            var userInfo = iss.userInfo;
            entityJson={
                "ID": null,
                "AREANAME": this.formData.areaName,           //*
                "COMPANYNAME": this.formData.companyName,       //*
                "PROJECTID": this.PriorityFormDat.PROJECTID,    //*
                "PROJECTNAME": this.formData.projectName,       //*
                "STAGEID": this.PriorityFormDat.STAGEID,
                "STAGENAME": null,
                "RISKDESC": this.PriorityFormDat.RISKDESC,       //*
                "RISKEFFECT": this.PriorityFormDat.RISKEFFECT,   //*
                "PROGRESS": this.PriorityFormDat.PROGRESS,      //*
                "SUPPORT": this.PriorityFormDat.SUPPORT, 
                "POINTLEVEL": this.PriorityFormDat.POINTLEVEL, 
                "ISOLVE": this.PriorityFormDat.ISOLVE, 
                "REPORTTIME": this.PriorityFormDat.REPORTTIME, 
                "OWNER": this.PriorityFormDat.OWNER, 
                "USERNAME": null, 
                "POST": this.PriorityFormDat.POST, 
                "SOLVETIME": this.PriorityFormDat.SOLVETIME, 
                "CREATETIME": '0001-01-01', 
                "CREATEUSER": userInfo.ID, 
                "APPROVESTATUS":0,
                "CONTENTID":null,
                "SELECTEDID": this.state.sundryId,
                "SELECTEDLEVEL": this.state.level_id
            }
        }else{
            debugger
            entityJson = this.state.editData;
            if(entityJson.ISOLVE == "是"){
                entityJson.ISOLVE = 1
            }else{
                entityJson.ISOLVE = 0
            }
            if(entityJson.POINTLEVEL == "低"){
                entityJson.POINTLEVEL = 0
            }else if(entityJson.POINTLEVEL == "中"){
                entityJson.POINTLEVEL = 1
            }else{
                entityJson.POINTLEVEL = 2
            }
            if(entityJson.PROJECTNAME == "" || entityJson.AREANAME =="" || entityJson.COMPANYNAME=="" 
            || entityJson.RISKDESC=="" || entityJson.RISKEFFECT=="" || entityJson.PROGRESS=="" || entityJson.POINTLEVEL =="" 
            || (entityJson.ISOLVE != 0 && entityJson.ISOLVE != 1 && entityJson.ISOLVE != 2) || entityJson.REPORTTIME=="" || entityJson.SOLVETIME=="" || entityJson.OWNER=="" 
            || entityJson.POST==""){
                iss.popover({ content: " * 为必填项！！"});
                return
            }
        }
        
        Priority.ProjectKayPointSave({
           "entityJson":JSON.stringify(entityJson)
        })
        .then(data=>{
            var status = iss.getEVal("priority");
            if(approval=="approval"){
                $(window).trigger("treeLoad");
                location.href=`/Index/#/ProcessApproval?e=`+status+`&dataKey=`+data+`&current=ProcessApproval&areaId=&areaName=&readOnly=`+data+`&cancel`;    
            }else{
                this.handleLocalSearch()
            }
            this.setState({
                addAatterStatus:false,
                lookStatus:false
            })
            
        })
        .catch(err=>{
            console.log("失败")
        })

        
    }
    //导出
    exportData = () =>{
        let {PROJECTNAME,POINTLEVEL,ISOLVE,USERNAME,SOLVETIME}=this;
        let obj = {...this.state.entityJson,...{PROJECTNAME,POINTLEVEL,ISOLVE,USERNAME,SOLVETIME}}
        obj.SELECTEDID=  this.state.sundryId;
        obj.SELECTEDLEVEL= this.state.level_id;
        
        Priority.Export({
            "entityJson":JSON.stringify(obj)
        }).then(data=>{
            window.location.href="http://39.106.71.187:8000"+data; 
        }).catch(err=>{
            console.log("导出请求错误")
        })
    }

    
    renderButton = () =>{
        const addAatterStatus=this.state.addAatterStatus;
        let {readOnly,current}=this.props.location.query;
        if(!current){
            if(addAatterStatus){
                return(
                    <div>
                        <button type="button" onClick={this.return_Save} className="jh_btn jh_btn22 jh_btn_add">返回</button>
                        <button type="button" onClick={this.BIND_Save} className="jh_btn jh_btn22 jh_btn_add">暂存</button>
                        <button type="button" onClick={this.BIND_Save.bind(this,"approval")} className="jh_btn jh_btn22 jh_btn_add">发起审批</button>
                    </div>
                )
            }else{
                if(this.state.level_id >3){
                    return(
                        <div>
                            <button type="button" onClick={this.editChange} className={this.state.editStatus ?"jh_btn jh_btn22 jh_btn_add":"hide jh_btn jh_btn22 jh_btn_add"}>编辑</button>
                            <button type="button" onClick={this.BIND_AddAatter} className="jh_btn jh_btn22 jh_btn_add">新增事项</button>
                            <button type="button" onClick={this.exportData} className="jh_btn jh_btn22 jh_btn_add">导出EXCEL</button>
                        </div>
                    )
                }else{
                    return(
                        <div>
                            <button type="button" onClick={this.exportData} className="jh_btn jh_btn22 jh_btn_add">导出EXCEL</button>
                        </div>
                    )
                }
                
            }
        }
    }
    renderHeader = () => {
        let {readOnly}=this.props.location.query;
        if(!readOnly){
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
    }
    projectValue_FN = (e) =>{
        const { value } = e.target;
        this.PROJECTNAME = value;
    }
    ownerValue_FN = (e) =>{
        const { value } = e.target;
        this.USERNAME = value;
    }
    SOLVETIME_FN = (e,value) =>{
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
        let {PROJECTNAME,POINTLEVEL,ISOLVE,USERNAME,SOLVETIME}=this;
        let obj = {...this.state.entityJson,...{PROJECTNAME,POINTLEVEL,ISOLVE,USERNAME,SOLVETIME}}
        obj.SELECTEDID=  this.state.sundryId;
        obj.SELECTEDLEVEL= this.state.level_id;
        this.getAjax(obj);
    }
    PriorityFormCallback = (value,para) =>{
        this.PriorityFormDat[para] = value;
    }
    editDataFormCallback = (value,para) =>{
        if(this.state.editData !=""){
            var obj = this.state.editData;
            obj[para] = value;
            this.setState({editData:obj})
        }
        
    }
    renderContent = () =>{
        const addAatterStatus=this.state.addAatterStatus;
        var th=this;
        let {readOnly,current,dataKey}=this.props.location.query;
        if(addAatterStatus || current){
           return(
               <div>
                   <Row>
                        <Col span={24}>
                            <article>
                                <PriorityForm lookStatus={this.state.lookStatus} historyData = {this.state.historyData} current={current} editData={this.state.editData} readOnly={dataKey} PriorityFormDat={this.PriorityFormDat} callback = {this.state.editData != ""?this.editDataFormCallback.bind(this):this.PriorityFormCallback.bind(this)}  data={this.formData}  />
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
                            最迟解决时间：<DatePicker onChange={this.SOLVETIME_FN} />
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
     * 发起审批
     */
    isApproal = arg => {
        
        let stateData = this.props.location.query;
        if (this.state.isApproal) {
            return <section className="padB20">
                <ProcessApprovalTab current="priority" allSearchArg={stateData}/>
            </section>
        }

    }
    render() {
        let {state,current,dataKey,readOnly,cancel}=this.props.location.query;
        if (this.props.location.state == undefined && !current) {
            return this.renderEmpty();
        }
        return (
            <div className="priorityData">
            {this.isApproal()}
                <article>

                   <Row>
                        <Col span={24}>
                            <article> 
                                {this.renderHeader()}
                            </article>
                        </Col>
                    </Row>
                    {this.renderContent()}
                    </article>
            </div>
        );
    }

}
export default Index;
