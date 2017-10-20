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
            textarea:"", //备注内容
            textarea2:"", //审批人意见
            type:"readonly",  //edit自己readonly审批人
            guid:this.props.location.state.guid  //页面传入表单guid
        }
        
    }
    EVENT_CHANGE_TEXTAREA(ev){
        let txt = ev.target.value||ev.target.innerHTML;
        this.setState({
            textarea2:txt
        })
    }
    SETAPPROVALSHOW(){
            return <ApprovalControlNode guid={this.state.guid}  data={this.state.textarea}   />
    }
    render() {
        let th = this;
        return <section className="ProcessApproval">
            <ProcessApprovalTab current="ProcessApproval" />
            <h3>审批流程</h3>
            <article>
                <table className="table PATextarea" width="100%">
                    <tr>
                    <th>备注</th>
                    <td>
                        <textarea value={this.state.textarea2} onChange={this.EVENT_CHANGE_TEXTAREA.bind(this)} placeholder="请输入备注内容"></textarea>
                    </td>
                    </tr>
                </table>
                <div　className="mgT10">
                    {
                        this.SETAPPROVALSHOW()
                    }
                   
                </div>

            </article>
        </section>

    }
}
export default ProcessApproval;