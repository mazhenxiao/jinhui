import "babel-polyfill";  //兼容ie
import React,{Component} from 'react';
import DynamicTable from "../components/tools-dynamicTable.js";
import ProcessApprovalTab from "../components/component-ProcessApproval-Tab.js"; //导航信息
import iss from '../js/iss';
import {knife} from '../utils';
require("../css/tools-dynamicTable.less");
require("../css/groupBuild.less");
require("../css/button.less");
require("../area/areaCss/areaManage.less");
export default class Index extends Component{
    /*渲染button*/
        
        state={
            dataHeader:[],
            dataList:[],
            propsDATA:[],//动态数据
            level_id: "",
            id:"",
            readOnly:false,
            allSearchArg:this.props.location.query,/*地址栏所有参数*/
        }
        number = "2"; //2
        lev ="5"; //5
    componentWillMount() {
        if(this.state.allSearchArg["isProOrStage"]==this.number){
            const lev = this.lev;
            if(this.state.allSearchArg["newId"]){
                var leid = this.state.allSearchArg["newId"];
            }else{
                var leid = this.state.allSearchArg["dataKey"];
            }
            
            this.setState({
                level_id: lev,
                id:leid 
            },()=>{
                this.getAjax();
            })
        }

        this.setState({
            readOnly:this.GetQueryString("readOnly")
        })
    }
    componentDidMount(){
          
    }
    
    GetQueryString(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.hash.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    }
        /**
     * 在组件接收到一个新的prop时被调用,这个方法在初始化render时不会被调用
     * param nextProps 下一阶段的props
     */
    componentWillReceiveProps(nextProps) {
        this.setState({
            allSearchArg:nextProps.location.query,
            readOnly:this.GetQueryString("readOnly")
        },arg=>{
            
            if(this.state.allSearchArg["isProOrStage"]==this.number){
                const lev = this.lev;
                if(this.state.allSearchArg["newId"]){
                    var leid = this.state.allSearchArg["newId"];
                }else{
                    var leid = this.state.allSearchArg["dataKey"];
                }
                this.setState({
                    level_id: lev,
                    id:leid 
                },()=>{
                    this.getAjax();
                })
            }

            
        });
       

   
     
    }
    getAjax(arg) {
        // if(this.props.location.state == undefined){
        //     return
        // }
        iss.fetch({
            type:"GET",
            url: "/ProjectTeam/IGetBaseInfo",
            data:{
                lev:this.state.level_id,
                id:this.state.id
            }
        })
        .then(data=>{
            if(data.errorcode == 200){
                this.setState({
                    propsDATA: data.rows.projectTeamJobList,
                    dataHeader: data.rows.BaseInfo
                })
            }
        })
        .catch(err=>{
            console.log("请求失败")
        })
    }

    handChooseTo(id){
        if(this.state.dataHeader.SaveType == 3){
            iss.popover({ content: "审批中无法编辑"});
            return
        }
        var flag = true;
        if(id == "5CD47D5403E4E993E050A8C054057DED"){
            flag = false;
        }else{
            flag = true
        }
        let th=this;
        let peopleJson={};
        var arr =th.state.propsDATA;

        arr.forEach((el,ind)=>{
            if(el.jobId == id){
                var UserIds = el.UserIds.trim().split(",")
                var UserNames = el.UserNames.trim().split(",")
                UserIds.forEach((ell,indd)=>{
                    if(ell != ""){
                        let PrincipalId={
                            "id":ell,
                            "text":UserNames[indd]
                        }
                        peopleJson[ell]=PrincipalId;
                    }
                })
                
            }
        })
        iss.chooseTo({
            title:"选择人员<i class='fontRed'>（双击选择人员）</i>",
            pepole:peopleJson,  //已选人员名单
            multiple:flag,
            callback(da){
                //console.log(da)
                var text = [],userId =[];
                for(let key in da){
                    text.push(da[key].text)
                    userId.push(da[key].id)
                }
                arr.forEach((el,ind)=>{
                    if(el.jobId == id){
                        el.UserIds = userId.join(",");
                        el.UserNames = text.join(",");
                        if(el.UserNames.substr(0, 1)==","){
                            el.UserNames = el.UserNames.substring(1, el.UserNames.length)
                        }
                        if(el.UserNames.substr(el.UserNames.length-1, el.UserNames.length)==","){
                            el.UserNames = el.UserNames.substring(0, el.UserNames.length-1)
                        }
                    }
                })
                th.setState({
                    propsDATA:arr
                })
            }
        })
    }

    

