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
                        "PROJECTCOMPANYNAME":"",
                        "STAGECODE":"",
                        "STAGEID":"",
                        "STATUS":"",
                        "ISELFPRODUCTTYPE":"",
                        "TRADERMODE":"",
                        "MERGEWAY":"",
                        "PROJECTTYPE":"",
                        "TAXINGWAY":"",
                        "PLANSTAGE":"",
                        "PROJECTNAME":"",
                        "PRINCIPALNAME":"",
                        "PRINCIPAL":"",
                        "ID":"",
                        "GROUPNUMBER":"",
                        "STAGECREATEDATE":"1900-01-01T00:00:00",
                        "STAGEUPDATEDATE":"1900-01-01T00:00:00",
                        "STARTDATE":"1900-01-01T00:00:00",
                        "mapUrl":"http://192.168.10.164:82",
                        "iframeURL1":"",
                        "iframeURL2":"",
        }  

        this.tiem="";  
    }
    /*获取分期信息*/
    getAjax(callback){
        var th = this;
        let status=this.props.location.query.status;
        var reqtype;
        let json={};
        if(status=="edit"){
            json.Id=iss.id.id;
            json.reqtype="Edit";
        }else if(status=="add"){
            json.projectId=iss.id.id;
            json.reqtype="Add";
        }else if(status=="upgrade"){
            json.versionId=iss.id.id;
            json.reqtype="Upgrade";
            $("#GROUPNUMBER").attr("readonly","readonly");
            $("#GROUPNUMBER").addClass("inputGray");
        }
        iss.ajax({
            type:"post",
            url:"/Stage/IGetInitInfo",   
            data:json,
            success(res){
               console.log(res.rows);   
                th.setState({ 
                    "CASENAME":res.rows.BaseFormInfo.CASENAME||"",
                    "STAGENAME":res.rows.BaseFormInfo.STAGENAME,
                    "PROJECTCOMPANYNAME":res.rows.BaseFormInfo.PROJECTCOMPANYNAME,
                    "STAGEID":res.rows.BaseFormInfo.STAGEID,
                    "STAGECREATEDATE":res.rows.BaseFormInfo.STAGECREATEDATE,
                    "STAGEUPDATEDATE":res.rows.BaseFormInfo.STAGEUPDATEDATE,
                    "STARTDATE":res.rows.BaseFormInfo.STARTDATE,
                    "STAGECODE":res.rows.BaseFormInfo.STAGECODE||"",
                    "STATUS":res.rows.BaseFormInfo.STATUS,
                    "ISELFPRODUCTTYPE":res.rows.BaseFormInfo.ISELFPRODUCTTYPE,
                    "TRADERMODE":res.rows.BaseFormInfo.TRADERMODE,
                    "MERGEWAY":res.rows.BaseFormInfo.MERGEWAY,
                    "PROJECTTYPE":res.rows.BaseFormInfo.PROJECTTYPE,
                    "TAXINGWAY":res.rows.BaseFormInfo.TAXINGWAY,
                    "PLANSTAGE":res.rows.BaseFormInfo.PLANSTAGE,
                    "PROJECTID":res.rows.BaseFormInfo.PROJECTID,
                    "PROJECTNAME":res.rows.BaseFormInfo.PROJECTNAME,
                    "ID":res.rows.BaseFormInfo.ID,
                    "PRINCIPALNAME":res.rows.BaseFormInfo.PRINCIPALNAME,
                    "PRINCIPAL":res.rows.BaseFormInfo.PRINCIPAL,
                    "GROUPNUMBER":res.rows.BaseFormInfo.GROUPNUMBER,
                    "STAGEVERSIONID":res.rows.BaseFormInfo.STAGEVERSIONID,
                    "STAGESELFPRODUCTS":res.rows.BaseFormInfo.STAGESELFPRODUCTS

                },arg=>{
                    //console.log(th.state)
                    th.bind_combobox(res);
                    if(callback){
                        callback();
                    }
                });

                th.props.codeCallBack(res.rows.BaseFormInfo.PROJECTID);
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
                this.getAjax(arg=>{
                    this.BIND_ONLOAD();
                    setTimeout(function(){
                        document.getElementById('iframe2').src=$("#iframe2").attr("src");
                    },3000);
                });
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

    BIND_CHANGE_DATA(data){
        this.props.StagingInformationDATA(data)
    }
    BIND_ONLOAD(event){
        let th=this;
        iss.ajax({  //获取数据 判断有无分期总图、推盘图
            type: "post",
            url:"/Common/IsHaveXMView",
            data:{
                typeinfo:"2",
                strId:th.state.STAGEVERSIONID,
            },
            success(res) {
                if(res==false){
                    th.setState({
                        iframeURL1:"../../Content/img/xmViewError.png",
                        iframeURL2:"../../Content/img/xmViewError.png",
                    })
                }else{
                    th.setState({
                        iframeURL1:th.state.mapUrl+"/Map/Stage?stage_id="+th.state.STAGEVERSIONID+"&stage_map_id=stage"+th.state.STAGEVERSIONID,
                        iframeURL2:th.state.mapUrl+"/Map/PUSHPLATE?stage_id="+th.state.STAGEVERSIONID+"&stage_map_id=stage"+th.state.STAGEVERSIONID,
                    }) 
                }
            },
            error(e) {

            }
        });
    }
    handChooseTo(da){
        let th=this;
        let peopleJson={};
        let PrincipalId={
            "id":th.state.PRINCIPAL,
            "text":th.state.PRINCIPALNAME
        }
        if(th.state.PRINCIPAL){
            peopleJson['PrincipalId']=PrincipalId;
        }
        iss.chooseTo({
            url:"/Common/IGetOrganizationalUsers",
            title:"选择人员",
            pepole:peopleJson,  //已选人员名单
            callback(da){
                console.log(da);
                if(Object.keys(da).length==0||!da){
                    th.setState({ 
                        "PRINCIPAL":"",
                        "PRINCIPALNAME":"",
                    })
                }else{
                    for(let key in da){
                        console.log(da[key]);
                        th.setState({ 
                            "PRINCIPAL":da[key].id,
                            "PRINCIPALNAME":da[key].text,
                        });
                        th.BIND_CHANGE_DATA(th.state);
                    }
                }
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
            //console.log(th.state[target]) 
            th.BIND_CHANGE_DATA(this.state)
         }) 
       // console.log(this.state);
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
        
        if(arg.rows.BaseFormInfo.STATUS==0||arg.rows.BaseFormInfo.STATUS==null){
            installmentState.combobox("select",0);
        }else{
            installmentState.combobox("select",arg.rows.BaseFormInfo.STATUS);
        }

        let selfSustaining = $("#STAGESELFPRODUCTS");//自持业态
        selfSustaining.combobox({
            valueField: "val",
            textField: "label",
            editable: true,
            readonly: false,
            multiple:true,
            panelHeight:"auto",
            onChange:th.handleSelectTextChange.bind(th,"STAGESELFPRODUCTS"),
            data:arg.rows.SelectOptions.ISELFPRODUCTTYPE,
            onSelect: function(e){
                //console.log(e.val);
                let val=e.val;
                if(val==0){
                    setTimeout(arg=>{
                        selfSustaining.combobox("setValues",[0]);
                    })
                }else if(val!=0){
                    setTimeout(arg=>{
                        let STAG_num=th.state.STAGESELFPRODUCTS;
                        let new_arr=[];
                        new_arr=STAG_num.filter((obj)=>{
                            return obj!=0;
                        });
                        selfSustaining.combobox("setValues",new_arr);
                        //selfSustaining.combobox("setValues",[0]);
                    })
                }
            }
        });
        if(arg.rows.BaseFormInfo.STAGESELFPRODUCTS==0||arg.rows.BaseFormInfo.STAGESELFPRODUCTS==null){
            selfSustaining.combobox("setValues",[0]);
        }else{
            selfSustaining.combobox("setValues",arg.rows.BaseFormInfo.STAGESELFPRODUCTS);
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
        if(arg.rows.BaseFormInfo.TRADERMODE==0||arg.rows.BaseFormInfo.TRADERMODE==null){
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
        if(arg.rows.BaseFormInfo.MERGEWAY==0||arg.rows.BaseFormInfo.MERGEWAY==null){
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
        if(arg.rows.BaseFormInfo.PROJECTTYPE==0||arg.rows.BaseFormInfo.PROJECTTYPE==null){
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
        if(arg.rows.BaseFormInfo.TAXINGWAY==0||arg.rows.BaseFormInfo.TAXINGWAY==null){
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
        if(arg.rows.BaseFormInfo.PLANSTAGE==0||arg.rows.BaseFormInfo.PLANSTAGE==null){
            controlStage.combobox("select","");
        }else{
            controlStage.combobox("select",arg.rows.BaseFormInfo.PLANSTAGE);
        } 
    }
    BIND_CHECKPROJECTNAME(ev){   //检查姓名名称是否冲突
        let th=this;
        let projectid=iss.id.id;
        let name=ev.target.value;
        this.setState({
            STAGENAME:name
        })
        clearTimeout(this.time);
        this.time = setTimeout(arg=>{
            iss.ajax({
                type:"POST",
                url:"/Stage/ICheckStageName",
                data:{
                    projectid:projectid,
                    name:name,
                },
                success:function (data) {
                    if(data["rows"]==true){
                        th.BIND_CHANGE_DATA(th.state)
                    }else{
                        alert("错误")
                    }
                },
                error:function (er) {
                    console.log('错误');
                }
            });
        },500);
       
    }
    xmViewError(event){
        // this.attr("src","../img/xmViewError.png")
        $(event.target).attr("src","../../Content/img/xmViewError.png");
    }
    BIND_EditStage(){
        window.open(this.state.mapUrl+"/Admin/EditStage?stage_id="+this.state.STAGEVERSIONID+"&stage_map_id=stage"+this.state.STAGEVERSIONID);
    }
    BIND_EditPushPlate(){
        window.open(this.state.mapUrl+"/Admin/EditPushPlate?stage_id="+this.state.STAGEVERSIONID+"&stage_map_id=stage"+this.state.STAGEVERSIONID);
    }
    BIND_mapsStage(){
        window.open(this.state.mapUrl+"/Map/Stage?stage_id="+this.state.STAGEVERSIONID+"&stage_map_id=stage"+this.state.STAGEVERSIONID);
    }//点击分期总图预览
    BIND_mapsTp(){
        window.open(this.state.mapUrl+"/Map/PUSHPLATE?stage_id="+this.state.STAGEVERSIONID+"&stage_map_id=stage"+this.state.STAGEVERSIONID);
    }//点击推盘图预览
    render() {
        let th=this;
        let STAGECREATEDATE=th.state.STAGECREATEDATE=="1900-01-01T00:00:00"?"":this.state.STAGECREATEDATE.split("T")[0];
        let STAGEUPDATEDATE=th.state.STAGEUPDATEDATE=="1900-01-01T00:00:00"?"":this.state.STAGEUPDATEDATE.split("T")[0];
        let STARTDATE=th.state.STARTDATE=="1900-01-01T00:00:00"?"":this.state.STARTDATE.split("T")[0];
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
                                        <input  onChange={this.BIND_CHECKPROJECTNAME.bind(this)} id="STAGENAME" value={this.state.STAGENAME||""} className="inputTextBox boxSizing" type="text" />
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
                                        <label className="formTableLabel boxSizing">分期编码</label>
                                    </th>
                                    <td>
                                        <input readOnly="readonly" id="STAGECODE" value={th.props.pCodeAndLXCode||th.state.STAGECODE} className="inputTextBox inputGray boxSizing" type="text" />
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
                                        <label className="formTableLabel boxSizing redFont">自持业态</label>
                                    </th>
                                    <td>
                                        <input type="text" id="STAGESELFPRODUCTS" />
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
                                        <input readOnly="readonly" onClick={this.handChooseTo.bind(this)} id="PRINCIPALNAME" value={this.state.PRINCIPALNAME||""}  className="inputTextBox boxSizing" type="text" />
                                        <img className="symbol headIcon" src="../../Content/img/head-icon.png" />
                                    </td>
								    <th>
                                        <label className="formTableLabel boxSizing">权益比例</label>
                                    </th>
                                    <td>
                                        <input readOnly="readonly" id="equityTxt" value={this.props.equityTxt} className="inputTextBox inputGray boxSizing" type="text" />
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
                                            <input readOnly="readonly" id="STAGECREATEDATE" value={STAGECREATEDATE} className="inputTextBox inputGray boxSizing" type="text" />    
                                        </td>	
							    		
								    </tr>
								    <tr>
                                        <th>
                                            <label className="formTableLabel boxSizing">分期更新日期</label>
                                        </th>
							    		<td>
                                            <input readOnly="readonly" id="STAGEUPDATEDATE" value={STAGEUPDATEDATE} className="inputTextBox inputGray boxSizing" type="text" /> 
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
                                            <input readOnly="readonly" id="STARTDATE" value={STARTDATE} className="inputTextBox inputGray boxSizing" type="text" />    
                                        </td>	
								    	<th>
                                            <label className="formTableLabel boxSizing redFont">分期总图</label>
                                        </th>
								    	<td>
                                        <button onClick={this.BIND_EditStage.bind(this)} className="btn btnStyle uploadIconBtn">上传/编辑分期总图</button>
                                        </td>	
								    </tr>
                                    <tr>
                                        <th>
                                            <label className="formTableLabel boxSizing redFont">组团数量</label>
                                        </th>
                                        <td>
                                            <input onChange={this.handleInputTextChange.bind(this)} id="GROUPNUMBER" value={this.state.GROUPNUMBER||""} className="inputTextBox boxSizing" type="text" />
                                        </td>
                                        <th>
                                            <label className="formTableLabel boxSizing redFont">推盘图</label>
                                        </th>
								    	<td>
                                        <button onClick={this.BIND_EditPushPlate.bind(this)} className="btn btnStyle uploadIconBtn">上传/编辑推盘图</button>
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
                            <iframe ref="iframe" id="iframe1" src={this.state.iframeURL1}    onError={this.xmViewError.bind(this)} frameBorder="0" marginHeight="0" marginWidth="0" scrolling="no" width="100%" height="291"></iframe>
                            </div>
                            <div className="item">
                                <iframe ref="iframe" id="iframe2" src={this.state.iframeURL2}    onError={this.xmViewError.bind(this)} frameBorder="0" marginHeight="0" marginWidth="0" scrolling="no" width="100%" height="291"></iframe>
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