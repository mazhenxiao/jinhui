/**
 *  面积管理 manage(项目和分期)
 */
import "../js/iss.js";
import React, {Component} from 'react';
import {Spin, Tabs, Row, Col, Button} from 'antd';
import {AreaConstants} from '../constants';
import ComBlock from './com-block';
import ComBuilding from './com-building';
import ComFormat from './com-format';
import PlanQuota from './plan-quota';
import BlockFormatEdit from './block-format-edit';
import BlockFormatAdjust from './block-format-adjust';
import BuildingAreaAdjust from './building-area-adjust';
import BuildingFormatEdit from './building-format-edit';
import FormatAreaAdjust from './format-area-adjust';
import iss from "../js/iss.js";//公共类
require("../css/tools-processBar.less");
require("../css/button.less");
require("../area/areaCss/areaManage.less");

const TabPane = Tabs.TabPane;
const {AreaManageStep,Legend} = AreaConstants;
/*
 * 地址栏参数说明  localSearch
 * isProOrStage 区分项目和分期  1项目  2分期
 * dataKey 项目id或分期版本id
*/

class Index extends Component {

    state = {
        loading: false,
        step:{},/*返回具有最新数据的step,由后台返回,现在初始设置为投决会*/
        stepsArr:[],/*后台返回的steps*/
        modalKey: "",
        modalParam: null,
        toggleTab:3,/* 默认打开的tap*/
        dataKey:"",/*项目id或分期版本id*/
        localSearch:{},/*地址栏参数*/
    };
    /*
    *在组件接收到一个新的prop时被调用,这个方法在初始化render时不会被调用
    *param nextProps 下一阶段的props
    * */
   componentWillReceiveProps(nextProps){
   		let th=this;
   		console.log(nextProps);
   		th.handleFirstLoad(nextProps);
   }
   componentWillMount() {
		let th=this;
   }
   componentDidMount() {
        var th=this;
        th.handleFirstLoad(th.props);
   }
    /*第一次加载*/
    handleFirstLoad=(propsArg)=>{
    	  let th=this;
		  let localSearch=propsArg.location.query;
		  let dataKey=localSearch['dataKey'];
		  th.setState({
			dataKey:dataKey,
			localSearch:localSearch
		  });
		  console.log("获取信息的万能id，代表项目id或分期版本id=="+dataKey);
		  console.log(localSearch);
		  th.handleGetSteps(localSearch);
    }
    /*获取九种步骤
    *@param allArg 地址栏参数
    * */
   handleGetSteps=(allArg)=>{
   	  let th=this;
   	  let dataKey=allArg['dataKey'];
   	  let isProOrStage=allArg["isProOrStage"];
   	  let jsonArg={
   	  		ProjectStageId:dataKey,
   	  		projectOrStage:isProOrStage,
   	  		dataType:2,/*代表面积管理*/
   	  }
   	  
   	  iss.ajax({
   	  	type: "get",
   	  	url:"/Common/IGetStept",
   	  	data:jsonArg,
   	  	success(res){
   	  		th.setState({
   	  			stepsArr:res.rows,
   	  			step:res.rows[0]||{}
   	  		});
   	  	}
   	  });
   	  
   }
    handleStepClick = (step) => {
    	console.log(step);
    	this.setState({
            step
       });
    };

    handleModalClick = (modalKey, modalParam) => {
        return () => {
            this.setState({
                modalKey,
                modalParam
            });
        };
    };
    /*渲染button*/
    renderButtonList = () => {
        const {step} = this.state;
        if(Object.keys(step).length==0) return false;
        if (step.guid < 3) {
            return (
                <div>
                    <div className="areaTopbtn jhBtn-wrap">
		    		    <button type="button" className="jh_btn jh_btn22 jh_btn_add">生成新版本</button>
		    		    <button type="button" className="jh_btn jh_btn22 jh_btn_save" onClick={this.handleModalClick("block-format-edit")}>业态维护</button>
		    			<button type="button" className="jh_btn jh_btn22 jh_btn_apro">发起审批</button>
		    		</div>
                </div>
            );
        }
        return (
            <div>
                <div className="areaTopbtn jhBtn-wrap">
	    		    <button type="button" className="jh_btn jh_btn22 jh_btn_add">生成新版本</button>
	    		    <button type="button" className="jh_btn jh_btn22 jh_btn_save" onClick={this.handleModalClick("building-format-edit")}>业态/楼栋维护</button>
	    			<button type="button" className="jh_btn jh_btn22 jh_btn_apro">发起审批</button>
	    		</div>
            </div>
        );
    };

