class $iss {
    constructor() {
        this.pagination();
        this.id=this.getQuert("FileId")||"";
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
        $o["success"] && delete $o["success"];
        $o["error"] && delete $o["error"];
        let arg = {
            type: "POST",
            data: ""
        }
        $.extend(arg, $o);
        $.ajax(arg)
            .done((da) => {
                opt["success"] && opt.success(da);
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
      /*   $(".modal").modal("hide"); */
        let opt = {
            id:"modal-"+iss.guid,
            title: "提示",
            content: "",
            width: "600px",
            height: "400px",
            ok: $.noop,
            okVal:"确定",
            cancel:false
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
              <button type="button" class="btn btn-primary J_cancel ${opt.cancel? 'btn-show':'btn-hide'}" >取消</button>
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
        }).on("click.modeclose", ".J_ok,.J_cancel", function () {
           // let opts = $(this).data("data");
              let self = $(this);
              if(self.hasClass("J_ok")){
                if(opt.ok()==false){
                    return
                  }
              }else if(self.hasClass("J_cancel")){
                 if(opt.cancel()==false){
                     return
                 }
              }
                
                $ele.modal("hide");
        }).on("hide.bs.modal",arg=>{
            var self = $(arg.target).data("bs.modal");
                self.$backdrop.remove();
                self.$dialog.remove(); 
                self.$element.remove();
                
           /*  $(".modal").remove();
            $(".modal-backdrop").remove(); */
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
            url:"/Commen/IGetOrganizationalUsers",
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
       /*  for(var v in opt.pepole){
            _s+=`<li class="chooseTolist"><li>`;
        } */
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
                    if(node.type==8){
                         opt.pepole={};
                         opt.pepole[node.id] = node;
                        render();
                     }
                    
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
        render();
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
    calendar(date,callback){
            $.extend($.fn.calendar.defaults,{  //esayui国际化
                weeks:['日','一','二','三','四','五','六'],  
                months:['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
            });
            
             let opt = {
                 date: date||new Date(),
                 callback:callback||$.noop
             }
            iss.Alert({
                title:"日期",
                content:`<div id="esayuiDate"></div>`,
                width:300,
                height:200,
                okVal:"关闭",
                ok(){
                    
                }
            });

            $("#esayuiDate").calendar({
                width:298,
                height:200,
                onSelect(da){
                    
                    if(opt.callback(new Date(da).Format("yyyy/MM/dd"))!="false"){
                        $(".modal").modal("hide");
                    }
                  
                }
            }); 

    }
    popover(opt){
        var red="rgba(218, 79, 61, 0.9)",green="rgba(0,230,255,0.9)";
        var obj = {
            type:opt["type"]? opt["type"]==2? green:red :red,
            content:`<div id="isspopover">${opt["content"]||""}</div>`,
            ok(){
                if(opt["ok"]){
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
            Zindex: "1000",
            background:obj.type,
            color:"#fff",
            textAlign:"center",
            fontSize:"18px"
        }
        let isspopover=$(obj.content);
        isspopover.css(css);
        $("body").append(isspopover)
        isspopover.on("click.isspopver",arg=>{
            isspopover.remove();
            obj.ok();
        })
        setTimeout(arg=>{
            isspopover.remove(); 
        },5000)

    }
  



}

let iss = window["iss"] = new $iss();


export default iss;