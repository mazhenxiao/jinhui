/*分期信息栏 */
import "babel-polyfill";  //兼容ie
import React from 'react';
import ReactDOM from 'react-dom';
import "../js/iss.js";
import {shallowCompare,knife} from '../utils';
import GroupIframe from "./component-stagingInformation-groupIframe.js";
import PlateIframe from "./component-stagingInformation-plateIframe.js";
// import Abc from "xxx.js";
      
class StagingInformation extends React.Component {
    constructor(arg) {
        super(arg);
        this.state ={
        	"SEQNUM":0,
	        "CASENAME":"",
	        "STAGENAME":"",
          "PROJECTCOMPANYNAME":"",//项目公司名称id
          "PROJECTCOMPANYEMPNAME":"",//项目公司名称
	        "STAGECODE":"", //编码
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
            "PUSHPLATENUMBER":"",
	        "STAGECREATEDATE":"1900-01-01T00:00:00",
	        "STAGEUPDATEDATE":"1900-01-01T00:00:00",
	        "STARTDATE":"1900-01-01T00:00:00",
	        "mapUrl":iss.mapEUrl,
	        "iframeURL1":"",/*分期总图*/
	        "iframeURL2":"",/*推盘图*/
	        "checkName": false,   //分期名称冲突
	        "PROJECTID":this.props.projectId,/*项目id*/
          "STAGEVERSIONID":this.props.versionId,/*版本id*/
          "STAGEVERSIONIDOLD":this.props.versionOldId, //老版本id
	        "CITYID":"",/*城市id*/
	        "CITYNAME":"",/*城市name*/
	        "AREAID":"",/*区域id*/
	        "AREANAME":"",/*区域name*/
        }  

        this.tiem="";
        this.grupInfo=[];//组团数据  
        this.plateInfo = []//推盘数据
    }
    /*获取分期信息*/
    getAjax(callback){
        var th = this;
        let status=th.props.status;
        let versionId=th.state.STAGEVERSIONID;
        let versionOldId=th.state.STAGEVERSIONIDOLD;
        var reqtype;
        let json={};
        if(status=="edit"){
            json.Id=versionId;
            json.reqtype="Edit";
        }else if(status=="add"){
            json.projectId=th.state.PROJECTID;
            json.reqtype="Add";
        }else if(status=="upgrade"){
            json.versionId=versionOldId||versionId;
            json.reqtype="Upgrade";
        }
        iss.ajax({
            type:"post",
            url:"/Stage/IGetInitInfo",   
            data:json,
            success(res){
               //console.log(res.rows);  
               if(!res.rows){
                   //console.log("基本信息请求有问题");
                   return false;
                }
               var baseformInfo=res.rows.BaseFormInfo;
               /*获取到基本信息后，返回*/
                th.props.baseCallBack(baseformInfo);
                th.setState({
                	  "SEQNUM":baseformInfo.SEQNUM,/*分期排序字段*/
                    "CASENAME":baseformInfo.CASENAME||"",
                    "STAGENAME":baseformInfo.STAGENAME,
                    "PROJECTID":baseformInfo.PROJECTID,/*项目id*/
                    "PROJECTCOMPANYNAME":baseformInfo.PROJECTCOMPANYNAME,//项目公司名称id
                    "PROJECTCOMPANYEMPNAME":baseformInfo.PROJECTCOMPANYEMPNAME, //项目公司名称
                    "STAGEID":baseformInfo.STAGEID,
                    "STAGECREATEDATE":baseformInfo.STAGECREATEDATE,
                    "STAGEUPDATEDATE":baseformInfo.STAGEUPDATEDATE,
                    "STARTDATE":baseformInfo.STARTDATE,
                    "STAGECODE":baseformInfo.STAGECODE||"",
                    "STATUS":baseformInfo.STATUS,
                    "ISELFPRODUCTTYPE":baseformInfo.ISELFPRODUCTTYPE,
                    "TRADERMODE":baseformInfo.TRADERMODE,
                    "MERGEWAY":baseformInfo.MERGEWAY,
                    "PROJECTTYPE":baseformInfo.PROJECTTYPE,
                    "TAXINGWAY":baseformInfo.TAXINGWAY,
                    "PLANSTAGE":baseformInfo.PLANSTAGE,
                    "PROJECTNAME":baseformInfo.PROJECTNAME,
                    "ID":baseformInfo.ID,
                    "PRINCIPALNAME":baseformInfo.PRINCIPALNAME,
                    "PRINCIPAL":baseformInfo.PRINCIPAL,
                    "GROUPNUMBER":baseformInfo.GROUPNUMBER||0,
                    "PUSHPLATENUMBER":baseformInfo.PUSHPLATENUMBER||0,
                    "STAGESELFPRODUCTS":baseformInfo.STAGESELFPRODUCTS,
                    "CITYID":baseformInfo.CITYID,/*城市id*/
                    "CITYNAME":baseformInfo.CITYNAME,/*城市name*/
                    "AREAID":baseformInfo.AREAID,/*区域id*/
                    "AREANAME":baseformInfo.AREANAME,/*区域name*/
                    "ISINITDATA":baseformInfo.ISINITDATA,/*判断否是历史分期 返回1 为历史项目*/

                },arg=>{
                    //console.log(th.state)
                    th.bind_combobox(res);
                    if(callback){
                        callback();
                    };
                    if($("#STAGECREATEDATE").val()!=""){
                        $("#STAGENAME").attr("readonly","readonly");
                        $("#STAGENAME").addClass("inputGray");
                        $("#GROUPNUMBER").attr("readonly","readonly");
                        $("#GROUPNUMBER").addClass("inputGray");
                    };//审批通过()升级本部的分期不可修改

                });
								

            },
            error(e){   
 
            }
        });
    }
    componentDidMount() {  
            let th=this;
            let id=th.state.STAGEVERSIONID;
            if(id=="1E1CB1E95A864AFA961392C3E3644642"||!id){
                iss.hashHistory.replace({pathname:"index"});
            }else{
                $(function(){
                    th.getAjax(arg=>{
                        th.BIND_ONLOAD();
                        th.evValidInput();
                    });
                });
                
            }
        //  toolsTab.bindTab(this.props);//绑定头部标签
        
    }
    shouldComponentUpdate(nextProps, nextState){
        return shallowCompare(this, nextProps.planData, nextState.planData);
    }
    componentWillReceiveProps(nextProp){
        this.setState({
            STAGECODE:nextProp.STAGECODE
        })

    }
    //推盘划分
    BIND_OPENPlateIframe(){
        var th=this,data = this.plateInfo;
        let status = th.props.status;
        if(status=="add"){
        		iss.popover({ content: "请先暂存分期信息"});
        		return false;
        }
        iss.Alert({
            title:"推盘划分",
            width:600,
            height:300,
            content:`<div id="PlateIframeBox"></div>`,
            okVal:"保存",
            cancel:"取消",
            ok(da){
                //console.log(th.plateInfo.state.dataList)
                var stageversionid = th.state.STAGEVERSIONID,
                    newPushPlate = [],
                    buildingPushPlateMapping = [],
                    valueNumber=[],
                    deletePushPlate=[],
                    newPushPlateNumber=[];
                th.plateInfo.state.dataList.map((el,ind) =>{
                    if(el.delete == 'del'){
                        if(deletePushPlate.indexOf(el.pushPlateId) == -1 && el.pushPlateId != null){
                            deletePushPlate.push(el.pushPlateId)
                            el.pushPlateId = null;
                        }
                    }
                    if(el.pushPlateId != null && el.pushPlateNumber !=0 && el.buildingId !=null || el.newPush == "newPush"){
                        var nGn = {
                            "key":el.pushPlateId,
                            "value":el.pushPlateNumber
                        }
                        newPushPlateNumber.push(nGn)
                    }
                    
                    if(el.delete == null || el.delete == ""){
                        var oldG = {
                            "key": el.buildingId,
                            "value": el.pushPlateId
                        }
                        buildingPushPlateMapping.push(oldG)
                    }
                    
                    
                    if(valueNumber.indexOf(el.pushPlateNumber) == -1){
                        valueNumber.push(el.pushPlateNumber)
                        //console.log(valueNumber)
                        if(el.current == "new" && el.pushPlateNumber != 0){
                            var newG = {
                                "key": el.pushPlateId,
                                "value": el.pushPlateNumber
                            }
                            newPushPlate.push(newG)
                        }
                        if(el.buildingId && el.pushPlateId && el.pushPlateNumber !=0 && el.delete ==""){
                            var newG = {
                                "key": el.pushPlateId,
                                "value": el.pushPlateNumber
                            }
                            newPushPlate.push(newG)
                        }
                    }
                })
                let json = {
                    "stageversionid":stageversionid,
                    "newPushPlate":newPushPlate,
                    "buildingPushPlateMapping":buildingPushPlateMapping,
                    "deletePushPlate":deletePushPlate,
                    "newPushPlateNumber":newPushPlateNumber
                }
               //console.log(json)
                iss.ajax({
                    url: "/Stage/ISavePushPlateMapping",
                    data:json,
                    success(data) {
                        th.setState({
                            "PUSHPLATENUMBER":Math.max.apply(null, valueNumber)
                        })
                    },
                    error() {
                        console.log('失败')
                    }
                })
            },
            cancel(){}
        })
        ReactDOM.render(<PlateIframe  data={data} callback={th.PlateIframeCallback.bind(this)}  versionId = {th.state.STAGEVERSIONID} />,document.querySelector("#PlateIframeBox"));
    }
    
