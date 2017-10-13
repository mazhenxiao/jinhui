/*审批信息*/
import React from 'react';
/**
 * 首页导航条
 * index  identity  supply  所需
 */
import ReactDOM from 'react-dom';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
import ApprovalControlNode from "./component-newProjectApproval-node.js";  //审批信息
import ThreeTree from "./tools-threeTree.js";
import DynamicTable from "./tools-dynamicTable.js";
import "../../Content/css/tools-dynamicTable.less";//专用css

class ApprovalControl extends React.Component {
    constructor(arg) {
        super(arg);
        this.state={
            threeId:"tt",
            threeData:[{
                "id":1,
                "text":"Foods",
                "children":[{
                    "id":2,
                    "text":"Fruits",
                    "state":"closed",
                    "children":[{
                        "text":"apple",
                        "checked":true
                    },{
                        "text":"orange"
                    }]
                },{
                    "id":3,
                    "text":"Vegetables",
                    "state":"open",
                    "children":[{
                        "text":"tomato",
                        "checked":true
                    },{
                        "text":"carrot",
                        "checked":true
                    },{
                        "text":"cabbage"
                    },{
                        "text":"potato",
                        "checked":true
                    },{
                        "text":"lettuce"
                    }]
                }]
            }],
            CountData:[],


        }
    }
    BIND_COUNT_DATACALLBACK(){

    }
    /*初始化树*/
    initTree(da){
        console.log(da)
        //let th=this;
       
     
    }
    render() {
        let th=this;
        return <section>
            <div>chengwei</div>
            <section>
            <h3 className="boxGroupTit">
                    <p>
                        <span>项目信息</span>
                    </p> 
                </h3>
                <div>
                 <DynamicTable pid="countdata" DynamicData={this.state.CountData} CallBack={this.BIND_COUNT_DATACALLBACK.bind(this)} /> 
                </div>
            </section>
            <ThreeTree url="" callback={th.initTree.bind(this)} id={th.state.threeId}/>
            <ApprovalControlNode pid={iss.id}/>
        </section>

    }
}
export default ApprovalControl;