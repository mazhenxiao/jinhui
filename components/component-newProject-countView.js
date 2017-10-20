import React from 'react';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie

require("../../Content/css/intallment.less");
import "../../Content/css/view.less";

class NewProjectCountView extends React.Component {

    constructor(arg) {
        super(arg);
        this.state={
            "CompanyAreaName": "",
            "CompanyCityName": "",  //选城市
            "PROJECTNAME": "",//项目名称
            "CASENAME": "",
            "PROJECTADDRESS": "",
            "TRADERMODE": "",
            "TRADERMODEALL":"",
            "PROJECTTYPE": "",
            "EQUITYRATIO": "",
            "PROJECTCODE": "", //案号
            "PRINCIPALNAME": "",
            "PRINCIPAL": "",
            "ID": "",
            "CITY": "",
            "mapUrl": "http://192.168.10.164:82",
            "iframeURL1":"",
            "iframeURL2":"",
            "checkName": false   //项目名称冲突
            // "cityCompany":iss.id.text,
        }
    }
    getAjax(callback) {
        let th=this; 
        iss.ajax({  //获取数据
            type: "post",
            url:"/Project/IProjectInfo",
            data: {
                projectId:iss.id.id,
            },
            success(res) {
                //console.log(res.rows);
                //console.log(res.rows.SelectOptions.TRADERMODE)
                th.setState({
                    "PROJECTNAME": res.rows.BaseFormInfo.Project.PROJECTNAME,
                    "CASENAME": res.rows.BaseFormInfo.Project.CASENAME,
                    "EQUITYRATIO": res.rows.BaseFormInfo.Project.EQUITYRATIO,
                    "PROJECTCODE": res.rows.BaseFormInfo.Project.PROJECTCODE,
                    "PRINCIPALNAME": res.rows.BaseFormInfo.PRINCIPALNAME,
                    "PRINCIPAL": res.rows.BaseFormInfo.Project.PRINCIPAL,
                    "PROJECTADDRESS": res.rows.BaseFormInfo.Project.PROJECTADDRESS,
                    //"PROJECTTYPE":res.rows.BaseFormInfo.Project.PROJECTTYPE,
                   // "TRADERMODE": res.rows.BaseFormInfo.Project.TRADERMODE,
                    "ObtainStatusName": res.rows.BaseFormInfo.ObtainStatusName,
                    "CompanyAreaName": res.rows.BaseFormInfo.CompanyAreaName,
                    "CompanyCityName": res.rows.BaseFormInfo.CompanyCityName,
                    "ID": res.rows.BaseFormInfo.Project.ID,
                    "PARENTID": res.rows.BaseFormInfo.Project.PARENTID,
                    "CITY": res.rows.BaseFormInfo.Project.CITY,

                    "TRADERMODE":res.rows.SelectOptions.TRADERMODE[res.rows.BaseFormInfo.Project.TRADERMODE].label,//操盘方式                    
                },arg => {
                    if(callback){
                        callback();
                    }
                })
            },
            error(e) {

            }
        })
    }
    componentWillMount() {
        this.getAjax(arg=>{
            this.BIND_ONLOAD();
            setTimeout(function(){
                document.getElementById('iframe2').src=$("#iframe2").attr("src");
            },3000);
        });

    }
    BIND_ONLOAD(){
        let th=this;
        iss.ajax({  //获取数据
            type: "post",
            url:"/Common/IsHaveXMView",
            data:{
                typeinfo:"1",
                strId:th.state.ID,
            },
            success(res) {
                if(res==false){
                    th.setState({
                        iframeURL1:th.state.mapUrl + "/map/mapmark?project_id=" + th.state.ID,
                        iframeURL2:"../../Content/img/xmViewError.png",
                    })
                }else{
                    th.setState({
                        iframeURL1:th.state.mapUrl + "/map/mapmark?project_id=" + th.state.ID,
                        iframeURL2:th.state.mapUrl + "/Map/Project?project_id=" + th.state.ID + "&project_map_id=project" + th.state.ID,
                    }) 
                }
            },
            error(e) {

            }
        })
     }
    xmViewError(event) {
        //this.attr("src","../img/xmViewError.png")
        $(event.target).attr("src", "../../Content/img/xmViewError.png");
    }//加载暂无
    BIND_maps() {
        window.open(this.state.mapUrl + "/Map/Project?project_id=" + this.state.ID + "&project_map_id=project" + this.state.ID);
    } //点击预览项目总图
    BIND_mapmark() {
        window.open(this.state.mapUrl + "/map/mapmark?project_id=" + this.state.ID + "&cityname=" + this.state.CompanyCityName);
    }//点击预览地理位置
    render() {
        let th=this.state;
        return (<div id="stageInforView">
            <h3 className="boxGroupTit">
                <p><span>项目信息</span></p>
            </h3>
            <div className="stageVWrap">
                <div className="stageVRight">
                    <div id="myCarousel" className="carousel slide carouselStyle">
                            <div className="carousel-inner">
                                <div className="item active">
                                    <iframe id="iframe2" src={this.state.iframeURL2} onError={this.xmViewError.bind(this)} frameBorder="0" marginHeight="0" marginWidth="0" scrolling="no" width="100%" height="291"></iframe>
                                </div>
                                <div className="item" onClick={this.BIND_mapmark.bind(this)}>
                                    <iframe ref="iframe" src={this.state.iframeURL1}    onError={this.xmViewError.bind(this)} frameBorder="0" marginHeight="0" marginWidth="0" scrolling="no" width="100%" height="291"></iframe>
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