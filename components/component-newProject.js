import React from 'react';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
import NewProjectCount from "./component-newProject-count.js";
import DynamicTable from "./tools-dynamicTable.js";
import {Project} from '../services';
import NewProjectTime from "./component-newProject-time.js"
import "../css/tools-dynamicTable.less";//专用css
 import Peripheral from "./component-newProject-peripheral.js";//外设条件 

/*
    pdi id   DynamicData  结构数据 CallBack 数据修改回调
  <DynamicTable pid={this.state.pid} DynamicData={this.state.propsDATA} CallBack={this.BIND_CALLBACK.bind(this)} /> 
 */
class NewProject extends React.Component {
    constructor(arg) {
        super(arg);
        this.state = {
            newDynamicData: {},//空数据
            DynamicData: {},//已存在数据
            propsDATA: [],//显示数据
            CountData: [],//统计
            pid: "",
            projectId: "",/*项目id*/
            states: false,
            countText: "统计数据过期",
            NewProjectCountDATA: {},//基础数据
            status: "show",
            currentID: "",//当前地块id
            PeripheralDATA: [],//外设地块
            PeripheralFirst: ""//外设地块用于新增
        }
        /* iss["id"]=iss.id||{};
        iss.id["id"]=iss.id["id"]||{}; */
      

        // this.guid = this.props.location.query["status"]=="add"? iss.guid():iss.id.id;



        this.time = "";//延时变量
        this.firstData = [];//初始化数据
        this.child1 = "";//子集指针

      
    }
    componentWillMount() {
        
        let th = this;
        let local = th.props.location;
        let status = local.query["status"];
        let dataKey = local.query["dataKey"]; //local.query["dataKey"];
        let projectId = "";
        if (local.query["status"]) {
            if (dataKey) {
                projectId = dataKey;
            } else if (status == "add") {
                projectId = iss.guid();
            } else {
                projectId = iss.id.id;
            }

            th.setState({
                status: status,
                projectId: projectId,
            });
            // console.log("项目ID");
            // console.log(projectId);
        }
        sessionStorage.removeItem(`$$dataKey-${projectId}-static`);
        sessionStorage.removeItem(`$$dataKey-${projectId}-dynamic`);
    }
    componentDidMount() {
        let th = this;
        th.BIIND_FIST_LAND(); //获取地块信息
    }

    //=====================================================地块外设条件
    EVENT_CLICK_PERIPHERAL() { //点击外设条件
        //window.open("/Home/MYTodo/","mytodo",`width=800,height=400,location=0,toolbar=0,status=0,top=50%,left=50%`);
        var th = this;
        let ele = iss.Alert({
            title: "外设地块",
            width: 800,
            height: 400,
            content: `<div class="iframeBox" style="height:400px;overflow:hidden"><iframe id="iframeBoxI" src='/MYTodo/#/peripheral?dataKey=${th.state.projectId}&currentID=${this.state.pid}' width='100%' height='400' frameborder=0  /></div>`,
            okVal: "确定",
            ok(arg) {
                var win = document.querySelector("#iframeBoxI").contentWindow;
                win["iframeCallback"] && win["iframeCallback"](th, ele);//点击ok调用子页面
                return false;
            }
        });

    }


