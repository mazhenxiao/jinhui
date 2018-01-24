import {message, notification,Calendar } from 'antd';
import "babel-polyfill";  //兼容ie  
import 'whatwg-fetch';//兼容ie fetch
import appConfig from '../app.config';
class $iss {
    constructor() {
        this.pagination();
        this.id = this.getQuert("FileId") || "";
        let userInfo = sessionStorage.getItem("userInfo");
        this.userInfo = userInfo ? eval(`(${userInfo})`) : "";//用户信息，在main.js中ajax获取
        this.mapEUrl = "";
        this.token = localStorage.getItem("token");
        this.tree = null;
        /*标记总图地址*/
    }

    url(arg) {
        if (window["localDomain"]) {  //外部调试接口直接改为本地路径即可
            return `${window["localDomain"]}/${arg ? arg.replace(/^\//ig, "") : ""}`;
        } else {

            return `${appConfig.domain}/${arg ? arg.replace(/^\//ig, "") : ""}`;
        }
    }

    pagination() {
        $.extend($.fn.pagination.defaults, {
            layout: ["first", "prev", "manual", "next", "last"],
            pageSize: 10,//每页显示的记录条数，默认为10 
            pageList: [5, 10, 15],//可以设置每页记录条数的列表 
            beforePageText: '第',//页数文本框前显示的汉字 
            afterPageText: '页    共 {pages} 页',
            displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录'
        })

    }

    getQuert(t) {
        let reg = new RegExp(t),
            me = reg.exec(location.hash);
        return me ? me : "";
    }

    guid() {
        //guid的生成
        var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }

