/**
 * 数据校验
 */
import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import "babel-polyfill";  //兼容ie
import iss from "../js/iss.js";//公共类
import { clearTimeout } from 'timers';
import "../css/antd.min.css";

class $knife {
    checked = true; //默认校验数据为真
    setT=null; //设计定时器
    /**
  *  数据校验
  * knife.valid([接口定义好的Filed内容])
  * 参数                返回值
  * 接口Filed内容        true/false
  */
    valid(arg) {
        this.checked = true;
        let arr = Array.isArray(arg);
        let msg = []
        if (arr) {
            arg.forEach((el, ind) => {
                let str = "", reg = el.regExp && eval("(" + el.regExp + ")");
                if (el["edit"].indexOf("+m") >= 0 && (!el["val"] || el["val"].length <= 0)) {
                    str += "内容不能为空-"
                    this.checked = false;
                    msg.push(<p key={ind}><b>{el.label}：</b><span>{str}</span></p>);
                } else if (reg) {  //范围限制带添加
                    let max = parseFloat(reg["max"]);
                    let min = parseFloat(reg["min"]);
                    let val = (reg["type"].indexOf("string") >= 0) ? (el.val || "").length : parseFloat(el.val || 0);

                    if (!Number.isNaN(max) && val > max) {
                        this.checked = false;
                        str += `值不应大于${max}${el.unit || ""}-`;
                        msg.push(<p key={ind}><b>{el.label}：</b><span>{str}</span></p>);

                    } else if (!Number.isNaN(min) && val < min) {
                        this.checked = false;
                        str += `值不应小于${min}${el.unit || ""}`;
                        msg.push(<p key={ind}><b>{el.label}：</b><span>{str}</span></p>);
                    }


                }

            });

        } else {
            console.log("validate", "校验数据不合法")
        }
        if (!this.checked) {
            this.messageBox(msg)
        }
        return this.checked;
    }
    /**
     * 弹出提示
     */
    messageBox = (arg) => {
        Modal.error({
            title: '提示',
            content: (<article>{arg}</article>),
            okText: "确定"
        });
    }
    /**
     * 统计公式计算
     * knife.count()
     * 参数                   返回值
     */
    count = arg => {
       
    }
    /**
     * 递归计算用于处理包含children递归
     */
    recursion =(arg,num)=>{
        let ii = num;
        for(let i=0;i<arg.length;i++){
            if(arg[i]["children"]&&arg[i]["children"].length){
              ii=this.recursion(arg[i]["children"],ii);
            }else{
                ii+=parseInt(arg[i].width);
            }
        }
        return ii<150? 150:ii;
    }
    /**
     *
     * @param {Array} list  全部数据
     * @param {Object} d    当前数据
     * 第一种计算
     *  let newList = knife.SET_CountExec(list); //通用计算传入json 修改json后返回json
        th.setState({
           "DynamicData": newList
        });
        //第二种计算
        knife.SET_CountExec({a:1,b:2,c:0},"{a}+{b}");//返回当前计算结果
     */
    SET_CountExec(list, d) {  //地块计算
        let da = {};
        if (Array.isArray(list)) {  // 既定json
            let data = list.forEach((el, ind) => {
                //   debugger
                let numreg = (/number\((\d+)\)/).exec(el.regExp || "");
                let fixed = numreg ? numreg[1] : "";
                if (el.exec) {
                    let exec = el.exec;
                    let reg = /{.*?}/ig;
                    let arr = exec.match(reg) || [];
                    arr.forEach((ee, ii) => {
                        let regs = new RegExp(`${ee}`, "ig");
                        list.forEach(ref => {
                            let _id = ee.replace(/[{}]/ig, "")
                            if (ref["id"] == _id) {
                                exec = exec.replace(regs, parseFloat(ref.val || 0))
                            }
                        })
                    });
                    if (arr && arr.length) {
                        let _exec = eval(exec) || 0;
                        el["val"] = Number.isFinite(_exec) ? _exec : 0;

                    }
                }

            })
            return list;
        }else if(typeof d=="string"){  //第二种计算
            let exec = d;
            let reg = /{.*?}/ig;
            let arr = exec.match(reg) || [];
            arr.forEach((ee,ind)=>{
                let _id = ee.replace(/[{}]/ig, "");
                let regs = new RegExp(`\\{${_id}\\}`, "ig");
                 for(let me in list){
                     if(me==_id){
                        exec = exec.replace(regs, parseFloat(list[me] || 0))
                     }
                 }
            });
            let _exec = eval(exec) || 0;
            return _exec;
        }
    }
    /**
     * 第二种计算工具，用于表格计算
     * @param {*对象} Obj
     * @param {*数组} headerData
     * @param {*数组} dataSource
     */
    setTableExec(Obj, headerData, dataSource){
        this.Count_Exec(headerData,dataSource);
    }
    /**
     * 递归计算
     */
    Count_Exec(headerData,dataSource){
        
        headerData.forEach((da,ind)=>{
            let {field,exec,children,regExps}=da;
            let _regExps = regExps? eval(`(${regExps})`) :"";
            
            
            if(exec){
                let regExp = exec.match(/\{.*?\}/ig),replaceText = exec; 
                dataSource.forEach((ds)=>{
                    regExp.forEach((arg)=>{
                        let txt = arg.replace(/[{}]/ig,"");
                            //type = 
                        replaceText = replaceText.replace(arg,(ds[txt]||0));
                    });
                    ds[field]="";  //可能有NaN
                    let num="";
                    if(_regExps&&_regExps["type"]&&_regExps.type.indexOf("number")>=0){
                            let _num = (/\d+/ig).exec(_regExps.type);
                            num = _num? _num[0]:"";
                    }
                    let number = eval(replaceText);
                        number = number=="Infinity"? 0:number;
                        ds[field]= num==""? number:number.toFixed(num);
                })
              
                

            }else if(children&&children.length){
            
                this.Count_Exec(children,dataSource);
            }
        }) 
       
    }
    /**
     * 第3种计算 当前行计算
     * @param {*Object} row 
     */
    setTableRowExec(column, headerData, dataSource){
        dataSource.forEach(arg=>{
            let _execStr = arg["exec"],count=0,fixed="";
            if(_execStr){
                let _e = _execStr.split("=")[0],
                    _c = _execStr.split("=")[1],
                    _r = /\{.*?\}/ig,
                    _rep = /[\{\}]/ig;
                    _e.match(_r).forEach(el=>{
                    _e=_e.replace(el,arg[el.replace(_rep,"")]||0)
                })
                let _fd =headerData.filter(f=>f["field"]==_c.replace(_rep,""))[0];
                if(_fd){
                   let _regExps_ = eval(`(${_fd["regExps"]})`),
                          _type_ = _regExps_["type"],
                          _num_  = (/\d+/ig).exec(_type_)[0];
                          fixed = _num_==null? "":_num_;
                }
                count = eval(_e);
                count = Number.isNaN(count)? 0:count=="Infinity"? 0:count;
                
                if(fixed!=""){
                    count = count.toFixed(fixed);
                }
                arg[_c.replace(_rep,"")]=count;
            }
 
        })
    }
    /**
     * 数据有效性检测
     * @param {*string} val 
     * @param {*string number(0)} type 
     */
    checkType(val,type){
        
        let d = /\d+/,r = d.exec(type||""),num=r?r[0]:"";
       
        if(type.indexOf("number")>=0){
            if(num){
                let reg1 = new RegExp(`^\\\d*(?:\\\.?\\\d{0,${num||0}}?$)`,"ig");
                return reg1.test(val);
            }
            
        }
        return true;
    }
    /**
     * 数据有效性检测
     * @param {*} da   当前数据
     * {"pid":"","id":"","label":"","text":"","val":"","type":"input","unit":"万元","edit":"+w","exec":null,"regExp":"{\r\n  \"type\": \"number(2)\",\r\n  \"max\": \"1000\",\r\n  \"min\": \"0\"\r\n}","colspan":0,"data":null,"valuetype":"number","valueId":null,"test":null}
     * @param {*} val  input输入值
     */
    CHECK_InputValue(da, val) { //检测数据
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
    
    AntdTable_ScrollLock(lock1,lock2){
        
        var th = this,checkToEle="";
        let scrollTo=(params,ev)=>{
            if(checkToEle!=""&&checkToEle!=params){ return}
            let self = ev.target;
            let {scrollLeft,scrollTop}=self;
            if(params=="1"){
                checkToEle="1";
                lock2.scrollLeft=scrollLeft;
                lock2.scrollTop=scrollTop;
                checkToEle="";
            }else{
                checkToEle="2";
                lock1.scrollLeft=scrollLeft;
                lock1.scrollTop=scrollTop;
                checkToEle="";
            }
        }
         //lock1.removeEventListener("scroll",scrollTo);
        //lock2.removeEventListener("scroll",scrollTo);
        
        lock1.addEventListener("scroll",scrollTo.bind(this,"1"));
        lock2.addEventListener("scroll",scrollTo.bind(this,"2"));
        return {
            remove(){//手动注销元素
                lock1.removeEventListener("scroll",scrollTo);
                lock2.removeEventListener("scroll",scrollTo);
            }
        }
    }

    /**
     * 同jqueryReady判断是否dom完成加载
     */
    ready(el,callback){
        let Callback = callback,pm=[],element;
        if(!callback){Callback=el}
        let number=0;
        callback&&(element=el.split(","))
        let setTime=setInterval(arg=>{
            if(!callback&&document.readyState=="complete"){
                clearInterval(setTime);
                if(number!=1){
                    number=1;
                    Callback();
                }
            }else{
               
                element.forEach(arg=>{
                   let _el = document.querySelector(arg);
                   if(_el){ pm.push(_el)}
                })
                if(pm.length==element.length){
                    clearInterval(setTime);
                    callback();
                }
               
              
            }
        })
    
       
    }
    /**
     * URL转对象
     * ?a=1  替换为 {'a':'1'}
     * @param {*string} arg 
     */
    parseURL(arg){
        return eval("({'"+arg.replace(/^\?/ig,"").replace(/\&/ig,"','").replace(/\=/ig,"':'")+"'})");
    }
    /**
     * 路由跳转通用定义
     * @param {*Object} arg
     * @param {*String} dataKey 
     * @param {*String} edit 
     */
    router(arg,dataKey,edit){
        arg["key"]=dataKey;
        iss.hashHistory.replace(arg);
        iss.tree.edit(dataKey,edit)
    }
   

}


const knife = new $knife();

export { knife }