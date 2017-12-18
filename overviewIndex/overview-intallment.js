/* 分期审核=只读基本信息*/
import React from 'react';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
import StageInforView from "../components/component-stageInfor-view.js";  /*分期信息*/
import StageMasView from "../components/component-stageMas-view.js";  /*分期规划条件指标和分期占用土地*/



class OverviewIntallment extends React.Component {
    state={
            versionId:"",/*版本id*/
            projectid:"",/*项目id*/
            status:"edit",/*请求类型*/
            equityTxt:"",/*权益比例*/
            landList:[],/*地块信息*/
        }
    componentWillReceiveProps(nextProps){
        //分期
        let versionId=nextProps.dataKey;
        let projectid=nextProps.parentid;
        this.setState({
            versionId:versionId,
            projectid:projectid,
        },()=>{
            this.getBasicInfor();
            this.getLandlist();

        });
    }
    
    getLandlist = (da) =>{
    	var th=this;
        var equityTxt="";
        var landFirstCode="";
        var landArrLen=da.length-1;
        da.forEach((obj,index)=>{
            if(landArrLen==index){
                equityTxt=equityTxt+obj.Name+"-"+(obj.EQUITYRATIO||0)+"%";
            }else{
                equityTxt=equityTxt+obj.Name+"-"+(obj.EQUITYRATIO||0)+"%,";
            }
        });
        th.setState({
            equityTxt:equityTxt
        });
    }
    /*获取基本信息*/
    getBasicInfor = () =>{
    	let th=this;
    	var projectId=this.props.parentid;   	
    	th.setState({
        	projectId:projectId
        });
        $(document).triggerHandler("landFirstLoad",[projectId]);
    }
    /**
     * 获取详情页面信息
     */
    getStageInfoView=arg=>{
        let th = this;
        let {status} = this.state;
        let json = {
            Id:th.props.dataKey,
            reqtype:status=="edit"? "Edit":status=="upgrade"? "Upgrade":""
        }
        iss.ajax({  //获取数据
            type: "post",
            url:"/Stage/IGetInitInfo",
            data:json,
            success(res) {
                th.getBasicInfor(res.rows.BaseFormInfo)
            },
            error(e) {

            }
        });

    }
    
    render() {
        
        let th=this;
        const {status,equityTxt}=th.state;
        const versionId = th.props.dataKey;
        return (<div>
            <StageInforView versionId={versionId} status={status} equityTxt={equityTxt} basicCallBack={th.getBasicInfor.bind(th)}/>
            <StageMasView versionId={versionId} callback={th.getLandlist.bind(th)}/>
        </div>);
    }
}

export default OverviewIntallment;