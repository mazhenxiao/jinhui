import React from 'react';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
require("./tools-validate");
require("./tools-city.js");
require("../../Content/css/intallment.less");
import ToolsCity from "./tools-city.js"; //城市
class NewProjectCount extends React.Component {
    constructor(arg) {
        super(arg);
        this.state = {
            "CompanyAreaName": "",
            "CompanyCityName": "",  //选城市
            "PROJECTNAME": "",//项目名称
            "CASENAME": "",
            "PROJECTADDRESS": "",
            "TRADERMODE": "",
            "PROJECTTYPE": "",
            "EQUITYRATIO": "",
            "PROJECTCODE": "", //案号
            "PRINCIPALNAME": "",
            "PRINCIPAL": "",
            "ID": "",
            "CITY": "",
            "mapUrl": "http://192.168.11.164:82",
            "checkName": false   //项目名称冲突
            // "cityCompany":iss.id.text,
        }
        iss.hashHistory.listen((local, next) => {
            //console.log(arguments)
        })
        this.time = "";
        this.props.point(this);//父页面重定
    }

    getAjax() {
        if (iss.id == "") { return };
        var th = this;
        // console.log(th);
        //   let projectId = this.props.location.state.id;
        let status = this.props.local.query.status;
        let json = {};
        var urlProject;
        //console.log(status)
        if (status == "edit") {
            urlProject = "/Project/IProjectInfo";
            json.projectId = iss.id.id;
        } else if (status == "add") {
            urlProject = "/Project/INewProject";
            json.cityId = iss.id.id;
        }
        iss.ajax({  //获取数据
            type: "post",
            //url:"/Project/IProjectInfo",  
            url: urlProject,
            data: json,
            success(res) {
                //console.log(res.rows);
                // console.log(res.rows.SelectOptions.TRADERMODE)
                th.setState({
                    "PROJECTNAME": res.rows.BaseFormInfo.Project.PROJECTNAME,
                    "CASENAME": res.rows.BaseFormInfo.Project.CASENAME,
                    "EQUITYRATIO": res.rows.BaseFormInfo.Project.EQUITYRATIO,
                    "PROJECTCODE": res.rows.BaseFormInfo.Project.PROJECTCODE,
                    "PRINCIPALNAME": res.rows.BaseFormInfo.PRINCIPALNAME,
                    "PRINCIPAL": res.rows.BaseFormInfo.Project.PRINCIPAL,
                    "PROJECTADDRESS": res.rows.BaseFormInfo.Project.PROJECTADDRESS,
                    //"PROJECTTYPE":res.rows.BaseFormInfo.Project.PROJECTTYPE,
                    "TRADERMODE": res.rows.BaseFormInfo.Project.TRADERMODE,
                    "ObtainStatusName": res.rows.BaseFormInfo.ObtainStatusName,
                    "CompanyAreaName": res.rows.BaseFormInfo.CompanyAreaName,
                    "CompanyCityName": res.rows.BaseFormInfo.CompanyCityName,
                    "ID": res.rows.BaseFormInfo.Project.ID,
                    "PARENTID": res.rows.BaseFormInfo.Project.PARENTID,
                    "CITY": res.rows.BaseFormInfo.Project.CITY,
                }, arg => {
                    //console.log(th.state)
                    th.bind_combobox(res);
                    th.BIND_CHANGE_DATA(th.state);
                })
            },
            error(e) {

            }
        })
    }
    componentDidMount() {
        let id = iss.id;

        if (id == "1E1CB1E95A864AFA961392C3E3644642" || !id) {
            iss.hashHistory.replace({ pathname: "index" });
        } else {
            this.getAjax();
        }
        //this.BIND_ProjectValid();//绑定验证
    }
    handChooseTo(ev, da) {
        let th = this;
        let peopleJson = {};
        let PrincipalId = {
            "id": th.state.PRINCIPAL,
            "text": th.state.PRINCIPALNAME
        }
        if (th.state.PRINCIPAL) {
            peopleJson['PrincipalId'] = PrincipalId;
        }
        iss.chooseTo({
            url: "/Common/IGetOrganizationalUsers",
            title: "选择人员",
            pepole: peopleJson,  //已选人员名单
            callback(da) {
                if (Object.keys(da).length == 0 || !da) {
                    th.setState({
                        "PRINCIPAL": "",
                        "PRINCIPALNAME": "",
                    })
                } else {
                    for (var key in da) {
                        console.log(da[key]);
                        th.setState({
                            "PRINCIPAL": da[key].id,
                            "PRINCIPALNAME": da[key].text
                        });
                        th.BIND_CHANGE_DATA(th.state);
                    }
                }
            }
        })
    }

