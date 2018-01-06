/*分期  */
import React from 'react';
import iss from "../js/iss.js";
import "babel-polyfill";  //兼容ie
import StagingInformation from "./component-stagingInformation.js";
import Indicators from "./component-indicators.js";
import { setTimeout } from 'timers';
import emitter from "../utils/events";
import "../css/intallment.less";
class Intallment extends React.Component {
    constructor(arg) {
        super(arg);
        this.STAGEID_guid=iss.guid().toString(),
        this.ID_guid=iss.guid().toString();

        this.state={
            StagingInformationDATA:{}, /*分期信息*/
            landList:[],/*分期占用土地*/
            equityRatio:"",/*权益比例*/
            status:"show",
            versionId:"",//版本id
            versionOldId:"",/*老版本ID*/
           	versionNewId:iss.guid().toString(),/*如果是升级，就会生成一个新的versionId,用于暂存和发起审批*/
            projectId:"",/*项目iD*/
            STAGEID_guid:this.STAGEID_guid,
            ID_guid:this.ID_guid,
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
        console.log("datakey初始化",iss.id.id);
    	if(!dataKey){
    		dataKey=(status=="edit"||status=="upgrade")?iss.id.id:iss.guid().toString();
    		versionOldId=status=="upgrade"?iss.id.id:"";
        }
        console.log("versionId初始化",dataKey)
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
        console.log("datakey",dataKey);
        console.log("this.stage",this.state);
    }
    componentDidMount(){
    }
    /*获取基本信息后，再执行其他ajax操作*/
	getBasicInforTodo(basicInfor){
		var th=this;
		var projectId=basicInfor.PROJECTID;
		var stageCode=basicInfor.STAGECODE;
        th.state.projectId=projectId;  //原来下面的代码会造成系统死循环，现在按非标准做法写，不建议其他地方用
		/* th.setState({
        	projectId:projectId
        }); */
        emitter.emit("landFirstLoad",projectId);
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
        let th=this;
        let isvalide=$("#stageInforForm").form("validate");
        var intallmentStatus=iss.getEVal("intallmentStatus");
        
        if(!isvalide) return false;
        if(th.state.landList.length==0){
            iss.popover({content:"请选择分期占用土地"});
            return false;
        }
        th.EVENT_CLICK_SAVE("Submit",arg=>{
            let {final_versionId,areaId,areaName}=arg;
            iss.hashHistory.push({
                pathname: "/ProcessApproval",
                search:'?e='+intallmentStatus+'&dataKey='+final_versionId+'&current=ProcessApproval&areaId='+areaId+'&areaName='+areaName
          }); 
         iss.ajax({
                url: "/Stage/ICheckBuildGroup",
                data:{
                    "id": final_versionId
                },
                success(data) {
                    if(!data.rows){
                        iss.popover({content:"请将组团划分中的未分配楼栋全部分配后，再发起审批！"});
                    }else{
                        iss.hashHistory.push({
                            pathname: "/ProcessApproval",
                            search:'?e='+intallmentStatus+'&dataKey='+final_versionId+'&current=ProcessApproval&areaId='+areaId+'&areaName='+areaName
                        });
                    }
                },
                error() {
                    console.log('失败')
                }
            }) 
            

        })
         
             
            
        
           
       

       
    }
    /*暂存*/
    EVENT_CLICK_SAVE=($str,callback)=>{
    
        let str = typeof $str =="string"? $str:"Save"
        
        let th=this;
        let status=th.state.status;
        var SumbitType;
        let landCode;
        var dta=th.state.StagingInformationDATA;
        var maxCode=th.state.maxCode;
        var versionId=th.state.versionId;
        var newId = th.state.versionNewId;
        var projectId=th.state.projectId; 
        var areaId=dta.AREAID;/*区域id*/
        var areaName=dta.AREANAME;/*区域名字*/



        maxCode=maxCode?maxCode:"";
        dta.LandList=th.state.landList;
        
        if(status=="edit"){  //发起审批为编辑状态时
            SumbitType="Edit";
            let _url = "({'"+window.location.hash.split("?")[1].replace(/\=/ig,"':'").replace(/\&/ig,"','")+"'})";
                _url = eval(_url);
                dta.ID = dta.ID? dta.ID:_url.ID;
                dta.STAGEID=dta.STAGEID? dta.STAGEID:_url.STAGEID;
        }else if(status=="add"){ //新增时
            SumbitType="Add";
            landCode=th.state.landCode;//有地块编码显示地块编码，多个选择最大地块编码，为空
            dta.STAGEVERSIONID=versionId; //版本id直接生成
            dta.STAGEID=this.STAGEID_guid;  //分期idy
            dta.ID=this.ID_guid; //表单i
            //dta.STAGECODE=th.state.pCodeAndLXCode;//分期编码
            dta.SEQNUM=Number(maxCode.replace("Q",""))*10;
        }else if(status=="upgrade"){  //升级版本是
            SumbitType="Upgrade";
           // dta.STAGEVERSIONID=versionId;
            dta.STAGEVERSIONID=th.state.versionNewId;
            dta.STAGEID=this.STAGEID_guid;
            dta.ID=this.ID_guid;
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
                    EditType:str //暂存是save 发起审批是submit
                },
                success(data) {

                  
                    let results=data,id="";
                    if(results.message=="成功"){
                        
                        if(status=="add"){  //生版暂存修改状态
                            th.getAjaxStageEcode();
                        	let localUrl=window.location.href;
                        	let urlPath=localUrl.replace("status=add","status=edit");
                        	if(urlPath.indexOf("dataKey")<0){
                                urlPath=urlPath+"&dataKey="+versionId+"&ID="+th.ID_guid+"&STAGEID="+th.STAGEID_guid;
                                id=versionId;
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
                                urlPath=urlPath+"&dataKey="+newId+"&ID="+th.ID_guid+"&STAGEID="+th.STAGEID_guid;
                                id=newId;
					    	}
                        	
                            th.setState({
                                "status":"edit",
                            });
                            window.location.href=urlPath;
                            iss.popover({ content: "保存成功", type: 2 });
                        }else if(status=="edit"){
                            //id=versionId; 升版造成保存时id是老的，如果升级版本会在url带新的dataKey用来判断替换

                            let {dataKey} = th.props.location.query;
                            id=dataKey? dataKey:versionId;
                        }
                         
                        iss.popover({content:"保存成功",type:2});
                        if (typeof callback == "function") {
                            
                                let params = { 
                                    final_versionId:id,
                                    areaId,
                                    areaName

                                  }
                                callback(params) 
                           
                            };
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
                        <a className="saveIcon" onClick={this.EVENT_CLICK_SAVE} href="javascript:void(0);">暂存</a>
                        <a className="approvalIcon" onClick={this.EVENT_CLICK_POSTAPP.bind(this)} href="javascript:void(0);">发起审批</a>
                    </span>
			</h3>
        </div> 
        
        <StagingInformation  
                versionNewId={this.state.versionNewId} STAGECODE={this.state.STAGECODE} 
                location={th.props.location} versionId={th.state.versionId} 
                landCode={th.state.landCode} versionOldId={th.state.versionOldId} 
                projectId={th.state.projectId}  status={th.state.status}  
                equityTxt={th.state.equityRatio} save={th.EVENT_CLICK_SAVE.bind(th)} 
                baseCallBack={th.getBasicInforTodo.bind(th)} 
                StagingInformationDATA={th.BIND_StagingInformationDATA.bind(th)} />
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