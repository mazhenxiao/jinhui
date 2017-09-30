/*分期  */
import React from 'react';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
import StagingInformation from "./component-stagingInformation.js";
import Indicators from "./component-indicators.js";
class Intallment extends React.Component {
    constructor(arg) {
        super(arg);
         iss.hashHistory.listen((local,next)=>{
        })
    }    
    componentDidMount(){
        
    }
    render() {
        return <article>
        <div>
            <h3 className="boxGroupTit">
                    <p>
                        <span>分期信息</span>
                        <i>（<i className="redFont"></i>为必填项）</i>
                    </p>
				    <span className="functionButton">
                        <a className="saveIcon " href="#">暂存</a>
                        <a className="approvalIcon" target="_blank" href="#">发起审批</a>
                    </span>
			</h3>
        </div>
        <StagingInformation  />
        <div>
            <h3 className="boxGroupTit">
                <p>
                    <span>分期经济指标</span>
                    <i>（投决会版）</i>
                 </p>
			</h3>
        </div>
        <Indicators />
        </article>
    }     

}
export default Intallment;