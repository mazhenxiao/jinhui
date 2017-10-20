/*审批信息*/
import React from 'react';
/**
 * 审批人   
 * 
 */
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
import ProcessApprovalTab from "./component-ProcessApproval-Tab.js"; //导航信息
import ApprovalControlNode2 from "./component-newProjectApprover-node.js";  //审批信息
require("../../Content/css/processApproval.less");
class ProcessApproval extends React.Component {
    constructor(arg) {
        super(arg);
        this.state = {
            textarea: "", //备注内容
            textarea2: "", //审批人意见
            type: "readonly",  //edit自己readonly审批人
            guid: this.props.location.state.guid  //页面传入表单guid
        }

    }
    EVENT_CHANGE_TEXTAREA(ev) {
        let txt = ev.target.value || ev.target.innerHTML;
        this.setState({
            textarea2: txt
        })
    }

    render() {
        let th = this;
        return <section className="ProcessApproval">
            <ProcessApprovalTab current="ProcessApproval" />
            <h3>审批流程</h3>
            <article>

                <div 　className="mgT10">
                    <ApprovalControlNode2 guid={this.state.guid} data={this.state.textarea} />
                </div>

            </article>
        </section>

    }
}
export default ProcessApproval;