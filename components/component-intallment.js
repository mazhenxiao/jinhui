/*分期  */
import React from 'react';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
import StagingInformation from "./component-stagingInformation.js";
import Indicators from "./component-indicators.js";
require("../css/intallment.less");
class Intallment extends React.Component {
    constructor(arg) {
        super(arg);
        let STAGEID_guid=iss.guid().toString(),
        ID_guid=iss.guid().toString();

        this.state={
            StagingInformationDATA:{}, /*分期信息*/
            landList:[],/*分期占用土地*/
            equityRatio:"",/*权益比例*/
            status:"show",
            versionId:"",//版本id
            versionOldId:"",/*老版本ID*/
           	versionNewId:iss.guid().toString(),/*如果是升级，就会生成一个新的versionId,用于暂存和发起审批*/
            projectId:"",/*项目iD*/
            STAGEID_guid:STAGEID_guid,
            ID_guid:ID_guid,
            landCode:"",/*地块编码*/
            projectCode:"",/*项目编码*/
            //maxCode:"",/*最大编码*/
            //pCodeAndLXCode:""/*分期编码*/
        }
        
     
    }    
    componentWillMount(){
        let th=this;
        let location = th.props.location;
        let status=location.query["status"];
        /*项目id*/
        let projectId="";
        /*老版本id*/
        let versionOldId=location.query["versionOldId"];
        /*版本id*/
        let dataKey=location.query["dataKey"];
        
        
    	/*如果没有传递分期版本id,dataKey是分期版本id*/
    	if(!dataKey){
    		dataKey=(status=="edit"||status=="upgrade")?iss.id.id:iss.guid().toString();
    		versionOldId=status=="upgrade"?iss.id.id:"";
    	}
    	/*如果是新建分期*/
    	if(status=="add"){
    		projectId=iss.id.id;
    	}
        th.setState({
            status:status,
            versionId:dataKey,
            versionOldId:versionOldId,
            projectId:projectId
        });
    }
    componentDidMount(){
    }
    /*获取基本信息后，再执行其他ajax操作*/
	getBasicInforTodo(basicInfor){
		var th=this;
		var projectId=basicInfor.PROJECTID;
		var stageCode=basicInfor.STAGECODE;

		th.setState({
        	projectId:projectId
        });
        $(document).triggerHandler("landFirstLoad",[projectId]);
		//th.getPjcodeAMCode(projectId,stageCode);
	}
    
    
    BIND_StagingInformationDATA(data){
        
        this.setState({
            StagingInformationDATA:data
        },()=>{
         
        });
        
    }
    /*分期占用土地==数据*/
    evLandList(landArr){
      
        var th=this;
        var equityTxt="";
        var landFirstCode="";
        var landArrLen=landArr.length-1;
        let areaMax=0,areaNumber="";
        if(landArr.length==0){
            areaNumber="";
        }
        landArr.forEach((obj,index)=>{
            
            if(landArrLen==index){
                equityTxt=equityTxt+obj.Name+"："+(obj.EQUITYRATIO||0)+"%";
            }else{
                equityTxt=equityTxt+obj.Name+"："+(obj.EQUITYRATIO||0)+"%,";
            }
            
            if(index==0){
                landFirstCode=obj["FieldList"][1]['val'];
            }
            if(parseFloat(obj["FieldList"][2]['val'])>areaMax){
                areaMax=parseFloat(obj["FieldList"][2]['val']);
                areaNumber=obj["FieldList"][1]["val"];
                
            }
            
        });
        th.setState({
            landCode:areaNumber,//获取地块编码
            landList:landArr,
            equityRatio:equityTxt, 
        });
        if(th.state.status!="add"){
            let statedb = this.state.StagingInformationDATA;
            let arrs = statedb.STAGECODE.split("-")
            let arr1 = arrs.slice(0,3).concat(areaNumber).concat(arrs.slice(-1)).join("-")
               // arrs.splice(3,1,areaNumber);

                statedb.STAGECODE=arr1;
               // debugger
            th.setState({
                StagingInformationDATA:statedb,
                STAGECODE:arr1,
                //landCode:landFirstCode,
                //pCodeAndLXCode:th.state.projectCode+"-"+areaNumber+"-"+th.state.maxCode
            });
        }else{
            let statedb = this.state.StagingInformationDATA;
            th.setState({
                STAGECODE:statedb.STAGECODE,
            });
        }
        
        /*只有新增，才会生成code*/
        /*if(landFirstCode!=""){
	        th.setState({
	            landCode:landFirstCode,
	            pCodeAndLXCode:th.state.projectCode+"-"+landFirstCode+"-"+th.state.maxCode
	        });
        }*/
    }
    /*发起审批*/
    EVENT_CLICK_POSTAPP(){
    	let isvalide=$("#stageInforForm").form("validate");
    	
        if(!isvalide) return false;
        let th=this;
        let status=th.state.status;
        var maxCode=th.state.maxCode;
        maxCode=maxCode?maxCode:"";
        
        var SumbitType;
        let landCode;
        var dta=th.state.StagingInformationDATA;
        
        var versionId=th.state.versionId;/*版本id*/
        var projectId=dta.PROJECTID;/*项目id*/
        var areaId=dta.AREAID;/*区域id*/
        var areaName=dta.AREANAME;/*区域名字*/
        var final_versionId=versionId;/*最后发起审批 需要传递的id*/

       
        
        var intallmentStatus=iss.getEVal("intallmentStatus");
        dta.LandList=th.state.landList;
        if(dta.LandList.length==0){
        	iss.popover({content:"请选择分期占用土地"});
        	return false;
        }
        if(status=="edit"){
            SumbitType="Edit";
            //dta.STAGECODE=th.state.pCodeAndLXCode;
        }else if(status=="add"){
            SumbitType="Add";
            landCode=th.state.landCode;//有地块编码显示地块编码，多个选择最大地块编码，为空
            dta.STAGEVERSIONID=versionId;  //版本id
            dta.STAGEID=this.state.STAGEID_guid; //分期id
            dta.ID=this.state.ID_guid; //表单id
            //dta.STAGECODE=th.state.pCodeAndLXCode;
            dta.SEQNUM=Number(maxCode.replace("Q",""))*10;
            
        }else if(status=="upgrade"){
            SumbitType="Upgrade";
            dta.STAGEVERSIONIDOLD=versionId;
            dta.STAGEVERSIONID=th.state.versionNewId;
            dta.STAGEID=this.state.STAGEID_guid;
            dta.ID=this.state.ID_guid;
            final_versionId=th.state.versionNewId;
        }
        iss.ajax({
            type:"POST",
            url:"/Stage/IToCreate",
            data:{
                data:JSON.stringify(dta),
                SumbitType:SumbitType,
                landCode:landCode,
                EditType:"Submit", 
            },
            success:function (data) {
				iss.hashHistory.push({
					pathname: "/ProcessApproval",
					search:'?e='+intallmentStatus+'&dataKey='+final_versionId+'&current=ProcessApproval&areaId='+areaId+'&areaName='+areaName
				});
				
            }
        });
    }
    /*暂存*/
    EVENT_CLICK_SAVE(callback){
        let th=this;
        let status=th.state.status;
        var SumbitType;
        let landCode;
        var dta=th.state.StagingInformationDATA;
        var maxCode=th.state.maxCode;
        var versionId=th.state.versionId;
        var newId = th.state.versionNewId;
        var projectId=th.state.projectId;
        
        maxCode=maxCode?maxCode:"";
        dta.LandList=th.state.landList;
        
        if(status=="edit"){  //发起审批为编辑状态时
            SumbitType="Edit";
        }else if(status=="add"){ //新增时
            SumbitType="Add";
            landCode=th.state.landCode;//有地块编码显示地块编码，多个选择最大地块编码，为空
            dta.STAGEVERSIONID=versionId; //版本id直接生成
            dta.STAGEID=this.state.STAGEID_guid;  //分期id
            dta.ID=this.state.ID_guid; //表单id
            //dta.STAGECODE=th.state.pCodeAndLXCode;//分期编码
            dta.SEQNUM=Number(maxCode.replace("Q",""))*10;
        }else if(status=="upgrade"){  //升级版本是
            SumbitType="Upgrade";
            dta.STAGEVERSIONID=versionId;
            dta.STAGEVERSIONID=th.state.versionNewId;
            dta.STAGEID=this.state.STAGEID_guid;
            dta.ID=this.state.ID_guid;
        }
        
        if ($.trim(th.state.StagingInformationDATA.STAGENAME)) {
            //if (!th.state.StagingInformationDATA.checkName) { iss.popover({ content: "分期名称已存在请重新填写！" }); return }
            iss.ajax({
                type:"POST",
                url:"/Stage/IToCreate",
                data:{
                    data:JSON.stringify(dta),
                    SumbitType:SumbitType,
                    landCode:landCode,
                    EditType:"Save"
                },
                success:function (data) {
                    debugger
                    if (typeof callback == "function") { callback() };
                    let results=data;
                    if(results.message=="成功"){
                        if(status=="add"){  //生版暂存修改状态
                            th.getAjaxStageEcode();
                        	let localUrl=window.location.href;
                        	let urlPath=localUrl.replace("status=add","status=edit");
                        	if(urlPath.indexOf("dataKey")<0){
					    		urlPath=urlPath+"&dataKey="+versionId;
					    	}
                        	
                            th.setState({
                                "status":"edit",
                            });
                            window.location.href=urlPath;
                            iss.popover({ content: "保存成功", type: 2 });
                            
                           
                        }else if(status=="upgrade"){
                            th.getAjaxStageEcode();
                        	let localUrl=window.location.href;
                        	let urlPath=localUrl.replace("status=upgrade","status=edit");
                        	if(urlPath.indexOf("dataKey")<0){
					    		urlPath=urlPath+"&dataKey="+newId;
					    	}
                        	
                            th.setState({
                                "status":"edit",
                            });
                            window.location.href=urlPath;
                            iss.popover({ content: "保存成功", type: 2 });
                        }

                        iss.popover({content:"保存成功",type:2});
                        $(window).trigger("treeLoad");
                        
                    }else{
                        iss.popover({content:"保存失败"});
                    }
                }
            });
        }else{
            iss.popover({
                content: "请输入分期名称！"
            });
        }
        
        
    }
	getAjaxStageEcode(){
        let th = this;
        let versionId = th.state.versionId;;
        iss.ajax({
            type: "post",
            //url:"/Project/IProjectInfo",  
            url: "/Stage/IGetInitInfo", 
            data: {
                Id:versionId,
                reqtype:"Edit",
            },
            //获取分期编码
            success(res) {
                let statedb = th.state.StagingInformationDATA;
                let STAGECODE=res.rows.BaseFormInfo.STAGECODE;
                statedb.STAGECODE=STAGECODE;
                th.setState({
                    STAGECODE:STAGECODE,
                })
            }
        })
    }
    /*
     *
     * 根据项目，获取项目编码和最大编码
     * @param id 项目id
     *@param code 分期编码
     */
    
