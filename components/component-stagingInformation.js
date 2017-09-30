/*分期信息栏 */
import React from 'react';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
// import Abc from "xxx.js";

class StagingInformation extends React.Component {
    constructor(arg) {
        super(arg);
        this.state ={
                        "stageName":"",
                        "stageCase":"",
                        "stageCode":"",
                        "companyName":"",
                        "companyHead":"",
                        "installmentState":"",
                        "selfSustaining":"",
                        "tradersWay":"",
                        "tableManner":"",
                        "projectType":"",
                        "taxManner":"",
                        "controlStage":"",
        }
        
        
    }
    
    componentDidMount() {
       this.bind_combobox();
        //  toolsTab.bindTab(this.props);//绑定头部标签
    }
    addTodo(text) {
        
    }
    onUpload(){
        iss.upload({
            accept: {
                title: 'Images',
                extensions: 'gif,jpg,jpeg,bmp,png',
                mimeTypes: 'image/*'
            },
            server: 'http://2betop.net/fileupload.php',
            fileNumLimit: 300,
            fileSizeLimit: 5 * 1024 * 1024,    // 200 M
            fileSingleSizeLimit: 1 * 1024 * 1024    // 50 M
        })
    }
    handChooseTo(ev,da){
        iss.chooseTo({
            url:"/Home/GetTreeInfo",
            title:"选择人员",
            pepole:{},  //已选人员名单
            callback(da){
                console.log(da);
            }

        })
        
    }
    
