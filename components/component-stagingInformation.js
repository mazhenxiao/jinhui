/*分期信息栏 */
import React from 'react';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
// import Abc from "xxx.js";
      
class StagingInformation extends React.Component {
    constructor(arg) {
        super(arg);
        this.state ={
                        "CASENAME":"",
                        "STAGENAME":"",
                        "STAGECODE":"",
                        "PROJECTCOMPANYNAME":"",
                        "companyHead":"",

                        "STATUS":"",
                        "ISELFPRODUCTTYPE":"",
                        "TRADERMODE":"",
                        "MERGEWAY":"",
                        "PROJECTTYPE":"",
                        "TAXINGWAY":"",
                        "PLANSTAGE":"",
                        "PROJECTNAME":"",
        }  

      
    }

    getAjax(){
        var th = this;
        iss.ajax({
            type:"post",
            url:"/Stage/IGetInitInfo",   
            data:{
                reqtype:"Add",
                projectId:iss.id.id,
            },
            sucess(res){
               console.log(res.rows.BaseFormInfo.CASENAME);   
                th.setState({ 
                    "CASENAME":res.rows.BaseFormInfo.CASENAME,
                    "STAGENAME":res.rows.BaseFormInfo.STAGENAME,
                    "PROJECTCOMPANYNAME":res.rows.BaseFormInfo.PROJECTCOMPANYNAME,
                    "STAGEID":res.rows.BaseFormInfo.STAGECODE,
                    "STAGECREATEDATE":res.rows.BaseFormInfo.STAGECREATEDATE.split('T')[0],
                    "STAGEUPDATEDATE":res.rows.BaseFormInfo.STAGEUPDATEDATE.split('T')[0],
                    "STARTDATE":res.rows.BaseFormInfo.STARTDATE.split('T')[0],

                    "STATUS":res.rows.BaseFormInfo.STATUS,
                    "ISELFPRODUCTTYPE":res.rows.BaseFormInfo.ISELFPRODUCTTYPE,
                    "TRADERMODE":res.rows.BaseFormInfo.TRADERMODE,
                    "MERGEWAY":res.rows.BaseFormInfo.MERGEWAY,
                    "PROJECTTYPE":res.rows.BaseFormInfo.PROJECTTYPE,
                    "TAXINGWAY":res.rows.BaseFormInfo.TAXINGWAY,
                    "PLANSTAGE":res.rows.BaseFormInfo.PLANSTAGE,
                    "PROJECTNAME":res.rows.BaseFormInfo.PROJECTNAME,
                    "ID":res.rows.BaseFormInfo.ID,
                   
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
                //console.log(da);
            }
        })
    }   
     
    handleInputTextChange (e) {
        var th = this;
        let target = e.target.id
         this.setState({
           [target]: e.target.value // 将表单元素的值的变化映射到state中
         },()=>{
            //console.log(th.state[target]) 
            console.log(th.state);  
         }) 
      
       // console.log(e.target.id);
       //console.log(e.target.value);
       
      
    }  
    handleSelectTextChange(e,b,c){
        this.setState({
              [e]:b
          }) 
        console.log(this.state);
    }
    
    bind_combobox(arg) {
        console.log(arg.rows.SelectOptions.STATUS);
        var th = this;
        let installmentState = $("#STATUS");//分期状态
        installmentState.combobox({
            valueField: "val",
            textField: "label",
            editable: true,
            readonly: false,
            panelHeight:"auto",
            onChange:th.handleSelectTextChange.bind(th,"STATUS"),
            data:arg.rows.SelectOptions.STATUS,
        });
        
        if(arg.rows.BaseFormInfo.STATUS==0){
            installmentState.combobox("select","");
        }else{
            installmentState.combobox("select",arg.rows.BaseFormInfo.STATUS);
        }

        let selfSustaining = $("#ISELFPRODUCTTYPE");//自持业态
        selfSustaining.combobox({
            valueField: "val",
            textField: "label",
            editable: true,
            readonly: false,
            panelHeight:"auto",
            onChange:th.handleSelectTextChange.bind(th,"ISELFPRODUCTTYPE"),
            data:arg.rows.SelectOptions.ISELFPRODUCTTYPE,
        });
        if(arg.rows.BaseFormInfo.ISELFPRODUCTTYPE==0){
            selfSustaining.combobox("select","");
        }else{
            selfSustaining.combobox("select",arg.rows.BaseFormInfo.ISELFPRODUCTTYPE);
        }
        

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
        if(arg.rows.BaseFormInfo.TRADERMODE==0){
            tradersWay.combobox("select","");
        }else{
            tradersWay.combobox("select",arg.rows.BaseFormInfo.TRADERMODE);
        }
        

        let tableManner = $("#MERGEWAY");//并表方式
        tableManner.combobox({
            valueField: "val",
            textField: "label",
            editable: true,
            readonly: false,
            panelHeight:"auto",
            onChange:th.handleSelectTextChange.bind(th,"MERGEWAY"),
            data:arg.rows.SelectOptions.MERGEWAY,
        });
        if(arg.rows.BaseFormInfo.MERGEWAY==0){
            tableManner.combobox("select","");
        }else{
            tableManner.combobox("select",arg.rows.BaseFormInfo.MERGEWAY);
        }
        

        let projectType = $("#PROJECTTYPE");//项目类型
        projectType.combobox({
            valueField: "val",
            textField: "label",
            editable: true,
            readonly: false,
            panelHeight:"auto",
            onChange:th.handleSelectTextChange.bind(th,"PROJECTTYPE"),
            data:arg.rows.SelectOptions.PROJECTTYPE,
        });
        if(arg.rows.BaseFormInfo.PROJECTTYPE==0){
            projectType.combobox("select","");
        }else{
            projectType.combobox("select",arg.rows.BaseFormInfo.PROJECTTYPE);
        }
        

        let taxManner = $("#TAXINGWAY");//项目计税方式
        taxManner.combobox({
            valueField: "val",
            textField: "label",
            editable: true,
            readonly: false,
            panelHeight:"auto",
            onChange:th.handleSelectTextChange.bind(th,"TAXINGWAY"),
            data:arg.rows.SelectOptions.TAXINGWAY,
        });
        if(arg.rows.BaseFormInfo.TAXINGWAY==0){
            taxManner.combobox("select","");
        }else{
            taxManner.combobox("select",arg.rows.BaseFormInfo.TAXINGWAY);
        }
        

        let controlStage = $("#PLANSTAGE");//计划管控阶段
        controlStage.combobox({
            valueField: "val",
            textField: "label",
            editable: true,
            readonly: false,
            panelHeight:"auto",
            onChange:th.handleSelectTextChange.bind(th,"PLANSTAGE"),
            data:arg.rows.SelectOptions.PLANSTAGE,
        });
        if(arg.rows.BaseFormInfo.PLANSTAGE){
            controlStage.combobox("select","");
        }else{
            controlStage.combobox("select",arg.rows.BaseFormInfo.PLANSTAGE);
        } 
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
                                        <input readOnly="readonly" id="PROJECTNAME" value={this.state.PROJECTNAME||""} className="inputTextBox inputGray boxSizing" type="text"  />
                                    </td>
                                    <th>
                                        <label className="formTableLabel boxSizing redFont">分期名称</label>
                                    </th>
                                    <td>
                                        <input  onChange={this.handleInputTextChange.bind(this)} id="STAGENAME" value={this.state.STAGENAME||""} className="inputTextBox boxSizing" type="text" />
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        <label className="formTableLabel boxSizing redFont">分期案名</label>
                                    </th>
                                    <td>
                                        <input onChange={this.handleInputTextChange.bind(this)} id="CASENAME" value={this.state.CASENAME||""} className="inputTextBox boxSizing" type="text" />
                                    </td>
                                    <th>
                                        <label className="formTableLabel boxSizing redFont">分期编码</label>
                                    </th>
                                    <td>
                                        <input onChange={this.handleInputTextChange.bind(this)} id="STAGECODE" value={this.state.STAGECODE||""} className="inputTextBox boxSizing" type="text" />
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        <label className="formTableLabel boxSizing redFont">分期状态</label>
                                    </th>
                                    <td>
                                        <input type="text" id="STATUS" />
                                    </td>
                                    <th>
                                        <label className="formTableLabel boxSizing redFont">自持物业</label>
                                    </th>
                                    <td>
                                        <input type="text" id="ISELFPRODUCTTYPE" />
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
                                        <label className="formTableLabel boxSizing redFont">项目公司名称</label>
                                    </th>
                                    <td>
                                        <input onChange={this.handleInputTextChange.bind(this)} id="PROJECTCOMPANYNAME" value={this.state.PROJECTCOMPANYNAME||""} className="inputTextBox boxSizing" type="text" />
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
                                            <input  type="text" id="MERGEWAY" />
										</td>	
							    		<th>
                                            <label className="formTableLabel boxSizing redFont">项目类型</label>
                                        </th>
								    	<td>
                                            <input type="text" id="PROJECTTYPE" />
								    	</td>	
								    	
								</tr>  
								    <tr>
                                        <th>
                                            <label className="formTableLabel boxSizing redFont">项目计税方式</label>
                                        </th>
								    	<td>
                                            <input type="text" id="TAXINGWAY" />
								    	</td>	
                                        <th>
                                            <label className="formTableLabel boxSizing">分期创建日期</label>
                                        </th>
										<td>
                                            <input readOnly="readonly" id="STAGECREATEDATE" value={this.state.STAGECREATEDATE||""} className="inputTextBox inputGray boxSizing" type="text" />    
                                        </td>	
							    		
								    </tr>
								    <tr>
                                        <th>
                                            <label className="formTableLabel boxSizing">分期更新日期</label>
                                        </th>
							    		<td>
                                            <input readOnly="readonly" id="STAGEUPDATEDATE" value={this.state.STAGEUPDATEDATE||""} className="inputTextBox inputGray boxSizing" type="text" /> 
                                        </td>	
								    	<th>
                                            <label className="formTableLabel boxSizing">计划管控阶段</label>
                                        </th>
								    	<td>
                                            <input readOnly="readonly" type="text" id="PLANSTAGE" />
								    	</td>	
								    </tr>
								    
								    <tr>
                                        <th>
                                            <label className="formTableLabel boxSizing">启动开发时间</label>
                                        </th>
							    		<td>
                                            <input readOnly="readonly" id="STARTDATE" value={this.state.STARTDATE||""} className="inputTextBox inputGray boxSizing" type="text" />    
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