import React from 'react';
import iss from "../js/iss.js";
import "babel-polyfill";  //兼容ie

import "../css/intallment.less";
import "../css/view.less";

class NewProjectCountView extends React.Component {

    constructor(arg) {
        super(arg);
        this.state = {
            "CompanyAreaName": "",
            "CompanyCityName": "",  //选城市
            "PROJECTNAME": "",//项目名称
            "CASENAME": "",
            "PROJECTADDRESS": "",
            "TRADERMODE": "",
            "TRADERMODEALL": "",
            "PROJECTTYPE": "",
            "EQUITYRATIO": "",
            "PROJECTCODE": "", //案号
            "PRINCIPALNAME": "",
            "PRINCIPAL": "",
            "ID": "",
            "CITY": "",
            "mapUrl": iss.mapEUrl,
            "iframeURL1": "",/*地理位置*/
            "iframeURL2": "",/*项目总图*/
            "checkName": false//项目名称冲突
            // "cityCompany":iss.id.text,
        }
    }
    getAjax(callback) {
        let th = this;
        iss.ajax({  //获取数据
            type: "post",
            url: "/Project/IProjectInfo",
            data: {
                projectId: th.props.all.query["dataKey"]//iss.id.id,
            },
            success(res) {
                debugger

                 let {
                    PROJECTNAME, CASENAME, EQUITYRATIO, PROJECTCODE, PRINCIPAL, PROJECTADDRESS,
                    ID, PARENTID, CITY } = res.rows.BaseFormInfo.Project; //默认选中数据
                let { PRINCIPALNAME, ObtainStatusName, CompanyAreaName, CompanyCityName } = res.rows.BaseFormInfo; //非选则数据
                let { TRADERMODE } = res.rows.SelectOptions;  //选择数据
                th.setState({
                    "PROJECTNAME": PROJECTNAME,
                    "CASENAME": CASENAME,
                    "EQUITYRATIO": EQUITYRATIO,
                    "PROJECTCODE": PROJECTCODE,
                    "PRINCIPALNAME": PRINCIPALNAME,
                    "PRINCIPAL": PRINCIPAL,
                    "PROJECTADDRESS": PROJECTADDRESS,
                    //"PROJECTTYPE":res.rows.BaseFormInfo.Project.PROJECTTYPE,
                    // "TRADERMODE": res.rows.BaseFormInfo.Project.TRADERMODE,
                    "ObtainStatusName": ObtainStatusName,
                    "CompanyAreaName": CompanyAreaName,
                    "CompanyCityName": CompanyCityName,
                    "ID": ID,
                    "PARENTID": PARENTID,
                    "CITY": CITY,
                    "TRADERMODE": TRADERMODE ? TRADERMODE[res.rows.BaseFormInfo.Project.TRADERMODE].label : "",//操盘方式                    
                }, arg => {
                    if (callback) {
                        callback();
                    }
                }) 




            }
        });
    }
    componentDidMount() {
        let th = this;
        $(function () {
            th.getAjax(arg => {
                th.BIND_ONLOAD();
            });
        });


    }
    BIND_ONLOAD() {
        let th = this;
        iss.ajax({  //获取数据
            type: "post",
            url: "/Common/IsHaveXMView",
            data: {
                typeinfo: "1",
                strId: th.state.ID,
            },
            success(res) {
                var src_one = iss.mapEUrl + "/map/mapmark?project_id=" + th.state.ID;
                var src_two = "";
                if (res["rows"] == 0) {
                    src_two = "../img/xmViewError.png";
                } else {
                    src_two = iss.mapEUrl + "/Map/Project?project_id=" + th.state.ID + "&project_map_id=project" + th.state.ID;
                    iss.evCarouselActive(th, src_two);
                }
                th.setState({
                    iframeURL1: src_one,
                    iframeURL2: src_two
                });
            }
        });
    }
    xmViewError(event) {
        //this.attr("src","../img/xmViewError.png")
        $(event.target).attr("src", "../img/xmViewError.png");
    }//加载暂无
    BIND_maps() {
        window.open(iss.mapEUrl + "/Map/Project?project_id=" + this.state.ID + "&project_map_id=project" + this.state.ID);
    } //点击预览项目总图
    BIND_mapmark() {
        window.open(iss.mapEUrl + "/map/mapmark?project_id=" + this.state.ID + "&cityname=" + this.state.CITY);
    }//点击预览地理位置
    render() {
        let th = this.state;
        return (<div id="stageInforView">
            <h3 className="boxGroupTit">
                <p><span>项目信息</span></p>
            </h3>
            <div className="stageVWrap">
                <div className="stageVRight">
                    <div id="myCarousel" className="carousel slide carouselStyle">
                        <div className="carousel-inner">
                            <div className="item active">
                                <img className="fullScreenIcon" src="../img/fullScreen.png" onClick={this.BIND_mapmark.bind(this)} title="全屏" />
                                <iframe ref="iframe1" id="iframe1" src={this.state.iframeURL1} onError={this.xmViewError.bind(this)} frameBorder="0" marginHeight="0" marginWidth="0" scrolling="no" width="100%" height="291"></iframe>
                            </div>
                            <div className="item">
                                <img className="fullScreenIcon" src="../img/fullScreen.png" onClick={this.BIND_maps.bind(this)} title="全屏" />
                                <iframe ref="iframe2" id="iframe2" src={this.state.iframeURL2} onError={this.xmViewError.bind(this)} frameBorder="0" marginHeight="0" marginWidth="0" scrolling="no" width="100%" height="291"></iframe>
                            </div>
                        </div>
                        <a className="carousel-control left" href="#myCarousel"
                            data-slide="prev">&lsaquo;</a>
                        <a className="carousel-control right" href="#myCarousel"
                            data-slide="next">&rsaquo;</a>
                    </div>
                </div>
                <div className="stageVLeft">
                    <table className="stageVTable">
                        <tbody>
                            <tr>
                                <td className="stageViewTitle">所属区域</td>
                                <td className="stageViewCon" id="CompanyAreaName">{th.CompanyAreaName}</td>
                                <td className="stageViewTitle">城市公司</td>
                                <td className="stageViewCon">{th.CompanyCityName}</td>
                            </tr>
                            <tr>
                                <td className="stageViewTitle">所在城市</td>
                                <td className="stageViewCon">{th.CITY}</td>
                                <td className="stageViewTitle">获取状态</td>
                                <td className="stageViewCon">{th.ObtainStatusName}</td>
                            </tr>
                            <tr>
                                <td className="stageViewTitle">项目名称</td>
                                <td className="stageViewCon">{th.PROJECTNAME}</td>
                                <td className="stageViewTitle">项目案名</td>
                                <td className="stageViewCon">{th.CASENAME}</td>
                            </tr>
                            <tr>
                                <td className="stageViewTitle">权益比例</td>
                                <td className="stageViewCon">{th.EQUITYRATIO}</td>
                                <td className="stageViewTitle">项目编号</td>
                                <td className="stageViewCon">{th.PROJECTCODE}</td>
                            </tr>
                            <tr>
                                <td className="stageViewTitle">操盘方式</td>
                                <td className="stageViewCon">{th.TRADERMODE}</td>
                                <td className="stageViewTitle">项目负责人</td>
                                <td className="stageViewCon">{th.PRINCIPALNAME}</td>
                            </tr>
                            <tr>
                                <td className="stageViewTitle">项目地址</td>
                                <td className="stageViewCon" colSpan="3">{th.PROJECTADDRESS}</td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>);
    }
}
export default NewProjectCountView;