class $iss {
    constructor() {
        this.pagination();
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
    guid(){
        //guid的生成
        var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }
    ajax(opt) {
        let th = this;
        let $o = JSON.parse(JSON.stringify(opt));
        $o["sucess"] && delete $o["sucess"];
        $o["error"] && delete $o["error"];
        let arg = {
            type: "POST",
            data: ""
        }
        $.extend(arg, $o);
        $.ajax(arg)
            .done((da) => {
                opt["sucess"] && opt.sucess(da);
            })
            .fail(e => {
                opt["error"] && opt.error(e);
            })

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
            //console.log("error:"+$els.getAttribute("data-src"));
            //el.src = this.imgicon;
        })
        el.addEventListener("load", function () {
            // console.log("sucess:"+$els.getAttribute("data-src"));
            $els.src = $els.getAttribute("data-src");
        })
        el.src = $els.getAttribute("data-src");
    }
    Alert(arg) {
        $(".modal").modal("hide");
        let opt = {
            title: "提示",
            content: "",
            width: "600px",
            height: "400px",
            ok: $.noop
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
              <button type="button" class="btn btn-primary J_button" >确定</button>
            </div>
          </div>
        </div>
      </div>`

        let $ele = $(str), s = $ele.width(), h = $ele.height();

        $("body").append($ele);
        $ele.css({
            width: opt.width,
            height: opt.height + 65 + 56,
            top: "20%",
            left: "50%",
            transform: "translate(-50%,-20%)"
        })
        $ele.modal({
            show: true
        }).on("click.modeclose", ".J_button", function () {
           // let opts = $(this).data("data");
    
                if(opt.ok()=="false"){
                  return
                }
                $ele.modal("hide");
        }).on("hide.bs.modal",arg=>{
            $(".modal").remove();
            $(".modal-backdrop").remove();
        })

    }
    upload(arg) {
        var th = this;
        let str = `<section class="upload">
            <header><div id="uploadAddBTN"></div><div class="uploadBtn J_uploadBtn hide">上传</div></header>
            <ul class="uploadList"></ul>
        </section>`;
        iss.Alert({
            title: "上传",
            width: 800,
            height: 400,
            content: str
        });
        let opt = {
                pick: {
                    id: '#uploadAddBTN',
                    label: '点击选择图片'
                },
                accept: {
                    title: 'Images',
                    extensions: 'gif,jpg,jpeg,bmp,png',
                    mimeTypes: 'image/*'
                },
                // swf文件路径
                swf: "../source/webuploader-0.1.5/Uploader.swf",
                disableGlobalDnd: true,
                chunked: true,
                server: 'http://2betop.net/fileupload.php',
                fileNumLimit: 300,
                fileSizeLimit: 5 * 1024 * 1024,    // 200 M
                fileSingleSizeLimit: 1 * 1024 * 1024    // 50 M  
                
            }
        $.extend(opt, arg || {})
        let addFile=$f=>{
            let txt="";
            if($f.length){
               $f.forEach(function(el,ind) {
                   txt+=`<li id="${el.id}"><i  class="J_delete">删除</i><span class='time'>${new Date().Format("yyyy-MM-dd hh:mm:ss")}</span><span class='size'>${(el.size/1024/1024).toFixed(2)}M</span><span class="progresses">0%</span><span class="txt" type='${el.type}'>${el.name}</span></li>`;
               }, this);
            }
            return txt;
           // uploadList.append(txt); 
        }
         
        setTimeout(function() {
            let uploader = th.uploader = WebUploader.create(opt),list = $(".uploadList");
                uploader.on("filesQueued",function(file){
                    let tt = addFile(file);
                    if(tt){
                        $(".J_uploadBtn").removeClass("hide");
                        list.append(tt);
                    }
                })
                uploader.on("uploadError",f=>{
                   $("#f.id").addClass("error");
                })
                uploader.on("uploadProgress",f=>{

                })
                uploader.on("fileDequeued",f=>{
                    
                })
                list.on("click.upload",".J_delete",e=>{
                   
                    var pa = $(e.currentTarget).parent(),id = pa.attr("id")
                     
                     uploader.removeFile(id,true);
                    pa.remove();
                    if(uploader.getFiles().length<=0){
                        $(".J_uploadBtn").addClass("hide");
                    }
                    
                })
                $(document).on("click.upload",".J_uploadBtn",e=>{
                    var th = $(e.target);
                    if(th.hasClass("uploadBtn")){
                        uploader.upload();
                    }
                })
        },500);

    }
    chooseTo(arg){  //选人控件
        let th = this,
            str = `<section class="chooseTo">
        <div class="chooseToTree">
            
            <input type="text" class="chooseToSearch J_chooseToSearch" />
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
            url:"/Com/IGetOrganizationalUsers",
            param:{parentid:"13ead391fd4103096735e4945339550b",condition:""},
            title:"选择人员",
            width:800,
            height:300,
            content:str,
            pepole:{},
            data:[],
            search:"",
            callback:$.noop,
            ok(){
               // console.log(opt.pepole);
                $(window).trigger("chooseTo",opt.pepole)
                opt.callback(opt.pepole);
            }
        }
        $.extend(opt,arg);
        let _s="";
        for(var v in opt.pepole){
            _s+=`<li class="chooseTolist"><li>`;
        }
        opt.content= opt.content.replace(/<%choosePepole%>/ig,_s)
        iss.Alert(opt);
        var ele;
        let bindData =to=>{
            ele = $("#chooseToTreeUl");
            //opt.data = to;
            ele.tree({
                url:`${opt.url}`,
                queryParams:opt.param,
                type:"post",
                onBeforeExpand(node){
                    opt.param.parentid=node.id;
                    opt.param.condition="";
                   
                },
                onBeforeLoad(node,param){
                    console.log(param);
                },
                onDblClick(node){
                   
                    opt.pepole[node.id] = node;
                    render();
                }


            });
        let render = d=>{
            let rp="",$el = $(".chooseToRight ul");
                $el.html("")
                let op = opt.pepole;
            for(let me in op){
    
                rp+=`<li class="chooseTolist" guid="${me}">${op[me]["text"]}</li>`
            }
           
            $el.html(rp);
        }
        
        let time;
        $(".J_chooseToSearch").on("keyup",arg=>{
            var th = arg.target,val = th.value;
            clearTimeout(time);
            time = setTimeout(a=>{
               // opt.search=val;
                opt.param.parentid="";
                opt.param.condition=encodeURI(val);
                ele.tree("reload")
            },5000)
        })
            $(document).on("click.chooseTo",".chooseToAdd,.chooseToRemo",ev=>{
                var th = $(ev.target);
                    if(th.hasClass("chooseToAdd")){  //新增

                    }
                    if(th.hasClass("chooseToRemo")){ //删除
                        opt.pepole={};
                        render();
                    }
                  
            }).on("dblclick.chooseTo",".chooseTolist",ev=>{
                console.log(ev)
                var th = $(ev.target);
                if(th.hasClass("chooseTolist")){  //右侧选人
                    let guid = th.attr("guid");
                        delete opt.pepole[guid];
                        render();
                }
            })
        }
        setTimeout(function(){
            bindData();//绑定数据
        })
        
   

        
    }



}

let iss = window["iss"] = new $iss();

;~function(){
    window.Date.prototype.Format = function (fmt) { //author: meizz 
        (!fmt) && (fmt = "yyyy-mm-dd");
        var o = {
            "M+": this.getMonth() + 1,                 //月份 
            "d+": this.getDate(),                    //日 
            "h+": this.getHours(),                   //小时 
            "m+": this.getMinutes(),                 //分 
            "s+": this.getSeconds(),                 //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds()             //毫秒 
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

}();
export default iss;