    fetch(opt) {
        const {url, ...params} = opt;
        let token = this.token;
        if (!token) window.location.href = "/login"
        let requestInfo = {
            method: opt["type"] ? opt.type : 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
            }
        };
        let _URL = url.replace(/^\\/ig, "");
        if (params) {
            let ParamsStr = ``;
            if (typeof params["data"] == "string") {
                ParamsStr += "paramsData=" + params["data"];
            } else {
                for (var li in params["data"]) {
                    ParamsStr += `${li}=${params["data"][li]}&`;
                }

            }

            ParamsStr = ParamsStr.replace(/\&$/ig, "");

            ParamsStr = !!ParamsStr ? `${ParamsStr}&token=${token}` : `token=${token}`;
            if (requestInfo.method.toLocaleLowerCase() == "post") {
                requestInfo.body = ParamsStr;
            } else {
                //get请求添加时间戳
                ParamsStr = !!ParamsStr ? `${ParamsStr}&t=${new Date().getTime()}` : `t=${new Date().getTime()}`;
                _URL = url.indexOf("?") >= 0 ? url + "&" + ParamsStr : url + "?" + ParamsStr;
            }

        }
        _URL = _URL.indexOf("http://") > -1 ? _URL : this.url(_URL);
        return fetch(_URL, requestInfo)
            .then(res => {
                return res.json()
                    .catch(arg => {
                        iss.tip({
                            type: "error",
                            message: "服务器错误",
                            description: `${_URL}接口错误！`
                        });
                        return Promise.reject({errorcode: "500", data: requestInfo, message: `服务器错误`, url: _URL});
                    });
            })
            .then(res => {
                if (res["errorcode"] && res.errorcode == "200") {
                    return res;
                } else if (res["errorcode"] && res.errorcode == "401") {
                    iss.tip({
                        type: "error",
                        message: "登陆超时",
                        description: `登陆超时请重新登陆！`
                    });
                    top.window.location.href = "/login";
                }else if(res["errorcode"] && res.errorcode == "500"){
                    // iss.error(res.message);
                    return Promise.reject(res)
                }else {
                    return Promise.reject(res);
                }
            })
    }

    ajax(opt) {
        let th = this;
        let $o ={...opt}; //JSON.parse(JSON.stringify(opt));
        $o["success"] && delete $o["success"];
        $o["error"] && delete $o["error"];
        let token = this.token;
        if (!token) window.location.href = "/login"
        let arg = {
            type: "POST",
            data: {},
            cache: false,
        }

        arg = {...arg, ...$o};
        //$.extend(arg, $o);
        arg.url = arg.url.indexOf("http://") > -1 ? arg.url : this.url(arg.url.replace(/^\//ig, ""));
        //.indexOf("&")>=0? `&token=${token}`:`token=${token}`;
        if (typeof arg.data == "string") { //部分值是字符串
            arg.url = arg.url.indexOf("?") >= 0 ? `${arg.url}&token=${this.token}` : `${arg.url}?token=${this.token}`;
        } else {
            arg.data["token"] = token;
        }
        $.support.cors = true;
        return $.ajax(arg).done((da) => {
           
            var _da = da;
            if (typeof da == "string") {
                _da = JSON.parse(da);
            }

            if (_da["errorcode"] && _da.errorcode == "200") {
                opt["success"] && opt.success(_da);
                return;
            } else if (_da["errorcode"] && _da.errorcode == "401") {
                iss.popover({content: "登录超时，请重新登录！"});
                setTimeout(function () {
                    top.window.location.href = "/login";
                }, 1500);
                return false;
            } else if (_da["errorcode"] == "300") {
                iss.popover({content: "操作失败，请联系后台工作人员！"});
                return false;
            }else if(_da["errorcode"]=="500"){
                if(opt["error"]){
                    opt.error(_da,_da);
                }else{
                    iss.error(`${_da["message"]? _da["message"]:"操作失败，请联系后台工作人员!"}`);
                }
           
                console.log("ajaxError500",_da)
              //  $.Deferred().reject(_da);
            } else if (_da) {
                return (opt["success"] && opt.success(_da));
            }

        }).fail((e, textStatus) => {

            if (e.status == 0 || e.status == 401 || e.status == 403) {
                iss.popover({content: "登录超时，请重新登录！"});
                setTimeout(function () {
                    top.window.location.href = "/login";
                }, 1500);
            } else {
                opt["error"] && opt.error(e, textStatus);
            }
            /* console.log("失败");
             console.log(e.status);
             console.log(textStatus);*/
        });

    }

    use(arr) {
        Object.assign(this, arr);
    }

    /**
     * 图片加载
     */
    loadImag(ev) {
        let el = new Image(), $els = ev.currentTarget;
        el.addEventListener("error", function () {

        });
        el.addEventListener("load", function () {
            $els.src = $els.getAttribute("data-src");
        });
        el.src = $els.getAttribute("data-src");
    }

    Alert(arg) {
        /*   $(".modal").modal("hide"); */
        let opt = {
            id: "modal-" + iss.guid,
            title: "提示",
            content: "",
            width: 600,
            height: 80,
            ok: $.noop,
            okVal: "确定",
            cancel: false
        }
        $.extend(opt, arg);
        let str = `<div class="modal fade" tabindex="-1" role="dialog" >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title">${opt.title}</h4>
            </div>
            <div class="modal-body" style="height:${opt.height}px;">
              <div>${opt.content}</div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary J_ok" >${opt.okVal}</button>
              <button type="button" class="btn btn-primary J_cancel ${opt.cancel ? 'btn-show' : 'btn-hide'}" >取消</button>
            </div>
          </div>
        </div>
      </div>`

        let $ele = $(str), s = $ele.width(), h = $ele.height();
        var wLast = opt.width;
        var hLast = opt.height + 65 + 56;

        $("body").append($ele);

        $ele.css({
            width: wLast,
            height: hLast,
            top: "50%",
            left: "50%",
            marginLeft: -wLast / 2,
            marginTop: -hLast / 2 - 26
        })
        $ele.modal({
            show: true
        }).on("click.modeclose", ".J_ok,.J_cancel", function () {
            // let opts = $(this).data("data");
            let self = $(this);
            if (self.hasClass("J_ok")) {
                if (opt.ok() == false) {
                    return
                }
            } else if (self.hasClass("J_cancel")) {
                if (opt.cancel() == false) {
                    return
                }
            }

            $ele.modal("hide");
        }).on("hide.bs.modal", arg => {
            var self = $(arg.target).data("bs.modal");
            self.$backdrop.remove();
            self.$dialog.remove();
            self.$element.remove();

            /*  $(".modal").remove();
             $(".modal-backdrop").remove(); */
        })

        return $ele;

    }

    upload(arg) {
        var th = this,token = this.token;
        let str = `<section class="upload">
            <header><div id="uploadAddBTN"></div><div class="uploadBtn J_uploadBtn hide">上传</div></header>
            <ul class="uploadList"></ul>
            <ul class="uploadTable">
            </ul>
        </section>`;
        let $el = iss.Alert({
            title: "上传",
            width: 800,
            height: 400,
            content: str
        });
        let opt = {
            pick: {
                id: '#uploadAddBTN',
                label: '点击选择文件'
            },
            accept: {
                title: 'File',
                extensions: '*.*',
                mimeTypes: '*.*'
            },
            // swf文件路径
            swf: "../source/webuploader-0.1.5/Uploader.swf",
            disableGlobalDnd: true,
            chunked: true,
            server: '',//上传地址
            content: [],//获取已上传地址
            fileNumLimit: 300,
            fileSizeLimit: 2048 * 1024 * 1024,    // 200 M
            fileSingleSizeLimit: 200 * 1024 * 1024,    // 50 M
            onRemove: function (arg, id) {
            }, //删除文件,arg当前element
            onReady: function () {
            },//初始化完成
            onUploadSucess: function () {
            } //上传完成
        }
        $.extend(opt, arg || {})
        opt.server =  opt.server.indexOf("token")>=0? opt.server:opt.server+`?token=${token}`
        let addFile = $f => {  //新增上传
            let txt = "";
            if ($f.length) {
                $f.forEach(function (el, ind) {
                    // txt += `<li id="${el.id}"><i  class="J_delete">删除</i><span class='time'>${new Date().Format("yyyy-MM-dd hh:mm:ss")}</span><span class='size'>${(el.size / 1024 / 1024).toFixed(2)}M</span><span class="progresses"><b class="pn">0%</b><b class="pp"></b></span><span class="txt" type='${el.type}'>${el.name}</span></li>`;
                    txt += `<li id="${el.id}">
                                <i  class="J_delete">删除</i>
                                <span class="progresses"><b class="pn">0%</b><b class="pp"></b></span>
                                <span class='size'>${(el.size / 1024 / 1024).toFixed(2)}M</span>
                                <span class='time'>${new Date().Format("yyyy-MM-dd hh:mm:ss")}</span>
                                <span class="txt" type='${el.type}'>${el.name}</span>
                            </li>`;
                }, this);
            }
            return txt;
            // uploadList.append(txt); 
        }

        let render = $v => {

            let el = $el.find(".uploadTable"),
                $data = `<li class="row"><span class="col-xs-5">文件名称</span><span class="col-xs-3">上传时间</span><span class="col-xs-3">上传人</span><span class="col-xs-1">操作</span></li>`;
            $v.forEach((ee, ii) => {
                $data += `<li id="${ee["ID"]}" class="row">
                <span class="col-xs-5"><a href="${location.protocol + location.host + ee["FILEURL"]}">${ee["FILENAME"]}</a><i>(${(ee["FILESIZE"] / 1024 / 1024).toFixed(2)})</i></span>
                <span class="col-xs-3">${ee["CREATETIME"].replace("T", " ")}</span>
                <span class="col-xs-3">${ee["CREATEUSERID"]}</span>
                <span class="J_deleteHistory col-xs-1">删除</span>
                </li>`;
            });

            el.html($data);
        }
        render(opt["content"] || []);
        opt.onReady();
        setTimeout(function () {
            let uploader = th.uploader = WebUploader.create(opt), list = $(".uploadList");

            uploader.on("filesQueued", function (file) {
                if (!file.length) {
                    iss.popover({type: 2, content: "已存在上传数据！"});
                    return
                }
                let tt = addFile(file);
                if (tt) {
                    $(".J_uploadBtn").removeClass("hide");
                    list.append(tt);
                }
            })
            uploader.on("uploadError", (f, r) => {
                $("#" + f.id + " .progresses").addClass("error").html("上传失败");
            })
            uploader.on("uploadProgress", (f, t) => {
                let el = list.find("#" + f.id + " .progresses .pn"), eli = list.find("#" + f.id + " .progresses .pp"),
                    num = parseInt(t * 100)
                el.text(num + "%");
                eli.css({width: num + "%"});
            })
            uploader.on("uploadSuccess", f => {
                opt.onUploadSucess(f, render, opt["content"], opt);
                let el = list.find("#" + f.id);
                el.remove();
                //  render(opt);

            })
            uploader.on("beforeFileQueued", f => {
                let size = f.size / 1024 / 1024;
                //if(size>)

            })
            uploader.on("fileDequeued", f => {

            })
            $el.on("click.upload", ".J_delete,.J_deleteHistory", e => {

                let me = $(e.currentTarget);
                var pa = me.parent(), id = pa.attr("id")
                if (me.hasClass("J_delete")) {
                    uploader.removeFile(id, true);
                    pa.remove();
                    if (uploader.getFiles().length <= 0) {
                        $(".J_uploadBtn").addClass("hide");
                    }
                } else if (me.hasClass("J_deleteHistory")) {
                    opt.onRemove(pa, id);

                }
            })
            $(document).on("click.upload", ".J_uploadBtn", e => {
                var th = $(e.target);
                if (th.hasClass("uploadBtn")) {
                    uploader.upload();
                }
            })
        }, 500);

    }

    checkLogin(callback) { //判断是否登陆过期
        let url = "/Account/ICheckLoginStatus";
        // debugger
        iss.ajax({
            url: url,
            success(da) {
                if (da && da["errorcode"] == "200") {
                    callback && callback(da);
                    return;
                }
                iss.popover({
                    content: "登陆已过期！"
                });
                top.location.href = "/login"
            },
            error(e) {
                iss.popover({
                    content: "登陆已过期！"
                });
                top.location.href = "/login"
            }
        })
    }
    
    chooseTo(arg) {  //选人控件
        let th = this,
            str = `<section class="chooseTo">
        <div class="chooseToTree">
            
            <div class="chooseToSearchBox">
                <input type="text" class="chooseToSearch J_chooseToSearch" />
                <button type="button" class="btn btnSearch" >搜索</button>
                <ul class="chooseToSearchUL"></ul>
            </div>
            <ul id="chooseToTreeUl"></ul>
        </div>
        <div class="chooseToRight">
        <ul>
         <%choosePepole%>
        </ul>
        </div>
        <div class="chooseToBar">
           
            <button type="button" class="btn btn-info chooseToRemo" >全部移除</button>
        </div>
       
        </section>`;
        let opt = {
            //url:"/Home/GetTreeInfo",//
            url: iss.url("/Common/IGetOrganizationalUsers"),
            param: {parentid: "13ead391fd4103096735e4945339550b", condition: ""},
            searchURL: "/Common/ISearchUser",
            title: "选择人员",
            width: 800,
            height: 300,
            content: str,
            multiple: false,
            pepole: {},
            data: [],
            search: "",
            callback: $.noop,
            ok() {
                $(window).trigger("chooseTo", opt.pepole)
                opt.callback(opt.pepole);
            }
        }
        $.extend(opt, arg);
        opt.url = opt.url.indexOf("http") >= 0 ? opt.url : iss.url(opt.url);
        let _s = "";
        /*  for(var v in opt.pepole){
             _s+=`<li class="chooseTolist"><li>`;
         } */
        opt.content = opt.content.replace(/<%choosePepole%>/ig, _s)
        iss.Alert(opt);

        var ele, ul;
        let bindData = to => {
            ele = $("#chooseToTreeUl");

            //opt.data = to;
            opt.param["token"] = localStorage.getItem("token");
            ele.tree({
                url: `${opt.url}`,
                queryParams: opt.param,
                type: "post",
                onBeforeExpand(node) {
                    opt.param.parentid = node.id;
                    opt.param.condition = "";

                },
                loadFilter(da, param) {
                    return da.rows;
                },
                onBeforeLoad(node, param) {
                },
                onDblClick(node) {
                    if (node.type == 8) {
                        // debugger
                        opt.pepole = opt.multiple ? opt.pepole : {};
                        opt.pepole[node.id] = node;
                        render();
                    }

                },
                onLoadError(e) {
                    if (e.status == 0 || e.status == 401 || e.status == 403) {
                        iss.popover({content: "登录超时，请重新登录！"});
                        setTimeout(function () {
                            window.location.href = "/login";
                        }, 1500);
                    }
                }
            });
            let render = d => {
                let rp = "", $el = $(".chooseToRight ul");
                
                $el.html("")
                let op = opt.pepole;
                for (let me in op) {

                    rp += `<li class="chooseTolist" guid="${me}">${op[me]["text"]}</li>`
                }
             
                    $el.html(rp);
                
              
            }
            render();
            let time, J_chooseToSearch = $(".J_chooseToSearch"), ul = $(".chooseToSearchUL"), btn = $("")
            let getAjax = val => {
                iss.ajax({
                    url: opt.searchURL,
                    type: "GET",
                    data: {
                        keyName: val
                    },
                    success(da) {
                        let v = ""
                        da.rows.forEach((_el, _ind) => {
                            if (_el.element == undefined) {
                                v += `<li class="chooseToSearchli" guid="${_el.id}" element="${_el.element}" text="${_el.text}" ><span >${_el.text}</span></li>`;
                            } else {
                                v += `<li class="chooseToSearchli" guid="${_el.id}" element="${_el.element}" text="${_el.text}" ><span >${_el.text}</span><span class="zw">${_el.element.split(",")[3]}</span></li>`;
                            }

                        })
                        
                        ul.html(v).addClass("active");

                    }
                });
            }
            J_chooseToSearch.on("keyup blur", arg => {
                var th = arg.target, val = th.value;

                if ((arg.keyCode == 13 || arg.type == "blur") && val != '') {
                    //if (ul.hasClass("active") == false) {
                    getAjax(val);
                    //}
                } else if (val == "") {
                    ul.removeClass("active");
                }
                // opt.search=val;
                // opt.param.parentid = "";
                //opt.param.condition = (val);
                // ele.tree("reload")


            });


            $(document).on("click.chooseTo", ".chooseToAdd,.chooseToRemo,.chooseToSearchli", ev => {
                var th = $(ev.currentTarget);
                if (th.hasClass("chooseToAdd")) {  //新增

                }
                if (th.hasClass("chooseToRemo")) { //删除
                    opt.pepole = {};
                    render();
                }
                if (th.hasClass("chooseToSearchli")) { //人员检索
                    if(!opt.multiple){opt.pepole = {};}
                  // opt.pepole = {};
                    opt.pepole[th.attr("guid")] = {
                        id: th.attr("guid"),
                        element: th.attr("element"),
                        text: th.attr("text")
                    }
                    render();
                    ul.removeClass("active");
                }

            }).on("dblclick.chooseTo", ".chooseTolist", ev => {
                var th = $(ev.target);
                
                if (th.hasClass("chooseTolist")) {  //右侧选人
                    let guid = th.attr("guid");
                    delete opt.pepole[guid];
                    render();
                }
            });
        }
        setTimeout(function () {
            bindData();//绑定数据
        });


    }

    calendar(date, callback) {
        $.extend($.fn.calendar.defaults, {  //esayui国际化
            weeks: ['日', '一', '二', '三', '四', '五', '六'],
            months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        });
        let opt = {
            date: date || new Date(),
            callback: callback || $.noop
        }
        iss.Alert({
            title: "日期",
            content: `<div id="esayuiDate"></div>`,
            width: 300,
            height: 200,
            okVal: "关闭",
            ok() {

            }
        });

        $("#esayuiDate").calendar({
            width: 298,
            height: 200,
            onSelect(da) {

                if (opt.callback(new Date(da).Format("yyyy-MM-dd")) != "false") {
                    $(".modal").modal("hide");
                }

            }
        });

    }

    /** sucess,error,error,warning,warn,
     * iss.message({
	    type:"sucess", //类型
        content:"内容", //内容
        onClose(){}  //关闭事件
        })
     */
    message = (opt) => {
        let _opt = {
            content: "",
            duration: 1,
            onClose() {
            },
            type: "sucess",
            ...opt
        }
        let {content, duration, onClose, type} = opt,
            TYPE = "success",
            str = "success,error,info,warning,warn,loading";
        type = str.indexOf(type) >= 0 ? type : type == "2" ? "success" : "error";
        TYPE = new RegExp(type).exec(str) || TYPE;
        message[TYPE](content, duration, onClose);
        return
    }
    /**sucess,error,error,warning,warn
     * iss.tip({
        message:"提示消息",  //标题
        description:"消息内容", //内容
        onClose(){ alert(1)}   //关闭
        })
     */
    tip = (opt) => {
        let _opt = {
                message: "提示",
                description: "",
                onClose() {
                }, //关闭提价
                ...opt
            },
            TYPE = "success",
            str = "success,error,info,warning,warn,loading";
        TYPE = new RegExp(opt["type"] || "success").exec(str) || TYPE;
        notification[TYPE](_opt)
    }

    popover(opt) {

        var red = "rgba(218, 79, 61, 0.9)", green = "rgba(0,230,255,0.9)";
        var obj = {
            type: opt["type"] ? opt["type"] == 2 ? green : red : red,
            content: `<div id="isspopover">${opt["content"] || ""}</div>`,
            ok() {
                if (opt["ok"]) {
                    opt["ok"]()
                }
            }
        }
        $("#isspopover").remove();
        let css = {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            padding: "10px",
            minHeight: "60px",
            zIndex: "3002",
            background: obj.type,
            color: "#fff",
            textAlign: "center",
            fontSize: "18px"
        }

        let isspopover = $(obj.content);
        isspopover.css(css);
        $("body").append(isspopover);
        isspopover.on("click.isspopver", arg => {
            isspopover.remove();
            obj.ok();
        });
        setTimeout(arg => {
            isspopover.remove();
        }, 5000);

    }

    //loading...
    loading(state) {
        var str = `<div class="loader" id="loader">
                        <div class="nei">
                            <div class="box box1"></div>
                            <div class="box box2"></div>
                            <div class="box box3"></div>
                            <div class="box box4"></div>
                            <div class="box box5"></div>
                            <div class="box box6"></div>
                            <div class="box box7"></div>
                            <div class="box box8"></div>
                            <div class="box box9"></div>
                            <div class="box box10"></div>
                        </div>
                      </div>`;
        if (state == "open") {
            $("body").append(str).css({overflow: 'hidden'})
        } else if (state == "close") {
            $("#loader").remove()
            $("body").css({overflow: 'auto'})
        }
    }

    /*克隆对象*/
    clone(obj) {
        var th = this;
        if (obj == null) {
            return null;
        }
        var newobj;
        if (Object.prototype.toString.call(obj) == "[object Array]") {
            newobj = new Array();
        }
        else if (Object.prototype.toString.call(obj) == "[object Date]") {
            obj.getTime = Date.prototype.getTime;
            newobj = new Date(obj.getTime());
            delete obj.getTime;
        }
        else {
            newobj = new Object();
        }
        for (var i in obj) {
            if (!isNaN(i)) { //为数组中的项
                if (typeof (obj[i]) == "object") {
                    newobj[i] = th.clone(obj[i]);
                }
            }
            if (typeof (obj[i]) == "function") {
                continue;
            }
            else if (typeof (obj[i]) == "object") {
                newobj[i] = th.clone(obj[i]);
            } else {
                newobj[i] = obj[i];
            }
        }
        return newobj;
    }


    /*返回regExp对应的值
     * @param regExp 对应数据里的regExp值
     * @param key regExp对象里的key
    */
    getRegExpkVal(regExp, key) {
        var obj = JSON.parse(regExp);
        if (Object.prototype.toString.call(obj) == "[object Object]") {
            return obj[key] != undefined ? obj[key] : "";
        } else {
            return "";
        }
    }

    /*地图标记=项目
     @param th this
     @param mapScr 地址
     @param page 区分项目或分期  "project","stage"
     * */
    evRereshMapCookie(th, mapSrc, page) {

        let projectId = "";
        if (page == "stage") {
            projectId = th.state.PROJECTID;
        } else {
            projectId = th.state.ID;
        }
        let localUrl = window.location.href;

        $("body").addClass("geogrMarker_body");
        $("<iframe src='" + mapSrc + "' id='geogrMarker' class='geogrMarker'></iframe>").appendTo("body").off("load.mark").on("load.mark", function (e) {
            $.cookie('cookieMapMark', 'fail', {path: '/'});
            let urlPath = localUrl.replace("status=add", "status=edit");
            if (urlPath.indexOf("dataKey") < 0) {
                /*分期需要项目ID*/
                if (page == "stage") {
                    urlPath = urlPath + "&dataKey=" + th.state.STAGEVERSIONID;
                } else {
                    urlPath = urlPath + "&dataKey=" + projectId;
                }
            }

            let mapMarkInter = setInterval(function () {
                let markCookie = $.cookie('cookieMapMark');
                if (markCookie == "success") {
                    clearInterval(mapMarkInter);
                    $('#geogrMarker').remove();
                    $("body").removeClass("geogrMarker_body");
                    // $("window").trigger("EVENT_REOLOADIFRAME");
                    top.window.location.href = urlPath;
                    top.window.location.reload();
                    // [...document.querySelectorAll("iframe")].forEach(arg=>{ arg.src=arg.src})
                } else if (markCookie == "back") {
                    clearInterval(mapMarkInter);
                    $("body").removeClass("geogrMarker_body");
                    $('#geogrMarker').remove();
                    // $("window").trigger("EVENT_REOLOADIFRAME");
                    top.window.location.href = urlPath;
                    top.window.location.reload();
                    // [...document.querySelectorAll("iframe")].forEach(arg=>{ arg.src=arg.src})
                }
            }, 100);
        });

    }

    /*轮播图，第二张无法加载的问题
     @pram th this
     @param src 地址==特指iframe2的src
     * */
    evCarouselActive(th, src) {
        //let th=this;
        let interCar = setInterval(function () {
            if ($('#iframe2').closest(".item").hasClass("active")) {
                th.refs.iframe2.src = src;
                clearInterval(interCar);
            }
        }, 100);
    }

    /*确认（某种操作）提示
     *@param title 标题
     *@param okCallback 确认回调函数
     *@parem cancelFun 取消回调函数
     * */
    evConfirmAlert(title, okCallback, cancelFun) {
        var th = this;
        iss.Alert({
            title: "提示",
            width: 300,
            content: '<div class="Alert">' + title + '</div>',
            ok() {
                if (okCallback && typeof okCallback == "function") {
                    okCallback();
                }
            },
            cancel() {
                if (cancelFun && typeof cancelFun == "function") {
                    cancelFun();
                }
            }
        });
    }

    /*
    *let intallmentStatus="10004",newProjectStatus="10005";
    *在待审和取消审核时，判断项目还是分期；
    */
    getEVal(status) {
        let eVal = "";
        switch (status) {
            case "intallmentStatus":
                eVal = "10103";
                break;//分期
            case "newProjectStatus":
                eVal = "10102";
                break;//项目
            case "teamMaintainStatus":
                eVal = "10114";
                break;//团队维护
            case "priceControl":
                eVal = "10105";
                break;//价格
            case "area":
                eVal = "10104";
                break;//面积
            case "supply":
            case "sign":
            case "payment":
                eVal = "10106";
                break;//供销存
            case "priority":
                eVal = "10113";
                break;//重点事项
            case "primarykeyTarget":
                eVal = "10115";
                break;//重点事项
            case "primarykey":
                eVal = "10111";
                break;//重点事项
        }
        return eVal;
    }
    /**
     * 通过url判断页面路由
     */
    convertURL(id){
        let url="";
        switch(id){
            case "10103":url="intallment";break; //分期
            case "10102":url="newProject";break; //项目
            case "10114":url="AreaInfo/groupbuild";break; //团队维护
            case "10104":url="AreaInfo/areaManage";break; //面积
            case "10106":url="AreaInfo/payment";break;//供销存
            case "10105":url="AreaInfo/priceControl";break; //价格
            case "10113":url="AreaInfo/priority";break; //重点事项
            case "10115":url="AreaInfo/primarykeyTarget";break; //重点事项
            case "10111":url="AreaInfo/primarykey";break; //重点事项
            default:console.error("iss.js里没有配置convertURL");break;
        }
        return url;
    }
    /*
    *配置上传标记总图url
    */
    getEUrl() {
        var th = this;

        iss.ajax({
            type: "post",
            url: "/Common/IGetXMViewURL",
            async: false,
            success(res) {
                if (res.message == "成功") {
                    th.mapEUrl = res.rows;
                    // return res.rows;
                }
            }
        });
    }
    Error = (error)=>{
        this.tip({
            type:"error",
            message:"提示",
            description:error
        })
    }
    Info=(message)=>{
        this.tip({
            type:"info",
            message:"提示",
            description:message
        })  
    }
    success=(message)=>{
        this.message({
            type: "success",
            content: message,
        });
    }
    Success=(message)=>{
        this.tip({
            type:"success",
            message:"提示",
            description:message
        })  
    }
    error = (error) => {
        this.message({
                type: "error",
                content: error.message ? error.message : error,
            }
        );
    };

    info = (message) => {
        this.message({
                type: "info",
                content: message,
            });
    };
}

//let iss = window["iss"] = 
let iss = window["iss"] = new $iss();
$(function () {
    iss.getEUrl();
});

export default iss;