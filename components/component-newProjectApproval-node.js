/**
 * type:edit 编辑页面没有按钮和信息 流程可选
 * type:submit 包含通过、驳回 流程不可选
 * type:read   只有已阅  流程不可选
 */
/*审批信息*/
import React from 'react';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie

import "../../Content/css/newProjectApproval.less";
class ApprovalControlNode extends React.Component {
    constructor(arg) {
        super(arg);
        this.state = {
            aOpinions: "审核意见",
            aList: [{

            }],
            InfoData: [] //流程信息
        }
        this.type = this.props["type"] || "edit"; //以防外部没有设置type类型
        this.getInfo = {
            entiId: "10004",
            dataKey: "1",
            userId: "1003",
            comanyId: "73939811F9A44B2DBF66FC7C83B745F9",
            comanyName: "东南"
        }
        this.selectedFlows = [] //选人数据
        this.submitData = {
            DataKev:this.props.guid, //表单guid
            EntiId: "10004",//流程id
            EventUserId:"",//当前登陆人
            Files: [],//附件
            ProcessComment: "提交"//
        }
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
        iss.ajax({ //流程导航
            url: "/iWorkflow/Workflow/api/WFServices.asmx/GetSubmitWorkflows",
            type: "POST",
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(th.getInfo),
            success(result) {

                th.setState({
                    InfoData: JSON.parse(result.d.Data)
                })
            },
            error(e) {

            }
        })
    }
    EVENT_MOUSELEAVE_LI(da) { //鼠标滑过
        console.log(da);
    }
    EVENT_CHANGE_LIST(da, ev) { //修改

        var id = (ev.target.value);
        this.selectedFlows.forEach((el, ind) => {
            if (el.ContextGuid == da.Id) {
               // console.log(id);
                el.Participants = [id];
                return;
            }
        });


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
                // console.log(this.selectedFlows)
                return;
            }
        });
        // console.log(this.selectedFlows)
    }
    EVENT_CLICK_SUBMIT() {  //提交
        var th = this;
        th.BIND_CHECKED();  //检查数据
    }
    BIND_CHECKED() {   //第一次ajax提交检查数据
        var dto = {
            "runtimeUnique": {
                EntiId:'10004',// 实体ID
                DataKey:'111'// 业务ID
            }
        };
        var turnOut = true;
        var th = this;
        iss.ajax({
            url: "/iWorkflow/Workflow/api/WFServices.asmx/IsSubmitted",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(dto),
            success: function (result) {
               if(result.d["Data"]=="false"&&result.d["Success"]==true){
                 th.BIND_CHECKEDSUCESS();//二次提交
               }
            }
        });
       
    }
    BIND_CHECKEDSUCESS(){  //第二次ajax提交提交流程
        var th = this;
        th.submitData.EventUserId = iss.userInfo.ID;//设置登陆人id
        let submitdata = JSON.stringify({
            submitData:th.submitData,
            selectedFlows:this.selectedFlows
        });
        console.log(submitdata);
        iss.ajax({
            url: "/iWorkflow/Workflow/api/WFServices.asmx/SubmitWorkflow",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data:submitdata,
            success: function (result) {
                var rt = result.d;
               // turnOut = rt.Success;
                if (rt.Success == true) {
                    
                } else {
                    console.log(rt.Message);
                }
            }
        });

    }
    setInfoDataList() {
        var th = this;
        if (!this.state.InfoData.length) { return }
        let list = this.state.InfoData[0]["Flows"];
        th.selectedFlows=[];
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
            th.selectedFlows.push(submit);  //按地址引用先push后修改

            if (el.Type == "Approve" && th.type == "edit" && el.Users.length >= 2) {

                return <li key={ind}>
                    <span>{el.Text}</span>
                    <select onChange={th.EVENT_CHANGE_LIST.bind(th, el)}>
                        {
                            el.Users.map((ee, ii) => {
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
                return <li key={ind} ><span>{el.Text}【
                    {
                        el.Users.map((h, l) => {
                            userArra.push(h.UId);
                            submit.Participants = userArra;
                            return <label key={l}><input key={l} type="checkbox" defaultChecked="true" value={h.UId} onChange={th.EVENT_CHANGE_CHECKBOX.bind(th, el)} />{h.Name + (l == el.Users.length - 1 ? "" : ",")}</label>
                        })
                    }
                    】</span>
                </li>
            } else {
                let str = el.Users.map((vv, jj) => {
                    for(let i=0;i<userArra.length;i++){
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
    render() {

        var re_aOpinions = this.state.aOpinions;
        return (<div className="boxGroupDetail">
            <h3 className="boxGroupTitBig"><p><span>审批信息</span></p></h3>
            <table className="table tableProject">
                <tbody><tr>
                    <td width="100">审批流程</td>
                    <td>  <ul className="ApplyFlow">
                        <li>发起人【欧阳少华】</li>
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
                this.type != "edit" &&
                <p className="btnBox">
                    <a className="btn" href="javascript:;" onClick={this.EVENT_CLICK_SUBMIT.bind(this)}>通过</a>
                    <a className="btn" href="javascript:;">驳回</a>
                </p>
            }

            <table className="table tableProject approvalProcess">
                <tbody><tr>
                    <th>节点</th>
                    <th>意见</th>
                    <th>操作人</th>
                    <th>操作时间</th>
                    <th>操作</th>
                </tr>
                    <tr>
                        <td>片区成本经理</td>
                        <td>同意，请领导审批！</td>
                        <td>张志成</td>
                        <td>2014-06-08 17:00</td>
                        <td>批准</td>
                    </tr>
                </tbody></table>
        </div>);

    }
}

export default ApprovalControlNode;