    //=========================================================新增地块统计地块===============
    BIND_NewProjectCountDATA(data) {  //NewProjectCountDATA={this.BIND_NewProjectCountDATA.bind(this)}

        this.setState({
            NewProjectCountDATA: data
        });
    }
    BIND_CHECKINewLand(da) { //地块初次获取到以后检查是否合法，解决
        let _da = da.map((el, ind) => {
            el.FieldList.forEach((ee, ii) => {
                let reg = eval(`(${ee.regExp})`), val = "";
                if (reg && reg.type.indexOf("number") >= 0) {
                    val = (new Function("return " + ee.val))() || 0;
                    if (reg.max && (val > (eval(reg.max)))) { //如果当前值大于传入限制最大值
                        ee.test.check = false;
                    }
                    if (reg.min && (val < (eval(reg.min)))) {
                        ee.test.check = false;
                    }
                } else if (reg && reg.type == "string") {
                    val = ee.val || "";
                    if (reg && reg.max && val.length > reg.max) {
                        ee.test.check = false;
                    }
                    if (reg && reg.min && val.length < reg.min) {
                        ee.test.check = false;
                    }
                }

            })
            return el;
        })
        return _da
    }
    BIIND_FIST_LAND() {  //获取已有地块
        //if (iss.id == "") { return }

        let th = this;
        let id = th.state.projectId;//"A91BB3051A0848319B45D3D527AC4103" //this.props.location.state.id;
        let INewLand = new Promise((resolve, reject) => {
            iss.ajax({
                url: "/Project/INewLand",  //初次请求创建空地块使用
                data: { projectId: id },
                success(d) {
                    resolve("INewLand");
                    if (d["rows"]) {
                        th.state.states = true;
                        th.setState({
                            newDynamicData: JSON.stringify(d["rows"])
                        });
                    }
                },
                error(e) {
                    reject(e);
                }
            });
        });
        let IProjectLandsInfo = new Promise((resolve, reject) => {
            iss.ajax({  //获取已有地块
                url: "/Project/IProjectLandsInfo",
                data: { projectId: id },
                success(d) {
                    resolve("IProjectLandsInfo");
                    if (d.rows) {

                        var da = {};
                        th.BIND_CHECKINewLand(d.rows).forEach((el, ind) => {
                            
                            if (ind == 0) { //初次加载地块

                                th.setState({
                                    pid: el["LandId"],
                                    propsDATA: el["FieldList"]
                                });
                                // THIS.BIND_CreatExternal("search",el["LandId"]);//外设条件显示设置
                            }
                            da[el.LandId] = el;
                        });

                        th.setState({
                            DynamicData: da
                        }, arg => {
                            th.BIND_LAND_BTN();
                        });

                    }
                },
                error() {
                    reject();
                }
            })
        })


        //Project/ILandsStatistics  土地动态统计
        let ILandsStatistics = new Promise((resolve, reject) => {
            iss.ajax({
                url: "/Project/ILandsStatistics",
                success(a) {

                    if (a["rows"]) {
                        th.setState({
                            CountData: a["rows"]
                        }, arg => {
                            resolve("ILandsStatistics")
                        });
                    }
                },
                error(e) { reject(e) }
            })
        });
        Promise.all([INewLand, IProjectLandsInfo, ILandsStatistics])
            .then(arg => {
                //console.log("all");
                th.BIND_COUNT_GETMAP();//创建地块button
            })
            .catch(error => {
                iss.message({
                    type: "error",
                    title: "错误",
                    content: error
                })
            })

    }