    //组团划分
    BIND_OPENGroupIframe(){
        var th=this,data = this.grupInfo;
        let status = th.props.status;
        if(status=="add"){
        		iss.popover({ content: "请先暂存分期信息"});
        		return false;
        }
        iss.Alert({
            title:"组团划分",
            width:600,
            height:300,
            content:`<div id="GroupIframeBox"></div>`,
            okVal:"保存",
            cancel:"取消",
            ok(da){
                var stageversionid = th.state.STAGEVERSIONID,
                    newGroup = [],
                    buildingGroupMapping = [],
                    valueNumber=[],
                    deleteGroup=[],
                    newGroupNumber=[];
                th.grupInfo.state.dataList.map((el,ind) =>{
                    if(el.delete == 'del'){
                        if(deleteGroup.indexOf(el.groupId) == -1){
                            deleteGroup.push(el.groupId)
                            el.groupId = null;
                        }
                    }
                    if(el.groupId != null && el.groupnumber != 0){
                        var nGn = {
                            "key":el.groupId,
                            "value":el.groupnumber
                        }
                        newGroupNumber.push(nGn)
                    }
                    
                    
                    if(el.current == "new" && el.groupnumber != 0){
                        var newG = {
                            "key": el.groupId,
                            "value": el.groupnumber
                        }
                        newGroup.push(newG)
                    }
                    if(el.buildingId != null && el.groupId != null){
                        var oldG = {
                            "key": el.buildingId,
                            "value": el.groupId
                        }
                        buildingGroupMapping.push(oldG)
                    }
                    
                    if(valueNumber.indexOf(el.groupnumber) == -1){
                        valueNumber.push(el.groupnumber)
                    }
                })
                let json = {
                    "stageversionid":stageversionid,
                    "newGroup":newGroup,
                    "buildingGroupMapping":buildingGroupMapping,
                    "deleteGroup":deleteGroup,
                    "newGroupNumber":newGroupNumber
                }
                //console.log(json)
                iss.ajax({
                    url: "/Stage/ISaveGroupBuildingMapping",
                    data:json,
                    success(data) {
                        th.setState({
                            "GROUPNUMBER":Math.max.apply(null, valueNumber)
                        })
                    },
                    error() {
                        console.log('失败')
                    }
                })
            },
            cancel(){

            }
        })
        ReactDOM.render(<GroupIframe  data={data} callback={th.GroupIframeCallback.bind(this)}  versionId = {th.state.STAGEVERSIONID} />,document.querySelector("#GroupIframeBox"));
    }
    GroupIframeCallback(da){
        this.grupInfo=da;
    }
    PlateIframeCallback(da){
        this.plateInfo=da;
    }
    BIND_CHECK_INPUT(name){ //检查非法查询
        var reg = /[^\u4e00-\u9fa5\w\d\_\-]/ig;
        return name==""? false:reg.test(name);
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
            	  let src_one="";
            	  let src_two="";
                if(res["rows"]==0){
                		src_one="/Content/img/xmViewError.png";
                		src_two="/Content/img/xmViewError.png";
                    
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
    }
    
    
    /* */
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
            title:"选择人员<i class='fontRed'>（双击选择人员）</i>",
            pepole:peopleJson,  //已选人员名单
            callback(da){
                //console.log(da);
                if(Object.keys(da).length==0||!da){
                    th.setState({ 
                        "PRINCIPAL":"",
                        "PRINCIPALNAME":"",
                    })
                }else{
                    for(let key in da){
                        //console.log(da[key]);
                        th.setState({ 
                            "PRINCIPAL":da[key].id,
                            "PRINCIPALNAME":da[key].text,
                        });
                        th.BIND_CHANGE_DATA(th.state);
                    }
                }
                th.evValidForm();
            }
        })
    }
    handChooseToProjectName(da){ //弹层选择项目公司名称
        let th=this;
        let peopleJson={};
        let PrincipalId={
            "id":th.state.PROJECTCOMPANYNAME,
            "text":th.state.PROJECTCOMPANYEMPNAME
        }
        if(th.state.PROJECTCOMPANYNAME){
            peopleJson['PrincipalId']=PrincipalId;
        }
        iss.chooseTo({
            url:"/Stage/IGetSelectUserViewList",
            title:"选择项目公司名称<i class='fontRed'>（双击选择项目公司）</i>",
            pepole:peopleJson,  //已选项目公司名称
            searchURL:"/Stage/IGetSelectUserViewList",
            callback(da){
               
                if(Object.keys(da).length==0||!da){
                    th.setState({ 
                        "PROJECTCOMPANYNAME":"",
                        "PROJECTCOMPANYEMPNAME":"",
                    })
                }else{
                    for(let key in da){
                        //console.log(da[key]);
                        th.setState({ 
                            "PROJECTCOMPANYNAME":da[key].id,
                            "PROJECTCOMPANYEMPNAME":da[key].text,
                        });
                        th.BIND_CHANGE_DATA(th.state);
                    }
                }
                th.evValidForm();
            }
        })
    }
    handleInputTextChange (e) {
        var th = this;
        let target = e.target.id;
        //console.log(len);
      /*   if(this.BIND_CHECK_INPUT(e.target.value)){ //检查特殊字符
            return
        } */
        if(e.target.getAttribute("data-type")&&e.target.getAttribute("data-type").indexOf("number")>=0){
            var max = e.target.getAttribute("data-max")||"",min=e.target.getAttribute("data-max")||"",
                numreg = /^[1-9]\d*$/ig;
                if(!numreg.test(e.target.value)&&e.target.value!=""){ 
                    return
                }else if(max){
                  if(parseFloat(e.target.value)>parseFloat(max)){ return }
                }else if(min){
                    if(parseFloat(e.target.value)<parseFloat(min)){ return }
                }
        }
         this.setState({
           [target]: target=="GROUPNUMBER"? (e.target.value.trim()||0):e.target.value.trim(), // 将表单元素的值的变化映射到state中
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
        //console.log(arg.rows.SelectOptions.STATUS);
        var th = this;
        let installmentState = $("#STATUS");//分期状态
        installmentState.combobox({
            valueField: "val",
            textField: "label",
            editable: false,
            readonly: false,
            required:true,
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
            editable: false,
            readonly: false,
            required:true,
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
            selfSustaining.combobox("setValues",[""]);
        }else{
            selfSustaining.combobox("setValues",arg.rows.BaseFormInfo.STAGESELFPRODUCTS);
        }
        let tradersWay = $("#TRADERMODE");//操盘方式
        tradersWay.combobox({
            valueField: "val",
            textField: "label",
            editable: false,
            required:true,
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
            editable: false,
            required:true,
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
            editable: false,
            readonly: false,
            required:true,
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
            editable: false,
            readonly: false,
            required:true,
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
            editable: false,
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
        let projectid=th.state.PROJECTID;
        let name=ev.target.value;
        if(this.BIND_CHECK_INPUT(name)){ //检查特殊字符
            return
        }
        th.setState({
            STAGENAME:name
        });
        //clearTimeout(th.time);
        //th.time = setTimeout(arg=>{
            iss.ajax({
                type:"POST",
                url:"/Stage/ICheckStageName",
                data:{
                    projectid:projectid,
                    name:name,
                },
                success:function (data) {
                    if(data["rows"]==false){
                    	  th.setState({
								            STAGENAME:""
								        });
                        iss.popover({ content: "该分期名称已存在，请重新输入" });
                    }
                    th.BIND_CHANGE_DATA(th.state);
                },
                error:function (e) {
                }
            });
        //},500);
       
    }
    xmViewError(event){
        // this.attr("src","../img/xmViewError.png")
        $(event.target).attr("src","/Content/img/xmViewError.png");
    }
    BIND_EditStage(){
        let th = this;
        let status = th.props.status;
        let projectId=th.state.PROJECTID;/*项目id*/
	      let versionId=th.state.STAGEVERSIONID;/*版本id*/
        if(status=="add"){
        		iss.popover({ content: "请先暂存分期信息"});
        		return false;
        }
        var mapSrc=iss.mapEUrl+"/Admin/EditStage?stage_id="+versionId+"&stage_map_id=stage"+versionId;
        iss.evRereshMapCookie(th,mapSrc,"stage");
        /*if($.trim(th.state.STAGENAME)) {
            iss.Alert({
                title: "提示",
                width: 300,
                height: 90,
                content: `<div class="Alert">确认保存项目信息数据并上传编辑分期总图?</div>`,
                ok() {
                    th.props.save(arg => {
                        if (status == "add") {
                            window.open(th.state.mapUrl+"/Admin/EditStage?stage_id="+th.state.STAGEVERSIONID+"&stage_map_id=stage"+th.state.STAGEVERSIONID);
                        } else {
                            window.open(th.state.mapUrl+"/Admin/EditStage?stage_id="+th.state.STAGEVERSIONID+"&stage_map_id=stage"+th.state.STAGEVERSIONID);
                        }
                    })
                            
                }
            })
                        
        } else {
            iss.popover({ content: "请输入分期名称" });
        }*/

    }//上传编辑分期总图
    BIND_EditPushPlate(){
        let th = this;
        let status = th.props.status;
        let projectId=th.state.PROJECTID;/*项目id*/
	      let versionId=th.state.STAGEVERSIONID;/*版本id*/
        if(status=="add"){
        		iss.popover({ content: "请先暂存分期信息"});
        		return false;
        }
        var mapSrc=iss.mapEUrl+"/Admin/EditPushPlate?stage_id="+versionId+"&stage_map_id=stage"+versionId;
        iss.evRereshMapCookie(th,mapSrc,"stage");
        /*if ($.trim(th.state.STAGENAME)) {
            iss.Alert({
                title: "提示",
                width: 300,
                height: 90,
                content: `<div class="Alert">确认保存项目信息数据并上传编辑推盘图?</div>`,
                ok() {
                    th.props.save(arg => {
                        if (status == "add") {
                            window.open(th.state.mapUrl+"/Admin/EditPushPlate?stage_id="+th.state.STAGEVERSIONID+"&stage_map_id=stage"+th.state.STAGEVERSIONID);
                        } else {
                            window.open(th.state.mapUrl+"/Admin/EditPushPlate?stage_id="+th.state.STAGEVERSIONID+"&stage_map_id=stage"+th.state.STAGEVERSIONID);
                        }
                    })
                            
                }
            })
                        
        } else {
            iss.popover({ content: "请输入分期名称" });
        }*/
        
    }//上传编辑推盘图
    BIND_mapsStage(){
        window.open(iss.mapEUrl+"/Map/Stage?stage_id="+this.state.STAGEVERSIONID+"&stage_map_id=stage"+this.state.STAGEVERSIONID);
    }//点击分期总图预览
    BIND_mapsTp(){
        window.open(iss.mapEUrl+"/Map/PUSHPLATE?stage_id="+this.state.STAGEVERSIONID+"&stage_map_id=stage"+this.state.STAGEVERSIONID);
    }//点击推盘图预览
     /*验证input*/
   evValidInput(){
   	$(".stage-validatebox").each(function(index,ele){
   			var eleDom=$(ele);
   			var valideRule={
            required: true
        };
        eleDom.validatebox(valideRule);
   	});
   }
   /*验证form*/
  evValidForm(){
  	var isValid=$("#stageInforForm").form("validate");
  	//console.log(isValid);
  	return isValid;
  }
    render() {
        let th=this;
        let STAGECREATEDATE=th.state.STAGECREATEDATE=="1900-01-01T00:00:00"?"":this.state.STAGECREATEDATE.split("T")[0];
        let STAGEUPDATEDATE=th.state.STAGEUPDATEDATE=="1900-01-01T00:00:00"?"":this.state.STAGEUPDATEDATE.split("T")[0];
        let STARTDATE=th.state.STARTDATE=="1900-01-01T00:00:00"?"":this.state.STARTDATE.split("T")[0];
        return <article className="staging-box">
                <section className="staging-left boxSizing projectinFormation">
                <form id="stageInforForm">
                    <table className="formTable" width="100%">
                            <tbody>
                                <tr>
                                    <th>
                                        <label className="formTableLabel boxSizing">项目名称</label>
                                    </th>
                                    <td>
                                        <input readOnly="true" id="PROJECTNAME" value={this.state.PROJECTNAME||""} className="inputTextBox inputGray boxSizing" type="text"  />
                                    </td>
                                    <th>
                                        <label className="formTableLabel boxSizing redFont">分期名称</label>
                                    </th>
                                    <td>
                                        <input  onBlur={this.BIND_CHECKPROJECTNAME.bind(this)} onChange={this.handleInputTextChange.bind(this)} id="STAGENAME" value={this.state.STAGENAME||""} className="inputTextBox boxSizing stage-validatebox" type="text" maxLength="20" />
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        <label className="formTableLabel boxSizing redFont">分期案名</label>
                                    </th>
                                    <td>
                                        <input onChange={this.handleInputTextChange.bind(this)} id="CASENAME" value={this.state.CASENAME||""} className="inputTextBox boxSizing stage-validatebox" type="text" maxLength="20" />
                                    </td>
                                    <th>
                                        <label className="formTableLabel boxSizing">分期编码</label>
                                    </th>
                                    <td>
                                        <input readOnly="true" id="STAGECODE" value={th.state.STAGECODE} className="inputTextBox inputGray boxSizing" type="text" />
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        <label className="formTableLabel boxSizing redFont">分期状态</label>
                                    </th>
                                    <td>
                                        <input type="text" id="STATUS" className="easyui-combobox easyui-validatebox" data-options="validType:'selected'"/>
                                    </td>
                                    <th>
                                        <label className="formTableLabel boxSizing redFont">自持业态</label>
                                    </th>
                                    <td>
                                        <input type="text" id="STAGESELFPRODUCTS"  className="easyui-combobox easyui-validatebox" data-options="validType:'selected'"/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        <label className="formTableLabel boxSizing redFont">操盘方式</label>
                                    </th>
                                    <td>
                                        <input type="text" id="TRADERMODE" className="easyui-combobox easyui-validatebox" data-options="validType:'selected'"/>
                                    </td>
                                    <th>
                                        <label className="formTableLabel boxSizing redFont">项目公司名称</label>
                                    </th>
                                    <td>
                                        <input readOnly="true" onClick={this.handChooseToProjectName.bind(this)} id="PROJECTCOMPANYNAME" value={this.state.PROJECTCOMPANYEMPNAME||""} className="inputTextBox boxSizing stage-validatebox" type="text" />
                                    </td>
                                </tr>
                                <tr>
								    <th>
                                        <label className="formTableLabel boxSizing redFont">项目负责人</label>
                                    </th>
								    <td>
                                        <input readOnly="true" onClick={this.handChooseTo.bind(this)} id="PRINCIPALNAME" value={this.state.PRINCIPALNAME||""}  className="inputTextBox boxSizing stage-validatebox" type="text" />
                                        <img className="symbol headIcon" src="/Content/img/head-icon.png" />
                                    </td>
								    <th>
                                        <label className="formTableLabel boxSizing">权益比例</label>
                                    </th>
                                    <td>
                                        <input readOnly="true" id="equityTxt" value={this.props.equityTxt} className="inputTextBox inputGray boxSizing" type="text" />
                                    </td>
								</tr>	
								<tr>    
									    <th>
                                            <label className="formTableLabel boxSizing redFont">并表方式</label>
                                        </th>
										<td>   
                                            <input  type="text" id="MERGEWAY" className="easyui-combobox easyui-validatebox" data-options="validType:'selected'"/>
										</td>	
							    		<th>
                                            <label className="formTableLabel boxSizing redFont">项目类型</label>
                                        </th>
								    	<td>
                                            <input type="text" id="PROJECTTYPE" className="easyui-combobox easyui-validatebox" data-options="validType:'selected'"/>
								    	</td>	
								    	
								</tr>  
								    <tr>
                                        <th>
                                            <label className="formTableLabel boxSizing redFont">项目计税方式</label>
                                        </th>
								    	<td>
                                            <input type="text" id="TAXINGWAY" className="easyui-combobox easyui-validatebox" data-options="validType:'selected'"/>
								    	</td>	
                                        <th>
                                            <label className="formTableLabel boxSizing">分期创建日期</label>
                                        </th>
										<td>
                                            <input readOnly="true" id="STAGECREATEDATE" value={STAGECREATEDATE} className="inputTextBox inputGray boxSizing" type="text" />    
                                        </td>	
							    		
								    </tr>
								    <tr>
                                        <th>
                                            <label className="formTableLabel boxSizing">分期更新日期</label>
                                        </th>
							    		<td>
                                            <input readOnly="true" id="STAGEUPDATEDATE" value={STAGEUPDATEDATE} className="inputTextBox inputGray boxSizing" type="text" /> 
                                        </td>	
                                        <th>
                                            <label className="formTableLabel boxSizing">分期总图</label>
                                        </th>
								    	<td>
                                        <button type="button" onClick={this.BIND_EditStage.bind(this)} className="btn btnStyle uploadIconBtn">上传/标记组团、楼栋</button>
                                        </td>	
								    	<th style={{"display":"none"}}>
                                            <label className="formTableLabel boxSizing">计划管控阶段</label>
                                        </th>
								    	<td style={{"display":"none"}}>
                                            <input readOnly="true" type="text" id="PLANSTAGE" />
								    	</td>	
								    </tr>
								    
								    <tr>
                                        <th style={{"display":"none"}}>
                                            <label className="formTableLabel boxSizing">启动开发时间</label>
                                        </th>
							    		<td style={{"display":"none"}}>
                                            <input readOnly="true" id="STARTDATE" value={STARTDATE} className="inputTextBox inputGray boxSizing" type="text" />    
                                        </td>	
								    	
								    </tr>
                                    <tr>
                                        <th>
                                            <label className="formTableLabel boxSizing redFont">组团数量</label>
                                        </th>
                                        <td>
                                            <input data-type="number" readOnly="true" disabled="disabled" data-max="10" data-min="1" id="GROUPNUMBER" value={this.state.GROUPNUMBER||1} className="inputTextBox boxSizing stage-validatebox" type="text" maxLength="4" />
                                            <input onClick={this.BIND_OPENGroupIframe.bind(this)} className='btn btnStyle uploadIconBtn' value='组团划分' type='button' />  
                                            {/* <input onChange={this.handleInputTextChange.bind(this)} data-type="number" data-max="10" data-min="1" id="GROUPNUMBER" value={this.state.GROUPNUMBER||""} className="inputTextBox boxSizing stage-validatebox" type="text" maxLength="4" /> */}
                                        </td>
                                        <th>
                                            <label className="formTableLabel boxSizing">推盘图</label>
                                        </th>
								    	<td>
                                        <button type="button" onClick={this.BIND_EditPushPlate.bind(this)} className="btn btnStyle uploadIconBtn">标记推盘批次</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <label className="formTableLabel boxSizing redFont">推盘批次</label>
                                        </th>
                                        <td>
                                            <input data-type="number" readOnly="true" disabled="disabled" data-max="10" data-min="1" id="PUSHPLATENUMBER" value={this.state.PUSHPLATENUMBER||1} className="inputTextBox boxSizing stage-validatebox" type="text" maxLength="4" />
                                            <input onClick={this.BIND_OPENPlateIframe.bind(this)} className='btn btnStyle uploadIconBtn' value='推盘划分' type='button' />  
                                        </td>
                                    </tr>
                            </tbody>
                    </table>   
                    </form>
                </section>
                <section className="staging-right boxSizing fieldLocation fl">
                    {/* bootstrap 轮播图 */}
                    <div id="myCarousel" className="carousel slide carouselStyle">
                        <div className="carousel-inner">
                            <div className="item active">
                                <img className="fullScreenIcon" src="/Content/img/fullScreen.png" onClick={this.BIND_mapsStage.bind(this)} title="全屏" />
                                <iframe ref="iframe1" id="iframe1" src={this.state.iframeURL1}    onError={this.xmViewError.bind(this)} frameBorder="0" marginHeight="0" marginWidth="0" scrolling="no" width="100%" height="291"></iframe>
                                
                            </div>
                            <div className="item">
                                <img className="fullScreenIcon" src="/Content/img/fullScreen.png" onClick={this.BIND_mapsTp.bind(this)}  title="全屏" />
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
                </section>
                <div className="clear"></div>
        </article>
    }

}
export default StagingInformation;