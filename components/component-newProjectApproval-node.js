/**
 * type:edit 编辑页面没有按钮和信息 流程可选
 * type:submit 包含通过、驳回 流程不可选
 * type:read   只有已阅  流程不可选
 */
/*审批信息*/
import React from 'react';
import iss from "../js/iss.js";
import {Spin} from "antd"
import "babel-polyfill";  //兼容ie
import "../css/newProjectApproval.less";

class ApprovalControlNode extends React.Component {
    constructor(arg) {
        super(arg);
        this.state = {
            aOpinions: "审核意见",
            aList: [],
            InfoData: [],//流程信息
            allSearchArg: this.props.allSearchArg,
            history: [], //历史纪录
            loading:true
        }
        this.type = "edit"  //this.props["type"] || "edit"; //以防外部没有设置type类型
        this.newId = null;//10102项目所需新id
        this.selectedFlows = [] //选人数据 
        this.currentApprovalList = sessionStorage.getItem("currentApprovalList") ? JSON.parse(sessionStorage.getItem("currentApprovalList")) : [];
    }

    componentWillMount() {
        let {e, dataKey} = this.state.allSearchArg, th = this;
        if (this.props.callback) {
            this.props.callback(this);
        }
        if (e == "10102") {
            this.EVENT_CLICK_SUBMIT()
                .then(arg => {
                    this.newId = arg;
                    th.GetAjax();
                })
        } else {
            this.GetAjax();
        }


    }

    /*监听审核意见*/
    changeAOinions(event) {
        this.setState({aOpinions: event.target.value});
    }

