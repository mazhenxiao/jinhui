// 分期经济指标（投决会版）
import React from 'react';
import ReactDOM from 'react-dom';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
import "./tools-validate.js";

import DynamicTable from "./tools-dynamicTable.js";
require("../css/tools-dynamicTable.less");//专用css
import Winopen from "./component-indicators-winopen.js"; //弹出选择地块
class Indicators extends React.Component {
    constructor(arg) {
        super(arg);

        this.state = {
            newDynamicData: {},//空数据
            DynamicData: {},//已存在数据
            propsDATA: [],//显示数据
            loadLandData:[],/*所有地块信息*/
            pid: "",
            versionId:this.props.versionId,/*版本id*/
            projectId:"",/*项目id*/
            states: false,
            AcountData: [],/*分期规划条件指标-汇总数据*/
            winAllBuiltData:[],/*分期占用土地table*/
            winopenDATA:[],/*alert中选择地块信息(这个里面不包括已经选择过的地块)或者编辑选中的地块*/
            winopenSelId:"",/*alert中保存选择过的地块Id,逗号分隔*/
            landStageArr:{},/*分期占用土地=相关分期*/
        }
    }

    /*编辑分期，初次获取分期占用土地数据，并汇总数据*/
    evGetLandData(projectId){
        let th=this;
        let status=th.props.status;
        let allListArr=[];
        let selIDs=[];
        
        /*新建分期则不用请求*/
        if(status!="add"){
            
            iss.ajax({
                url: "/Stage/IGetLandQuotaByVersionId",
                type: "get",
                data:{
                    versionId:th.state.versionId,
                    projectid:projectId
                },
                success(d) {
                    
                    allListArr=d.rows;
                    if(!allListArr){return false;}
                    allListArr.forEach((obj,index)=>{
                        selIDs.push(obj.ID);
                    });
                    th.setState({
                        winopenSelId:selIDs.join(","),
                        winAllBuiltData:allListArr,
                        winopenDATA:[]
                    });
                    th.evGetLandFieldSum(allListArr);
                    th.props.callback(allListArr);
                }
            });
        }
    }

    /*分期占用土地=获取相关分期*/
    evIGetLandStageShow(projectId){
        var th=this;
        let status=th.props.status;
        iss.ajax({
            url: "/Stage/IGetLandStageShow",
            type: "get",
            data:{
                projectid:projectId
            },
            success(d) {
                th.setState({
                    landStageArr:d.rows
                });
            }
        })
    }
    /*编辑：初次汇总分期规划条件指标*/
    evGetLandFieldSum(listArrs) {
        let th = this;
        th.ev_saveBuiltInfor("del",listArrs);
    }

