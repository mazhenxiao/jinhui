/** 审批人
 * type:edit 编辑页面没有按钮和信息 流程可选
 * type:submit 包含通过、驳回 流程不可选
 * type:read   只有已阅  流程不可选
 */
/*审批信息*/
import React from 'react';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie

import "../../Content/css/newProjectApproval.less";
class ApprovalControlNode2 extends React.Component {
    constructor(arg) {
        super(arg);

        this.state = {
            aOpinions: "", //textarea
            type:false, //默认无权限
            InfoData: [], //流程信息
            mainData:""//通过驳回权限
        }
    
        this.getInfo = {  //从页面获取
            "entiId": "10004",
            "dataKey": "092860b8-6ae0-b47e-61d3-a663cdb705a7",
            "checkedUserId": "52BC22D9-9C56-46F0-BEB9-D5CD94A8100E",
            "currentRuntFlowId":"",//当前节点ID,在流程里获取
            "backToRuntFlowId":"0", //
            "eventUserId":"",//用户id
            "userId":"",//用户id
            "delegateUserId": "0",
            "comment":"", //审批意见
            "files":[]
        }
        this.selectedFlows = [] //选人数据 
    

       
    }
    componentWillMount(){
        var th = this;
       
        this.GetJurisdiction(arg=>{
            let da = arg.d;
            if(da.Success){
                th.setState({
                    type:true,
                    mainData:da.Data
                })
                
                th.GetAjax();
            }else{
                th.setState({
                    type:false
                })
            }
           
        });
    }
    
    componentDidMount() {
        var th = this;
       setTimeout(arg=>{
        th.getInfo.userId=th.getInfo.eventUserId=iss.userInfo.ID;//给用户赋值
       },1000);
    }
    
    changeAOinions(event){
        var th = this;
        this.setState({ aOpinions: event.target.value },arg=>{
            th.getInfo.comment=this.state.aOpinions;
        });

    }
    GetJurisdiction(callback){ //获取权限
        var dto = this.getInfo;
        //获取权限
        iss.ajax({
            url: "/iWorkflow/Workflow/api/WFServices.asmx/GetUserRights",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(dto),
            success: function (result) {
                if(callback){
                    callback(result);
                }
            }

        })
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
                data.forEach((el,ind)=>{
                    if(el["FlowStatus"]=="Running"){
                        th.getInfo.currentRuntFlowId=el.FlowId;
                        return;
                    }
                });
                th.setState({
                    InfoData:data
                })
            },
            error(e) {

            }
        })
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
    EVENT_CLICK_SUBMIT() {  //驳回
        var serverurl = "/iWorkflow/Workflow/api/WFServices.asmx/BackToFlow";
        let dto = this.getInfo;

        iss.ajax({
            url: serverurl,
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(dto),
            success: function (result) {
                var rt = result.d;

                if (rt.Success) {
                    // 显示消息，关闭窗口，刷新父页面的节点信息    
                    //window.parent.opener.location.reload();
                    alert("驳回成功！");
                   
                }
                else {
                    alert(rt.Message);
                    return;
                }
            },
            error: function (result) {
                var err = eval("(" + result.responseText + ")");
                alert(err.Message);
                return;
            }
        });
        
    }

    EVENT_CLICK_PASS(){  //通过

        var dto = this.getInfo;
        iss.ajax({
            url: "/iWorkflow/Workflow/api/WFServices.asmx/RunWorkflow2",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(dto),
            success: function (result) {

                var rt = result.d;
                if (rt.Success) {
                 
                    
                        //window.parent.opener.location.reload();
                        alert("审批成功！");
                        
                    
                }
                else {
                
                }
            },
            error: function (result) {
                var err = eval("(" + result.responseText + ")");
                alert(err.Message);
            }
        });
    
    }
    BIND_CHECKEDIT() {
        if (this.state.type) {
            return <p className="btnBox">
                {this.state.mainData.indexOf("Approve")>=0&& <a className="btn" href="javascript:;" onClick={this.EVENT_CLICK_PASS.bind(this)}>通过</a>}
                {this.state.mainData.indexOf("Return")>=0&&<a className="btn" href="javascript:;" onClick={this.EVENT_CLICK_SUBMIT.bind(this)}>驳回</a>}
            </p>
        } 
    }
    render() {

        var re_aOpinions = this.state.aOpinions;
        return (<div className="boxGroupDetail">

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
                        this.state.type&& <tr>
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

export default ApprovalControlNode2;