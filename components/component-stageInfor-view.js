/* 分期信息*/
import React from 'react';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
import "../../Content/css/view.less";

class StageInforView extends React.Component {
    constructor(arg) {
        super(arg);
        this.state ={
            "versionId":this.props.versionId,
            "projectid":this.props.projectid,
            "reqtype":this.props.reqtype,
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
    }
    getAjax(callback) {
        let th=this;
        iss.ajax({  //获取数据
            type: "post",
            url:"/Stage/IGetInitInfo",
            data: {
                projectId:th.state.projectid,
                Id:th.state.versionId,
                reqtype:th.state.reqtype,
            },
            success(res) {
                //console.log(res.rows);
                let STAGESELFPRODUCTS=res.rows.BaseFormInfo.STAGESELFPRODUCTS,
                    ISELFPRODUCTTYPE=res.rows.SelectOptions.ISELFPRODUCTTYPE,
                    str=STAGESELFPRODUCTS.join(",");
                let valFilter=[];
                ISELFPRODUCTTYPE.forEach(function(obj){
                     if(str.indexOf(obj.val)>-1){
                        valFilter.push(obj.label);
                     }
                })
                let MERGEWAY=res.rows.SelectOptions.MERGEWAY,
                    MERGEWAYSTR=res.rows.BaseFormInfo.MERGEWAY,
                    MERGEWAYVAL="";
                MERGEWAY.forEach(function(obj){
                    if(MERGEWAYSTR.indexOf(obj.val)>-1){
                        MERGEWAYVAL=obj.label;
                    }
               })
               
               let PLANSTAGE=res.rows.SelectOptions.PLANSTAGE,
               PLANSTAGESTR=res.rows.BaseFormInfo.PLANSTAGE,
               PLANSTAGEVAL="";
               PLANSTAGE.forEach(function(obj){
                        if(PLANSTAGESTR.indexOf(obj.val)>-1){
                            PLANSTAGEVAL=obj.label;
                        }
                    })

                let STATUS="";
                if(res.rows.BaseFormInfo.STATUS==""||res.rows.BaseFormInfo.STATUS==null){
                    STATUS="";
                }else{
                    STATUS=res.rows.SelectOptions.STATUS[res.rows.BaseFormInfo.STATUS].label;
                }

                let TRADERMODE="";
                if(res.rows.BaseFormInfo.TRADERMODE==""||res.rows.BaseFormInfo.TRADERMODE==null){
                    TRADERMODE="";
                }else{
                    TRADERMODE=res.rows.SelectOptions.TRADERMODE[res.rows.BaseFormInfo.TRADERMODE].label;
                }     
                
                let PROJECTTYPE="";
                if(res.rows.BaseFormInfo.PROJECTTYPE==""||res.rows.BaseFormInfo.PROJECTTYPE==null){
                    PROJECTTYPE="";
                }else{
                    PROJECTTYPE=res.rows.SelectOptions.PROJECTTYPE[res.rows.BaseFormInfo.PROJECTTYPE].label;
                }  
                
                let TAXINGWAY="";
                if(res.rows.BaseFormInfo.TAXINGWAY==""||res.rows.BaseFormInfo.TAXINGWAY==null){
                    TAXINGWAY="";
                }else{
                    TAXINGWAY=res.rows.SelectOptions.TAXINGWAY[res.rows.BaseFormInfo.TAXINGWAY].label;
                }

                    
                th.setState({
                    "CASENAME":res.rows.BaseFormInfo.CASENAME,//分期案名
                    "STAGENAME":res.rows.BaseFormInfo.STAGENAME,//分期名称
                    "PROJECTCOMPANYNAME":res.rows.BaseFormInfo.PROJECTCOMPANYNAME,//项目公司名称
                    "STAGEID":res.rows.BaseFormInfo.STAGEID,
                    "STAGECREATEDATE":res.rows.BaseFormInfo.STAGECREATEDATE,//分期创建日期
                    "STAGEUPDATEDATE":res.rows.BaseFormInfo.STAGEUPDATEDATE,//分期更新日期
                    "STARTDATE":res.rows.BaseFormInfo.STARTDATE,//启动开发时间
                    "STAGECODE":res.rows.BaseFormInfo.STAGECODE,//分期编码
                    "STATUS":STATUS,//分期状态
                    "ISELFPRODUCTTYPE":res.rows.BaseFormInfo.ISELFPRODUCTTYPE,
                    "TRADERMODE":TRADERMODE,//操盘方式
                    "MERGEWAY":MERGEWAYVAL,//并表方式
                    "PROJECTTYPE":PROJECTTYPE,//项目类型
                    "TAXINGWAY":TAXINGWAY,//项目计税方式
                    "PLANSTAGE":PLANSTAGEVAL,//计划管控阶段
                    "PROJECTID":res.rows.BaseFormInfo.PROJECTID,
                    "PROJECTNAME":res.rows.BaseFormInfo.PROJECTNAME,//项目名称
                    "ID":res.rows.BaseFormInfo.ID,
                    "PRINCIPALNAME":res.rows.BaseFormInfo.PRINCIPALNAME,
                    "PRINCIPAL":res.rows.BaseFormInfo.PRINCIPAL,
                    "GROUPNUMBER":res.rows.BaseFormInfo.GROUPNUMBER,//组团数量
                    "STAGEVERSIONID":res.rows.BaseFormInfo.STAGEVERSIONID,
                    "STAGESELFPRODUCTS":valFilter.join(","),//自持业态

                    //"TRADERMODE":res.rows.SelectOptions.TRADERMODE[res.rows.BaseFormInfo.Project.TRADERMODE].label,//操盘方式                    
                },arg=>{
                    //console.log(th.state)
                    if(callback){
                        callback();
                    }
                });
            },
            error(e) {

            }
        })
    }
    componentWillMount() {
        this.getAjax(arg=>{
            this.BIND_ONLOAD(); //加载分期总图，推盘图
            setTimeout(function(){
                document.getElementById('iframe2').src=$("#iframe2").attr("src");
            },3000);
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
        
    }//加载iframe url 分期总图，推盘图
    xmViewError(event){
        // this.attr("src","../img/xmViewError.png")
        $(event.target).attr("src","../../Content/img/xmViewError.png");
    }

    render() {
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
                                <td className="stageViewCon">{th.PROJECTCOMPANYNAME}</td>
                            </tr>
                            <tr>
                                <td className="stageViewTitle">项目负责人</td>
                                <td className="stageViewCon">{th.PRINCIPALNAME}</td>
                                <td className="stageViewTitle">权益比例</td>
                                <td className="stageViewCon">{th.equityTxt}</td>
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
                        </tbody>
                    </table>
                </div>
            </div>
        </div>);
    }
}
export default StageInforView;