    /*编辑地块事件*/
    evBuiltEditTr(selObj,event){
        var th=this;
        let selArr=[];
        let newObj=iss.clone(selObj);
        selArr.push(newObj);
        th.BIND_WINOPEN(selArr);
        th.EVENT_SELECTMISSIF('edit',selArr);
        
    }
    /*删除地块*/
    evBuiltDelTr(selObj,event){
        let th=this;
        let id=selObj.ID;
        let selAllArrs=th.state.winAllBuiltData;
        let loadLandList=th.state.loadLandData;
        let newLoadLandarr=[];
        let isAddObj=false;/*是否把删除的地块添加到loadLandList中*/
        iss.Alert({
            title:"提示",
            width:300,
            content:`<div class="Alert">是否删除地块</div>`,
            ok(){
                
                let newSelAllArrs=selAllArrs.filter((obj,index)=>{
                    return obj.ID!=id;
                });
                /*重新计算删除的地块*/
                selObj.FieldList.forEach((fObj,fIndex)=>{
            		var maxVal=iss.getRegExpkVal(fObj.regExp,"max");
            		var editS=fObj.edit;
            		if(editS=="+w"&&maxVal!=""){
            			fObj.val=maxVal;
            			fObj.text=maxVal;
            		}
            	});
            	
                loadLandList.forEach((obj,index)=>{
                	if(obj.ID==id){
                		isAddObj=true;
                		newLoadLandarr.push(selObj);
                	}else{
                		newLoadLandarr.push(obj);
                	}
                });
                if(!isAddObj){
                	newLoadLandarr.push(selObj);
                }
                
                th.setState({
                	loadLandData:newLoadLandarr
                });
                th.ev_saveBuiltInfor("del",newSelAllArrs);
                
            },
            cancel(){
                
            }
        })
        
    }
    /*分期占用土地=渲染table*/
    BIND_CreateTable() {
        let th=this;
        let list = th.state.winAllBuiltData;
        let landStageArr=th.state.landStageArr;
        
            
        return list.map((obj, index) => {
            return <tr id={obj.ID} key={obj.ID}>
                <td>{index + 1}</td>
                <td>{obj.Name}</td>
                <td>{obj.FieldList[1].val}</td>
                <td>{obj.IsAllDevel==1?"是":"否"}</td>
                <td>{obj.FieldList[2].val}</td>
                <td>{obj.FieldList[5].val}</td>
                <td>{landStageArr[obj.ID]}</td>
                <td>
                    <button type="button" className="funCla funCla_edit" onClick={th.evBuiltEditTr.bind(th,obj)}>编辑</button>
                    <button type="button" className="funCla funCla_del"  onClick={th.evBuiltDelTr.bind(th,obj)}>删除</button>
                </td>
            </tr>
        })

    }
    
    
    BIND_CALLBACK(da) {
        
    }
    /*alert==实时获取地块的信息*/
    BIND_WINOPEN(da){
    	var th=this;
		th.setState({
		   winopenDATA:da
		});
    }
    /*根据地块变化=汇总数据
    @param operaStatus判断是编辑地块,选择地块,删除地块
    */
    ev_saveBuiltInfor(operaStatus,newArr){
        var th = this;
        let listArr=th.state.winopenDATA;
        let filterListArr=[];/*如果是选择地块：过滤选择过的地块；*/
        let allListArr=th.state.winAllBuiltData;
        
        if(operaStatus=="edit"){
            allListArr.forEach((obj,index)=>{
                if(obj.ID==listArr[0]["ID"]){
                    filterListArr.push(listArr[0]);
                }else{
                	filterListArr.push(obj);
                }
            });
            allListArr=filterListArr;
        }else if(operaStatus=="del"){
            allListArr=newArr;
        }else if(operaStatus=="select"){
            listArr.forEach((obj,index)=>{
                if(obj.IsAllDevel!=0){
                    filterListArr.push(obj);
                }
            });
            allListArr=allListArr.concat(filterListArr);
        }
        
        
        
        let selIDs=[];/*保存选择过的地块id*/
        iss.ajax({
            url: "/Stage/IRetLandDynaticFieldSum",
            type: "post",
            data:{
                data:JSON.stringify(allListArr)
            },
            success(d) {
                /*存储选择过的地块*/
                allListArr.forEach((obj,index)=>{
                    selIDs.push(obj.ID);
                });
                let countData=th.setCount(d.rows)
                th.setState({
                    winopenSelId:selIDs.join(","),
                    winAllBuiltData:allListArr,
                    winopenDATA:[],
                    AcountData:countData
                });
                th.props.callback(allListArr);

            }
        });
    }
    setCount(da){
        return da.map((el,ind)=>{ //数据计算
            let reg = /\{.*?\}/ig;
            let str = el.exec;
          
            if(str){
                str.match(reg).forEach((_e,_i)=>{
                    da.forEach((__e,__i)=>{
                        if(_e.replace(/[{}]/ig,"")==__e.id){
                            str=str.replace("{"+__e.id+"}",__e.val);
                        }
                    })
                })
                try{
                    el.val=eval(str); 
                    el.text=eval(str);  
                }catch(e){}
            } 
             return el;        
        }) 
    }
    /*选择地块事件*/
    evSelectLandlist(editOrSel){
    	var th=this;
    	var allData=th.state.loadLandData? [...th.state.loadLandData]:[]; //iss.clone(th.state.loadLandData);
    	var selectIds=th.state.winopenSelId;
    	var filterArr=allData.filter(function(obj,index){
            return !new RegExp(obj.ID,"ig").test(selectIds);
        });
    	th.BIND_WINOPEN(filterArr);
    	th.EVENT_SELECTMISSIF("select",filterArr);
    }
    /*
    @editOrSel 判断是编辑(edit)/选择(select) 地块
    */
    EVENT_SELECTMISSIF(editOrSel,selArr){
        var th=this;
        let status=th.props.status;
        //let id=th.state.projectId;
        let title="";
       
        
        /*判断是编辑地块还是选择地块*/
        if(editOrSel=="select"){
            title="选择分期占用土地<span class='red'>（*为必填项）</span><span id='errorTip' class='red'></span>";
        }else if(editOrSel=="edit"){
            title="编辑分期占用土地<span class='red'>（*为必填项）</span><span id='errorTip' class='red'></span>";
        }
        iss.Alert({
            title:title,
            width:1000,
            height:400,
            content:`<div id="alertBuiltBlock"></div>`,
            ok(){
                var isValid=$("#form_aBuiltLand").form("validate");
                
                if(isValid){
                    th.ev_saveBuiltInfor(editOrSel);
                }else{
                    return false;
                }
                
            }
        });
        
        ReactDOM.render(<Winopen selId={th.state.winopenSelId} selArr={selArr} status={editOrSel} callback={this.BIND_WINOPEN.bind(this)} />,document.querySelector("#alertBuiltBlock"));
    }
    /*加载所有地块信息*/
    evLoadLandData(projectId){
    	var th=this;
    	let status=th.props.status;
        
   		iss.ajax({
            url: "/Stage/IGetLandQuotaByProId",
            type: "get",
            data: { projectId:projectId },
            success(d) {
                th.setState({
                	loadLandData:d.rows
                });
            }
       });
    }
    componentDidMount() {
        var th=this;
        $(function(){
        	$(document).off("landFirstLoad").on("landFirstLoad",function(e,projectId){
        		th.setState({
        			projectId:projectId
        		});
        		th.evGetLandData(projectId);/*编辑分期时，初次获取分期占用土地数据*/
		        th.evIGetLandStageShow(projectId);/*分期占用土地=获取相关分期*/
		        th.evLoadLandData(projectId);/*加载所有地块信息*/
        	});
        });
        
    }

    render() {
        var selArr=[];
        return <article className="staging-box">
            <section className="boxSizing">
                <DynamicTable pid={iss.guid()} DynamicData={this.state.AcountData} CallBack={this.BIND_CALLBACK.bind(this)} />
            </section>
            <section>
                <h3 className="boxGroupTit"><p><span>分期占用土地</span><i></i></p>
                    <span className="functionButton">
                        <a className="refresh-icon addIcon ClickThePopUp1" onClick={this.evSelectLandlist.bind(this,'select')} href="javascript:;">选择地块</a>
                    </span>
                </h3>
                <div>
                    <table className="table builtTable">
                        <thead>
                            <tr>
                                <td>序号</td>
                                <td>地块名称</td>
                                <td>地块编号</td>
                                <td>全部开发</td>
                                <td>总用地面积（㎡）</td>
                                <td>计容建筑面积（㎡）</td>
                                <td>相关分期</td>
                                <td>操作</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.BIND_CreateTable(this)}
                        </tbody>
                    </table>
                </div>
                {/* <DynamicTable pid={this.state.pid} DynamicData={this.state.propsDATA} CallBack={this.BIND_CALLBACK.bind(this)} /> */}
            </section>

        </article >
    }

}
export default Indicators;