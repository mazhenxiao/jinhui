// 重点事项
import "babel-polyfill";  //兼容ie
import iss from "../js/iss.js";
import React, { Component } from 'react';
import { Spin, Tabs, Row, Col, Button, Select,Input,Progress,Alert,DatePicker,message,Pagination} from 'antd';
import { AreaService,Priority } from '../services';
import PriorityTable from '../priority/priority-table.js';
import "../css/tools-processBar.less";
import "../css/button.less";
import "../area/areaCss/areaManage.less";
import "../css/antd.min.css"

class Index extends Component {
    state = {
        addAatterStatus:false,
        dataList:[],
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
            "SELECTEDID": iss.id.id,
            "SELECTEDLEVEL": iss.id.level_id,
            "CONTENTID":null,
            "ATTACHMENT":[],
        },
        editData:"",
        historyData:"",
        sundryId:"",
        level_id:"",
        projectID:"",
        stageId:"",
        index:0,
        total:0,
        pageIndex:1,
        editS:false
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
        var obj = this.state.entityJson
        obj.SELECTEDID=iss.id.id,
        obj.SELECTEDLEVEL=iss.id.level_id 
        this.setState({
          entityJson:obj
        },()=>{
          this.getAjax(this.obj,this.state.pageIndex);
        })
        //this.getAjax(this.obj,this.state.pageIndex);

    }
    componentWillMount() {
        this.obj = this.state.entityJson
        this.getAjax(this.obj,this.state.pageIndex);
    }
    componentDidMount(){
      
     
    };

    getLocalTime(nS) {
        if(nS == "/Date(-62135596800000)/" || nS == "/Date(62135596800000)/"){
            return "0001-01-01"
        }else{
            return new Date(parseInt((/\d+/ig).exec(nS)[0])).Format("yyyy-MM-dd")
        }
           
    }     


    getAjax=(obj,page)=>{
        var th = this;
        let {sundryId:SELECTEDID,level_id:SELECTEDLEVEL}=this.state;
        
        Priority.GetListPage({
            "pageIndex":page,"pageSize":1000000,"entityJson":JSON.stringify(obj)
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
        return(
          <Row>
            <Col span={24}>
                <article>
                    <PriorityTable dataList={this.state.dataList}/>
                </article>
            </Col>
          </Row>
        )
            
        
    }

    render() {

        return (
            <div className="priorityData">

                <article>
                    {this.renderContent()}
                    </article>
            </div>
        );
    }

}
export default Index;
