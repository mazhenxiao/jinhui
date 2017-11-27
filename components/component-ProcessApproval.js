/*审批信息*/
import React from 'react';
/**
 * 提交人    
 * 
 */
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
import ProcessApprovalTab from "./component-ProcessApproval-Tab.js"; //导航信息
import ApprovalControlNode from "./component-newProjectApproval-node.js";  //审批信息
require("../../Content/css/processApproval.less");
class ProcessApproval extends React.Component {
    constructor(arg) {
        super(arg);
        this.state={
            remarkTxt:this.props.location.query.remarkTxt||(sessionStorage.getItem("currentApprovalText")||""), //备注内容
            textarea2:"", //审批人意见
            type:"readonly",  //edit自己readonly审批人
            allSearchArg:this.props.location.query,/*地址栏所有参数*/
            guid:this.props.location.query.dataKey,  //页面传入表单guid
        }
        this.AppState={  //临时存储
            text:"",
            approval:[]
        }
    
        this.currentApproval={
            list:[],//切换记录
            comment:""//textarea
        } //暂存流程数据
       
    }
    EVENT_CHANGE_TEXTAREA(ev){
    	let th=this;
        let txt = ev.target.value;
        let allSearchArg=th.state.allSearchArg;
        
        if(txt.length>1000){
        	txt=txt.slice(0,1000);
        }
        
        allSearchArg["remarkTxt"]=txt;
        th.setState({
            remarkTxt:txt,
            allSearchArg:allSearchArg
        });
        sessionStorage.setItem("currentApprovalText",txt);
    }
    render() {
        let th = this;
        return <section className="ProcessApproval">
            <ProcessApprovalTab   allSearchArg={th.state.allSearchArg} current="ProcessApproval" />
            <h3 className="boxGroupTit"><p><span>审批流程</span></p></h3>
            <article>
                <table className="table PATextarea" width="100%">
                    <tbody>
                        <tr>
                            <th>备注</th>
                            <td>
                                <textarea value={this.state.remarkTxt} onChange={this.EVENT_CHANGE_TEXTAREA.bind(this)} placeholder="请输入备注内容"></textarea>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div　className="mgT10">
                    <ApprovalControlNode    AppState={this.AppState}  guid={this.state.guid}  data={this.state.remarkTxt} allSearchArg={this.state.allSearchArg}/>
                </div>

            </article>
        </section>

    }
}
export default ProcessApproval;