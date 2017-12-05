/**
 * type:edit 编辑页面没有按钮和信息 流程可选
 * type:submit 包含通过、驳回 流程不可选
 * type:read   只有已阅  流程不可选
 */
/*审批信息*/
import React from 'react';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie

import "../css/newProjectApproval.less";
class ApprovalControlNode extends React.Component {
    constructor(arg) {
        super(arg);
        this.state = {
            aOpinions: "审核意见",
            aList: [],
            InfoData: [],//流程信息
            allSearchArg:this.props.allSearchArg,
            history:[] //历史纪录
        }
        this.type ="edit"  //this.props["type"] || "edit"; //以防外部没有设置type类型
        
        this.selectedFlows = [] //选人数据 
        this.currentApprovalList=sessionStorage.getItem("currentApprovalList")? JSON.parse(sessionStorage.getItem("currentApprovalList")):[];
    }
    componentWillMount() {
        if (this.props.callback) {
            this.props.callback(this);
        }
        this.GetAjax();

    }
    /*监听审核意见*/
    changeAOinions(event) {
        this.setState({ aOpinions: event.target.value });
    }
    GetAjax() {
        let th = this;
        let allSearchArg=th.state.allSearchArg;
        let getInfo = {
            entiId: allSearchArg['e'],
            dataKey: allSearchArg['dataKey'],
            userId: iss.userInfo.ID,
            comanyId:allSearchArg["areaId"],
            comanyName:allSearchArg["areaName"]
        }
        iss.ajax({ //流程导航
            url: "/iWorkflow/Workflow/api/WFServices.asmx/GetSubmitWorkflows",
            type: "POST",
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(getInfo),
            success(result) {
            	
                th.setState({
                    InfoData: JSON.parse(result.d.Data)
                });
            },
            error(e) {

            }
        })
        let url = "/iWorkflow/Workflow/api/WFServices.asmx/GetFlowLog";//获取历史纪录
        iss.ajax({
            url: url,
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(getInfo),
            success(da) {
                if (da.d.Data) {
                    th.setState({
                        history: JSON.parse(da.d.Data)["Rows"]
                    });
                }
            }
        });
    }
    EVENT_CHANGE_LIST(da, ev) { //修改
        var th = this,_data = this.state.InfoData[0]["Flows"];
        var id = (ev.target.value);
        for(var i = 0 ;i< this.selectedFlows.length;i++){
            if(this.selectedFlows[i]["ContextGuid"]==da.Id){
                this.selectedFlows[i]["Participants"]=id;
                
            }
        }
        sessionStorage.setItem("currentApprovalList",JSON.stringify(this.selectedFlows));
    }
    EVENT_CHANGE_CHECKBOX(da, ev) {//input
        var ta = ev.target;
        this.selectedFlows.forEach((el, ind) => {
            if (el.ContextGuid == da.Id) {
                //el.Participants=
                let str = el.Participants.join(",");
                if (!ta.checked) {

                    let regs = new RegExp(ta.value + ",*", "ig");
                    let ar = str.replace(regs, "").replace(/\,$/ig, "")//.split(",");
                    el.Participants = ar.length <= 0 ? [] : ar.split(",");

                } else {
                    if (str.indexOf(ta.value) < 0) {
                        el.Participants.push(ta.value);
                    }

                }

                return;
            }
        });
        sessionStorage.setItem("currentApprovalList",JSON.stringify(this.selectedFlows));
    }
    //========提交、返回=========================================
    evConfirmSubmitTo(){
        var th=this;
        iss.checkLogin(arg=>{
            iss.evConfirmAlert("是否确认提交",th.EVENT_CLICK_SUBMIT.bind(th));
        })
    	
    }
    EVENT_CLICK_SUBMIT() {  //当前填报人提交
        var th = this;
        iss.ajax({ //老代码不再进行封装修改。
            url:"/Stage/ICreateProVersion",
            data:{
                "id":allSearchArg['dataKey']
            }
        }).done(arg=>{
            debugger
        }).fail(e=>{

        })
      //  th.BIND_CHECKED();  //检查数据
    }
    BIND_CHECKED() {   //第一次ajax提交检查数据
    	var th = this;
    	var allSearchArg=th.state.allSearchArg;
    	
        var dto = {
            "runtimeUnique": {
                EntiId:allSearchArg['e'],// 实体ID
                DataKey:allSearchArg['dataKey']// 业务ID
            }
        };
        var turnOut = true;
        
        iss.ajax({
            url: "/iWorkflow/Workflow/api/WFServices.asmx/IsSubmitted",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(dto),
            success: function (result) {
                if (result.d["Data"] == "false" && result.d["Success"] == true) {
                    th.BIND_CHECKEDSUCESS();//二次提交
                }else{
                    iss.popover({content:result.d.Message});
                    $(window).trigger("treeLoad");
                }
            }
        });

    }
    BIND_CHECKEDSUCESS() {  //当前填报人第二次ajax提交提交流程
        let th = this;
        var allSearchArg=th.state.allSearchArg;
        let basicInfor= {
            DataKey: allSearchArg['dataKey'],// 业务ID,
            EntiId: allSearchArg["e"],
            EventUserId: iss.userInfo.ID,//当前登陆人
            Files: [],//附件
            ProcessComment:this.props["data"]||""
        }
      
        let sbarr2 = this.selectedFlows.map((el,ind)=>{
               if(typeof el.Participants=="string"){
                    el.Participants=[el.Participants.toString()];
               }
               return el;
        })

        let submitdata = JSON.stringify({
            submitData: basicInfor,
            selectedFlows: sbarr2
        });
        iss.ajax({
            url: "/iWorkflow/Workflow/api/WFServices.asmx/SubmitWorkflow",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: submitdata,
            success: function (result) {
                var rt = result.d;
                // turnOut = rt.Success;
                if (rt.Success == true) {
                    iss.popover({content:"提交成功！",type:2});
                    sessionStorage.removeItem("currentApprovalText");//清楚临时历史数据存储，解决路由切换不能记录用户输入内容问题
                    sessionStorage.removeItem("currentApprovalList");//清楚临时历史数据存储，解决路由切换不能记录用户选择内容问题
                    $(window).trigger("treeLoad");
                    iss.hashHistory.push({pathname:"agenty"});
                   
                } else {
                    iss.popover({content:rt.Message});
                }
            }
        });

    }
    setInfoDataList() {  
        var th = this;
        if (!th.state.InfoData.length) { return }
        let list = th.state.InfoData[0]["Flows"];
        th.selectedFlows = th.currentApprovalList.length? th.currentApprovalList:[];
        return list.map((el, ind) => {
            let submit =
                { //提交数据
                    ContextGuid: el.Id, //自己id
                    FlowName: el.Text,  //Text 节点名称
                    FlowType: el.Type,  //流程类型
                    FlowType2: el.FlowType2, //加嵌
                    ParentContextGuid: el.PId, //父id
                    Participants: [], //用户
                    RunFlowId: "0"//流程节点
                }, userArra = [];
                !th.currentApprovalList.length&&th.selectedFlows.push(submit);  //按地址引用先push后修改
            let _id=this.currentApprovalList.length? this.currentApprovalList[ind]["Participants"]:"";
            if (el.Type == "Approve" && th.type == "edit" && el.Users.length >= 2) {
                let arr1 =  el.Users.filter((v1,i1)=>{ return v1});
                return <li key={ind}>
                    <span>{el.Text}</span>
                    <select ref="select" defaultValue={_id} onChange={th.EVENT_CHANGE_LIST.bind(th, el)}>
                        {
                            arr1.map((ee, ii) => {
                               
                                if (ii == 0) {
                                    userArra.push(ee.UId);
                                    submit.Participants = userArra;
                                }
                                return <option key={ii} value={ee.UId}>{ee.Name}</option>
                            })
                        }
                    </select>
                </li>
            } else if (el.Type == "AutoInform" && th.type == "edit") {
                let arr2 =  el.Users.filter((v2,i2)=>{ return v2});
                _id=(typeof _id!="string")? _id.join(","):"";
                return <li key={ind} ><span>{el.Text}【
                    {
                        arr2.map((h, l) => {
                            
                            userArra.push(h.UId);
                            submit.Participants = userArra;
                            return <label key={l}><input key={l} type="checkbox" defaultChecked={_id? _d.indexOf(h.UId)>=0:"true" } value={h.UId} onChange={th.EVENT_CHANGE_CHECKBOX.bind(th, el)} />{h.Name + (l == el.Users.length - 1 ? "" : ",")}</label>
                        })
                    }
                    】</span>
                </li>
            } else {
                let arr3 =  el.Users.filter((v3,i3)=>{ return v3});
                let str = arr3.map((vv, jj) => {
                    
                    for (let i = 0; i < userArra.length; i++) {
                        //  if(userArra[i]["Id"])
                    }
                    userArra.push(vv.UId);
                    return vv.Name + (jj == el.Users.length - 1 ? "" : ",")
                })
                submit.Participants = userArra;
                // th.selectedFlows.push(submit);
                return <li key={ind} >
                    <span>{el.Text}</span>
                    <span>【{str}】</span>

                </li>
            }
        }, this);
    }
    //========通过、驳回===========================================
    EVENT_CLICK_PASS(){

    }
    Event_click_cancel(){ //取消
        var url="";
        switch(this.props.allSearchArg.e){
            case iss.getEVal("intallmentStatus"):url="intallment";break; //分期
            case iss.getEVal("newProjectStatus"):url="newProject";break;//项目
        }
        sessionStorage.removeItem("currentApprovalText");//清楚临时历史数据存储，解决路由切换不能记录用户输入内容问题
        sessionStorage.removeItem("currentApprovalList");//清楚临时历史数据存储，解决路由切换不能记录用户选择内容问题
        iss.hashHistory.replace({
            pathname:`/${url}`,
            search:`?status=edit&dataKey=${this.props.allSearchArg.dataKey}&e=${this.props.allSearchArg.e}`
        });
        location.href=`${location.origin}${location.pathname.replace(/\/$/ig,"")}/#/${url}?status=edit&dataKey=${this.props.allSearchArg.dataKey}&e=${this.props.allSearchArg.e}`
    }
    BIND_CHECKEDIT() {
        if (this.type != "edit") {
            return <p className="btnBox">
                <a className="btn" href="javascript:;" onClick={this.EVENT_CLICK_PASS.bind(this)}>通过</a>
                <a className="btn" href="javascript:;">驳回</a>
            </p>
        } else {
            return <p className="btnBox">
                <a className="btn" href="javascript:;" data-disable="false" onClick={this.evConfirmSubmitTo.bind(this)}>提交</a>
                <a className="btn" href="javascript:;" onClick={this.Event_click_cancel.bind(this)}>取消</a>
            </p>
        }
    }
    BIND_HISTORY() {
        return this.state.history.map((el, ind) => {
             return <tr key={ind}>
                 <td>{el.FLOWNAME}</td>
                 <td>{el.PROCESSCOMMENT}</td>
                 <td>{el.EVENTUSERNAME}</td>
                 <td>{el.EVENTDATE}</td>
                 <td>{el.TRACKINGEVENTTEXT}</td>
             </tr>
         })
     }
    render() {

        var re_aOpinions = this.state.aOpinions;
        return (<div className="boxGroupDetail">

            <table className="table tableProject">
                <tbody><tr>
                    <td width="100">审批流程</td>
                    <td><ul className="ApplyFlow">
                        <li className="Running">发起人【{iss.userInfo.empName}】</li>
                        {this.setInfoDataList()}
                    </ul>
                    </td>
                </tr>
                    {
                        this.type != "edit" && <tr>
                            <td>

                            </td>
                            <td>
                                <textarea className="textareaText" value={re_aOpinions} onChange={this.changeAOinions.bind(this)}></textarea>
                            </td>
                        </tr>
                    }

                </tbody></table>
            {
              
              this.BIND_CHECKEDIT()
                
            }

            <table className="table tableProject approvalProcess">
                <tbody><tr>
                    <th>节点</th>
                    <th>意见</th>
                    <th>操作人</th>
                    <th>操作时间</th>
                    <th>操作</th>
                </tr>
                {
                    this.BIND_HISTORY()
                }
                </tbody></table>
        </div>);

    }
}

export default ApprovalControlNode;