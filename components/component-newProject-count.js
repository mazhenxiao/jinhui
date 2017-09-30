import React from 'react';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
require("../../Content/css/intallment.less");
class NewProjectCount extends React.Component {
    constructor(arg) {
        super(arg);
        this.state ={
            "projectName":"",
            "stageName":"",
            "projectAddress":"",
            "tradersWay":"",
            "belongCity":"",
            "developmentWay":"",
            "companyHead":"",
            
        }
        iss.hashHistory.listen((local, next) => {
            console.log(arguments)
        })
        this.getAjax();
        
    }
    getAjax(){
    //    let projectId = this.props.location.state.id;
       //console.log(this.props.location)
        iss.ajax({
            type:"post",
            url:"/Project/IProjectInfo",
            data:{
                projectId:"A91BB3051A0848319B45D3D527AC4103"
            },
            sucess(res){

            },
            error(e){

            }
        })
    }
    componentDidMount() {
        this.bind_combobox();
    }
    handleInputTextChange (e) {
        var th = this;
        let target = e.target.id
         this.setState({
           [target]: e.target.value // 将表单元素的值的变化映射到state中
         },()=>{
            console.log(this.state) 
         }) 
      
       // console.log(e.target.id);
       // console.log(e.target.value);
      
    }
    handleSelectTextChange(e,b,c){
        this.setState({
              [e]:b
          }) 
        //console.log(this.state);
    }
    bind_combobox() {
        var th = this;
        let belongCity = $("#belongCity")//所属城市
        belongCity.combobox({
            valueField: "value",
            textField: "label",
            editable: true,
            readonly: false,
            panelHeight:"auto",
            onChange:th.handleSelectTextChange.bind(th,"belongCity"),
            data: [
                { label: "请选择", value: "", "selected": true },
                { label: "北京", value: "0" },
                { label: "上海", value: "1" },
                { label: "广州", value: "2" }
            ]
        });
        let developmentWay = $("#developmentWay")//项目开发方式
        developmentWay.combobox({
            valueField: "value",
            textField: "label",
            editable: true,
            readonly: false,
            panelHeight:"auto",
            onChange:th.handleSelectTextChange.bind(th,"developmentWay"),
            data: [
                { label: "请选择", value: "", "selected": true },
                { label: "在售（建）", value: "0" },
                { label: "竣备", value: "1" },
                { label: "交房", value: "2" }
            ]
        });
        let tradersWay = $("#tradersWay");//操盘方式
        tradersWay.combobox({
            valueField: "value",
            textField: "label",
            editable: true,
            readonly: false,
            panelHeight:"auto",
            onChange:th.handleSelectTextChange.bind(th,"tradersWay"),
            data: [
                { label: "请选择", value: "", "selected": true },
                { label: "完全操盘", value: "0" },
                { label: "派总经理", value: "1" },
                { label: "不派总经理", value: "2" }
            ]
        });
        
        
    }
    render() {
       
        return <section>
            <article className="staging-box">

                <h3 className="boxGroupTit">
                    <p>
                        <span>项目信息</span>
                        <i>（<i className="redFont"></i>为必填项）</i>
                    </p>
                    <span className="functionButton">
                        <a className="saveIcon " href="#">暂存</a>
                        <a className="approvalIcon" target="_blank" href="#">发起审批</a>
                    </span>
                </h3>

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
                                    <input readOnly="readonly" className="inputTextBox inputGray boxSizing" type="text" />
                                </td>
                                <th>
                                    <label className="formTableLabel boxSizing">城市公司</label>
                                </th>
                                <td>
                                <input readOnly="readonly" className="inputTextBox inputGray boxSizing" type="text" />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">所属城市</label>
                                </th>
                                <td>
                                    <input type="text" id="belongCity" />
                                </td>
                                <th>
                                    <label className="formTableLabel boxSizing">获取状态</label>
                                </th>
                                <td>
                                    拟获取/已获取
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">项目名称</label>
                                </th>
                                <td>
                                    <input   onKeyUp={this.handleInputTextChange.bind(this)} id="projectName" className="inputTextBox boxSizing" type="text" />
                                </td>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">项目案名</label>
                                </th>
                                <td>
                                <input   onChange={this.handleInputTextChange.bind(this)} id="stageName" className="inputTextBox boxSizing" type="text" />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label className="formTableLabel boxSizing">权益比例</label>
                                </th>
                                <td>
                                    <input readOnly="readonly" className="inputTextBox inputGray boxSizing" type="text" />
                                    <i className="symbol">%</i>
                                </td>
                                <th>
                                    <label className="formTableLabel boxSizing">项目编号</label>
                                </th>
                                <td>
                                    <input readOnly="readonly" className="inputTextBox inputGray boxSizing" type="text" />
                                </td>
                            </tr>

                            <tr>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">项目开发方式</label>
                                </th>
                                <td>
                                    <input type="text" id="developmentWay" />
                                </td>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">地理位置</label>
                                </th>
                                <td>
                                    <button className="btn btnStyle uploadIconBtn">标记地理位置</button>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">操盘方式</label>
                                </th>
                                <td>
                                    <input type="text" id="tradersWay" />
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
                                    <label className="formTableLabel boxSizing redFont">项目负责人</label>
                                </th>
                                <td>
                                    <input readOnly="readonly" onChange={this.handleInputTextChange.bind(this)} id="companyHead" className="inputTextBox boxSizing" type="text" />
                                    <img className="symbol headIcon" src="../../Content/img/head-icon.png" />
                                </td>
                                <th>
                                    <label className="formTableLabel boxSizing"></label>
                                </th>
                                <td>
                                    
                                </td>

                            </tr>
                            <tr>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">项目地址</label>
                                </th>
                                <td colSpan="3">
                                <input   onChange={this.handleInputTextChange.bind(this)} id="projectAddress" className="inputTextBox boxSizing" type="text" />
                                </td>
                               
                            </tr>

                           

                        </tbody>
                    </table>
                </section>
                <section className="staging-right boxSizing fieldLocation fl">
                    {/* bootstrap 轮播图 */}
                    <div id="myCarousel" className="carousel slide">
                        <div className="carousel-inner">
                            <div className="item active">
                                <iframe src="" width="100%"></iframe>
                            </div>
                            <div className="item">
                                <iframe src="" width="100%"></iframe>
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