    handleInputTextChange (e) {
        var th = this;
        let target = e.target.id
         this.setState({
           [target]: e.target.value // 将表单元素的值的变化映射到state中
         },()=>{
            console.log(th.state[target]) 
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
        let installmentState = $("#installmentState");//分期状态
        installmentState.combobox({
            valueField: "value",
            textField: "label",
            editable: true,
            readonly: false,
            panelHeight:"auto",
            onChange:th.handleSelectTextChange.bind(th,"installmentState"),
            data: [
                { label: "请选择", value: "", "selected": true },
                { label: "2017年首开项目", value: "0" },
                { label: "2018年首开项目", value: "1" },
                { label: "顺工项目", value: "2" }
            ]
        });
        let selfSustaining = $("#selfSustaining");//自持业态
        selfSustaining.combobox({
            valueField: "value",
            textField: "label",
            editable: true,
            readonly: false,
            panelHeight:"auto",
            onChange:th.handleSelectTextChange.bind(th,"selfSustaining"),
            data: [
                { label: "无", value: "", "selected": true },
                { label: "酒店", value: "0" },
                { label: "写字楼", value: "1" }
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
        let tableManner = $("#tableManner");//并表方式
        tableManner.combobox({
            valueField: "value",
            textField: "label",
            editable: true,
            readonly: false,
            panelHeight:"auto",
            onChange:th.handleSelectTextChange.bind(th,"tableManner"),
            data: [
                { label: "请选择", value: "", "selected": true },
                { label: "A并表项目", value: "0" },
                { label: "B非并表项目", value: "1" }
            ]
        });
        let projectType = $("#projectType");//项目类型
        projectType.combobox({
            valueField: "value",
            textField: "label",
            editable: true,
            readonly: false,
            panelHeight:"auto",
            onChange:th.handleSelectTextChange.bind(th,"projectType"),
            data: [
                { label: "请选择", value: "", "selected": true },
                { label: "全新开发", value: "0" },
                { label: "升级改造项目", value: "1" },
                { label: "其他", value: "2" }
            ]
        });
        let taxManner = $("#taxManner");//项目计税方式
        taxManner.combobox({
            valueField: "value",
            textField: "label",
            editable: true,
            readonly: false,
            panelHeight:"auto",
            onChange:th.handleSelectTextChange.bind(th,"taxManner"),
            data: [
                { label: "请选择", value: "", "selected": true },
                { label: "一般计税", value: "0" },
                { label: "简易计税", value: "1" }
            ]
        });
        let controlStage = $("#controlStage");//项目类型
        controlStage.combobox({
            valueField: "value",
            textField: "label",
            editable: true,
            readonly: false,
            panelHeight:"auto",
            onChange:th.handleSelectTextChange.bind(th,"controlStage"),
            data: [
                { label: "请选择", value: "", "selected": true },
                { label: "启动版", value: "0" },
                { label: "基准版", value: "1" },
                { label: "调整板（第1次）", value: "2" },
                { label: "调整版（第2次）", value: "3" },
                { label: "调整版（第N次）", value: "4" },
                { label: "完结版", value: "5" }
            ]
        });
        
        
    }

    render() {
        return <article className="staging-box">
                <section className="staging-left boxSizing projectinFormation">
                    <table className="formTable" width="100%">
                            <colgroup>
                                <col width="150" /><col width="" />
                                <col width="150" /><col width="" />
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>
                                        <label className="formTableLabel boxSizing">项目名称</label>
                                    </th>
                                    <td>
                                        <input readOnly="readonly" className="inputTextBox inputGray boxSizing" type="text"  />
                                    </td>
                                    <th>
                                        <label className="formTableLabel boxSizing redFont">分期名称</label>
                                    </th>
                                    <td>
                                        <input  onChange={this.handleInputTextChange.bind(this)} id="stageName" className="inputTextBox boxSizing" type="text" />
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        <label className="formTableLabel boxSizing redFont">分期案名</label>
                                    </th>
                                    <td>
                                        <input onChange={this.handleInputTextChange.bind(this)} id="stageCase" className="inputTextBox boxSizing" type="text" />
                                    </td>
                                    <th>
                                        <label className="formTableLabel boxSizing redFont">分期编码</label>
                                    </th>
                                    <td>
                                        <input onChange={this.handleInputTextChange.bind(this)} id="stageCode" className="inputTextBox boxSizing" type="text" />
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        <label className="formTableLabel boxSizing redFont">分期状态</label>
                                    </th>
                                    <td>
                                        <input type="text" id="installmentState" />
                                    </td>
                                    <th>
                                        <label className="formTableLabel boxSizing redFont">自持物业</label>
                                    </th>
                                    <td>
                                        <input type="text" id="selfSustaining" />
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
                                        <label className="formTableLabel boxSizing redFont">项目公司名称</label>
                                    </th>
                                    <td>
                                        <input onChange={this.handleInputTextChange.bind(this)} id="companyName" className="inputTextBox boxSizing" type="text" />
                                    </td>
                                </tr>
                                <tr>
								    <th>
                                        <label className="formTableLabel boxSizing redFont">项目负责人</label>
                                    </th>
								    <td>
                                        <input readOnly="readonly" onClick={this.handChooseTo.bind(this)} id="companyHead" className="inputTextBox boxSizing" type="text" />
                                        <img className="symbol headIcon" src="../../Content/img/head-icon.png" />
                                    </td>
								    <th>
                                        <label className="formTableLabel boxSizing">权益比例</label>
                                    </th>
                                    <td>
                                        <input readOnly="readonly" className="inputTextBox inputGray boxSizing" type="text" />
                                        <i className="symbol">%</i>
                                    </td>
								</tr>	
								<tr> 
									    <th>
                                            <label className="formTableLabel boxSizing redFont">并表方式</label>
                                        </th>
										<td>
                                            <input  type="text" id="tableManner" />
										</td>	
							    		<th>
                                            <label className="formTableLabel boxSizing redFont">项目类型</label>
                                        </th>
								    	<td>
                                            <input type="text" id="projectType" />
								    	</td>	
								    	
								</tr>
								    <tr>
                                        <th>
                                            <label className="formTableLabel boxSizing redFont">项目计税方式</label>
                                        </th>
								    	<td>
                                            <input type="text" id="taxManner" />
								    	</td>	
                                        <th>
                                            <label className="formTableLabel boxSizing">分期创建日期</label>
                                        </th>
										<td>
                                            <input readOnly="readonly" className="inputTextBox inputGray boxSizing" type="text" />    
                                        </td>	
							    		
								    </tr>
								    <tr>
                                        <th>
                                            <label className="formTableLabel boxSizing">分期更新日期</label>
                                        </th>
							    		<td>
                                            <input readOnly="readonly" className="inputTextBox inputGray boxSizing" type="text" /> 
                                        </td>	
								    	<th>
                                            <label className="formTableLabel boxSizing">计划管控阶段</label>
                                        </th>
								    	<td>
                                            <input readOnly="readonly" type="text" id="controlStage" />
								    	</td>	
								    </tr>
								    
								    <tr>
                                        <th>
                                            <label className="formTableLabel boxSizing">启动开发时间</label>
                                        </th>
							    		<td>
                                            <input readOnly="readonly" className="inputTextBox inputGray boxSizing" type="text" />    
                                        </td>	
								    	<th>
                                            <label className="formTableLabel boxSizing redFont">分期总图</label>
                                        </th>
								    	<td>
                                            <button onClick={this.onUpload.bind(this)} className="btn btnStyle uploadIconBtn">上传</button>
                                            <button className="btn btnStyle userApplyIconBtn">编辑</button>
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
                        <a className="carousel-control left glyphicon glyphicon-menu-left" href="#myCarousel" 
                        data-slide="prev">
                        </a>
                        <a className="carousel-control right glyphicon glyphicon-menu-right" href="#myCarousel" 
                        data-slide="next">
                        </a>
                    </div> 
                </section>
                <div className="clear"></div>
        </article>
    }

}
export default StagingInformation;