    handleInputTextBlur(e) {
        var th = this;
        clearTimeout(th.time);
        let target = e.target.id

        th.setState({
            [target]: e.target.value // 将表单元素的值的变化映射到state中
        }, () => {
            th.BIND_CHANGE_DATA(th.state)
        })
        th.time = setTimeout(arg => {
            iss.ajax({
                type: "post",
                url: "/Project/IProjectCode",
                data: {
                    cityId: th.state.PARENTID,
                    caseName: th.state.CASENAME,
                },
                success(res) {
                    console.log(res);
                    th.setState({
                        "PROJECTCODE": res.rows,
                    }, arg => {
                        //console.log(th.state)
                        th.BIND_CHANGE_DATA(th.state);
                    })
                },
                error(e) {

                }
            });
        }, 1000)



        // console.log(e.target.id);
        //console.log(e.target.value);
    }
    handleInputTextChange(e) {
        var th = this;
        let target = e.target.id

        this.setState({
            [target]: e.target.value // 将表单元素的值的变化映射到state中
        }, () => {
            th.BIND_CHANGE_DATA(this.state)
        })
    }
    BIND_CITY_CALLBACK(da, ev) { //城市回掉
        if (ev) {
            let id = ev.id;
            this.setState({
                [id]: da
            })
        } else {
            console.log("打开时传入：this.refs.ToolsCity.open(ev.target)");
        }
    }
    EVENT_CLICK_CITYINPUT(str, ev) { //城市点击
        //console.log(ToolsCity);
        this.refs.ToolsCity.open(ev.target);
    }
    handleSelectTextChange(e, b, c) {
        var th = this;
        this.setState({
            [e]: b
        }, () => {
            th.BIND_CHANGE_DATA(this.state)
        })
        //console.log(this.state);  
    }

    bind_combobox(arg) {
        var th = this;


        let tradersWay = $("#TRADERMODE");//操盘方式
        tradersWay.combobox({
            valueField: "val",
            textField: "label",
            editable: true,
            readonly: false,
            panelHeight: "auto",
            onChange: th.handleSelectTextChange.bind(th, "TRADERMODE"),
            data: arg.rows.SelectOptions.TRADERMODE,

        });
        tradersWay.combobox("select", arg.rows.BaseFormInfo.Project.TRADERMODE);
    }
    BIND_CHECKPROJECTNAME(ev) {   //检查姓名名称是否冲突

        let th = this;
        let projectid = iss.id.id;
        let name = ev.target.value;
        this.setState({
            projectid: iss.id,
            PROJECTNAME: name
        }, arg => {
            th.BIND_CHANGE_DATA(th.state);
        })

        clearTimeout(this.time);
        this.time = setTimeout(arg => {

            iss.ajax({
                type: "POST",
                url: "/Project/IProjectNameExists",
                data: {
                    projectid: iss.id,
                    name: th.state.PROJECTNAME,
                },
                success: function (data) {
                    if (data["rows"] == false) {
                        //th.BIND_CHANGE_DATA(th.state);
                        th.setState({ checkName: true }, arg => {
                            th.BIND_CHANGE_DATA(th.state)
                        })
                    } else {
                        th.setState({ checkName: false }, arg => {
                            th.BIND_CHANGE_DATA(th.state)
                        })
                    }

                },
                error: function (er) {
                    console.log('错误');
                    th.setState({ checkName: false }, arg => {
                        th.BIND_CHANGE_DATA(th.state)
                    })

                }
            });
        }, 1000);
    }
    BIND_CHANGE_DATA(data) {
        this.props.NewProjectCountDATA(data);
    }

