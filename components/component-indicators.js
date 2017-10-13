// 分期经济指标（投决会版）
import React from 'react';
import ReactDOM from 'react-dom';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
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
            AcountData: [],//汇总数据
            winAllBuiltData:[],/*分期占用土地table*/
            winopenDATA:[],/*alert中选择地块信息(这个里面不包括已经选择过的地块)*/
            winopenSelId:"",/*alert中保存选择过的地块Id,逗号分隔*/
            landStageArr:[]/*分期占用土地=相关分期*/
        }
    }
    /*分期占用土地*/
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
                </tr>
            })

        } else {
                return <tr><td>无地块</td></tr>
        }
    }
    BIIND_FIST_LAND() {
        let th = this;

        iss.ajax({
            url: "/Stage/GetDynaticFieldNullTemp",  //初次请求创建空地块使用
            data: { projectId: th.state.treeId },
            sucess(d) {

                if (d["rows"]) {
                    th.state.states = true;
                    th.setState({
                        newDynamicData: d["rows"]
                    });
                }

            },
            error(e) {

            }
        })

       
    }
    BIND_GETACOUNT() {
        let th = this;

        iss.ajax({ //汇总模板
            url: "/Stage/GetDynaticFieldNullTempSum?pid",
            data: { projectId: this.state.treeId },
            sucess(d) {
                th.setState({ "AcountData": d.rows })
            },
            error() {}
        })
    }
    BIND_CALLBACK() {

    }
    /*alert==实时获取地块的信息*/
    BIND_WINOPEN(da){
      this.setState({
        winopenDATA:da
      });
      console.log("=======弹框中的地块信息");
      console.log(da);
    }
    /*alert-选择地块保存*/
    ev_saveBuiltInfor(){
        var th = this;
        let listArr=th.state.winopenDATA;
        let allListArr=th.state.winAllBuiltData;

        listArr.forEach((obj,index)=>{
            if(obj.IsAllDevel!=0){
                allListArr.push(obj);
            }
        });

        let selIDs=[];/*保存选择过的地块id*/
        iss.ajax({
            url: "/Stage/IRetLandDynaticFieldSum",
            type: "post",
            data:{
                data:JSON.stringify(listArr)
            },
            sucess(d) {
                console.log("返回的是分期经济指标（投决会版）");
                console.log(d.rows);
                /*存储选择过的地块*/
                allListArr.forEach((obj,index)=>{
                    selIDs.push(obj.ID);
                });
                th.setState({
                    winopenSelId:selIDs.join(","),
                    winAllBuiltData:allListArr
                });
                
            },
            error(d) {
                console.log("汇总分期经济指标失败");
            }
        })
    }
    /*选择地块事件*/
    EVENT_SELECTMISSIF(){
        var th=this;
        var id=th.state.treeId;
        iss.Alert({
            title:"选择分期占用土地",
            width:1000,
            height:400,
            content:`<div id="alertBuiltBlock"></div>`,
            ok(){
                th.ev_saveBuiltInfor();
            }
        });
        console.log(id);
        ReactDOM.render(<Winopen guid={id} selId={th.state.winopenSelId} callback={this.BIND_WINOPEN.bind(this)} />,document.querySelector("#alertBuiltBlock"));
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
            sucess(d) {
                th.setState({
                    landStageArr:d.rows
                });
            },
            error(d) {
                console.log("获取相关分期失败");
            }
        })
    }
    componentDidMount() {
        this.BIIND_FIST_LAND();//初次获取数据
        this.BIND_GETACOUNT();//初次获取统计数据
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
        return <article className="staging-box">
            <section className="boxSizing">
                <DynamicTable pid={iss.guid()} DynamicData={this.state.AcountData} CallBack={this.BIND_CALLBACK.bind(this)} />
            </section>
            <section>
                <h3 className="boxGroupTit"><p><span>分期占用土地</span><i></i></p>
                    <span className="functionButton">
                        <a className="refresh-icon addIcon ClickThePopUp1" onClick={this.EVENT_SELECTMISSIF.bind(this)} href="javascript:;">选择地块</a>
                        <a className="refresh-icon deleteIcon" href="#">删除地块</a>
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