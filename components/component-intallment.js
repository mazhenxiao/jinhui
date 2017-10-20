/*分期  */
import React from 'react';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
import StagingInformation from "./component-stagingInformation.js";
import Indicators from "./component-indicators.js";
class Intallment extends React.Component {
    constructor(arg) {
        super(arg);
        this.state={
            StagingInformationDATA:{}, /*分期信息*/
            landList:[],/*分期占用土地*/
            equityRatio:"",/*权益比例*/
            status:"show",
            STAGEVERSIONID_guid:iss.guid(),
            STAGEID_guid:iss.guid(),
            ID_guid:iss.guid(),
            landCode:"",/*地块编码*/
            projectCode:"",/*项目编码*/
            maxCode:"",/*最大编码*/
            pCodeAndLXCode:""/*分期编码*/
        }
         iss.hashHistory.listen((local,next)=>{
        });
    }    
    componentWillMount(){
        
        let location = this.props.location
        if(location.query["status"]){
            this.setState({
                status:this.props.location.query.status,
            })
        }
        
    }
    componentDidMount(){
        
    }
    BIND_StagingInformationDATA(data){
        console.log(data)
        this.setState({
            StagingInformationDATA:data
        },()=>{
         //   this.getAjax();
        });
        
       
    }
    /*分期占用土地==数据*/
    evLandList(landArr){
        
        var th=this;
        var equityTxt="";
        var landFirstCode="";
        var landArrLen=landArr.length-1;
        landArr.forEach((obj,index)=>{
            if(landArrLen==index){
                equityTxt=equityTxt+obj.Name+"-"+(obj.EQUITYRATIO||0)+"%";
            }else{
                equityTxt=equityTxt+obj.Name+"-"+(obj.EQUITYRATIO||0)+"%,";
            }
            
            if(index==0){
                landFirstCode=obj["FieldList"][1]['val'];
            }
        });
        console.log("最终地块信息");
        console.log(landArr);
        console.log("权益比例");
        console.log(equityTxt);
        
        th.setState({
            landList:landArr,
            equityRatio:equityTxt
        });
        /*只有新增，才会生成code*/
        if(th.state.status=="add"){
            th.setState({
                landCode:landFirstCode,
                pCodeAndLXCode:th.state.projectCode+"-"+landFirstCode+"-"+th.state.maxCode
            });
        }
    }
    /*发起审批*/
    EVENT_CLICK_POSTAPP(){
        let status=this.props.location.query.status;
        let th=this;
        var SumbitType;
        var dta=th.state.StagingInformationDATA;
        
        dta.LandList=th.state.landList;
        if(status=="edit"){
            SumbitType="Edit";
        }else if(status=="add"){
            SumbitType="Add";
            dta.STAGEVERSIONID=this.state.STAGEVERSIONID_guid;
            dta.STAGEID=this.state.STAGEID_guid;
            dta.ID=this.state.ID_guid;
            dta.STAGECODE=th.state.pCodeAndLXCode;
        }else if(status=="upgrade"){
            SumbitType="Upgrade";
            dta.STAGEVERSIONIDOLD=iss.id.id;
            dta.STAGEVERSIONID=this.state.STAGEVERSIONID_guid;
            dta.STAGEID=this.state.STAGEID_guid;
            dta.ID=this.state.ID_guid;
        }
    //    console.log(dta);

        iss.ajax({
            type:"POST",
            url:"/Stage/IToCreate",
            data:{
                data:JSON.stringify(dta),
                SumbitType:SumbitType,
                EditType:"Submit", 
            },
            success:function (data) {
               console.log(JSON.stringify(data));
            },
            error:function (er) {
                console.log('错误');
            }
        });
    }
    /*暂存*/
    EVENT_CLICK_SAVE(){
        let status=this.props.location.query.status;
        let th=this;
        var SumbitType;
        var dta=th.state.StagingInformationDATA;
        
        dta.LandList=th.state.landList;
        if(status=="edit"){
            SumbitType="Edit";
        }else if(status=="add"){
            SumbitType="Add";
            dta.STAGEVERSIONID=this.state.STAGEVERSIONID_guid;
            dta.STAGEID=this.state.STAGEID_guid;
            dta.ID=this.state.ID_guid;
            dta.STAGECODE=th.state.pCodeAndLXCode;
        }else if(status=="upgrade"){
            SumbitType="Upgrade";
            dta.STAGEVERSIONIDOLD=iss.id.id;
            dta.STAGEVERSIONID=this.state.STAGEVERSIONID_guid;
            dta.STAGEID=this.state.STAGEID_guid;
            dta.ID=this.state.ID_guid;
        }
        

        iss.ajax({
            type:"POST",
            url:"/Stage/IToCreate",
            data:{
                data:JSON.stringify(dta),
                SumbitType:SumbitType,
                EditType:"Save",
            },
            success:function (data) {
                console.log(JSON.stringify(data));
                let results=data;
                if(results.message=="成功"){
                    iss.popover({content:"保存成功",type:2});
                    $(window).trigger("treeLoad");
                }else{
                    iss.popover({content:"保存失败"});
                }
            },
            error:function (er) {
                console.log('错误');
            }
        });
    }

    getAjax(){
       
    }
    /*获取项目编码和最大编码*/
    getPjcodeAMCode(id){
        var th=this;
        if(th.state.status!="add"){return false;}
        iss.ajax({
            type:"post",
            url:"/Stage/IGetStageCodeInfo",   
            data:{
                projectid:id
            },
            success(res){
                let result=res.rows;
                let projectcode=result.projectcode||"";
                let maxCode=result.MaxCode||"";
                th.setState({
                    projectCode:projectcode,
                    maxCode:maxCode
                });
                
            },
            error(e){   
 
            }
        });
    }
    render() {
        var th=this;
        return <article>
        <div>
            <h3 className="boxGroupTit">
                    <p>
                        <span>分期信息</span>
                        <i>（<i className="redFont"></i>为必填项）</i>
                    </p>
				    <span className="functionButton">
                        <a className="saveIcon" onClick={this.EVENT_CLICK_SAVE.bind(this)} href="javascript:void(0);">暂存</a>
                        <a className="approvalIcon" onClick={this.EVENT_CLICK_POSTAPP.bind(this)} href="#">发起审批</a>
                    </span>
			</h3>
        </div> 
        
        <StagingInformation location={this.props.location} pCodeAndLXCode={th.state.pCodeAndLXCode} equityTxt={th.state.equityRatio} codeCallBack={th.getPjcodeAMCode.bind(th)} StagingInformationDATA={this.BIND_StagingInformationDATA.bind(this)} />
        <div>
            <h3 className="boxGroupTit">
                <p>
                    <span>分期规划条件指标</span>
                 </p>
			</h3>
        </div>
        <Indicators local={this.props} callback={th.evLandList.bind(th)}/>
        </article> 
    }      

}

export default Intallment;