    holdData = (launch) => {
        if(this.state.dataHeader.SaveType == 3){
            iss.popover({ content: "审批中无法编辑", type: 1 });
            return
        }
        if(launch == "launch"){
            var msg = [],str='';
            //console.log(this.state.propsDATA)
            this.state.propsDATA.forEach((el,ind)=>{
                if(el.Req == 1 && el.UserNames == ""){
                    msg.push(el.jobName)
                }
            })
            if(msg.length>0){
                iss.Alert({
                    title:"以下为必填项",
                    width:300,
                    height:200,
                    content:`<div id="msgAlert">`+msg.join("，")+`</div>`,
                    okVal:"确定",
                    ok(da){}
                })
                return
            }
        }else{
            var msg = [],str='';
            //console.log(this.state.propsDATA)
            this.state.propsDATA.forEach((el,ind)=>{
                if(el.jobName == "项目负责人" && el.UserNames == ""){
                    msg.push(el.jobName)
                    return
                }
            })
            if(msg.length>0){
                // iss.Alert({
                //     title:"提示",
                //     width:300,
                //     height:200,
                //     content:`<div id="msgAlert">项目负责人不能为空！！！</div>`,
                //     okVal:"确定",
                //     ok(da){}
                // })
                iss.popover({ content: "项目负责人不能为空！！！"});
                return
            }
            
        }
        var th = this;
        var teamMaintainStatus = iss.getEVal("teamMaintainStatus");
        var json = {
                'baseinfo':JSON.stringify(this.state.dataHeader),
                'data':JSON.stringify(this.state.propsDATA),
                'EditType':"Save"
            }
           
        iss.fetch({
            type:"POST",
            url: "/ProjectTeam/IToCreate",
            data: json
        })
        .then(data=>{
            iss.popover({ content: "保存成功", type: 2 });
            
            if(launch == "launch"){
                $(window).trigger("treeLoad");
                //以下dataKey为newId
                location.href=`/Index/#/ProcessApproval?e=`+teamMaintainStatus+`&dataKey=${this.state.dataHeader.ID}&current=ProcessApproval&areaId=&areaName=&readOnly=readOnly&isProOrStage=${this.number}&newId=${this.props.location.query.dataKey}`;
            }
        })
        .catch(err=>{   

        })
        
        return
    }
    renderHeader = () => {
        if(this.state.readOnly == "readOnly"){
            return (
                <div>
                    <h3 className="boxGroupTit">
                        <p> <span className='title'>项目团队维护</span>
                            <span className='notes'>（<i className='redFont'></i>为必填项）</span>
                        </p>
                        <div>
                            
                        </div>
                    </h3>
                </div> 
            ); 
        }else{
            return (
                <div>
                    <h3 className="boxGroupTit">
                        <p> <span className='title'>项目团队维护</span>
                            <span className='notes'>（<i className='redFont'></i>为必填项）</span>
                        </p>
                        <div>
                            <div className="areaTopbtn jhBtn-wrap">
                                <button type="button" onClick={this.holdData.bind(this)} className="jh_btn jh_btn22 jh_btn_add">暂存</button>
                                <button type="button" onClick={this.holdData.bind(this,"launch")} className="jh_btn jh_btn22 jh_btn_add">发起审批</button>
                            </div>
                        </div>
                    </h3>
                </div> 
            ); 
        }
         
    };

