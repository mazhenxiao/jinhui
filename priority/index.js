// 重点事项
import "babel-polyfill";  //兼容ie
import iss from "../js/iss.js";
import React, { Component } from 'react';
import { Spin, Tabs, Row, Col, Button, Select,Input,Progress,Alert,DatePicker,message,Pagination} from 'antd';
import { AreaService,Priority } from '../services';
import PriorityTable from './priority-table.js';
import PriorityForm from './priority-form.js';
import ProcessApprovalTab from "../components/component-ProcessApproval-Tab.js"; //导航信息
import "../css/tools-processBar.less";
import "../css/button.less";
import "../area/areaCss/areaManage.less";
import "../css/antd.min.css"

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
            "APPROVESTATUS":-2,
            "SELECTEDID": null,
            "SELECTEDLEVEL": 1,
            "CONTENTID":null,
            "ATTACHMENT":[],
        },
        editData:"",
        historyData:"",
        sundryId:this.props.location.state==undefined?"":this.props.location.state.id||"",
        level_id:this.props.location.state==undefined?"":this.props.location.state.level_id||"",
        projectID:"",
        stageId:"",
        index:0,
        total:0,
        pageIndex:1,
    }
    ;
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
    APPROVESTATUS=-2;
    SOLVETIME='0001-01-01'; //最迟解决时间
    PriorityFormDat={
        RISKDESC:"",    //*
        RISKEFFECT:"",  //*
        PROGRESS:"",    //*
        SUPPORT:"",
        POINTLEVEL:-1,   //*
        ISOLVE:-1,       //*
        REPORTTIME:"0001-01-01",    //*
        OWNER:"",         //*
        POST:"",          //*
        SOLVETIME:"0001-01-01",     //*
        PROJECTID:"",     //*
        STAGEID:null,
        ATTACHMENT:[],
    };
    obj = {}

    /**
     * 在组件接收到一个新的prop时被调用,这个方法在初始化render时不会被调用
     * param nextProps 下一阶段的props
     */
    componentWillReceiveProps(nextProps) {
        
        const {location} = nextProps;
        const {dataKey,cancel} = nextProps.location.query;
        if(cancel == "cancel"){
            var th = this;
            iss.ajax({
                url: "/ProjectKayPoint/GetProjectKeyPoint",
                data:{
                    "id":dataKey
                },
                success(data) {
                        var el = data.rows;
                        if(el.ISOLVE == 1){
                            el.ISOLVE = "是"
                        }else if(el.ISOLVE == 0){
                         el.ISOLVE = "否"
                        }
                        if(el.POINTLEVEL == 0){
                         el.POINTLEVEL = "低"
                        }else if(el.POINTLEVEL == 1){
                         el.POINTLEVEL = "中"
                        }else if(el.POINTLEVEL == 2){
                         el.POINTLEVEL = "高"
                        }
        
                        el.REPORTTIME=th.getLocalTime(el.REPORTTIME)
                        el.SOLVETIME=th.getLocalTime(el.SOLVETIME)
                        el.LASTUPDATETIME=th.getLocalTime(el.LASTUPDATETIME)
                    th.setState({
                        addAatterStatus:true,
                        editData : el,
                    })
                },
                error() {
                    message.error('请求失败');
                }
            })
        }
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
                    stageId:stageId,
                    addAatterStatus: false,
                    lookStatus:false,
                    editStatus:false,
                    pageIndex:1,
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
                        "APPROVESTATUS":-2,
                        "CONTENTID":null,
                        "SELECTEDID": this.state.sundryId,
                        "SELECTEDLEVEL": this.state.level_id
                    }
                    this.obj = entityJson
                    this.getAjax(this.obj,this.state.pageIndex);
                });
        }

    }
    componentWillMount() {
        this.SetisApproal();
        this.obj = this.state.entityJson
        this.getAjax(this.obj,this.state.pageIndex);
    }
    componentDidMount(){
        this.rowSelection()
    };

    getLocalTime(nS) {
        if(nS == "/Date(-62135596800000)/" || nS == "/Date(62135596800000)/"){
            return "0001-01-01"
        }else{
            return new Date(parseInt((/\d+/ig).exec(nS)[0])).Format("yyyy-MM-dd")
        }
           
    }     
    rowSelection =()=> {
        var th =this;
        var tbody = $(".priorityData").find(".ant-table-tbody tr");
        tbody.on("click",function(e){
          var index= $(this).index();
          th.index = index;
          $(this).addClass("tr-bg").siblings().removeClass("tr-bg");
          if(e.target.nodeName.toLowerCase() == 'div'){
              th.editChange("look","onlyLook")
          }else{
              th.setState({editStatus:true})
          }
          
        })
    };

    getAjax=(obj,page)=>{
        var th = this;
        let {sundryId:SELECTEDID,level_id:SELECTEDLEVEL}=this.state;
        
        Priority.GetListPage({
            "pageIndex":page,"pageSize":5,"entityJson":JSON.stringify(obj)
        }).then(dataList=>{
            dataList.rows.forEach((el,ind) => {
                if(el.ISOLVE == 1){
                    el.ISOLVE = "是"
                }else if(el.ISOLVE == 0){
                    el.ISOLVE = "否"
                }
                if(el.POINTLEVEL == 0){
                    el.POINTLEVEL = "低"
                }else if(el.POINTLEVEL == 1){
                    el.POINTLEVEL = "中"
                }else if(el.POINTLEVEL == 2){
                    el.POINTLEVEL = "高"
                }

                el.REPORTTIME=th.getLocalTime(el.REPORTTIME)
                el.SOLVETIME=th.getLocalTime(el.SOLVETIME)
                el.LASTUPDATETIME=th.getLocalTime(el.LASTUPDATETIME)
             })
             th.setState({
                 dataList:dataList.rows,
                 total:dataList.total
                },()=>{
                this.rowSelection()
              })
        }).catch(err=>{
        })

    }
    BIND_AddAatter = () =>{
        
        var th=this,id='';
        let {projectID,stageId} = this.state;
        if(projectID == null){
            id = stageId
        }else{
            id = projectID
        }
        Priority.GetOrganization({projectID:id})
                .then(data=>{
                    data.rows.forEach((el,ind) => {
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
    editChange = (look,onlyLook) =>{
        var id=this.state.dataList[this.index].ID;
        var th = this;
        iss.ajax({
            url: "/ProjectKayPoint/GetHistoryList",
            data:{
                "id": id
            },
            success(data) {
                if(data.rows.length>0){
                    if(data.rows[0].APPROVESTATUS==1 && !onlyLook){
                        iss.popover({ content: "审批中，不能编辑！！"});
                    }else{

                        data.rows.forEach((el,ind)=>{
                            if(el.ISOLVE == 1){
                                el.ISOLVE = "是"
                            }else if(el.ISOLVE == 0){
                                el.ISOLVE = "否"
                            }
                            if(el.POINTLEVEL == 0){
                                el.POINTLEVEL = "低"
                            }else if(el.POINTLEVEL == 1){
                                el.POINTLEVEL = "中"
                            }else if(el.POINTLEVEL == 2){
                                el.POINTLEVEL = "高"
                            }
            
                            el.REPORTTIME=th.getLocalTime(el.REPORTTIME)
                            el.SOLVETIME=th.getLocalTime(el.SOLVETIME)
                            el.LASTUPDATETIME=th.getLocalTime(el.LASTUPDATETIME)
                        })
                        var ell = data.rows[0];
                        
                        if(ell.APPROVESTATUS == 99){
                            if(data.rows.length>1){
                                if(data.rows[1].CONTENTID != null){
                                    ell.CONTENTID = data.rows[1].CONTENTID
                                }else{
                                    ell.CONTENTID = data.rows[1].ID 
                                }
                            }else{
                                ell.CONTENTID = ell.ID 
                            }
                            ell.ID = null
                        }
                        
                        
                    if(look == "look"){
                        th.setState({
                            addAatterStatus:true,
                            editData : ell,
                            historyData: data.rows,
                            lookStatus:true
                        })
                    }else{
                        th.setState({
                            addAatterStatus:true,
                            editData : ell,
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
        this.getAjax(this.obj,this.state.pageIndex);
    }
    //暂存
    BIND_Save = (approval) =>{
        
        var entityJson="";
        if(this.state.editData == ""){
            if(approval=="approval"){
                for(let key in this.PriorityFormDat){
                    if(key != "SUPPORT" && key != "STAGEID" && key != "ATTACHMENT"){
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
                "SELECTEDLEVEL": this.state.level_id,
                "ATTACHMENT": this.PriorityFormDat.ATTACHMENT,
            }
        }else{
            entityJson = this.state.editData;
            entityJson.APPROVESTATUS = 0
            if(entityJson.ISOLVE == "是"){
                entityJson.ISOLVE = "1"
            }else if(entityJson.ISOLVE == "否") {
                entityJson.ISOLVE = "0"
            }
            if(entityJson.POINTLEVEL == "低"){
                entityJson.POINTLEVEL = "0"
            }else if(entityJson.POINTLEVEL == "中"){
                entityJson.POINTLEVEL = "1"
            }else if(entityJson.POINTLEVEL == "高"){
                entityJson.POINTLEVEL = "2"
            }
            if(approval=="approval"){
                if(entityJson.PROJECTNAME == "" || entityJson.AREANAME =="" || entityJson.COMPANYNAME=="" 
                || entityJson.RISKDESC==""||entityJson.RISKDESC == null || entityJson.RISKEFFECT==""||entityJson.RISKEFFECT==null
                || entityJson.PROGRESS==""||entityJson.PROGRESS==null || entityJson.POINTLEVEL == "" 
                || (entityJson.ISOLVE != 0 && entityJson.ISOLVE != 1 && entityJson.ISOLVE != 2) 
                || entityJson.REPORTTIME=="" || entityJson.REPORTTIME =="0001-01-01" || entityJson.SOLVETIME=="0001-01-01"
                || entityJson.SOLVETIME=="" || entityJson.OWNER=="" ||entityJson.OWNER==null
                || entityJson.POST=="" || entityJson.POST==null ){
                    // debugger
                    iss.popover({ content: " * 为必填项！！"});
                    return
                }
            }
        }
        var isSave = 0;
        if(approval=="approval"){
            isSave = 1
        }else{
            isSave = 0
        }
        Priority.ProjectKayPointSave({
           "entityJson":encodeURIComponent(JSON.stringify(entityJson)),
           "isSave":isSave
        })
        .then(data=>{
            var status = iss.getEVal("priority");
            if(approval=="approval"){
                $(window).trigger("treeLoad");
                location.href=`/Index/#/ProcessApproval?e=`+status+`&dataKey=`+data.rows+`&current=ProcessApproval&areaId=&areaName=&readOnly=`+data+`&cancel=cancel`;    
            }else{
                iss.popover({ content: "保存成功", type: 2 });
                this.handleLocalSearch()
            }
            this.setState({
                addAatterStatus:false,
                lookStatus:false
            })
            
        })
        .catch(err=>{
            message.error('请求失败');
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
            window.location.href="http://39.106.71.187:8000"+data.rows; 
        }).catch(err=>{
            console.log("导出请求错误")
        })
    }

    
    renderButton = () =>{
        const addAatterStatus=this.state.addAatterStatus;
        let {readOnly,current}=this.props.location.query;
        if(!current){
            if(this.state.lookStatus){
                return(
                    <div>
                        <button type="button" onClick={this.return_Save} className="jh_btn jh_btn22 jh_btn_add">返回</button>
                    </div>
                )
            }else{
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
    APPROVESTATUS_FN = (value) =>{
        this.APPROVESTATUS = value;
    }
    handleLocalSearch = () =>{
        let {PROJECTNAME,POINTLEVEL,ISOLVE,USERNAME,SOLVETIME,APPROVESTATUS}=this;
        let obj = {...this.state.entityJson,...{PROJECTNAME,POINTLEVEL,ISOLVE,USERNAME,SOLVETIME,APPROVESTATUS}}
        obj.SELECTEDID=  this.state.sundryId;
        obj.SELECTEDLEVEL= this.state.level_id;
        this.obj = obj
        this.getAjax(this.obj,this.state.pageIndex);
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
    //翻页
    pageChange = (page,pageSize) =>{
        console.log(page)
        this.setState({
            pageIndex:page
        })
        this.getAjax(this.obj,page);
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
                        <Col span={3}>
                            项目：<Input onChange={this.projectValue_FN} style={{ width: 80 }} />
                        </Col>
                        <Col span={3}>
                            责任人：<Input onChange={this.ownerValue_FN} style={{ width: 80 }} />
                        </Col>
                        <Col span={4}>
                            重要级别：<Select onChange={this.POINTLEVEL_FN} defaultValue="请选择" style={{ width: 80 }}>
                                <Option value="-1">请选择</Option>
                                <Option value="0">低</Option>
                                <Option value="1">中</Option>
                                <Option value="2">高</Option>
                            </Select>
                        </Col>
                        <Col span={4}>
                            是否解决：<Select onChange={this.ISOLVE_FN} defaultValue="请选择" style={{ width: 80 }}>
                                <Option value="-1">请选择</Option>
                                <Option value="1">是</Option>
                                <Option value="0">否</Option>
                            </Select> 
                        </Col>
                        <Col span={3}>
                            状态：<Select onChange={this.APPROVESTATUS_FN} defaultValue="全部" style={{ width: 80 }}>
                                <Option value="-2">全部</Option>
                                <Option value="0">编制中</Option>
                                <Option value="1">审批中</Option>
                                <Option value="99">审批通过</Option>
                            </Select> 
                        </Col>
                        <Col span={5}>
                            最迟解决时间：<DatePicker onChange={this.SOLVETIME_FN} />
                        </Col>
                        <Col span={2} style={{textAlign: "left", paddingLeft: "10px"}}>
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
                    <Row>
                        <Col span={24}>
                            <article>
                                <Pagination pageSize={5} total={this.state.total} onChange={this.pageChange} />
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
            
            if(cancel != "cancel"){
                return this.renderEmpty();
            }
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