    GetAjax(arg) {
        let th = this;
        let allSearchArg = th.state.allSearchArg;
        let getInfo = {
            entiId: allSearchArg['e'],
            dataKey: this.newId || allSearchArg['dataKey'],//==================================================
            userId: iss.userInfo.ID,
            comanyId: allSearchArg["areaId"],
            comanyName: allSearchArg["areaName"]
        };

        iss.ajax({ //流程导航
            url: "/iWorkflow/Workflow/api/WFServices.asmx/GetSubmitWorkflows",
            type: "POST",
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(getInfo),
            success(result) {

                th.setState({
                    InfoData: JSON.parse(result.d.Data),
                    loading:false
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
        var th = this, _data = this.state.InfoData[0]["Flows"];
        var id = (ev.target.value);
        for (var i = 0; i < this.selectedFlows.length; i++) {
            if (this.selectedFlows[i]["ContextGuid"] == da.Id) {
                this.selectedFlows[i]["Participants"] = id;

            }
        }
        sessionStorage.setItem("currentApprovalList", JSON.stringify(this.selectedFlows));
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
        sessionStorage.setItem("currentApprovalList", JSON.stringify(this.selectedFlows));
    }

    //========提交、返回=========================================
    evConfirmSubmitTo() {
        var th = this;
        let {e, dataKey} = th.state.allSearchArg
        // iss.checkLogin(arg=>{  //暂时注销
        iss.evConfirmAlert("是否确认提交", th.BIND_CHECKED.bind(th));

        // })

    }

    EVENT_CLICK_SUBMIT() {  //当前填报人提交
        var th = this;
        let {e, dataKey} = th.state.allSearchArg
        return new Promise((resolve, reject) => {
            iss.ajax({ //老代码不再进行封装修改。
                url: "/Stage/ICreateProVersion",
                data: {
                    "id": dataKey  //==================================================
                },
                success(da) {
                    if (da["rows"]) {
                        resolve(da["rows"]);
                        //th.BIND_CHECKED(da["rows"])
                    } else {
                        iss.error("获取新版本id失败")
                    }

                },
                error() {

                }
            })
        })
        //  th.BIND_CHECKED();  //检查数据
    }

    BIND_CHECKED() {   //第一次ajax提交检查数据

        var th = this;
        var {e, dataKey} = th.state.allSearchArg;
        /* if(allSearchArg['newId']){
            var json = allSearchArg['newId']
        }else{
            var json = allSearchArg['dataKey']
        } */
        var dto = {
            "runtimeUnique": {
                EntiId: e,// 实体ID
                DataKey: this.newId || dataKey // 业务ID======================================
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
                } else {
                    iss.popover({content: result.d.Message});
                    $(window).trigger("treeLoad");
                }
            }
        });

    }

    BIND_CHECKEDSUCESS() {  //当前填报人第二次ajax提交提交流程
        let th = this;
        var {e, dataKey} = th.state.allSearchArg;
        /*  if(allSearchArg['newId']){
             var json = allSearchArg['newId']
         }else{
             var json = allSearchArg['dataKey']
         } */
        let basicInfor = {
            DataKey: this.newId || dataKey,// 业务ID,================================================
            EntiId: e,
            EventUserId: iss.userInfo.ID,//当前登陆人
            Files: [],//附件
            ProcessComment: this.props["data"] || ""
        }

        let sbarr2 = this.selectedFlows.map((el, ind) => {
            if (typeof el.Participants == "string") {
                el.Participants = [el.Participants.toString()];
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
                    iss.popover({content: "提交成功！", type: 2});
                    sessionStorage.removeItem("currentApprovalText");//清楚临时历史数据存储，解决路由切换不能记录用户输入内容问题
                    sessionStorage.removeItem("currentApprovalList");//清楚临时历史数据存储，解决路由切换不能记录用户选择内容问题
                    $(window).trigger("treeLoad");
                    iss.hashHistory.push({pathname: "agenty"});

                } else {
                    iss.popover({content: rt.Message});
                }
            }
        });

    }

    setInfoDataList() {
        var th = this;
        if (!th.state.InfoData.length) {
            return
        }
        let list = th.state.InfoData[0]["Flows"];
        th.selectedFlows = th.currentApprovalList.length ? th.currentApprovalList : [];
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
            !th.currentApprovalList.length && th.selectedFlows.push(submit);  //按地址引用先push后修改
            let _id = this.currentApprovalList.length ? this.currentApprovalList[ind]["Participants"] : "";
            if (el.Type == "Approve" && th.type == "edit" && el.Users.length >= 2) {
                let arr1 = el.Users.filter((v1, i1) => {
                    return v1
                });
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
                let arr2 = el.Users.filter((v2, i2) => {
                    return v2
                });
                _id = (typeof _id != "string") ? _id.join(",") : "";
                return <li key={ind}><span>{el.Text}【
                    {
                        arr2.map((h, l) => {

                            userArra.push(h.UId);
                            submit.Participants = userArra;
                            return <label key={l}><input key={l} type="checkbox"
                                                         defaultChecked={_id ? _d.indexOf(h.UId) >= 0 : "true"}
                                                         value={h.UId}
                                                         onChange={th.EVENT_CHANGE_CHECKBOX.bind(th, el)}/>{h.Name + (l == el.Users.length - 1 ? "" : ",")}
                            </label>
                        })
                    }
                    】</span>
                </li>
            } else {
                let arr3 = el.Users.filter((v3, i3) => {
                    return v3
                });
                let str = arr3.map((vv, jj) => {

                    for (let i = 0; i < userArra.length; i++) {
                        //  if(userArra[i]["Id"])
                    }
                    userArra.push(vv.UId);
                    return vv.Name + (jj == el.Users.length - 1 ? "" : ",")
                })
                submit.Participants = userArra;
                // th.selectedFlows.push(submit);
                return <li key={ind}>
                    <span>{el.Text}</span>
                    <span>【{str}】</span>

                </li>
            }
        }, this);
    }