    handleTabChange = (key) => {
        console.log("切换标签", key);
    };
    /*渲染tap 的 content*/
    renderTabList = () => {
        let {toggleTab,step,localSearch} = this.state;
        if(toggleTab==1){
        	return (<PlanQuota  tab="规划方案指标" adsArg={localSearch}/>);
        }else if(toggleTab==2){
        	return (<ComBuilding tab="产品构成--按楼栋" adsArg={localSearch}/>);
        }else if(toggleTab==3){
        	if(step.guid<3){
        		return (<ComBlock tab="产品构成--按地块" adsArg={localSearch}/>);
        	}
        	return (<ComFormat tab="产品构成--按业态" adsArg={localSearch} />);
        }
    };

    handleHideModal = () => {
        this.setState({
            modalKey: "",
        });
    };
    /*切换tab*/
    evLi=(status,event)=>{
    	var th=this;
	   	var me=event.target;
	   	th.setState({
	   		toggleTab:status
	   	});
    }
    /*显示各种编辑弹框*/
    renderEditOrAdjust = () => {
        const {modalKey, modalParam,localSearch} = this.state;
        switch (modalKey) {
            case "block-format-edit":
                return <BlockFormatEdit onHideModal={this.handleHideModal} adsArg={localSearch}/>;
            case "building-format-edit":
                return <BuildingFormatEdit adsArg={localSearch}/>;
            default:
                return null;
        }
    };
    /*渲染步骤的颜色状态*/
    renderStepLend=()=>{
    	return Legend.map((el,ind) => {
            return (
                <li key={ind} data-guid={el.guid}  className={el.class}>{el.text}</li>
            );
        });
    };
    /*渲染步骤*/
   renderStepList(){
   	
   		let th=this;
   		let {stepsArr,step}=th.state;
   		let len=stepsArr.length;
   		return stepsArr.map((el,ind)=>{
	        return <li style={{zIndex:len-ind}} className={el.guid==step.guid?"active":""} onClick={th.handleStepClick.bind(this,el)} key={ind} data-guid={el.guid} data-name={el.name} ><span className={el.className}></span>{el.name}</li>
	    });
   }
    render() {
        const {loading} = this.state;
        let th=this;
        let thState=this.state;
        return (
            <div className="areaManage">
                <Spin size="large" spinning={loading}>
                    <div className="processBar">
			           <ul className="processBar-header">
			           		{th.renderStepLend()}
			           </ul>
			           <ul className="processBar-List">
			           		{th.renderStepList()}
			           </ul>
			        </div>
		    		{this.renderButtonList()}
		    		<div className="areaSession areaSession20">
		        		<div className="JH-HeadTab">
			        		<ul className="JH-HeadList">
			        			<li onClick={th.evLi.bind(th,1)} className={thState.toggleTab==1?"active":""}>规划方案指标</li>
			        			<li onClick={th.evLi.bind(th,2)} className={thState.step.guid>2?(thState.toggleTab==2?"active":""):"hide"}>产品构成-按楼栋</li>
			        			<li onClick={th.evLi.bind(th,3)} className={thState.toggleTab==3?"active":""}>产品构成-按业态</li>
			        		</ul>
			        		<span className="areaUnit">（面积单位：㎡，车位单位：个，限高单位：米）</span>
			        		<div className="Right">
			        			<button type="button" className="jh_btn jh_btn33 jh_btn_save Left">保存</button>
			        			<div className="areaVeSel">
			        				<label htmlFor="areaVeSel">当前版本: </label>
			        				<select id="areaVeSel"></select>
			        			</div>
			        			<span className="areaStatus">状态: 无</span>
			        		</div>
			        	</div>
		        	</div>
		        	{
		        		this.renderTabList()
		        	}
                    {this.renderEditOrAdjust()}
                </Spin>
            </div>
        );
    }
    ;
}

export default Index;