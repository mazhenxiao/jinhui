/**
 * 本js用于原生js扩展和jquery扩展
 * 因为webpack会修改所有this指针指向所以需要this指向独立作用域的可再次
 */
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
    window.String.prototype.miliFormat = window.Number.prototype.miliFormat = function () {
            var th = this;
            var DIGIT_PATTERN = /(^|\s)\d+(?=\.?\d*($|\s))/g;
            var MILI_PATTERN = /(?=(?!\b)(\d{3})+\.?\b)/g;
            return th.valueOf().toString().replace(DIGIT_PATTERN,function(){ return m.replace(MILI_PATTERN, ',')});
    }

    $(function(){

        $.fn.scrollUnique = function() {
            return $(this).each(function() {
                var eventType = 'mousewheel';
                // 火狐是DOMMouseScroll事件
                if (document.mozHidden !== undefined) {
                    eventType = 'DOMMouseScroll';
                }
                $(this).on(eventType, function(event) {
                    // 一些数据
                    var scrollTop = this.scrollTop,
                        scrollHeight = this.scrollHeight,
                        height = this.clientHeight;
        
                    var delta = (event.originalEvent.wheelDelta) ? event.originalEvent.wheelDelta : -(event.originalEvent.detail || 0);        
        
                    if ((delta > 0 && scrollTop <= delta) || (delta < 0 && scrollHeight - height - scrollTop <= -1 * delta)) {
                        // IE浏览器下滚动会跨越边界直接影响父级滚动，因此，临界时候手动边界滚动定位
                        this.scrollTop = delta > 0? 0: scrollHeight;
                        // 向上滚 || 向下滚
                        event.preventDefault();
                    }        
                });
            });	
        };


    })

}();