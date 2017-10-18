// 分期经济指标（投决会版）
import React from 'react';
import ReactDOM from 'react-dom';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
import "./tools-validate.js";
require("../../Content/css/intallment.less");
import DynamicTable from "./tools-dynamicTable.js";
import "../../Content/css/tools-dynamicTable.less";//专用css
import "../../Content/css/table.less";/*表格*/
import Winopen from "./component-indicators-winopen.js"; //弹出选择地块
class Indicators extends React.Component {
    constructor(arg) {
        super(arg);

        this.state = {
            newDynamicData: {},//空数据
            DynamicData: {},//已存在数据
            propsDATA: [],//显示数据
            pid: "",
            treeId: iss.id.id,//左侧树id
            states: false,
            AcountData: [],/*分期规划条件指标-汇总数据*/
            winAllBuiltData:[],/*分期占用土地table*/
            winopenDATA:[],/*alert中选择地块信息(这个里面不包括已经选择过的地块)或者编辑选中的地块*/
            winopenSelId:"",/*alert中保存选择过的地块Id,逗号分隔*/
            landStageArr:[],/*分期占用土地=相关分期*/
        }
    }

    /*编辑分期，初次获取分期占用土地数据，并汇总数据*/
    evGetLandData(){
        let th=this;
        let status=th.props.local.location.query.status;
        let allListArr=[];
        let selIDs=[];
        /*新建分期则不用请求*/
        if(status!="add"){
            iss.ajax({
                url: "/Stage/IGetLandQuotaByVersionId",
                type: "get",
                data:{
                    versionId:iss.id.id,
                    projectid:iss.id.parentid
                },
                success(d) {
                    console.log("第一次加载，编辑分期时，获取分期占用土地数据");
                    console.log(d.rows);
                    allListArr=d.rows;
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
                },
                error(d) {
                    console.log(JSON.stringify(d));
                }
            });
        }
    }

    /*分期占用土地=获取相关分期*/
    evIGetLandStageShow(){
        var th=this;
        var id=th.state.treeId;
        iss.ajax({
            url: "/Stage/IGetLandStageShow",
            type: "get",
            data:{
                projectid:id
            },
            success(d) {
                th.setState({
                    landStageArr:d.rows
                });
            },
            error(d) {
                console.log(JSON.stringify(d));
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
        selArr.push(selObj);
        th.BIND_WINOPEN(selArr);
        th.EVENT_SELECTMISSIF('edit',selArr);
        
    }
    /*删除地块*/
    evBuiltDelTr(selObj,event){
        let th=this;
        let id=selObj.ID;
        let selAllArrs=th.state.winAllBuiltData;
        iss.Alert({
            title:"提示",
            width:300,
            content:`<div class="Alert">是否删除地块</div>`,
            ok(){
                
                let newSelAllArrs=selAllArrs.filter((obj,index)=>{
                    return obj.ID!=id;
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
        if (list.length) {
            
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

        } else {
                return <tr><td>无地块</td></tr>
        }
    }
    
    
    BIND_CALLBACK() {

    }
    /*alert==实时获取地块的信息*/
    BIND_WINOPEN(da){
        console.log("实时地块信息");
        console.log(da);
      this.setState({
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
                    obj=listArr[0];
                }
            });
        }else if(operaStatus=="del"){
            allListArr=newArr;
        }else if(operaStatus=="select"){
            listArr.forEach((obj,index)=>{
                if(obj.IsAllDevel!=0){
                    filterListArr.push(obj);
                }
            });
        }
        
        allListArr=allListArr.concat(filterListArr);
        
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
                th.setState({
                    winopenSelId:selIDs.join(","),
                    winAllBuiltData:allListArr,
                    winopenDATA:[],
                    AcountData:d.rows
                });
                th.props.callback(allListArr);

                console.log("分期规划条件指标/汇总数据=========");
                console.log(d.rows);
            },
            error(d) {
                console.log(JSON.stringif(d));
            }
        })
    }
    /*选择地块事件
    @editOrSel 判断是编辑(edit)/选择(select) 地块
    */
    EVENT_SELECTMISSIF(editOrSel,selArr){
        var th=this;
        let status=th.props.local.location.query.status;
        let id="";
        let title="";
        if(status=="add"){
            id=th.state.treeId;
        }else{
            id=iss.id.parentid;
        }
        if(editOrSel=="select"){
            title="选择分期占用土地<span class='red'>（*为必填项）</span>";
        }else if(editOrSel=="edit"){
            title="编辑分期占用土地<span class='red'>（*为必填项）</span>";
        }
        iss.Alert({
            title:title,
            width:1000,
            height:400,
            content:`<div id="alertBuiltBlock"></div>`,
            ok(){
                var isValid=$("#form_aBuiltLand").form("validate");
                console.log("验证结果："+isValid)
                if(isValid){
                    th.ev_saveBuiltInfor(editOrSel);
                }else{
                    return false;
                }
                
            }
        });
        
        ReactDOM.render(<Winopen guid={id} selId={th.state.winopenSelId} selArr={selArr} status={editOrSel} callback={this.BIND_WINOPEN.bind(this)} />,document.querySelector("#alertBuiltBlock"));
    }
    
    componentDidMount() {
        if(iss.id==""){ return}
        this.evGetLandData();/*编辑分期时，初次获取分期占用土地数据*/
        this.evIGetLandStageShow();/*分期占用土地=获取相关分期*/
    }
    componentWillMount() {
        // if (!this.props.local.location || !this.props.local.location.state) { 
        //     iss.Alert({ content: "请选择区域或项目！" }) 
        // } else {
        //     this.setState({
        //         treeId: this.props.local.location.state.id
        //     })
        // }
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
                        <a className="refresh-icon addIcon ClickThePopUp1" onClick={this.EVENT_SELECTMISSIF.bind(this,'select',selArr)} href="javascript:;">选择地块</a>
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