    formTableRender = () => {
        if(this.state.readOnly == "readOnly"){
            return this.state.propsDATA.map((el,ind) => {
                 if(el.Req == 1){
                     
                     return <li key={ind} className=''>
                                 <label className="redFont">{el.jobName}</label>
                                 <input id={el.jobId} value={el.UserNames||''} className="" type="text" />
                                 <img className="symbol headIcon" src="../../img/head-icon.png" />
                             </li>
                     
                 }else{
                     return <li key={ind} className=''>
                              <label className="">{el.jobName}</label>
                              <input id={el.jobId} value={el.UserNames||''} className="" type="text" />
                              <img className="symbol headIcon" src="../../img/head-icon.png" />
                            </li>
                     
                 }
             }) 
        }else{
            return this.state.propsDATA.map((el,ind) => {
                
                 if(el.Req == 1){
                     
                     return <li key={ind} className=''>
                                 <label className="redFont">{el.jobName}</label>
                                 <input id={el.jobId} onClick={this.handChooseTo.bind(this,el.jobId)} value={el.UserNames||''} className="" type="text" />
                                 <img className="symbol headIcon" src="../../img/head-icon.png" />
                             </li>
                     
                 }else{
                     return <li key={ind} className=''>
                              <label className="">{el.jobName}</label>
                              <input id={el.jobId} onClick={this.handChooseTo.bind(this,el.jobId)} value={el.UserNames||''} className="" type="text" />
                              <img className="symbol headIcon" src="../../img/head-icon.png" />
                            </li>
                     
                 }
             }) 
        }
            
    }
    BIND_CALLBACK=arg=>{

    }
    renderEmpty = () => {
        return (
            <div className="processBar">
                <p>第一步：确保项目已审批通过；</p>
                <p>第二步：确保该项目下的分期已审批通过；</p>
                <p>第三步：点击左侧项目树，选择【分期】，选择团队成员，并点击暂存（暂存后2分钟自动将人员推送到计划系统）；</p>
                <p>重要提示：当前团队维护功能仅支持对【分期】团队成员维护，请勿选择【项目】进行维护。</p>
            </div>
        );
    };
    isProcessApproval=arg=>{
       
        if(this.props.location.query["readOnly"]){
        
            let stateData=this.state;
            return <ProcessApprovalTab current="groupbuild" allSearchArg={stateData.allSearchArg}/>
        }
       
    }
    render(){ 
       
        
        if (this.state.allSearchArg["isProOrStage"]!=this.number) {
            
            return this.renderEmpty();
        }
        return <article>
            {this.isProcessApproval()}
            <div>
                {this.renderHeader()}
            </div>
            <form id="stageInforForm">
                <table className="table-header" width="100%">
                    <tbody>
                        <tr>
                            <th><label className="">所属区域</label></th>
                            <td>
                                <input readOnly={true} id="PROJECTNAME" value={this.state.dataHeader.AreaName || ""} className="" type="text" />
                            </td>
                            <th><label className="">所属城市</label></th>
                            <td>
                                <input readOnly={true} id="PROJECTNAME" value={this.state.dataHeader.CityName || ""} className="" type="text" />
                            </td>
                        </tr>
                        <tr>
                            <th><label className="">项目名称</label></th>
                            <td>
                                <input readOnly={true} id="PROJECTNAME" value={this.state.dataHeader.ProjectName || ""} className="" type="text" />
                            </td>
                            <th><label className="">分期名称</label></th>
                            <td>
                                <input readOnly={true} id="PROJECTNAME" value={this.state.dataHeader.StageName || ""} className="" type="text" />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <ul className='formTable'>
                    {this.formTableRender()}
                </ul>      
            </form>
            <article>
                
            </article>
        </article>
    }
}
