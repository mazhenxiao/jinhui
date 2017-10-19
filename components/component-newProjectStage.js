/* 分期 */
/*审批信息*/
import React from 'react';
/**
 * 首页导航条
 * index  identity  supply  所需
 */

import "../js/iss.js";
import "babel-polyfill";  //兼容ie
import ApprovalControlNode from "./component-newProjectApproval-node.js";  //审批信息



class StageControl extends React.Component {
    constructor(arg) {
        super(arg);
        this.state={
            threeId:"tt",
            threeData:[],
            CountData:[],


        }
    }
    BIND_COUNT_DATACALLBACK(){

    }

    render() {
        let th=this;
        return <section>
            <div>chengwei</div>
            <section>
            <h3 className="boxGroupTit">
                    <p>
                        <span>分期信息</span>
                    </p> 
                </h3>
               
            </section>

            <ApprovalControlNode pid={iss.id}/>
        </section>

    }
}
export default StageControl;