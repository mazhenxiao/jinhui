import React from 'react';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
require("./tools-validate");
require("./tools-city.js");
require("../css/intallment.less");
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
            "ID":this.props.projectId,/*项目Id*/
            "CITY": "",
            "mapUrl":iss.mapEUrl,
            "iframeURL1":"",/*地理位置*/
            "iframeURL2":"",/*项目总图*/
            "checkName": false,   //项目名称冲突
            "CREATETIME":""//项目创建时间
            // "cityCompany":iss.id.text,
        }
        iss.hashHistory.listen((local, next) => {});
        this.time = "";
        this.props.point(this);//父页面重定
        this.editProjectOldName="";//在编辑状态下获取编辑前名称
      
    }

    getAjax(callback) {
        //if (iss.id == "") { return };
        var th = this;
        var projectId=th.state.ID;
        let status = th.props.status;
        let json = {};
        var urlProject;
        
        if (status == "edit") {
            urlProject = "/Project/IProjectInfo";
            json.projectId = projectId;
        } else if (status == "upgrade") {
            urlProject = "/Project/IProjectInfo";
            json.projectId = projectId;
            $("#PROJECTNAME").attr("readonly","readonly");
            $("#PROJECTNAME").addClass("inputGray");
        } else if (status == "add") {
            urlProject = "/Project/INewProject";
            json.cityId = iss.id.id;
        }//判断项目信息状态 add、edit
        iss.ajax({  //获取数据
            type: "post",
            //url:"/Project/IProjectInfo",  
            url: urlProject,
            data: json,
            success(res) {
                th.editProjectOldName=(res.rows.BaseFormInfo.Project["PROJECTNAME"]||"").toString();
                th.setState({
                    "PROJECTNAME": res.rows.BaseFormInfo.Project.PROJECTNAME,//项目名称
                    "CASENAME": res.rows.BaseFormInfo.Project.CASENAME,
                    "EQUITYRATIO": res.rows.BaseFormInfo.Project.EQUITYRATIO,
                    "PROJECTCODE": res.rows.BaseFormInfo.Project.PROJECTCODE,
                    "PRINCIPALNAME": res.rows.BaseFormInfo.PRINCIPALNAME,
                    "PRINCIPAL": res.rows.BaseFormInfo.Project.PRINCIPAL,
                    "PROJECTADDRESS": res.rows.BaseFormInfo.Project.PROJECTADDRESS,
                    //"PROJECTTYPE":res.rows.BaseFormInfo.Project.PROJECTTYPE,
                    "TRADERMODE": res.rows.BaseFormInfo.Project.TRADERMODE,
                    "ObtainStatusName": res.rows.BaseFormInfo.ObtainStatusName,
                    "CompanyAreaId":res.rows.BaseFormInfo.CompanyAreaId,
                    "CompanyAreaName": res.rows.BaseFormInfo.CompanyAreaName,
                    "CompanyCityName": res.rows.BaseFormInfo.CompanyCityName,
                    "PARENTID": res.rows.BaseFormInfo.Project.PARENTID,
                    "CITY": res.rows.BaseFormInfo.Project.CITY,
                    "CREATETIME":res.rows.BaseFormInfo.Project.CREATETIME,//项目创建时间
                    //"ID":res.rows.BaseFormInfo.Project.ID,
                }, arg => {
                    th.bind_combobox(res);
                    th.BIND_CHANGE_DATA(th.state);
                    if(callback){
                        callback();
                    }
                });
            }
        });
    }
    
    componentDidMount() {
        let th = this;
        let id = th.state.ID;
        if(iss.getQuert("edit")){ th.setState({
            checkName:true,
        }) }
        if (id == "1E1CB1E95A864AFA961392C3E3644642" || !id) {
            iss.hashHistory.replace({ pathname: "index" });
        } else {
            
            
            $(function(){
                th.getAjax(arg=>{
                    th.BIND_ONLOAD();
                    $("#FromProjectInfo").form("validate");
                });
            });
        }
        
        this.BIND_ProjectValid();//绑定验证
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
            title: "选择人员<i class='fontRed'>（双击选择人员）</i>",
            pepole: peopleJson,  //已选人员名单
            callback(da) {
                if (Object.keys(da).length == 0 || !da) {
                    th.setState({
                        "PRINCIPAL": "",
                        "PRINCIPALNAME": "",
                    })
                } else {
                    for (var key in da) {
                        th.setState({
                            "PRINCIPAL": da[key].id,
                            "PRINCIPALNAME": da[key].text
                        });
                        th.BIND_CHANGE_DATA(th.state);
                    }

                }
                $("#FromProjectInfo").form("validate");
            }
        })
    }

    handleInputTextBlur(e) {
        var th = this;
        clearTimeout(th.time);
        let target = e.target.id
        if(this.BIND_CHECK_INPUT(e.target.value)){
            return 
        }//检查
        th.setState({
            [target]: e.target.value // 将表单元素的值的变化映射到state中
        }, () => {
            th.BIND_CHANGE_DATA(th.state)
        })
        // th.time = setTimeout(arg => {
        //     iss.ajax({
        //         type: "post",
        //         url: "/Project/IProjectCode",
        //         data: {
        //             cityId: th.state.PARENTID,
        //             projectId:th.state.ID,
        //             caseName: th.state.CASENAME,
        //         },
        //         success(res) {
        //             th.setState({
        //                 "PROJECTCODE": res.rows,
        //             }, arg => {
        //                 th.BIND_CHANGE_DATA(th.state);
        //             });
        //         }
        //     });
        // }, 1000);
    }
    handleInputTextChange(e) {
        var th = this;
        let target = e.target.id

        this.setState({
            [target]: e.target.value // 将表单元素的值的变化映射到state中
        }, () => {
            th.BIND_CHANGE_DATA(this.state);
        });
    }
    BIND_CITY_CALLBACK(da, ev) { //城市回掉
    	let th=this;
        if (ev) {
            let id = ev.id;
            this.setState({
                [id]: da
            },arg => {
                $("#FromProjectInfo").form("validate");
                th.BIND_CHANGE_DATA(th.state);
            });
        }
    }
    EVENT_CLICK_CITYINPUT(str, ev) { //城市点击
        this.refs.ToolsCity.open(ev.target);
    }
    handleSelectTextChange(e, b, c) {
        var th = this;
        this.setState({
            [e]: b
        }, () => {
            th.BIND_CHANGE_DATA(this.state)
        });
    }
    
	bind_combobox(arg) {
        var th = this;


        let tradersWay = $("#TRADERMODE");//操盘方式
        tradersWay.combobox({
            valueField: "val",
            textField: "label",
            editable: false,
            readonly: false,
            required:true,
            panelHeight: "auto",
            onChange: th.handleSelectTextChange.bind(th, "TRADERMODE"),
            data: arg.rows.SelectOptions.TRADERMODE,
        });
        tradersWay.combobox("select", arg.rows.BaseFormInfo.Project.TRADERMODE);
    }
    
    BIND_CHECKPROJECTNAME(ev) {   //检查姓名名称是否冲突

        let th = this;
        let projectid = th.state.ID;
        let name = ev.target.value;
        if(this.BIND_CHECK_INPUT(name)){
            return 
        }//检查
        this.setState({
            projectid: projectid,
            PROJECTNAME: name
        }, arg => {
            th.BIND_CHANGE_DATA(th.state);
        })
   
  
    }
    BIND_CHECK_INPUT(name){ //检查非法查询
        // if((/^[\w\u4e00-\u9fa5][\w\u4e00-\u9fa5]+[\w\u4e00-\u9fa5]$/).test(val)){
        var reg = /[^\u4e00-\u9fa5\w\d\_\-']/ig;
        return name==""? false:reg.test(name);
        }
    BIND_CHANGE_DATA(data) {
        this.props.NewProjectCountDATA(data);
    }

    xmViewError(event) {
        $(event.target).attr("src", "../../Content/img/xmViewError.png");
    }//加载暂无
    BIND_ONLOAD(event){
        let th=this;
        iss.ajax({  //获取数据
            type: "post",
            url:"/Common/IsHaveXMView",
            data:{
                typeinfo:"1",
                strId:th.state.ID,
            },
            success(res){
            	
            	var src_one=iss.mapEUrl + "/map/mapmark?project_id=" + th.state.ID;
            	var src_two="";
                if(res["rows"]==0){
                	src_two="../../Content/img/xmViewError.png";
                }else{
                	src_two=iss.mapEUrl + "/Map/Project?project_id=" + th.state.ID + "&project_map_id=project" + th.state.ID;
                	iss.evCarouselActive(th,src_two);
                }
                th.setState({
                    iframeURL1:src_one,
                    iframeURL2:src_two
                });
                
            }
        });
        
    }
    BIND_EditMapMark(event) {
    	let th = this;
        let status = th.props.status;
        
        /*if ($.trim(th.state.PROJECTNAME)) {
        if($.trim(th.state.CITY)){*/
        	if(status=="add"){
        		iss.popover({ content: "请先暂存项目信息"});
        		return false;
        	}
        	var mapSrc=iss.mapEUrl + "/Admin/EditMapMark?project_id=" + th.state.ID + "&cityname=" + th.state.CITY + "&callback=callback";
        	iss.evRereshMapCookie(th,mapSrc,"project");
        	
        	//window.open(mapSrc);
        	
            /*iss.Alert({
                title: "提示",
                width: 300,
                height: 90,
                content: `<div class="Alert">确认保存项目信息数据并进行落位?</div>`,
                ok() {
                    th.props.save(arg => {
                            if (status == "add") {
                                window.open(th.state.mapUrl + "/Admin/EditMapMark?project_id=" + th.state.ID + "&cityname=" + th.state.CITY + "&callback=callback");
                            } else {
                                window.open(th.state.mapUrl + "/Admin/EditMapMark?project_id=" + th.state.ID + "&cityname=" + th.state.CITY + "&callback=callback");
                            }
                    });
                            
                }
            });*/
        /*}else{
            iss.popover({ content: "请选择所属城市" }); 
        }
            
                        
        } else {
            iss.popover({ content: "请输入项目名称" });
        }*/
    }//点击标记地理位置
    
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
        "CompanyCityName,CITY,PROJECTNAME,CASENAME,TRADERMODE,LOCATION,bjfq,PRINCIPALNAME,PROJECTADDRESS".split(",").forEach((el, ind) => {
            $(`#${el}`).validatebox(valid[el]);
        });

    }
    BIND_VALID() { //绑定验证
        return $("#FromProjectInfo").form("validate");
    }
    BIND_EditProject(event) {
    	let th = this;
        let status = th.props.status;
        
        if(status=="add"){
    		iss.popover({ content: "请先暂存项目信息"});
    		return false;
    	}
        var mapSrc=iss.mapEUrl+ "/Admin/EditProject?project_id=" + th.state.ID + "&project_map_id=project" + th.state.ID + "&callback=callback";
        iss.evRereshMapCookie(th,mapSrc,"project");
        
        /*if ($.trim(th.state.PROJECTNAME)) {
            iss.Alert({
                title: "提示",
                width: 300,
                height: 90,
                content: `<div class="Alert">确认保存项目信息数据并标记分期?</div>`,
                ok() {
                    th.props.save(arg => {
                        
                        if (status == "add") {
                            window.open(th.state.mapUrl + "/Admin/EditProject?project_id=" + th.state.ID + "&project_map_id=project" + th.state.ID +"&callback=callback");
                        } else {
                            window.open(th.state.mapUrl + "/Admin/EditProject?project_id=" + th.state.ID + "&project_map_id=project" + th.state.ID + "&callback=callback");
                        }
                    })
                            
                }
            });
                        
        } else {
            iss.popover({ content: "请输入项目名称" });
        }*/
        
          
        
    } //点击编辑项目总图
    BIND_maps() {
        window.open(iss.mapEUrl + "/Map/Project?project_id=" + this.state.ID + "&project_map_id=project" + this.state.ID + "&callback=callback");
    } //点击预览项目总图
    BIND_mapmark() {
        window.open(iss.mapEUrl + "/map/mapmark?project_id=" + this.state.ID + "&cityname=" + this.state.CITY + "&callback=callback")
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
                                        <input  onChange={this.BIND_CHECKPROJECTNAME.bind(this)} id="PROJECTNAME" value={this.state.PROJECTNAME || ""} className="inputTextBox boxSizing" type="text" maxLength="20" />
                                    </td>
                                    <th>
                                        <label className="formTableLabel boxSizing redFont">项目案名</label>
                                    </th>
                                    <td>
                                        <input onChange={this.handleInputTextBlur.bind(this)} id="CASENAME" value={this.state.CASENAME || ""} className="inputTextBox boxSizing" type="text" maxLength="20" />
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
                                        <input type="text" id="TRADERMODE" className="easyui-combobox easyui-validatebox" data-options="validType:'selected'" />
                                    </td>

                                    <th>
                                        <label className="formTableLabel boxSizing">地理位置</label>
                                    </th>
                                    <td>
                                        <button type="button" className="btn btnStyle uploadIconBtn" onClick={this.BIND_EditMapMark.bind(this)} id="LOCATION">标记地理位置</button>
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
                                        <label className="formTableLabel boxSizing">项目总图</label>
                                    </th>
                                    <td>
                                        <button type="button" className="btn btnStyle uploadIconBtn" onClick={this.BIND_EditProject.bind(this)} id="bjfq">上传/标记分期</button>
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
                            <div className="item">
                                <img className="fullScreenIcon" src="/Content/img/fullScreen.png" onClick={this.BIND_maps.bind(this)} title="全屏" />
                                <iframe id="iframe2" ref="iframe2" src={this.state.iframeURL2} onError={this.xmViewError.bind(this)} frameBorder="0" marginHeight="0" marginWidth="0" scrolling="no" width="100%" height="291"></iframe>
                            </div>
                            <div className="item active">
                                <img className="fullScreenIcon" src="/Content/img/fullScreen.png" onClick={this.BIND_mapmark.bind(this)} title="全屏" />
                                <iframe id="iframe1" ref="iframe1" src={this.state.iframeURL1}    onError={this.xmViewError.bind(this)} frameBorder="0" marginHeight="0" marginWidth="0" scrolling="no" width="100%" height="291"></iframe>
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