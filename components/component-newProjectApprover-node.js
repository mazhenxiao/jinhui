/** 审批人
 * type:edit 编辑页面没有按钮和信息 流程可选
 * type:submit 包含通过、驳回 流程不可选
 * type:read   只有已阅  流程不可选
 */
/*审批信息*/
import React from 'react';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
import "../css/newProjectApproval.less";
class ApprovalControlNode2 extends React.Component {
    constructor(arg) {
        super(arg);

        this.state = {
            aOpinions: this.props.allSearchArg.remarkTxt || "", //textarea
            type: false, //默认无权限
            InfoData: [], //流程信息
            mainData: "",//通过驳回权限
            history: [],//历史纪录
            fromArg: this.props.allSearchArg.from || ""
        }

        this.getInfo = {  //从页面获取
            "entiId": this.props.allSearchArg.e, //项目还是分期
            "dataKey": this.props.allSearchArg.dataKey,//项目id或分期id
            "checkedUserId": "", //用户id
            "currentRuntFlowId": "",//当前节点ID,在流程里获取
            "backToRuntFlowId": "0", //
            "eventUserId": "",//用户id
            "userId": "",//用户id
            "delegateUserId": "0",
            "comment": "", //审批意见
            "files": []
        }
        this.selectedFlows = [] //选人数据     
    }
    componentWillMount() {
        var th = this;
    }
    componentDidMount() {
        var th = this;
        let setT = setInterval(arg => {
            if (iss.userInfo) {
                th.getInfo.userId = th.getInfo.eventUserId = iss.userInfo.ID;//给用户赋值
                th.getInfo.checkedUserId = iss.userInfo.ID;
                th.GetJurisdiction(arg => {
                    let da = arg.d;
                    if (da.Success) {
                        th.setState({
                            type: true,
                            mainData: da.Data
                        });

                        th.GetAjax();
                    } else {
                        th.setState({
                            type: false
                        });
                    }
                });
            }
            clearInterval(setT);
        }, 1000);

    }

