// 分期经济指标（投决会版）
import React from 'react';
import ReactDOM from 'react-dom';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
require("../../Content/css/intallment.less");
import DynamicTable from "./tools-dynamicTable.js";
import "../../Content/css/tools-dynamicTable.less";//专用css
import validate from "./tools-validate.js";//验证字典表
import Winopen from "./component-indicators-winopen.js"; //弹出选择地块
class Indicators extends React.Component {
    constructor(arg) {
        super(arg);

        this.state = {
            newDynamicData: {},//空数据
            DynamicData: {},//已存在数据
            propsDATA: [],//显示数据
            pid: "",
            treeId: "",//左侧树id
            states: false,
            AcountData: [],//汇总数据
            GetLandQuotaByProId: []//分期列表
        }



    }
    BIND_CreateTable() {
        let list = this.state.GetLandQuotaByProId;
        if (list.length) {
            let arr = [];
            return list.forEach((el, ind) => {
                arr.push(<tr id={el.ID}>
                    <td>{ind + 1}</td>
                    <td>{el.Name}</td>
                    <td>{}</td>
                    <td>是</td>
                    <td class="tdRight" >100,000</td>
                    <td class="tdRight" >80,000</td>
                    <td></td>
                </tr>
                )
            })
              return arr; 


            } else {
                return<tr><td > 无地块</td ></tr >
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
            error() { }
        })
    }
    BIND_CALLBACK() {

    }
    EVENT_SELECTMISSIF(){  //动态创建选择地块
        iss.Alert({
            title:"选择地块",
            width:1000,
            height:400,
            content:`<div id="selectMassif"></div>`,
            ok(){
                 return false;
            }
        });
        ReactDOM.render(<Winopen guid="A91BB3051A0848319B45D3D527AC4103" />,document.querySelector("#selectMassif"))
    }
    componentDidMount() {
        this.BIIND_FIST_LAND();//初次获取数据
        this.BIND_GETACOUNT();//初次获取统计数据
    }
    componentWillMount() {
        if (!this.props.local.location || !this.props.local.location.state) { iss.Alert({ content: "请选择区域或项目！" }) } else {
            this.setState({
                treeId: this.props.local.location.state.id
            })
        }
    }
    render() {
        return <article className="staging-box">
            <section className="boxSizing">
                <DynamicTable pid={iss.guid()} DynamicData={this.state.AcountData} CallBack={this.BIND_CALLBACK.bind(this)} />
            </section>
            <section>
                <h3 className="boxGroupTit"><p><span>分期占用土地</span><i></i></p>
                    <span className="functionButton"><a className="refresh-icon addIcon ClickThePopUp1" onClick={this.EVENT_SELECTMISSIF.bind(this)} href="javascript:;">选择地块</a><a className="refresh-icon deleteIcon" href="#">删除地块</a></span>
                </h3>
                <div>

                    <table className="table table-new-project table-new-projectC parcelInforBox">

                        <tbody><tr>
                            <td className="table-new-project-tit1" >序号</td>
                            <td className="table-new-project-tit1">地块名称</td>
                            <td className="table-new-project-tit1">地块编号</td>
                            <td className="table-new-project-tit1">是否部分开发</td>
                            <td className="table-new-project-tit1">总建筑面积（㎡）</td>
                            <td className="table-new-project-tit1">总计容建筑面积（㎡）</td>
                            <td className="table-new-project-tit1">相关分期</td>
                        </tr>
                        </tbody></table>
                    <table className="table">
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