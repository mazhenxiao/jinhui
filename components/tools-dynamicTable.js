/** 
 * 用来处理动态生成表格
*/

import React from 'react';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
import { Select, Input } from 'antd';
import { shallowCompare } from '../utils';
import "../css/antd.min.css";
const Option = Select.Option;
class DynamicTable extends React.Component {
    constructor(arg) {
        super(arg);
        this.count = 0; //初始化记录
        this.rule = {};//验证
        this.id = `DynamicTable-${iss.guid}`;
        this.state = { //数据层
            url: "",
            data: this.props.DynamicData || [], //数据
            selected: {},
            readOnly: this.props["readOnly"]
        }


    }
    componentDidMount() { }
    componentWillReceiveProps(nextProps, nextStage) {
        let { readOnly } = nextProps;
        this.setState({
            readOnly
        })
    }
    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps.planData, nextState.planData);
    }
    BIND_INPUT_STATE() {
        let $da = this.state.data;
        $da.forEach((da, ind) => {

        })
    }
    EVENT_CHANGE_DYNAMIC(d, e) { //自定义input事件
        if (d == null) {
            return ""
        } else {
            return d;
        }
    }

    getPost() {
        let th = this;
        iss.ajax({
            type: "POST",
            url: th.props.url,
            sucess(da) {
                let data = typeof da.data == "string" ? JSON.parse(da.data) : da.data;
                th.setState({
                    data: da.rows
                })
            },
            error(e) { }
        })
    }
    /**
     * 日期控件
     * @param {当前数据} el 
     * @param {event} ev 
     */
    setEventDate(el, ev) {

        let th = this;
        let de = new Date().Format("yyyy-MM-dd");
        let event = ev.target;
        el.edit = el.edit || " +w";//默认值伪可写
        iss.calendar(de, arg => {
            el.val = arg;


            if (el.val && el.test) {
                el.test.check = true;
                event.className = event.className.replace("required", "");
            } else if (el.test && el.edit.indexOf("+m") >= 0) {
                event.className += " required";
                el.test.check = false;
            }
            th.props.CallBack.call(th, el)
        })


    }
    /**
     * 修改input后出发事件
     * @param {当前数据} da 
     * @param {event} ev 
     */
    EVENT_CHANGE_INPUT(da, ev) { //input修改
        var th = this;
        da.edit = da.edit || " +w";//默认值伪可写
        if (th.Bind_checked(da, ev.target.value)) {

            th.props.CallBack(da, ev)
        }

        if (da.val) {
            ev.target.className = ev.target.className.replace("required", "");
        } else if (da.edit.indexOf("+m") >= 0) {
            ev.target.className += " required";
        }

    }
    /**
     * 单选select模块change事件
     * @param {当前编辑数据} da 
     * @param {event} ev 
     */
    EVENT_CHANGE_SELECT(da, ev) {

        // el.test.check=false;
        if (da.test && ev.target.value == "请选择") {
            da.test.check = false;
        } else {
            da.test && (da.test.check = true);
        }
        this.props.CallBack(da, ev);
    }
    /**
     * antd多选
     */
    EVENT_CHANGE_ANTD_SELECTS = (da, el) => {
        let val = el[el.length - 1];
        let bool = da.data.some(params => {
            return (val && val == params.val)
        })
        if (bool) {
            this.props.CallBack(da, Array.isArray(el) ? el.join(",") : el);
        }

    }
    /**
     * 数据校验
     * @param {当前数据} da 
     * @param {实际值} val 
     */
    Bind_checked(da, val) { //检测数据
        let reg = eval(`(${da.regExp})`);
        if (reg && reg.type.indexOf("number") >= 0) {
            let regs = /\d/, num = (/\d+/).exec(reg.type);
            let numreg = /[^(\d+\.?\d+)|^\.\d+]/ig;

            if (num) {
                var _reg = new RegExp("^\\d+(\.\\d{0," + num[0] + "})?$");
                let _reg2 = /(?:\d{1}|\.{1})$/;
                let tested = (_reg.test(val) && (_reg2.test(val)));
                return val == "" ? true : tested;

            }
            return val == "" ? true : !numreg.test(val);
        }
        return true
    }
    /**
     * 但范围的max  min值失去焦点校验
     * @param {当前data数据} el 
     * @param {event} ev 
     */
    EVENT_BLUR_INPUT(el, ev) { //失去焦点

        let reg = el.regExp ? eval("(" + el.regExp + ")") : {};
        el["test"] = el["test"]||{"check":true,"val":""}
        if (!el.regExp) { return }
        var th = this;
        if (reg) {  //范围限制带添加
            let max = parseFloat(reg["max"] || 0);
            let min = parseFloat(reg["min"] || 0);
            let val="";
            
             if(reg["type"].indexOf("string") >= 0){ //string类型
                val=(el.val || "").length 
             }else if(reg["type"].indexOf("regExp")>=0){ //正则类型
                val = el.val;
             }else{  //其他类型
                val = parseFloat(el.val || 0);
             } 

            if (max && val > max && el.test) {  //最大值判断
                el.test["check"] = false;
                el.test["val"] = "值不应大于" + max + (el.unit || "");
                th.props.CallBack(el, ev);
                return
            } else if (min && val < min && el.test) {  //最小值判断
                el.test["check"] = false;
                el.test["val"] = "值不应小于" + min + (el.unit || "");
                th.props.CallBack(el, ev);
                return
            } else if (reg && reg["type"]&&reg["type"].indexOf("regExp") >= 0) {  //正则校验
                try {
                    
                    let paramsReg = new RegExp(reg.regExp.replace(/#/ig,"\\"));
                    let bools = paramsReg.test(val);
                    el.test["check"] = bools;
                    el.test["val"] = bools? "":"输入不合法";
                    th.props.CallBack(el, ev);
                } catch (e) {
                   // return false;
                    console.error(`tools-dynamicTable.js里正则错误`,el)
                }


            } else {
                el.test && (el.test["check"] = true);
                el.test && (el.test["val"] = "");
                th.props.CallBack(el, ev);
            }

        }

    }
    /**
     * 生成列表
     * @param {所有动态数据} da 
     */
    setList(da) {
        let typeBox = el => {
            let numreg = (/number\((\d+)\)/).exec(el.regExp || "");
            let fixed = numreg ? numreg[1] : "";
            el.edit = el.edit || " +w";//默认值伪可写
            // fixed=2;
            if (this.state.readOnly) {
                if (el.type == "select") {
                    let list = el.data.map((_d, _i) => {
                        return <option key={_i} value={_d.val}>{_d.label}</option>
                    })
                    return <select readOnly="true" disabled="disabled" name={el.id} className={(el.edit.indexOf("+m") >= 0 && !el.val) ? "required" : ""} onChange={this.EVENT_CHANGE_SELECT.bind(this, el)} value={el.val || ""}>{list}</select>
                }

                if (fixed || fixed == "0") {
                    return <input className="" type="text" readOnly="true" value={el.val ? parseFloat(el.val).toFixed(fixed) : ""} />
                } else {
                    return <input className="" type="text" readOnly="true" value={el.val || ""} />
                }
            } else {
                if (el.type == "select") { //单选
                    if (!Array.isArray(el.data)) { return }
                    let list = el.data.map((_d, _i) => {
                        return <option key={_i} value={_d.val}>{_d.label}</option>
                    })
                    return <select name={el.id} className={(el.edit.indexOf("+m") >= 0 && !el.val) ? "required" : ""} onChange={this.EVENT_CHANGE_SELECT.bind(this, el)} value={el.val || ""}>{list}</select>
                } else if (el.type == "date") { //日期
                    return <input name={el.id} className={(el.edit.indexOf("+m") >= 0 && !el.val) ? "esayuiDate required" : "esayuiDate"} id={el.id} data-pid={el.pid} value={el.val || ""} placeholder={el.edit.indexOf("+m") >= 0 ? "" : ""} type="text" onClick={this.setEventDate.bind(this, el)} readOnly="true" />
                } else if (el.type == "selects") { //多选
                    if (!Array.isArray(el.data)) { return }
                    let children = el.data.map((_d, _i) => {
                        return <Option key={_d.val}>{_d.label}</Option>
                    })
                    return <Select mode="tags" filterOption={false} name={el.id} tokenSeparators={[',']} className={(el.edit.indexOf("+m") >= 0 && !el.val) ? "required selects" : "selects"} onChange={this.EVENT_CHANGE_ANTD_SELECTS.bind(this, el)} value={Array.isArray(el.val) ? el.val : el.val ? el.val.split(",") : []}>{children}</Select>
                } else {
                    if (el.edit.indexOf("+r") >= 0 && (fixed == "0" || fixed)) {
                        return <input name={el.id} id={el.id} className={(el.edit.indexOf("+m") >= 0 && !el.val) ? " required" : ""} data-pid={el.pid} value={el.val ? parseFloat(el.val).toFixed(fixed) : ""} placeholder={el.edit.indexOf("+m") >= 0 ? "" : ""} type="text" onBlur={this.EVENT_BLUR_INPUT.bind(this, el)} onChange={this.EVENT_CHANGE_INPUT.bind(this, el)} readOnly={el.edit.indexOf("+r") >= 0} />
                    } else {
                        return <input name={el.id} id={el.id} className={(el.edit.indexOf("+m") >= 0 && !el.val) ? " required" : ""} data-pid={el.pid} value={el.val || ""} placeholder={el.edit.indexOf("+m") >= 0 ? "" : ""} type="text" onBlur={this.EVENT_BLUR_INPUT.bind(this, el)} onChange={this.EVENT_CHANGE_INPUT.bind(this, el)} readOnly={el.edit.indexOf("+r") >= 0} />
                    }

                }
            }
        }

        return da.map((el, ind) => {
            el.edit = el.edit || " +w";//默认值伪可写
            if (el.exec) {
                let reg = /\{.*?\}/ig;
                let arr = el.exec.match(reg);

                if (arr) {
                    let child = {};
                    arr.forEach((ee, ii) => {
                        let gid = ee.replace(/[{}]/ig, "");
                        for (let eee = 0; eee < da.length; eee++) {

                            if (da[eee]["id"] == gid) {
                                da[eee]["parent"] = da[eee]["parent"] || {};
                                da[eee]["parent"][el.id] = el.id;
                                child[gid] = child[gid] || {};
                                child[gid] = da[eee];
                                break;
                            }


                        }
                    });
                    el["child"] = child;
                }
            }
            let classNames = el["colspan"] ? `col-sm-${el["colspan"]} col-md-${el["colspan"]} col-lg-${el["colspan"]}` : "col-sm-4 col-md-4 col-lg-4"

            return <li key={ind} className={classNames}>
                <label className={(el.edit.indexOf("+m") >= 0 && !el.val) ? "require" : ""}>{el.label}</label>
                {
                    el.type == "date" ? <i className="date"><b>{el["test"] && (el["test"]["val"] || "")}</b></i> : <i>{el.unit}<b>{el["test"] && (el["test"]["val"] || "")}</b></i>
                }
                <div className="dynamicTableDIV">{typeBox(el)}</div>
            </li>
        })

    }
    render() {
        var th = this, _d = this.props.DynamicData;
        return <article className="tools-dynamicTable">


            <ul className="row">
                {th.setList(_d)}
            </ul>

        </article>
    }
}
export default DynamicTable;