/**
 *  规划方案指标 plan-quota （1~9）
 */

import React, {Component} from 'react';
import {Button,Select} from 'antd';
import "babel-polyfill";  //兼容ie
import {shallowCompare,knife} from '../utils';
import iss from "../js/iss.js";//公共类
import { AreaConstants } from '../constants'; 
import "../css/tools-dynamicTable.less";//专用css
import DynamicTable from "../components/tools-dynamicTable.js";
import { setTimeout } from 'timers';
class PlanQuota extends Component {
    
    state={
        pid:1,//项目id或当前版本id
        DynamicData:this.props.planData || [],//获取
       
    }
    staticData={
        number:0
    }
    /**
     * 发送数据给
     */
    postData={
 
    }

    componentWillReceiveProps(nextProps,nextState){
      let {approvalState} = nextProps;
      this.setState({
            DynamicData:nextProps.planData,
            approvalState,
            readOnly:approvalState
           })
         //  console.log("approvalState",approvalState)
     /*    let data = nextProps.planData.map(arg=>{
            
                arg["valueId"]=iss.guid();
                arg["edit"]="+m";
              //  console.log(arg);
                return arg;
            });
            data.unshift({
                "pid": "",
                "id": "GETTYPE",
                "label": "获取方式",
                "text": null,
                "val":  ["4", "5", "6"],
                "type": "selects",
                "unit": null,
                "edit": "+m",
                "exec": "select ''  val,'请选择'  label ,0 ordernum  from dual union all select to_char(Dicvalue)  , to_char(dicName) ,SEQNUM from BT_SYSDICTIONARY where DICCATEGORYID=3 and DICLEVEL=2 and ISDEL=0 and ISENABLE=1\norder by ordernum",
                "regExp": "{type:\"number\"}",
                "colspan": 4,
                "data": [
                  {
                    "val": null,
                    "label": "请选择"
                  },


                  {
                    "val": "1",
                    "label": "拍卖"
                  },
                  {
                    "val": "2",
                    "label": "划拨"
                  },
                  {
                    "val": "3",
                    "label": "招标"
                  },
                  {
                    "val": "4",
                    "label": "并购"
                  },
                  {
                    "val": "5",
                    "label": "挂牌"
                  },
                  {
                    "val": "6",
                    "label": "协议出让"
                  },
                  {
                    "val": "7",
                    "label": "在建工程转让"
                  }
                ],
                "valuetype": null,
                "valueId": "59593EBE335547228BF73D1467CFD92F",
                "test": {
                  "check": false,
                  "val": null
                }
              }
        ) */
            this.setState({
                "DynamicData":nextProps.planData||[],
               });
    }
     shouldComponentUpdate(nextProps, nextState){
        
        return shallowCompare(this, nextProps.planData, nextState.planData);
    } 

    componentWillMount() {
    
      //  console.log("haha-will",this.props.planData)
    }
    componentDidMount() {
      
      //  console.log("haha-did",this.props.planData)
     // this.GET_FetchData()
    // knife.SET_CountExec({a:1,b:2,c:0},"{a}+{b}")
    }
    GET_FetchData=arg=>{  //测试数据减损
      let th = this;
      iss.fetch({url:"/AreaInfo/ISaveAreaPlanInfo",data:{"projectId":"d068e21e-5c2f-a0c0-1dbf-39f50bc7812c"}})
      .then(arg=>{
       // console.log("arg.row",arg.rows)
        th.setState({
          "DynamicData":arg.rows
         });
      })
    }
    BIND_CALLBACK=(da, e)=>{ //子页面返回callback
        // if(this.time){ clearTimeout(this.time) }
        var th = this;
        var el = (e&&e["target"]) ? e.target.value :e, list = this.state.DynamicData;
        list.forEach((d, i) => {
            if (da.id == d.id) {
                d["val"] = el; 
                d["test"]=da["test"]; 
                return
            }

        });
        let newList = knife.SET_CountExec(list); //通用计算
        
        th.setState({
           "DynamicData": newList
        });

        this.postData=newList.filter(arg=>{  //过滤传入所有已填数据
            if(arg["val"]){
              delete arg["parent"]
              delete arg["child"]
                return arg
            }
         
        });

       this.props["onPlanQuotaDataChange"]&&this.props.onPlanQuotaDataChange(this.postData);
      
       //let validates = knife.valid(list);  //数据校验
      // console.log(validates);
    }
    EVENT_ClickSave=arg=>{
       //  let detaileData = this.postData.filter(arg=>{ if(arg["val"]){ delete arg["parent"];delete arg["child"];return arg} }); //数据
        
          let _data_=this.postData.map((arg,ind)=>{
                return { 
                     "id":arg["id"],
                     "val":arg["val"],
                     "label":arg["label"],
                     "valueId":arg["valueId"]
                }
             }),
             versionId="e2f23b9a-31e4-821d-25cf-22c46927e1b8",//分期或版本id
             step="Vote",//阶段
             url="/AreaInfo/ISaveAreaPlanInfo";
            // console.log((detaileData));
             //return;
            // debugger
           
               

    }
    render() {
      
        return (
            <article>
                
                 <DynamicTable readOnly={this.state.readOnly}  pid={this.state.pid} DynamicData={this.state.DynamicData} CallBack={this.BIND_CALLBACK} />
            </article>
        );
    };
}

export default PlanQuota;