    EVENT_CLICK_NEWLAND() { //新增地块
        let th = this, nd = JSON.parse(this.state.newDynamicData);
        if (this.state.states) {
            // this.DynamicData["pid"]=iss.guid();
            let guid = iss.guid();
            this.state.DynamicData[guid] = { LandId: guid, FieldList: nd }; //向数据树添加一条数据
            //先手动修改后面让后台去修改数据库
          /*    nd.forEach((ele,ind)=>{
                if(ele.id=="LANDCODE"){
                    ele.regExp=`{
                        type:"regExp",
                        regExp:"^[A-Za-z]{1}$"
                    }`
                }
            })  */
            this.setState({
                propsDATA: nd,  //新增地块
                pid: guid
            });
            //  this.BIND_CreatExternal("add",guid);

        }
    }
    EVENT_CLICK_LANDBTN(id, e) { //切换地块
        // console.log(this.state.DynamicData[id]["data"]);

        let self = $(e.target), pa = self.parent();
        if (self.hasClass("icon-delete")) { return }
        pa.find("li").removeClass("active");
        self.addClass("active");
        this.setState({
            pid: id,
            propsDATA: this.state.DynamicData[id]["FieldList"]
        }, arg => {

        });
        // this.BIND_CreatExternal("search",id);

    }
    SET_PARENTCOUNT(list, d) {  //地块计算
        let da = {};
        let data = list.forEach((el, ind) => {
            let numreg = (/number\((\d+)\)/).exec(el.regExp || "");
            let fixed = numreg ? numreg[1] : "";
            for (var i in d.parent) {
                if (el.id == i) {
                    let exec = el.exec;
                    let reg = /{.*?}/ig;
                    let arr = exec.match(reg);
                    if (arr) {
                        arr.forEach((ee, ii) => {
                            let regs = new RegExp(`${ee}`, "ig");
                            exec = exec.replace(regs, parseFloat(el.child[ee.replace(/[{}]/ig, "")].val || 0))
                        });
                        let _exec = eval(exec) || 0;
                        if (fixed) { _exec = parseFloat(_exec).toFixed(fixed) }
                        el.val = _exec == Infinity ? "0" : _exec;
                        return;
                    }


                }
            }
        })
        return
    }
    BIND_CALLBACK(da, e) { //子页面返回callback
        // if(this.time){ clearTimeout(this.time) }
        var th = this;
        var el = e ? e.target.value : da.val, list = this.state.DynamicData[this.state.pid];
        list.FieldList.forEach((d, i) => {
            if (da.id == d.id) {
                d["val"] = el;
                d["test"] = da["test"];
                if (d["parent"]) {
                    th.SET_PARENTCOUNT(list.FieldList, d)
                }

                return
            }

        })
        this.setState({
            propsDATA: list.FieldList
        });

        // th.time=setTimeout(arg=>{
        th.BIND_COUNT_GETMAP();
        //},1000);

    }
    BIND_VALID_DATA() {//地块数据检查
        var th = this, valid = true;
        let list = th.state.DynamicData, str = "", num = 0;
        for (var i in list) {
            num += 1;
            let msg = "";
            list[i]["FieldList"].forEach((el, ind) => {


                if (el["edit"].indexOf("+m") >= 0 && !el["val"]) {
                    valid = false;
                    msg += el.label + ",";
                    return;
                }
                if (el["edit"].indexOf("+m") >= 0 && !el.test.check) {
                    valid = false;
                    msg += el.label + ",";
                    return;
                }
            })
            if (msg) {

                str += "【" + list[i]["name"] + "】地块数据";
            }
        }
        if (!num) { valid = false }
        if (str == "") {
            return [valid, "请添加地块"];
        } else {

            return [valid, "请检查：" + str.replace(/\,$/ig, "")];
        }

    }
    EVENT_CLICK_DELETE(id, ev) { //删除地块
        let data = this.state.DynamicData;
        let th = this;
        iss.Alert({
            title: "提示",
            width: 300,
            content: `<div class="Alert">是否删除地块</div>`,
            ok() {

                iss.ajax({
                    url: "/Project/ICheckLandUsed",
                    data: { landId: data[id]["LandId"] },
                    success(da) {
                        if (da["rows"] == false) {
                            delete data[id];
                            let fda = [], iii = 0, _id = "";
                            for (let v in data) {
                                if (iii == 1) { break; }
                                fda = data[v]["FieldList"]
                                _id = data[v]["LandId"]
                                iii += 1;
                            }

                            th.setState({
                                DynamicData: data,
                                propsDATA: fda,
                                pid: _id
                            }, arg => {
                                th.BIND_COUNT_GETMAP();
                            })

                        } else {
                            iss.popover({ content: da["message"] });
                        }
                    },
                    error() {

                    }
                })


                //  th.BIND_CreatExternal("delete",_id);
            },
            cancel() {

            }
        })

    }
    BIND_LAND_BTN() { //添加新增地块button
        let map = [], li = this.state.DynamicData, name = "新增地块", g = 0;
        // console.log(li)
        for (var i in li) {
            g += 1;
            for (var f = 0; f < li[i].FieldList.length; f++) {
                if (li[i].FieldList[f]["label"] == "地块名称") {
                    name = li[i].FieldList[f]["val"] || `新增地块${g}`;
                    li[i]["name"] = name;
                    break;
                }
            }

            map.push(<li className={li[i].LandId == this.state.pid ? "active" : ""} onClick={this.EVENT_CLICK_LANDBTN.bind(this, li[i].LandId)} key={g} data-id={li[i].LandId}>{name}<span className="icon-delete" onClick={this.EVENT_CLICK_DELETE.bind(this, li[i].LandId)}></span></li>)
        }


        return map;
    }
    BIND_COUNT_DATACALLBACK(da) { //地块统计

    }
    EVENT_CLICK_REFASH() { //刷新
        //this.BIND_COUNT_GETMAP(); //重新统计数据
    }
    BIND_COUNT_GETMAP() { //地块统计
        let da = this.state.CountData, th = this;
        //   var t = new Date().getTime();
        da.forEach((el, ind) => {
            let reg = /\{.*?\}[\+\-\*\/]/, regcount = /\{.*?\}/ig, arr = regcount.exec(el.exec || ""), list = th.state.DynamicData;
            let reg2 = /\<.*?\>[\+\-\*\/]/, regcount2 = /\<.*?\>/ig, arr2 = el.exec.match(regcount2), list2 = th.state.CountData;
            let numreg = (/number\((\d+)\)/).exec(el.regExp || "");
            let fixed = numreg ? numreg[1] : "";
            if (el.exec && !reg.exec(el.exec)) {
                if (arr && arr[0]) {
                    let _id = arr[0].replace(/[{}]/ig, ""), _str = [];
                    for (let v in list) {
                        list[v]["FieldList"].forEach((ee, ii) => {
                            if (ee["id"] == _id) {
                                _str.push(parseFloat(ee["val"] || 0));
                                return
                            }
                        })

                    }
                    let n_n = eval(_str.join("+")) || 0;
                    if (fixed) { n_n = parseFloat(n_n).toFixed(fixed) }
                    el.val = n_n == Infinity ? 0 : n_n;
                    return;
                } else if (el.exec && reg2.exec(el.exec)) {
                    let str = el.exec, nums = 0;
                    arr2.forEach((ee, ii) => {
                        let _id_ = ee.replace(/[\<\>]/ig, "");
                        list2.forEach((eee, iii) => {
                            if (eee.id == _id_) {
                                str = str.replace(ee, parseFloat(eee.val || 0));
                            }
                        })
                    });
                    let _n_n_ = eval(str) || 0;
                    if (fixed) { _n_n_ = parseFloat(_n_n_).toFixed(fixed) }
                    el.val = (_n_n_ == Infinity || !_n_n_) ? 0 : _n_n_;
                    return
                }
            }
        })
        th.setState({
            CountData: da
        })
        /*  var t2 = (new Date().getTime()-t)/1000;
         console.log(t2) */
    }
    //===================================================发起审批=========================
    /*发起审批*/
    EVENT_CLICK_POSTAPP() {
        let approvalTime= this.state.NewProjectCountDATA.APPROVETIME==undefined || "" || null ? "" : this.state.NewProjectCountDATA.APPROVETIME;
        let currentTime =(new Date().getTime())/1000;//此时此刻时间戳
        if(approvalTime!=""){
            approvalTime = new Date(Date.parse(approvalTime.replace(/-/g, "/")));
            approvalTime = approvalTime.getTime()/1000;//最迟解决时间时间戳
            let diffTime = currentTime-approvalTime;//时间差
            let mins5 = 5 * 60;//5分钟
            if(diffTime<mins5){
                return false;
            }
        }
        
        var th = this;
        let landInfoListJson = th.GET_DynamicData();
        var areaId = th.state.NewProjectCountDATA.CompanyAreaId;/*区域id*/
        var areaName = th.state.NewProjectCountDATA.CompanyAreaName;/*区域名字*/
        var newProjectStatus = iss.getEVal("newProjectStatus");
        iss.ajax({
            type: "POST",
            url: "/Project/ISave",
            data: {
                projectJson: JSON.stringify(this.state.NewProjectCountDATA),
                landInfoListJson: landInfoListJson,
                editType: "Submit",
            },
            success: function (data) {
                if (data.message == "成功") {
                    iss.hashHistory.push({
                        pathname: "/ProcessApproval",
                        search: `?e=${newProjectStatus}&dataKey=${th.state.NewProjectCountDATA.ID}&current=ProcessApproval&areaId=${areaId}&areaName=${areaName}`
                    });
                    $(window).trigger("treeLoad");
                } else {
                    iss.popover({ content: "发起审批失败" });
                }

            },
            error: function (er) {
                // console.log('错误');
            }
        });


    }
    BIND_SUBMITPRIMISE() {//路由跳转
        BIND_ROUTERCHANGE();
    }
    GET_DynamicData() { //获取提交地块数据
        let landInfoListJson = [], th = this;
        for (let vv in th.state.DynamicData) {
            landInfoListJson.push({
                "LandId": vv, "FieldList": th.state.DynamicData[vv]["FieldList"].map((el, ind) => {
                    delete el["parent"];
                    delete el["child"];
                    return el;
                })
            })

        }
        return JSON.stringify(landInfoListJson);
    }
    GET_projectNameCheck() {  //检查是重复名称

    }
    BIND_CHECKPROJECTNAME_Blur(ev) {  //失去焦点验证是否冲突
        var th = this;

        return new Promise((resolver, reject) => {
            let opt= this.state.NewProjectCountDATA;
            iss.ajax({
                type: "POST",
                url: "/Project/IProjectNameExists",
                data: {
                    cityId: opt.PARENTID,  //城市id
                    projectid: opt.ID,     //项目id
                    name: opt.PROJECTNAME, //项目名称
                },
                success: function (data) {
                    
                    if (data["rows"] == false) {
                        //th.BIND_CHANGE_DATA(th.state);
                        opt.checkName=true;
                       
                    } else {
                        opt.checkName=false;
                    }
                    resolver();

                },
                error: function (er) {
                    
                     opt.checkName=false;
                     reject();

                }
            });

        })




    }
    /*暂存*/
    EVENT_CLICK_SAVE(callback) {
        let approvalTime= this.state.NewProjectCountDATA.APPROVETIME==undefined || "" || null ? "" : this.state.NewProjectCountDATA.APPROVETIME;
        let currentTime =(new Date().getTime())/1000;//此时此刻时间戳
        if(approvalTime!=""){
            approvalTime = new Date(Date.parse(approvalTime.replace(/-/g, "/")));
            approvalTime = approvalTime.getTime()/1000;//最迟解决时间时间戳
            let diffTime = currentTime-approvalTime;//时间差
            let mins5 = 5 * 60;//5分钟
            if(diffTime<mins5){
                return false;
            }
        }
        var th = this;
        let landInfoListJson = th.GET_DynamicData();
        let status = th.state.status;
        let projectId = th.state.projectId;
        var da = th.state.NewProjectCountDATA;
        if (status == "add") {
            da.CREATETIME = new Date(); //项目创建时间
        }
        
        if (!($.trim(th.state.NewProjectCountDATA.CASENAME))){
            iss.popover({
                content: "请输入项目案名！"
            });
            return false;
        }
        if ($.trim(th.state.NewProjectCountDATA.PROJECTNAME) && th.state.NewProjectCountDATA.CITY) {
            if (status == "upgrade") {

            } else {
            
            }
        th.BIND_CHECKPROJECTNAME_Blur("检查项目名称").then(arg=>{
           
            if (!th.state.NewProjectCountDATA.checkName) {
                iss.popover({
                    content: "项目名称已存在请重新填写！"
                });
                 return
            }
                iss.ajax({
                    type: "POST",
                    url: "/Project/ISave",
                    data: {
                        projectJson: JSON.stringify(da),
                        landInfoListJson: landInfoListJson,
                        editType: "Save",
                    },
                    success: function (d) {
                        if (typeof callback == "function") {
                            callback();
                        }
                        let results = d;
                        if (results.message == "成功") {
                            
                            if (status == "add") {
                                th.getAjaxPerjectcode();
                                let localUrl = window.location.href;
                                let urlPath = localUrl.replace("status=add", "status=edit");
                                if (urlPath.indexOf("dataKey") < 0) {
                                    urlPath = urlPath + "&dataKey=" + projectId;
                                }
                                
                                th.setState({
                                    "status": "edit",
                                });
                                window.location.href = urlPath;
                                iss.popover({ content: "保存成功", type: 2 });
                                
                                

                                
                            }
                            iss.popover({ content: "保存成功", type: 2 });
                            $(window).trigger("treeLoad");
    
                        } else {
                            iss.popover({ content: "保存失败" });
                        }
    
                    },
                    error: function (e) {
                        //console.log('错误');
                    }
                });
            }).catch(err=>{})

          
        } else {
            iss.popover({
                content: "请输入项目名称和所在城市！"
            });
        }



    }
    getAjaxPerjectcode(){
        let th = this;
        let projectId = th.state.projectId;
        iss.ajax({
            type: "post",
            //url:"/Project/IProjectInfo",  
            url: "/Project/IProjectInfo",
            data: {
                projectId:projectId
            },
            //获取项目编码
            success(res) {
                th.setState({
                    projectCode:res.rows.BaseFormInfo.Project.PROJECTCODE
                })
            }
        })
    }
    BIND_ApprovalControlNode(self) {  //流程绑定回调
        this.NewProjectCount = self;
        this.BIND_ApprovalControlNode_EVENT = self.EVENT_CLICK_SUBMIT.bind(self);//绑定子集数据
    }
    BIND_ApprovalControlNode_EVENT() { //流程提交,重定向到审批流程

    }
    GET_CHECKED() {  //验证项目名称重复
        let th = this;
        let status = th.state.status;
        if (status == "edit") { //如果是编辑状态下项目名称没有变更，改变checkName为true
            if (th.refs.NewProjectCount.editProjectOldName != "" && th.refs.NewProjectCount.editProjectOldName == th.state.NewProjectCountDATA.PROJECTNAME) {
                th.state.NewProjectCountDATA.checkName = true;
            }
        }
        if (!th.state.NewProjectCountDATA.checkName) {
            if (status == "add" || status == "edit") {
                iss.popover({
                    content: "项目名称重复请更正。"
                })
                return false;
            };
        }
        if (!th.BIND_SELF_NewProjectCount()) {//验证基础数据
            iss.popover({
                content: "请完善项目信息必填项（*为必填项）。"
            })
            return false;
        };
        let _check = th.BIND_VALID_DATA(); //检查地块数据
        if (!_check[0]) { //验证地块
            iss.popover({ content: _check[1] });
            return false;
        }
        return true;
    }
    BIND_ROUTERCHANGE() {  //发起审批
        let th = this;
        th.BIND_CHECKPROJECTNAME_Blur("检查项目名称").then(arg=>{
            if (!th.state.NewProjectCountDATA.checkName) {
                iss.popover({
                    content: "项目名称已存在请重新填写！"
                });
                 return
            }
            if (this.GET_CHECKED()) {
                this.EVENT_CLICK_POSTAPP();//基础信息提交
            }
        }).catch(err=>{

        })
       


        //iss.hashHistory.push({pathname:"/newProjectApproval",state:iss.id});
    }
    BIND_NewProjectCount(self) { //父级重定向到子集
        this.child1 = self;
        this.BIND_SELF_NewProjectCount = self.BIND_VALID.bind(self)
    }
    BIND_SELF_NewProjectCount() { //重定向到NewProjectCount模块内

    }

