/* 分期规划条件指标和分期占用土地*/
import React from 'react';
import ReactDOM from 'react-dom';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
import "../../Content/css/table.less";/*表格*/
import DynamicTable from "./tools-dynamicTable.js";
import Winopen from "./component-indicators-winopen.js"; //弹出选择地块

class StageMasView extends React.Component {
    constructor(arg) {
        super(arg);
        this.state={
            versionId:this.props.versionId,/*版本id*/
            projectid:this.props.projectid,/*项目id*/
            landList:[],/*地块信息*/
            landStageObj:{},/*相关分期*/
            sumLandData:[]/*汇总信息*/
        }
    }
    /*查看地块信息*/
    evViewLandInfor(obj){
        let th=this;
        let selArr=[obj];
        iss.Alert({
            title:"查看分期占用土地",
            width:1000,
            height:400,
            content:`<div id="alertBuiltBlock"></div>`
        });
        
        ReactDOM.render(<Winopen guid="" selId="" selArr={selArr} status="view" callback={th.evCallBackLand.bind(th)} />,document.querySelector("#alertBuiltBlock"));
    }
    /*地块查看回调函数*/
    evCallBackLand(){
    }
    /*汇总地块信息*/
    evSunLand(listData){
        var th=this;
        iss.ajax({
            url: "/Stage/IRetLandDynaticFieldSum",
            type: "post",
            data:{
                data:JSON.stringify(listData)
            },
            success(d) {
                console.log("分期规划条件指标/汇总数据=========");
                console.log(d.rows);
                th.setState({
                    sumLandData:d.rows
                });
            },
            error(d) {
                console.log(JSON.stringif(d));
            }
        });
    }
    /*加载地块信息*/
    evLoadLand(){
        let th=this;
        iss.ajax({
            url: "/Stage/IGetLandQuotaByVersionId",
            type: "get",
            data:{
                versionId:th.state.versionId,
                projectid:th.state.projectid
            },
            success(d) {
                var landArr=d.rows;
                th.setState({
                    landList:landArr
                });
                th.evSunLand(landArr);
            },
            error(d) {
                console.log(JSON.stringify(d));
            }
        });
    }
    /*加载地块相关分期*/
    evIGetLandStageShow(){
        var th=this;
        iss.ajax({
            url: "/Stage/IGetLandStageShow",
            type: "get",
            data:{
                projectid:th.state.projectid
            },
            success(d) {
                th.setState({
                    landStageObj:d.rows
                });
            },
            error(d) {
                console.log(JSON.stringify(d));
            }
        })
    }
    /*渲染地块信息*/
    loadLandHtml(){
        let th=this;
        let landList=th.state.landList;
        let landStageObj=th.state.landStageObj;
        
        return landList.map((obj, index) => {
            return <tr id={obj.ID} key={obj.ID}>
                <td>{index + 1}</td>
                <td>{obj.Name}</td>
                <td>{obj.FieldList[1].val}</td>
                <td>{obj.IsAllDevel==1?"是":"否"}</td>
                <td>{obj.FieldList[2].val}</td>
                <td>{obj.FieldList[5].val}</td>
                <td>{landStageObj[obj.ID]}</td>
                <td>
                    <button type="button" className="funCla funCla_view"  onClick={th.evViewLandInfor.bind(th,obj)}>查看</button>
                </td>
            </tr>
        })
    }
    /*dom渲染完成*/
    componentDidMount(){
        let th=this;
        th.evLoadLand();
        th.evIGetLandStageShow();
    }

    render() {
        let th=this;
        return (<div id="stageMasView">
            <h3 className="boxGroupTit">
                <p><span>分期规划条件指标</span></p>
            </h3>
            <DynamicTable pid={iss.guid()} DynamicData={th.state.sumLandData} CallBack=""/>
            <h3 className="boxGroupTit">
                <p><span>分期占用土地</span></p>
            </h3>
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
                    {
                        th.loadLandHtml(th)
                    }
                </tbody>
            </table>
        </div>);
    }
}
export default StageMasView;