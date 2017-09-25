class $iss {
    constructor() {
        this.pagination();
    }
    pagination() {
        $.extend($.fn.pagination.defaults, {
            layout: ["first", "prev","manual","next", "last"],
            pageSize: 10,//每页显示的记录条数，默认为10 
            pageList: [5,10,15],//可以设置每页记录条数的列表 
            beforePageText: '第',//页数文本框前显示的汉字 
            afterPageText: '页    共 {pages} 页', 
            displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录' 
        })

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
        let opt = {
            title: "提示",
            content: "",
            width:"400px",
            height:"200px",
            ok: $.noop
        }
        $.extend(opt, arg);
        let str = `<div class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title">${opt.title}</h4>
            </div>
            <div class="modal-body">
              <div>${opt.content}</div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary J_button" >确定</button>
            </div>
          </div>
        </div>
      </div>`

        let $ele = $(str);
        $("body").append($ele);
        $ele.modal({
            show: true
        }).on("click.modeclose",".J_button", function () {
            let opts = $(this).data("data");
            opts.ok();
        }).data("data", opt)

    }



}

let iss = window["iss"] = new $iss();
export default iss;