    //========通过、驳回===========================================
    EVENT_CLICK_PASS() {

    }
/** 取消
 * status  当前【状态】是编辑还是升级具体咨询 成委
 * areaId  【区域id 】 只有项目和分期会用--项目列表下  其余页面赋空值
 * areaName  【区域名称】   只有项目和分期会用--项目列表下 其余页面赋空值
 * dataKey 【项目id】【分期版本id】列表下是左侧树  在信息填报下首次进入是左侧树然后替换为版本id
 * current  ProcessApproval提交 取消 ProcessApprover 同意 驳回
 * businessId 信息填报下所需，因为不依赖左侧树需要的是版本所以此值为【版本id】
 * isProOrStage 【项目1 分期2】信息填报所需
 */
    Event_click_cancel() { //取消
        const {businessId, e,cancel,primarykeyTarget,vid} = this.props.allSearchArg;
        var url = "";
        switch (this.props.allSearchArg.e) {
            case iss.getEVal("intallmentStatus"):
                url = "intallment";
                break; //分期
            case iss.getEVal("newProjectStatus"):
                url = "newProject";
                break;//项目
            case iss.getEVal("teamMaintainStatus"):
                url = "AreaInfo/groupbuild";
                break;//项目团队维护
            case iss.getEVal("priceControl"):
                url = "AreaInfo/priceControl";
                break;//价格
            case iss.getEVal("area"):
                url = "AreaInfo/areaManage";
                break;//面积
            case iss.getEVal("priority"):
                url = "AreaInfo/priority";
                break;//关键指标
            case iss.getEVal("payment"):
                url = "AreaInfo/payment";
                break
            case iss.getEVal("primarykeyTarget"):
                url = "AreaInfo/primarykeyTarget";
                break;
            case iss.getEVal("primarykey"):
                url = "AreaInfo/primarykey";
                break;
        }
        sessionStorage.removeItem("currentApprovalText");//清楚临时历史数据存储，解决路由切换不能记录用户输入内容问题
        sessionStorage.removeItem("currentApprovalList");//清楚临时历史数据存储，解决路由切换不能记录用户选择内容问题
        
        if (this.props.allSearchArg["newId"]) {
             iss.hashHistory.replace({
                pathname: `/${url}`,
                search: `?status=edit&dataKey=${this.props.allSearchArg.newId}&e=${this.props.allSearchArg.e}&isProOrStage=${this.props.allSearchArg.isProOrStage}`
            }); 
           // location.href = `${location.origin}${location.pathname.replace(/\/$/ig, "")}/#/${url}?status=edit&dataKey=${this.props.allSearchArg.newId}&e=${this.props.allSearchArg.e}&isProOrStage=${this.props.allSearchArg.isProOrStage}`
           //status=edit&dataKey=${this.props.allSearchArg.newId}&e=${this.props.allSearchArg.e}&isProOrStage=${this.props.allSearchArg.isProOrStage}
        } else if (businessId) {
             iss.hashHistory.replace({
                pathname: `/${url}`,
                search: `?status=edit&dataKey=${businessId}&e=${e}&isProOrStage=${this.props.allSearchArg.isProOrStage}`
            }); 
           // location.href = `${location.origin}${location.pathname.replace(/\/$/ig, "")}/#/${url}?status=edit&dataKey=${businessId}&e=${e}&isProOrStage=${this.props.allSearchArg.isProOrStage}`
        }else if (cancel=="cancel") {
            iss.hashHistory.replace({
               pathname: `/${url}`,
               search: `?status=edit&dataKey=${this.props.allSearchArg.dataKey}&e=${this.props.allSearchArg.e}&cancel=cancel`
           }); 
          // location.href = `${location.origin}${location.pathname.replace(/\/$/ig, "")}/#/${url}?status=edit&dataKey=${businessId}&e=${e}&isProOrStage=${this.props.allSearchArg.isProOrStage}`
        }else if (vid) {
            iss.hashHistory.replace({
               pathname: `/${url}`,
               search: `?status=edit&dataKey=${vid}&e=${this.props.allSearchArg.e}&isProOrStage=${this.props.allSearchArg.isProOrStage}`
           }); 
          // location.href = `${location.origin}${location.pathname.replace(/\/$/ig, "")}/#/${url}?status=edit&dataKey=${businessId}&e=${e}&isProOrStage=${this.props.allSearchArg.isProOrStage}`
        }else {
           
              iss.hashHistory.replace({
                 pathname: `/${url}`,
                 search: `?status=edit&dataKey=${this.props.allSearchArg.dataKey}&e=${this.props.allSearchArg.e}`
             }); 
             
            //location.href = `${location.origin}${location.pathname.replace(/\/$/ig, "")}/#/${url}?status=edit&dataKey=${this.props.allSearchArg.dataKey}&e=${this.props.allSearchArg.e}&isProOrStage=${this.props.allSearchArg.isProOrStage}`
        }

    }

    BIND_CHECKEDIT() {
        if (this.type != "edit") {
            return <p className="btnBox">
                {/*    <a className="btn" href="javascript:;" onClick={this.EVENT_CLICK_PASS.bind(this)}>通过</a>
                <a className="btn" href="javascript:;">驳回</a> */}
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
        return <Spin spinning={this.state.loading}>
            <div className="boxGroupDetail">

            <table className="table tableProject">
                <tbody>
                <tr>
                    <td width="100">审批流程</td>
                    <td>
                        <ul className="ApplyFlow">
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
                            <textarea className="textareaText" value={re_aOpinions}
                                      onChange={this.changeAOinions.bind(this)}></textarea>
                        </td>
                    </tr>
                }

                </tbody>
            </table>
            {

                this.BIND_CHECKEDIT()

            }

            <table className="table tableProject approvalProcess">
                <tbody>
                <tr>
                    <th>节点</th>
                    <th>意见</th>
                    <th>操作人</th>
                    <th>操作时间</th>
                    <th>操作</th>
                </tr>
                {
                    this.BIND_HISTORY()
                }
                </tbody>
            </table>
        </div></Spin>;

    }
}

export default ApprovalControlNode;