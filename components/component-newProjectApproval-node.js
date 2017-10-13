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
        this.getInfo = {
            entiId: "10004",
            dataKey: "1",
            userId: "1003",
            comanyId: "73939811F9A44B2DBF66FC7C83B745F9",
            comanyName: "东南"
        }
        console.log("获取到的参数");
        console.log(this.props.pid);
    }
    componentWillMount() {
        this.GetAjax();
    }
    /*监听审核意见*/
    changeAOinions(event) {
        this.setState({ aOpinions: event.target.value });
    }
    GetAjax() {
        let th = this;
        iss.ajax({ //流程导航
            url: "/iWorkflow/Workflow/api/WFServices.asmx/GetSubmitWorkflows?t=" + new Date().getTime(),
            type: "POST",
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(th.getInfo),
            sucess(result) {

                th.setState({
                    InfoData: JSON.parse(result.d.Data)
                })
            },
            error(e) {
            
            }
        })
    }
    EVENT_MOUSELEAVE_LI(da){ //鼠标滑过
        console.log(da);
    }   
    EVENT_CHANGE_LIST(da){ //修改

    }
    setInfoDataList(){
        var th = this;
        if(!this.state.InfoData.length){ return}
        let list = this.state.InfoData[0]["Flows"];
        return list.map((el,ind)=>{
            if(el.Type=="Approve"&&el.Users.length>=2){
                return <li key={ind}>
                        <span>{el.Text}</span>
                        <select onChange={th.EVENT_CHANGE_LIST.bind(th,el)}>
                        {
                            el.Users.map((ee,ii)=>{
                                return <option key={ii} value={ee.UId}>{ee.Name}</option>
                            })
                        }
                        </select>
                </li> 
            }else{
                let str = el.Users.map((vv,jj)=>{
                    return vv.Name+","
                })
                return <li key={ind} > 
                        <span>{el.Text}</span>
                        <span>【{str}】</span>
                
                </li> 
            }
           
        },this);
    }
    render() {
      
        var re_aOpinions = this.state.aOpinions;
        return (<div className="boxGroupDetail">
            <h3 className="boxGroupTitBig"><p><span>二、审批信息</span></p></h3>
            <table className="table tableProject">
                <tbody><tr>
                    <td width="100">审批流程</td>
                    <td>  <ul className="ApplyFlow">
                            {this.setInfoDataList()}
                        </ul>
                        </td>
                </tr>
                    <tr>
                        <td>
                      
                        </td>
                        <td>
                            <textarea className="textareaText" value={re_aOpinions} onChange={this.changeAOinions.bind(this)}></textarea>
                        </td>
                    </tr>
                </tbody></table>
            <p className="btnBox">
                <a className="btn" href="#">提交</a>
                <a className="btn" href="#">撤回</a>
                <a className="btn" href="#">取消</a>
            </p>
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