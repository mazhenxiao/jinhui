import React from 'react';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie

// import Province from "./tools-LevelLinkage.js";
require("../../Content/css/intallment.less");
class NewProjectCount extends React.Component {
    constructor(arg) {
        super(arg);
        this.state ={
            "CompanyAreaName":"",
            "CompanyCityName":"",
            "PROJECTNAME":"",
            "CASENAME":"",
            "PROJECTADDRESS":"",
            "TRADERMODE":"",
            "PROJECTTYPE":"",
            "EQUITYRATIO":"",
            "PROJECTCODE":"",
            "PRINCIPAL":"",
            // "cityCompany":iss.id.text,
        }
        iss.hashHistory.listen((local, next) => {
            //console.log(arguments)
        })
        
        
    }

    getAjax(){
        var th = this;
       // console.log(th);
    //   let projectId = this.props.location.state.id;
       let statu=this.props.local.query.statu;
       let json={};
       var urlProject;
       //console.log(statu)
       if(statu=="edit"){
            urlProject="/Project/IProjectInfo";
            json.projectId=iss.id.id;
       }else{
            urlProject="/Project/INewProject";
            json.cityId=iss.id.id;
       }
        iss.ajax({
            type:"post",
            //url:"/Project/IProjectInfo",  
            url:urlProject,  
            data:json,
            sucess(res){
               //console.log(res.rows);
              // console.log(res.rows.SelectOptions.TRADERMODE)
                th.setState({
                    "PROJECTNAME":res.rows.BaseFormInfo.Project.PROJECTNAME,
                    "CASENAME":res.rows.BaseFormInfo.Project.CASENAME,
                    "EQUITYRATIO":res.rows.BaseFormInfo.Project.EQUITYRATIO,
                    "PROJECTCODE":res.rows.BaseFormInfo.Project.PROJECTCODE,
                    "PRINCIPAL":res.rows.BaseFormInfo.Project.PRINCIPAL,
                    "PROJECTADDRESS":res.rows.BaseFormInfo.Project.PROJECTADDRESS,
                    //"PROJECTTYPE":res.rows.BaseFormInfo.Project.PROJECTTYPE,
                    "TRADERMODE":res.rows.BaseFormInfo.Project.TRADERMODE,
                    "ObtainStatusName":res.rows.BaseFormInfo.ObtainStatusName,
                    "CompanyAreaName":res.rows.BaseFormInfo.CompanyAreaName,
                    "CompanyCityName":res.rows.BaseFormInfo.CompanyCityName,
                    "ID":res.rows.BaseFormInfo.Project.ID,
                    "PARENTID":res.rows.BaseFormInfo.Project.PARENTID,
                },arg=>{
                    //console.log(th.state)
                    th.bind_combobox(res);
                    
                })
            },
            error(e){ 

            }
        })
    }
    componentDidMount() {
        let id=iss.id;
        if(id=="1E1CB1E95A864AFA961392C3E3644642"||!id){
            iss.hashHistory.replace({pathname:"index"});
        }else{
            this.getAjax();
        }
       // this.bind_combobox();
    }
    BIND_CHANGE_DATA(data){
        this.props.NewProjectCountDATA(data)
    }
    handChooseTo(ev,da){
        iss.chooseTo({
            url:"/Home/GetTreeInfo",
            title:"选择人员",
            pepole:{},  //已选人员名单
            callback(da){
               // console.log(da);
            }
        })
        
    }
    handleInputTextChange (e){
        var th = this;
        let target = e.target.id
        
         this.setState({
           [target]: e.target.value // 将表单元素的值的变化映射到state中
         },()=>{
           th.BIND_CHANGE_DATA(this.state)
         })
       // console.log(e.target.id);
        //console.log(e.target.value);
    }
    handleSelectTextChange(e,b,c){
        var th = this;
        this.setState({ 
              [e]:b
          },()=>{
            th.BIND_CHANGE_DATA(this.state)
          })
       //console.log(this.state);  
    }

