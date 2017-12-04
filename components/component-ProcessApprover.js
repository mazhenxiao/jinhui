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
require("../css/processApproval.less");
class ProcessApproval extends React.Component {
    constructor(arg) {
        super(arg);
        this.state = {
            remarkTxt:"", //备注内容
            type: "readonly",  //edit自己readonly审批人
            allSearchArg:this.props.location.query,/*地址栏所有参数*/
            guid:this.props.location.query.dataKey  //页面传入表单guid    
        }

    }
    
    /*从子组件获取输入框的信息*/
    evSetRemarkTxt(val) {
    	let th=this;
        let allSearchArg=th.state.allSearchArg;
        allSearchArg["remarkTxt"]=val;
        th.setState({
            allSearchArg
        });
    }

    render() {
        let th = this;
        return <section className="ProcessApproval">
            <ProcessApprovalTab  id={th.props.location.query["e"]} current="ProcessApprover" allSearchArg={th.state.allSearchArg}  />
            <h3 className="boxGroupTit"><p><span>审批流程</span></p></h3>
            <article>
                <div className="mgT10">
                    <ApprovalControlNode2 guid={th.state.guid}  allSearchArg={th.state.allSearchArg} callback={th.evSetRemarkTxt.bind(th)}/>
                </div>
            </article>
        </section>

    }
}
export default ProcessApproval;