    xmViewError(event) {
        //this.attr("src","../img/xmViewError.png")
        $(event.target).attr("src", "../../Content/img/xmViewError.png");
    }//加载暂无
    BIND_EditMapMark(event) {
        let status = this.props.local.query.status;
        if (window.confirm('确认保存项目信息数据并进行落位?')) {
            this.props.save(arg => {
                if ($.trim(this.state.PROJECTNAME)) {
                    if (status == "add") {

                        window.open(this.state.mapUrl + "/Admin/EditMapMark?project_id=" + this.state.ID + "&cityname=" + this.state.CompanyCityName + "&callback=callback");

                    } else {
                        window.open(this.state.mapUrl + "/Admin/EditMapMark?project_id=" + this.state.ID + "&cityname=" + this.state.CompanyCityName + "&callback=callback");
                    }
                } else {
                    //  alert("请输入项目名称");
                    iss.popover({ content: "请输入项目名称" });
                }
            });
            return true;
        }


    }//点击标记地理位置
    CHEKC_PROJECT_VALID() {

    }
    BIND_ProjectValid() { //验证基础数据
        //CompanyCityName，PROJECTNAME，CASENAME，TRADERMODE，LOCATION,bjfq,PRINCIPALNAME,PROJECTADDRESS
        let th = this;
        let valid = {
            CITY: { //所属城市
                required: true,
            },
            PROJECTNAME: { //项目名称
                required: true,
            },
            CASENAME: {
                required: true
            },
            TRADERMODE: {
                required: true
            },
            PRINCIPALNAME: {
                required: true
            },
            PROJECTADDRESS: {
                required: true
            }
        }
        "CompanyCityName,PROJECTNAME,CASENAME,TRADERMODE,LOCATION,bjfq,PRINCIPALNAME,PROJECTADDRESS".split(",").forEach((el, ind) => {
            $(`#${el}`).validatebox(valid[el]);
        });

    }
    BIND_VALID() { //绑定验证
        return $("#FromProjectInfo").form("validate");
    }
    BIND_EditProject(event) {
        window.open(this.state.mapUrl + "/Admin/EditProject?project_id=" + this.state.ID + "&project_map_id=project" + this.state.ID + "&callback=callback");
    } //点击编辑项目总图
    BIND_maps() {
        window.open(this.state.mapUrl + "/Map/Project?project_id=" + this.state.ID + "&project_map_id=project" + this.state.ID + "&callback=callback");
    } //点击预览项目总图
    BIND_mapmark() {
        window.open(this.state.mapUrl + "/map/mapmark?project_id=" + this.state.ID + "&cityname=" + this.state.CompanyCityName + "&callback=callback")
    }//点击预览地理位置
    render() {
        return <section>
            <article className="staging-box">
                <section className="staging-left boxSizing projectinFormation">
                    <from id="FromProjectInfo">
                        <table className="formTable" width="100%">
                            <colgroup>
                                <col width="150" /><col width="" />
                                <col width="150" /><col width="" />
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>
                                        <label className="formTableLabel boxSizing">所属区域</label>
                                    </th>
                                    <td>
                                        <input readOnly="readonly" id="CompanyAreaName" value={this.state.CompanyAreaName || ""} className="inputTextBox inputGray boxSizing" type="text" />
                                    </td>
                                    <th>
                                        <label className="formTableLabel boxSizing">城市公司</label>
                                    </th>
                                    <td>
                                        <input readOnly="readonly" id="CompanyCityName" value={this.state.CompanyCityName || ""} className="inputTextBox inputGray boxSizing" type="text" />
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        <label className="formTableLabel boxSizing redFont">所在城市</label>
                                    </th>
                                    <td><div className="postion">
                                        <input type="text" readOnly="true" onClick={this.EVENT_CLICK_CITYINPUT.bind(this, "ToolsCity")} id="CITY" value={this.state.CITY||""} className="inputTextBox boxSizing" />
                                        <ToolsCity ref="ToolsCity" callback={this.BIND_CITY_CALLBACK.bind(this)} />
                                    </div>
                                    </td>
                                    <th>
                                        <label className="formTableLabel boxSizing">获取状态</label>
                                    </th>
                                    <td id="ObtainStatusName">{this.state.ObtainStatusName}</td>
                                </tr>
                                <tr>
                                    <th>
                                        <label className="formTableLabel boxSizing redFont">项目名称</label>
                                    </th>
                                    <td>
                                        <input onChange={this.BIND_CHECKPROJECTNAME.bind(this)} id="PROJECTNAME" value={this.state.PROJECTNAME || ""} className="inputTextBox boxSizing" type="text" />
                                    </td>
                                    <th>
                                        <label className="formTableLabel boxSizing redFont">项目案名</label>
                                    </th>
                                    <td>
                                        <input onChange={this.handleInputTextBlur.bind(this)} id="CASENAME" value={this.state.CASENAME || ""} className="inputTextBox boxSizing" type="text" />
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        <label className="formTableLabel boxSizing">权益比例</label>
                                    </th>
                                    <td>
                                        <input readOnly="readonly" id="EQUITYRATIO" value={this.state.EQUITYRATIO || ""} className="inputTextBox inputGray boxSizing" type="text" />
                                        <i className="symbol"></i>
                                    </td>
                                    <th>
                                        <label className="formTableLabel boxSizing">项目编号</label>
                                    </th>
                                    <td>
                                        <input readOnly="readonly" id="PROJECTCODE" value={this.state.PROJECTCODE || ""} className="inputTextBox inputGray boxSizing" type="text" />
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        <label className="formTableLabel boxSizing redFont">操盘方式</label>
                                    </th>
                                    <td>
                                        <input type="text" id="TRADERMODE" />
                                    </td>

                                    <th>
                                        <label className="formTableLabel boxSizing redFont">地理位置</label>
                                    </th>
                                    <td>
                                        <button className="btn btnStyle uploadIconBtn" onClick={this.BIND_EditMapMark.bind(this)} id="LOCATION">标记地理位置</button>
                                    </td>

                                </tr>
                                <tr>
                                    <th>
                                        <label className="formTableLabel boxSizing redFont">项目负责人</label>
                                    </th>
                                    <td>
                                        <input readOnly="readonly" onClick={this.handChooseTo.bind(this)} id="PRINCIPALNAME" value={this.state.PRINCIPALNAME || ""} className="inputTextBox boxSizing" type="text" />
                                        <img className="symbol headIcon" src="../../Content/img/head-icon.png" />
                                    </td>

                                    <th>
                                        <label className="formTableLabel boxSizing redFont">项目总图</label>
                                    </th>
                                    <td>
                                        <button className="btn btnStyle uploadIconBtn" onClick={this.BIND_EditProject.bind(this)} id="bjfq">标记分期</button>
                                    </td>

                                </tr>
                                <tr>
                                    <th>
                                        <label className="formTableLabel boxSizing redFont">项目地址</label>
                                    </th>
                                    <td colSpan="3">
                                        <input onChange={this.handleInputTextChange.bind(this)} id="PROJECTADDRESS" value={this.state.PROJECTADDRESS || ""} className="inputTextBox boxSizing" type="text" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </from>
                </section>
                <section className="staging-right boxSizing fieldLocation fl">
                    {/* bootstrap 轮播图 */}
                    <div id="myCarousel" className="carousel slide carouselStyle">
                        <div className="carousel-inner">
                            <div className="item active">
                                <img src={this.state.mapUrl + "/Content/maps/source/project" + this.state.ID + "_s.jpg"} onError={this.xmViewError.bind(this)} onClick={this.BIND_maps.bind(this)} width="100%" height="295px" />
                            </div>
                            <div className="item" onClick={this.BIND_mapmark.bind(this)}>
                                <iframe src={this.state.mapUrl + "/map/mapmark?project_id=" + this.state.ID} onError={this.xmViewError.bind(this)} width="350px" height="295px"></iframe>
                            </div>
                        </div>
                        {/* 轮播（Carousel）导航 */}
                        <a className="carousel-control left" href="#myCarousel"
                            data-slide="prev">&lsaquo;</a>
                        <a className="carousel-control right" href="#myCarousel"
                            data-slide="next">&rsaquo;</a>
                    </div>
                </section>
                <div className="clear"></div>
            </article>
        </section>
    }
}

window["callback"] = (str, data) => {

}
export default NewProjectCount;