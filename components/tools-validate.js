

$.extend($.fn.validatebox.defaults, {
	missingMessage: "必填项"
})
$.extend($.fn.validatebox.defaults.rules, {
	
	max: {
		validator: function (value, param) {
			var maxVal = param[0];
			return value <= maxVal;
		},
		message: '输入的值不能大于{0}'
	},
	number: {
		validator: function (value, param) {
			return /^(0|[1-9][0-9]*)(.[0-9]*)?$/.test(value);
		},
		message: '只能输入数字'
	}

});