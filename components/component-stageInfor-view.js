/* 分期信息*/
import React from 'react';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
import "../css/view.less";

class StageInforView extends React.Component {
    constructor(arg) {
        super(arg);
        this.state ={
            "STAGEVERSIONID":this.props.versionId,
            "PROJECTID":"",
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
            "mapUrl":iss.mapEUrl,
            "iframeURL1":"",/*分期总图*/
	        "iframeURL2":"",/*推盘图*/
        }  
    }
    getAjax(callback) {
        let th=this;
        let status=th.props.status;
        let versionId=th.state.STAGEVERSIONID;
        let json={};
        if(status=="edit"){
            json.Id=versionId;
            json.reqtype="Edit";
        }else if(status=="upgrade"){
            json.versionId=versionOldId;
            json.reqtype="Upgrade";
        }
        iss.ajax({  //获取数据
            type: "post",
            url:"/Stage/IGetInitInfo",
            data:json,
            success(res) {
                var basicFormInfo=res.rows.BaseFormInfo;
                th.props.basicCallBack(basicFormInfo);
                
                let STAGESELFPRODUCTS=basicFormInfo.STAGESELFPRODUCTS,
                    ISELFPRODUCTTYPE=res.rows.SelectOptions.ISELFPRODUCTTYPE,
                    str=STAGESELFPRODUCTS.join(",");
                let valFilter="";
                ISELFPRODUCTTYPE.forEach(function(obj){
                   if(obj.val&&str.indexOf(obj.val)>-1){
                        valFilter=valFilter.replace(/无\,?/,"");
                        valFilter+=obj.label+",";
                   }else if(obj.val==""){
                        valFilter+="无,";
                   }
                });
                valFilter = valFilter.replace(/\,$/,"").split(",");
                let MERGEWAY=res.rows.SelectOptions.MERGEWAY,
                    MERGEWAYSTR=basicFormInfo.MERGEWAY||"",
                    MERGEWAYVAL="";
                	MERGEWAY.forEach(function(obj){
	                    if(MERGEWAYSTR.indexOf(obj.val)>-1){
	                        MERGEWAYVAL=obj.label;
	                    }
	                });
               
               let PLANSTAGE=res.rows.SelectOptions.PLANSTAGE,
               PLANSTAGESTR=basicFormInfo.PLANSTAGE||"",
               PLANSTAGEVAL="";
               PLANSTAGE.forEach(function(obj){
                        if(PLANSTAGESTR.indexOf(obj.val)>-1){
                            if(obj.label=="请选择"){
                                PLANSTAGEVAL="";
                            }else{
                                PLANSTAGEVAL=obj.label;
                            }
                            
                        }
                   });

                let STATUS="";
                if(basicFormInfo.STATUS==""||basicFormInfo.STATUS==null){
                    STATUS="";
                }else{
                    //STATUS=res.rows.SelectOptions.STATUS[basicFormInfo.STATUS].label;
                    res.rows.SelectOptions.STATUS.forEach((obj,index)=>{
                    	if(basicFormInfo.STATUS==obj.val){
                    		STATUS=obj.label;
                    		return false;
                    	}
                    });
                }

                let TRADERMODE="";
                if(basicFormInfo.TRADERMODE==""||basicFormInfo.TRADERMODE==null){
                    TRADERMODE="";
                }else{
                    TRADERMODE=res.rows.SelectOptions.TRADERMODE[basicFormInfo.TRADERMODE].label;
                }     
                
                let PROJECTTYPE="";
                if(basicFormInfo.PROJECTTYPE==""||basicFormInfo.PROJECTTYPE==null){
                    PROJECTTYPE="";
                }else{
                    PROJECTTYPE=res.rows.SelectOptions.PROJECTTYPE[basicFormInfo.PROJECTTYPE].label;
                }  
                
                let TAXINGWAY="";
                if(basicFormInfo.TAXINGWAY==""||basicFormInfo.TAXINGWAY==null){
                    TAXINGWAY="";
                }else{
                    TAXINGWAY=res.rows.SelectOptions.TAXINGWAY[basicFormInfo.TAXINGWAY].label;
                }

                
                th.setState({
                    "CASENAME":basicFormInfo.CASENAME,//分期案名
                    "STAGENAME":basicFormInfo.STAGENAME,//分期名称
                    "PROJECTCOMPANYNAME":basicFormInfo.PROJECTCOMPANYNAME,//项目公司名称id
                    "PROJECTCOMPANYEMPNAME":basicFormInfo.PROJECTCOMPANYEMPNAME, //项目公司名称
                    "STAGEID":basicFormInfo.STAGEID,
                    "STAGECREATEDATE":basicFormInfo.STAGECREATEDATE,//分期创建日期
                    "STAGEUPDATEDATE":basicFormInfo.STAGEUPDATEDATE,//分期更新日期
                    "STARTDATE":basicFormInfo.STARTDATE,//启动开发时间
                    "STAGECODE":basicFormInfo.STAGECODE,//分期编码
                    "STATUS":STATUS,//分期状态
                    "ISELFPRODUCTTYPE":basicFormInfo.ISELFPRODUCTTYPE,
                    "TRADERMODE":TRADERMODE,//操盘方式
                    "MERGEWAY":MERGEWAYVAL,//并表方式
                    "PROJECTTYPE":PROJECTTYPE,//项目类型
                    "TAXINGWAY":TAXINGWAY,//项目计税方式
                    "PLANSTAGE":PLANSTAGEVAL,//计划管控阶段
                    "PROJECTID":basicFormInfo.PROJECTID,
                    "PROJECTNAME":basicFormInfo.PROJECTNAME,//项目名称
                    "ID":basicFormInfo.ID,
                    "PRINCIPALNAME":basicFormInfo.PRINCIPALNAME,
                    "PRINCIPAL":basicFormInfo.PRINCIPAL,
                    "GROUPNUMBER":basicFormInfo.GROUPNUMBER,//组团数量
                    "PUSHPLATENUMBER":basicFormInfo.PUSHPLATENUMBER,
                    "STAGESELFPRODUCTS":valFilter.join(","),//自持业态

                    //"TRADERMODE":res.rows.SelectOptions.TRADERMODE[basicFormInfo.Project.TRADERMODE].label,//操盘方式                    
                },arg=>{
                    if(callback){
                        callback();
                    }
                });
            },
            error(e) {

            }
        });
    }
    componentDidMount() {
        let th = this;
        $(function(){
            th.getAjax(arg=>{
                th.BIND_ONLOAD(); //加载分期总图，推盘图
            });
        });
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
            	let src_one="";
            	let src_two="";
                if(res["rows"]==0){
                		src_one="../img/xmViewError.png";
                		src_two="../img/xmViewError.png";
                    
                }else{
                		src_one=iss.mapEUrl+"/MAP/SHOWSTAGE?stage_id="+th.state.STAGEVERSIONID+"&stage_map_id=stage"+th.state.STAGEVERSIONID;
                		src_two=iss.mapEUrl+"/Map/PUSHPLATE?stage_id="+th.state.STAGEVERSIONID+"&stage_map_id=stage"+th.state.STAGEVERSIONID;
                		iss.evCarouselActive(th,src_two);
                }
                th.setState({
                    iframeURL1:src_one,
                    iframeURL2:src_two,
                });
            },
            error(e) {

            }
        });
        
    }//加载iframe url 分期总图，推盘图
    xmViewError(event){
        // this.attr("src","../img/xmViewError.png")
        $(event.target).attr("src","../img/xmViewError.png");
    }
    BIND_mapsStage(){
        window.open(iss.mapEUrl+"/Map/Stage?stage_id="+this.state.STAGEVERSIONID+"&stage_map_id=stage"+this.state.STAGEVERSIONID);
    }//点击分期总图预览
    BIND_mapsTp(){
        window.open(iss.mapEUrl+"/Map/PUSHPLATE?stage_id="+this.state.STAGEVERSIONID+"&stage_map_id=stage"+this.state.STAGEVERSIONID);
    }//点击推盘图预览

    render() {
    	let me=this;
        let th=this.state;
        let STAGECREATEDATE=th.STAGECREATEDATE=="1900-01-01T00:00:00"?"":this.state.STAGECREATEDATE.split("T")[0];
        let STAGEUPDATEDATE=th.STAGEUPDATEDATE=="1900-01-01T00:00:00"?"":this.state.STAGEUPDATEDATE.split("T")[0];
        let STARTDATE=th.STARTDATE=="1900-01-01T00:00:00"?"":this.state.STARTDATE.split("T")[0];
        return (<div id="stageInforView">
            <h3 className="boxGroupTit">
                <p><span>分期信息</span></p>
            </h3>
            <div className="stageVWrap">
                <div className="stageVRight">
                     {/* bootstrap 轮播图 */}
                     <div id="myCarousel" className="carousel slide carouselStyle">
                        <div className="carousel-inner">
                            <div className="item active">
                                <img className="fullScreenIcon" src="../img/fullScreen.png" onClick={this.BIND_mapsStage.bind(this)} title="全屏" />
                                <iframe ref="iframe1" id="iframe1" src={this.state.iframeURL1}    onError={this.xmViewError.bind(this)} frameBorder="0" marginHeight="0" marginWidth="0" scrolling="no" width="100%" height="291"></iframe>
                            </div>
                            <div className="item">
                            <img className="fullScreenIcon" src="../img/fullScreen.png" onClick={this.BIND_mapsTp.bind(this)} title="全屏"/>
                                <iframe ref="iframe2" id="iframe2" src={this.state.iframeURL2}    onError={this.xmViewError.bind(this)} frameBorder="0" marginHeight="0" marginWidth="0" scrolling="no" width="100%" height="291"></iframe>
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
                </div>
                <div className="stageVLeft">
                    <table className="stageVTable">
                        <tbody>
                            <tr>
                                <td className="stageViewTitle">项目名称</td>
                                <td className="stageViewCon">{th.PROJECTNAME}</td>
                                <td className="stageViewTitle">分期名称</td>
                                <td className="stageViewCon">{th.STAGENAME}</td>
                            </tr>
                            <tr>
                                <td className="stageViewTitle">分期案名</td>
                                <td className="stageViewCon">{th.CASENAME}</td>
                                <td className="stageViewTitle">分期编码</td>
                                <td className="stageViewCon">{th.STAGECODE}</td>
                            </tr>
                            <tr>
                                <td className="stageViewTitle">分期状态</td>
                                <td className="stageViewCon">{th.STATUS}</td>
                                <td className="stageViewTitle">自持业态</td>
                                <td className="stageViewCon">{th.STAGESELFPRODUCTS}</td>
                            </tr>
                            <tr>
                                <td className="stageViewTitle">操盘方式</td>
                                <td className="stageViewCon">{th.TRADERMODE}</td>
                                <td className="stageViewTitle">项目公司名称</td>
                                <td className="stageViewCon">{th.PROJECTCOMPANYEMPNAME}</td>
                            </tr>
                            <tr>
                                <td className="stageViewTitle">项目负责人</td>
                                <td className="stageViewCon">{th.PRINCIPALNAME}</td>
                                <td className="stageViewTitle">权益比例</td>
                                <td className="stageViewCon">{me.props.equityTxt}</td>
                            </tr>
                            <tr>
                                <td className="stageViewTitle">并表方式</td>
                                <td className="stageViewCon">{th.MERGEWAY}</td>
                                <td className="stageViewTitle">项目类型</td>
                                <td className="stageViewCon">{th.PROJECTTYPE}</td>
                            </tr>
                            <tr>
                                <td className="stageViewTitle">项目计税方式</td>
                                <td className="stageViewCon">{th.TAXINGWAY}</td>
                                <td className="stageViewTitle">分期创建日期</td>
                                <td className="stageViewCon">{STAGECREATEDATE}</td>
                            </tr>
                            <tr>
                                <td className="stageViewTitle">分期更新日期</td>
                                <td className="stageViewCon">{STAGEUPDATEDATE}</td>
                                <td className="stageViewTitle">计划管控阶段</td>
                                <td className="stageViewCon">{th.PLANSTAGE}</td>
                            </tr>
                            <tr>
                                <td className="stageViewTitle">启动开发时间</td>
                                <td className="stageViewCon">{STARTDATE}</td>
                                <td className="stageViewTitle">组团数量</td>
                                <td className="stageViewCon">{th.GROUPNUMBER}</td>
                            </tr>
                            <tr>
                                <td className="stageViewTitle">推盘批次</td>
                                <td className="stageViewCon">{th.PUSHPLATENUMBER}</td>
                                <td className="stageViewTitle"></td>
                                <td className="stageViewCon"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>);
    }
}
export default StageInforView;