/*面积管理*/
import React from 'react';
import ReactDOM from 'react-dom';
import "babel-polyfill";  //兼容ie
import "../js/iss.js";
import ProcessBar from "../components/tools-processBar.js";
import AreaGrid from "../areaMa/area-grid.js";/*产品构成业态楼栋-grid*/
import AreaSum from "../areaMa/area-sum.js";/*规划方案指标*/
import AreaAlertTain from "../areaMa/area-alertTain.js";/*规划方案指标*/
require("../../Content/css/button.less");
require("../../Content/areaMa/areaCss/areaManage.less");

class AreaManage extends React.Component {
   constructor(arg) {
        super(arg);
        this.state={
        	dataKey:"",/*代表项目Id或分期版本id*/
        	localSearch:{},/*地址栏参数*/
        	nineStepArr:[],/*存储九种步骤*/
        	nineActiveGuid:"1",/*当前选中的是九种步骤中的哪一个,0代表没有选择任何一个*/
        	versionArr:[],/*向前版本*/
        	toggleTab:"3"/*用来切换规划指标，按业态，按楼栋三个页签，3代表业态*/
        }
   }
   /*
    *在组件接收到一个新的prop时被调用,这个方法在初始化render时不会被调用
    *param nextProps 下一阶段的props
    * */
   componentWillReceiveProps(nextProps){
   		let th=this;
   		th.evfirstLoad(nextProps);
   }
   componentWillMount() {
		let th=this;
   }
   componentDidMount() {
        var th=this;
        th.evfirstLoad(th.props);
   }
   /*第一次进入页面需要加载的数据，所有的第一次加载请放入这个函数内*/
   evfirstLoad(propsArg){
   	  let th=this;
   	  let localSearch=propsArg.location.query;
   	  let dataKey=localSearch['dataKey'];
   	  th.setState({
		dataKey:dataKey,
		localSearch:localSearch
	  });
	  console.log("获取信息的万能id，代表项目id或分期版本id=="+dataKey);
      console.log(localSearch);
   	  th.evGetNineStep(localSearch);
   }
   /*获取当前版本和状态
    *@param allArg 地址栏参数
    */
  evGetVersionState(allArg){
  	let th=this;
  	let jsonArg={
  		ProjectStageId:allArg['dataKey'],
   	  	projectOrStage:allArg['isProOrStage'],
   	  	projectlevel:1,/*此参数表示面积管理*/
   	  	step:th.state.nineActiveGuid
  	}
  	iss.ajax({
	  	type: "get",
	  	url:"/Common/IGetVersionListByBusinessId",
	  	data:jsonArg,
	  	success(res){
	  		console.log(res);
	  		th.setState({
	  			versionArr:res.rows
	  		});
	  	}
	});
  }
   /*获取九种步骤
    *@param allArg 地址栏参数
    * */
   evGetNineStep(allArg){
   	  let th=this;
   	  let dataKey=allArg['dataKey'];
   	  let isProOrStage=allArg["isProOrStage"];
   	  let jsonArg={
   	  		ProjectStageId:dataKey,
   	  		projectOrStage:isProOrStage
   	  }
   	  iss.ajax({
   	  	type: "get",
   	  	url:"/Common/IGetStept",
   	  	data:jsonArg,
   	  	success(res){
   	  		th.setState({
   	  			nineStepArr:res.rows
   	  		});
   	  		th.evGetVersionState(allArg);
   	  	}
   	  });
   }
    /*9种步骤的点击回调*/
   evBarCallBack(data){
   		console.log(data);
   		let th=this;
   		th.setState({
   			nineActiveGuid:data.guid
   		});
   }
   /*切换三种页签*/
   evLi(status,event){
   	var th=this;
   	var me=event.target;
   	$(me).addClass("active").siblings(".active").removeClass("active");
   	th.setState({
   		toggleTab:status
   	});
   }
   /*业态/楼栋维护*/
   evMaintain(){
	   	var th=this;
	   	iss.Alert({
	        title:"楼栋/业态维护",
	        width:1000,
	        height:400,
	        content:`<div id="areaMaintain"></div>`,
	        ok(){
	            
	        }
	    });
	    
	    ReactDOM.render(<AreaAlertTain />,document.querySelector("#areaMaintain"));
   }
    /*渲染当前版本*/
  	evRenderVersion(){
  		let th=this;
  		let versionArr=th.state.versionArr;
  		if(versionArr.length){
  			return versionArr.map((obj,index)=>{
	  			return <option key={index}>{obj.text}</option>
	  		});
  		}else{
  			return <option value="0">无</option>
  		}
  		
  	}
    render() {
    	let th=this;
    	let thState=th.state;
    	
        return (<div className="areaManage">
            <div className="areaTopbtn jhBtn-wrap">
    		    <button type="button" className="jh_btn jh_btn22 jh_btn_add">生成新版本</button>
    		    <button type="button" className="jh_btn jh_btn22 jh_btn_save" onClick={th.evMaintain.bind(th)}>业态/楼栋维护</button>
    			<button type="button" className="jh_btn jh_btn22 jh_btn_apro">发起审批</button>
    		</div>
        	<ProcessBar data={thState.nineStepArr} activeGuid={thState.nineActiveGuid} callback={this.evBarCallBack.bind(this)} />
        	<div className="areaSession areaSession20">
        		<div className="JH-HeadTab">
	        		<ul className="JH-HeadList">
	        			<li onClick={th.evLi.bind(th,1)}>规划方案指标</li>
	        			<li onClick={th.evLi.bind(th,2)} className={thState.nineActiveGuid>2?"":"hide"}>产品构成-按楼栋</li>
	        			<li onClick={th.evLi.bind(th,3)} className="active">产品构成-按业态</li>
	        		</ul>
	        		<span className="areaUnit">（面积单位：㎡，车位单位：个，限高单位：米）</span>
	        		<div className="Right">
	        			<button type="button" className="jh_btn jh_btn33 jh_btn_save Left">保存</button>
	        			<div className="areaVeSel">
	        				<label htmlFor="areaVeSel">当前版本: </label>
	        				<select id="areaVeSel">
	        					{
	        						th.evRenderVersion()
	        					}
	        				</select>
	        			</div>
	        			<span className="areaStatus">状态: 无</span>
	        		</div>
	        	</div>
        	</div>
        	{
        		thState.toggleTab==1?<AreaSum></AreaSum>:<AreaGrid></AreaGrid>
        	}
        </div>);
    }
}
export default AreaManage;