    handleEndTiming=()=>{
        this.setState({
            endTimingStatus:true,
        });
    };

    
    
    render() {
        var th = this;
        return <article>
            <section>
                <h3 className="boxGroupTit">
                    <p>
                        <span>项目信息</span>
                        <i>（<i className="redFont"></i>为必填项）</i>
                    </p>
                    <span className="functionButton">
                        <a className="saveIcon " onClick={this.EVENT_CLICK_SAVE.bind(this, "zc")} href="javascript:void(0);">暂存 <NewProjectTime endTiming={this.handleEndTiming.bind(this)} approvalTime={this.state.NewProjectCountDATA.APPROVETIME || ""} /></a>
                        <a className="approvalIcon" onClick={this.BIND_ROUTERCHANGE.bind(this)} href="javascript:;">发起审批 <NewProjectTime endTiming={this.handleEndTiming.bind(this)} approvalTime={this.state.NewProjectCountDATA.APPROVETIME || ""} /></a>
                    </span> 
                </h3>
                <NewProjectCount ref="NewProjectCount" projectCode={this.state.projectCode} checkName={this.checkName} local={th.props.location} NewProjectCountDATA={th.BIND_NewProjectCountDATA.bind(th)} save={th.EVENT_CLICK_SAVE.bind(this)} status={th.state.status} projectId={th.state.projectId} point={th.BIND_NewProjectCount.bind(this)} />
            </section>

            <section>
                <h3 className="boxGroupTit">
                    <p>
                        <span>地块信息</span>
                        <i>（<i className="redFont"></i>为必填项）</i>
                    </p>
                    <span className="functionButton">
                        <a className="addDik-icon" href="javascript:;" onClick={this.EVENT_CLICK_NEWLAND.bind(this)}>新增地块</a>
                    </span>
                </h3>
                <div>
                    <DynamicTable pid="countdata" DynamicData={this.state.CountData} CallBack={this.BIND_COUNT_DATACALLBACK.bind(this)} />
                </div>
                <ul className="BIND_LAND_BTN">
                    {this.BIND_LAND_BTN()}
                </ul>

                <DynamicTable pid={this.state.pid} DynamicData={this.state.propsDATA} CallBack={this.BIND_CALLBACK.bind(this)} />
                <article className={this.state.propsDATA.length ? "tools-dynamicTable hide" : "tools-dynamicTable hide"}>
                    <ul className="row">
                        <li className="col-sm-4 col-md-4 col-lg-4">
                            <label className="require"></label><i><b></b></i>
                            <div>
                                <button className="btn btn-default" onClick={this.EVENT_CLICK_PERIPHERAL.bind(this)}>外部设计条件</button>
                            </div>
                        </li>
                    </ul>
                </article>

            </section>


        </article>
    }
}
export default NewProject;