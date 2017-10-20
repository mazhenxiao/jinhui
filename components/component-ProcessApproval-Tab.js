/*审批信息*/
import React from 'react';
/**
 * 首页导航条
 * index  identity  supply  所需
 */
import "../js/iss.js";
import "babel-polyfill";  //兼容ie

class ProcessApprovalTab extends React.Component {
    constructor(arg) {
        super(arg);
        this.state={
            TapList:[
                {id:"ProcessApproval",url:"/ProcessApproval"},//审批
                {id:"newProjectApproval",url:"/newProjectApproval"},//项目
                {id:"newProjectStage",url:"/newProjectStage"}//分期
            ]
        }
    }
    setTapList(){ //设置导航条
        
        return this.state.TapList.map((el,id)=>{
            let str = "";
            switch(el.id){
                case "ProcessApproval":str="流程审批";break;
                case "newProjectApproval":str="项目信息";break;
                case "newProjectStage":str="分期信息";break;
            }
            return <li className={this.props.current==el.id? "active":""}  key={id} onClick={this.EVENT_CLICK_LINK.bind(this,el.url,el.id)}>{str}</li>
        })
    }
    EVENT_CLICK_LINK(url,id,ev){
      
        iss.hashHistory.push({pathname:url,state:iss.id.id});
    }
    render() {
        let th=this;
        return <section>
            <header className="JH-HeadTab">
                <ul className="JH-HeadList">
                    {
                        this.setTapList()
                    }
                </ul>
            </header>
        
        </section>

    }
}
export default ProcessApprovalTab;