    changeAOinions(event) {
        var th = this;
        var aVal = event.target.value;
        if (aVal.length > 1000) {
            aVal = aVal.slice(0, 1000);
        }
        th.props.callback(aVal);
        this.setState({ aOpinions: aVal }, arg => {
            th.getInfo.comment = this.state.aOpinions;
        });

    }
    GetJurisdiction(callback) { //获取权限
        var dto = this.getInfo;
        //获取权限
        iss.ajax({
            url: "/iWorkflow/Workflow/api/WFServices.asmx/GetUserRights",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(dto),
            success: function (result) {
                if (callback) {
                    callback(result);
                }
            }

        });
    }
    GetAjax() {
        let th = this;
        iss.ajax({ //流程导航
            url: "/iWorkflow/Workflow/api/WFServices.asmx/LoadNodes",
            type: "POST",
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(th.getInfo),
            success(result) {
                let data = result.d;
                data.forEach((el, ind) => {
                    if (el["FlowStatus"] == "Running") {
                        th.getInfo.currentRuntFlowId = el.FlowId;
                        return;
                    }
                });
                th.setState({
                    InfoData: data
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
            data: JSON.stringify(this.getInfo),
            success(da) {
                if (da.d.Data) {
                    th.setState({
                        history: JSON.parse(da.d.Data)["Rows"]
                    });
                }
            }
        });
    }
    setInfoDataList() {    //数据绑定
        var th = this;
        if (!this.state.InfoData.length) { return }
        let list = this.state.InfoData;

        return list.map((el, ind) => {
            // th.selectedFlows.push(submit);
            return <li key={ind} className={el.FlowStatus} >
                <span>{el.FlowName}</span>
                <span>【{el.Participants}】</span>

            </li>

        }, this);
    }

    //========通过、驳回===========================================
    /*是否确认驳回*/
    evConfirmBackTo() {
        var th = this;
        iss.checkLogin(arg => {
            iss.evConfirmAlert("是否确认驳回", th.EVENT_CLICK_SUBMIT.bind(th));
        })

    }
    EVENT_CLICK_SUBMIT() {  //驳回
        var serverurl = "/iWorkflow/Workflow/api/WFServices.asmx/BackToFlow";
        let dto = this.getInfo;
        let comment = this.getInfo.comment;
        if (comment == "") {
            dto.comment = "驳回"
        }
        iss.ajax({
            url: serverurl,
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(dto),
            success: function (result) {
                var rt = result.d;

                if (rt.Success) {
                    //显示消息，关闭窗口，刷新父页面的节点信息    
                    /*window.parent.opener.location.reload();
                    alert("驳回成功！");*/
                    iss.popover({ content: "驳回成功！", type: 2 });
                    iss.hashHistory.push({ "pathname": "/agenty" });
                    /*审批通过一条数据,触发一次我的里面的数量查询*/
                    $(document).triggerHandler("reloadMyCount");
                } else {
                    iss.popover({ content: rt.Message });
                }
            },
            error: function (result) {
                var err = eval("(" + result.responseText + ")");
                alert(err.Message);
                return;
            }
        });


    }
    /*是否确认通过*/
    evConfirmRunWork() {
        var th = this;

        iss.checkLogin(arg => {
            iss.evConfirmAlert("是否确认通过", th.EVENT_CLICK_PASS.bind(th));
        })

    }
    EVENT_CLICK_PASS() {  //通过

        var dto = this.getInfo;
        let comment = this.getInfo.comment;
        let {entiId,dataKey} = this.getInfo;
        if (comment == "") {
            dto.comment = "通过"
        }
        new Promise((resolve, reject) => {
            iss.ajax({
                url: "/iWorkflow/Workflow/api/WFServices.asmx/RunWorkflow2",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(dto),

                success: function (result) {

                    var rt = result.d;
                    if (rt.Success) {

                        /*window.parent.opener.location.reload();
                        alert("审批成功！");*/
                        iss.popover({ content: "通过成功！", type: 2 });
                        iss.hashHistory.push({ "pathname": "/agenty" });
                        /*审批通过一条数据,触发一次我的里面的数量查询*/
                        $(document).triggerHandler("reloadMyCount");
                        resolve();
                    } else {
                        iss.popover({ content: rt.Message });
                    }

                },
                error: function (result) {
                    reject(result);
                    var err = eval("(" + result.responseText + ")");
                    alert(err.Message);
                }
            });
        }).then(arg=>{
            if(entiId=="10104"){  //只有面积提交当前数据
                return iss.fetch({
                    url:"/Price/CreatePriceVersion",
                    data:{
                        "stageversionId":dataKey
                    }
                })
            }
           
        })


    }
    /*删除已阅*/
    evDeleteReaded() {
        var th = this;
        var dto = th.getInfo;
        var jsonArg = {
            entiId: dto.entiId,
            dataKey: dto.dataKey,
            userId: dto.userId
        }
        iss.ajax({
            url: "/iWorkflow/Workflow/api/WFServices.asmx/HaveRead",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(jsonArg),
            success: function (result) {
                var rt = result.d;
                if (rt.Success) {
                    iss.popover({ content: "操作成功！", type: 2 });
                    $(window).trigger("treeLoad");//刷新左侧树
                    iss.hashHistory.push({ "pathname": "/agenty" });

                    $(document).triggerHandler("reloadMyCount");
                } else {
                    iss.popover({ content: rt.Message });

                }
            }
        });
    }
    BIND_CHECKEDIT() {
        var th = this;
        var fromArg = th.state.fromArg;
        if (fromArg == "inform") {
            return <p className="btnBox">
                {<a className="btn" href="javascript:void(0);" onClick={th.evDeleteReaded.bind(th)}>已阅</a>}
            </p>
        } else if (th.state.type) {
            return <p className="btnBox">
                {th.state.mainData.indexOf("Approve") >= 0 && <a className="btn" href="javascript:;" onClick={th.evConfirmRunWork.bind(th)}>通过</a>}
                {th.state.mainData.indexOf("Return") >= 0 && <a className="btn" href="javascript:;" onClick={th.evConfirmBackTo.bind(th)}>驳回</a>}
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
                    <td>  <ul className="ApplyFlow">
                        {this.setInfoDataList()}
                    </ul>
                    </td>
                </tr>
                    {
                        this.state.type && <tr>
                            <td width="100">备注</td>
                            <td>
                                <textarea className="textareaText" value={re_aOpinions} onChange={this.changeAOinions.bind(this)} placeholder="请输入备注内容"></textarea>
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

export default ApprovalControlNode2;