export default {
    isNonEmpty: function(value, errorMsg) {
        //不能为空
        if (!value.length) {
            return errorMsg;
        }
    },
    minLength: function(value, length, errorMsg) {
        //大于
        if (value.length < length) {
            return errorMsg;
        }
    },
    maxLength: function(value, length, errorMsg) {
        //小于
        if (value.length < length) {
            return errorMsg;
        }
    },
    isMobile: function(value, errorMsg) {
        //是否为手机号码
        if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
            return errorMsg;
        }
    },
    isEmail: function(value, errorMsg) {
        //是否为邮箱
        if (!/(^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$)/.test(value)) {
            return errorMsg;
        }
    },
    between: function(value, range, errorMsg) {
        //大于小于
        var min = parseInt(range.split('-')[0]);
        var max = parseInt(range.split('-')[1]);
        if (value.length < min || value.length > max) {
            return errorMsg;
        }
    },
    onlyEn: function(value, errorMsg) {
        //纯英文
        if (!/^[A-Za-z]+$/.test(value)) {

        }
    },
    onlyZh: function(value, errorMsg) {
        //纯中文
        if (!/^[\u4e00-\u9fa5]+$/.test(value)) {
            return errorMsg;
        }
    },
    onlyNum: function(value, errorMsg) {
        //数字包含小数
        if (!/^[0-9]+([.][0-9]+){0,1}$/.test(value)) {
            return errorMsg;
        }
    },
    onlyInt: function(value, errorMsg) {
        //整数
        if (!/^[0-9]*$/.test(value)) {
            return errorMsg;
        }
    },
    isChecked: function(value, errorMsg, el) {
        var i = 0;
        var $collection = $(el).find('input:checked');
        if(!$collection.length){
            return errorMsg;
        }
    }
};