    // getPjcodeAMCode(id,code){
    //     var th=this;
    //     var status=th.state.status;
    //     let landCode=th.state.landCode;
    //     let ISINITDATA=th.state.StagingInformationDATA.ISINITDATA;
        
    //     iss.ajax({
    //         type:"post",
    //         url:"/Stage/IGetStageCodeInfo",   
    //         data:{
    //             projectid:id
    //         },
    //         success(res){
    //             let result=res.rows;
    //             let projectcode=result.projectcode||"";
    //             let maxCode=result.MaxCode+"Q";
    //             debugger
    //             if(code){
	// 	        	maxCode=code.slice(-3);
	// 	        	landCode=code.slice(0,-4).replace(projectcode+"-","");
	// 	        }
    //             th.setState({
    //                 projectCode:projectcode,
    //                 maxCode:maxCode,
    //                 pCodeAndLXCode:projectcode+"-"+landCode+"-"+maxCode
    //             });
                
    //         },
    //         error(e){   
 
    //         }
    //     });
    // }
    render() {
        var th=this;
        return <article>
        <div>
            <h3 className="boxGroupTit">
                    <p>
                        <span>分期信息</span>
                        <i>（<i className="redFont"></i>为必填项）</i>
                    </p>
				    <span className="functionButton" >
                        <a className="saveIcon" onClick={this.EVENT_CLICK_SAVE.bind(this)} href="javascript:void(0);">暂存</a>
                        <a className="approvalIcon" onClick={this.EVENT_CLICK_POSTAPP.bind(this)} href="javascript:void(0);">发起审批</a>
                    </span>
			</h3>
        </div> 
        
        <StagingInformation STAGECODE={this.state.STAGECODE} location={th.props.location} versionId={th.state.versionId} landCode={th.state.landCode} versionOldId={th.state.versionOldId} projectId={th.state.projectId}  status={th.state.status}  equityTxt={th.state.equityRatio} save={th.EVENT_CLICK_SAVE.bind(th)} baseCallBack={th.getBasicInforTodo.bind(th)} StagingInformationDATA={th.BIND_StagingInformationDATA.bind(th)} />
        <div>
            <h3 className="boxGroupTit">
                <p>
                    <span>分期规划条件指标</span>
                 </p>
			</h3>
        </div>
        <div>
        <Indicators local={this.props} location={th.props.location} versionId={th.state.versionId} versionOldId={th.state.versionOldId} status={this.state.status} callback={th.evLandList.bind(th)}/>
        </div>
        </article> 
    }      

}

export default Intallment;