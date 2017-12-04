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
            TapList:[],
            allSearchArg:this.props.allSearchArg/*地址栏的参数*/
        }
        
    }
    getQueryTab(){ //页面显示连接设置
        var th=this;
        let url = th.props.allSearchArg["current"];
        var list = [
            {id:`${url}`,url:`/${url}`},//审批
            {id:"newProjectApproval",url:"/newProjectApproval"},//项目
            {id:"newProjectStage",url:"/newProjectStage"},//分期
            {id:"teamMaintain",url:"/teamMaintain"}//项目团队维护
        ],
        id=th.state.allSearchArg['e'];
        switch(id){
            case iss.getEVal("newProjectStatus"):this.setState({     // 项目审批
                TapList:[list[0],list[1]]
            });break;
            case iss.getEVal("intallmentStatus"):this.setState({ // 分期审批
                TapList:[list[0],list[2]]
            });break;
            case iss.getEVal("teamMaintainStatus"):this.setState({ // 项目团队维护
                TapList:[list[0],list[3]]
            });break;
        }
        
    }
    setTapList(){ //设置导航条
        
        return this.state.TapList.map((el,id)=>{
            let str = "";
            switch(el.id){
                case "ProcessApproval":
                case "ProcessApprover":str="流程审批";break;
                case "newProjectApproval":str="项目信息";break;
                case "newProjectStage":str="分期信息";break;
                case "teamMaintain":str="项目团队维护";break;
            }
            return <li className={this.props.current==el.id? "active":""}  key={id} onClick={this.EVENT_CLICK_LINK.bind(this,el.url,el.id)}>{str}</li>
        })
    }
    EVENT_CLICK_LINK(url,id,ev){
    	var th=this;
    	var allSearchArg=th.state.allSearchArg;
    	var keyArr=[];
        for(let key in allSearchArg){
        	keyArr.push(key+"="+allSearchArg[key]);
        }
        iss.hashHistory.push({
        	pathname:url,
        	search:"?"+keyArr.join("&")
        });
    }
    componentWillMount(){
        this.getQueryTab();
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