    bind_combobox(arg) {   
        var th = this;
        console.log(arg);
        let belongCity = this.belongCity = $("#belongCity")//所属城市
        belongCity.combo({
            required:true,
            editable:false,
            panelWidth:"452px",
            panelHeight:"auto",
        });
        // $('#linkage').appendTo(belongCity.combo('panel'));
        // $('#linkage select').click(function(){
        //     var v = $('#linkage select option:selected').text();
        //     belongCity.combo('setText', v)
        //     $('#linkage #town').click(function(){
        //         belongCity.combo('hidePanel');
        //     })
        // });

        /*let developmentWay = $("#PROJECTTYPE")//项目开发方式
        developmentWay.combobox({
            valueField: "val",
            textField: "label",
            editable: true,
            readonly: false, 
            panelHeight:"auto",
            onChange:th.handleSelectTextChange.bind(th,"PROJECTTYPE"),
            data:arg.rows.SelectOptions.PROJECTTYPE, 
        });
        developmentWay.combobox("select",arg.rows.BaseFormInfo.Project.PROJECTTYPE);
        */
        let tradersWay = $("#TRADERMODE");//操盘方式
        tradersWay.combobox({
            valueField: "val",
            textField: "label",
            editable: true,
            readonly: false,  
            panelHeight:"auto",
            onChange:th.handleSelectTextChange.bind(th,"TRADERMODE"),
            data:arg.rows.SelectOptions.TRADERMODE,
        
        });
        tradersWay.combobox("select",arg.rows.BaseFormInfo.Project.TRADERMODE);
    }
    render() {
        return <section>
            <article className="staging-box">
                <section className="staging-left boxSizing projectinFormation">
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
                                    <input readOnly="readonly" id="CompanyAreaName" value={this.state.CompanyAreaName||""}  className="inputTextBox inputGray boxSizing" type="text" />
                                </td>
                                <th>
                                    <label className="formTableLabel boxSizing">城市公司</label>
                                </th>
                                <td>
                                <input readOnly="readonly" id="CompanyCityName" value={this.state.CompanyCityName||""} className="inputTextBox inputGray boxSizing" type="text" />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">所属城市</label>
                                </th>
                                <td>
                                <input className="inputTextBox boxSizing" type="text" />
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
                                    <input onChange={this.handleInputTextChange.bind(this)} id="PROJECTNAME" value={this.state.PROJECTNAME||""} className="inputTextBox boxSizing" type="text" />
                                </td>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">项目案名</label>
                                </th>
                                <td>
                                <input onChange={this.handleInputTextChange.bind(this)} id="CASENAME" value={this.state.CASENAME||""} className="inputTextBox boxSizing" type="text" />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label className="formTableLabel boxSizing">权益比例</label>
                                </th>
                                <td>
                                    <input readOnly="readonly" id="EQUITYRATIO" value={this.state.EQUITYRATIO||""} className="inputTextBox inputGray boxSizing" type="text" />
                                    <i className="symbol">%</i>
                                </td>
                                <th>
                                    <label className="formTableLabel boxSizing">项目编号</label>
                                </th>
                                <td>
                                    <input readOnly="readonly" id="PROJECTCODE" value={this.state.PROJECTCODE||""} className="inputTextBox inputGray boxSizing" type="text" />
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
                                    <label className="formTableLabel boxSizing redFont">项目负责人</label>
                                </th>
                                <td>
                                    <input readOnly="readonly" onClick={this.handChooseTo.bind(this)} onChange={this.handleInputTextChange.bind(this)} id="PRINCIPAL" value={this.state.PRINCIPAL||""} className="inputTextBox boxSizing" type="text" />
                                    <img className="symbol headIcon" src="../../Content/img/head-icon.png" />
                                </td>
                            </tr>
                            <tr>
                                
                                <th>
                                    <label className="formTableLabel boxSizing redFont">地理位置</label>
                                </th>
                                <td>
                                    <button className="btn btnStyle uploadIconBtn" id="LOCATION">标记地理位置</button>
                                </td>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">项目总图</label>
                                </th>
                                <td>
                                    <button className="btn btnStyle uploadIconBtn">上传</button>
                                    <button className="btn btnStyle userApplyIconBtn">编辑</button>
                                </td>	
                                
                            </tr>
                            <tr>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">项目地址</label>
                                </th>
                                <td colSpan="3">
                                <input   onChange={this.handleInputTextChange.bind(this)} id="PROJECTADDRESS" value={this.state.PROJECTADDRESS||""} className="inputTextBox boxSizing" type="text" />
                                </td>
                               
                            </tr>

                           

                        </tbody>
                    </table>
                </section>
                <section className="staging-right boxSizing fieldLocation fl">
                    {/* bootstrap 轮播图 */}
                    <div id="myCarousel" className="carousel slide carouselStyle">
                        <div className="carousel-inner">
                            <div className="item active">
                                <iframe src="" width="100%" height="295px"></iframe>
                            </div>
                            <div className="item">
                                <iframe src="" width="100%" height="295px"></iframe>
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
export default NewProjectCount;