/*审批信息*/
import React from 'react';
/**
 * 首页导航条
 * index  identity  supply  所需
 */
import ReactDOM from 'react-dom';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
import DynamicTable from "../components/tools-dynamicTable.js"; //地块
import NewProjectCountView from "../components/component-newProject-countView.js";//项目基本信息
import "../css/tools-dynamicTable.less";//专用css  
class OverviewProject extends React.Component {
    constructor(arg) {
        super(arg);
        this.state = {
            CountData: [],//地块统计数据
            pid:this.props.location.query["dataKey"],//地块id
            propsDATA:[],//地块数据
            //allSearchArg:this.props.location.query,/*地址栏所有参数*/
        }
    }
    componentWillMount(){
      this.BIIND_FIST_LAND();
    }
    
    BIIND_FIST_LAND() {  //获取已有地块
        let THIS = this;
        let id = this.props.location.query["dataKey"]; //iss.id.id;
        iss.ajax({  //获取已有地块
            url: "/Project/IProjectLandsInfo",
            data: { projectId: id },
            success(d) {
                if (d.rows) {
                    var da = {};
                    d.rows.forEach((el, ind) => {
                        if (ind == 0) { //初次加载地块

                            THIS.setState({
                                propsDATA: el["FieldList"]
                            })
                        }
                        da[el.LandId] = el;
                    });

                    THIS.setState({
                        DynamicData: da
                    });
                }
            }
        });
        //Project/ILandsStatistics  土地动态统计
        iss.ajax({
            url: "/Project/ILandsStatistics",
            success(a) {

                if (a["rows"]) {
                    THIS.setState({
                        CountData: a["rows"]
                    }, arg => {
                        setTimeout(arg => {

                            THIS.BIND_COUNT_GETMAP();
                        }, 2000);
                    });
                }
            }
        });
    }
    BIND_COUNT_GETMAP() { //地块统计
        let da = this.state.CountData, th = this;
        //   var t = new Date().getTime();
        da.forEach((el, ind) => {
            let reg = /\{.*?\}[\+\-\*\/]/, regcount = /\{.*?\}/ig, arr = regcount.exec(el.exec || ""), list = th.state.DynamicData;
            let reg2 = /\<.*?\>[\+\-\*\/]/,regcount2 = /\<.*?\>/ig,arr2 = el.exec.match(regcount2),list2 = th.state.CountData;
            if (el.exec && !reg.exec(el.exec)) {
                if (arr && arr[0]) {
                    let _id = arr[0].replace(/[{}]/ig, ""), _str = [];
                    for (let v in list) {
                        list[v]["FieldList"].forEach((ee, ii) => {
                            if (ee["id"] == _id) {
                                _str.push(~~ee["val"]);
                                return
                            }
                        })

                    }
                    let n_n = eval(_str.join("+"));
                    el.val=n_n==Infinity? 0:n_n;
                    return;
                } else if(el.exec&&reg2.exec(el.exec)){
                     let  str = el.exec,nums=0;
                    arr2.forEach((ee,ii)=>{
                        let _id_=ee.replace(/[\<\>]/ig,"");
                        list2.forEach((eee,iii)=>{
                            if(eee.id==_id_){
                               str=str.replace(ee,~~eee.val);
                            }
                        })
                    });
                    let _n_n_ = eval(str);
                    el.val=(_n_n_==Infinity||!_n_n_)? 0:_n_n_;
                    return
                } 
            }
        });
        
        th.setState({
            CountData: da
        });
     
    }
    BIND_COUNT_DATACALLBACK() { //地块统计完成回掉

    }
    EVENT_CLICK_LANDBTN(id, e){
        let self = $(e.target), pa = self.parent();
        pa.find("li").removeClass("active");
        self.addClass("active");
        this.setState({
            pid: id,
            propsDATA: this.state.DynamicData[id]["FieldList"]
        });
    }
    BIND_CALLBACK(){ } //地块变更回掉
    BIND_LAND_BTN(){
        let map = [], li = this.state.DynamicData, name = "新增地块", g = 0;
        for (var i in li) {
            g += 1;
            for (var f = 0; f < li[i].FieldList.length; f++) {
                if (li[i].FieldList[f]["label"] == "地块名称") {
                    name = li[i].FieldList[f]["val"] || `未命名地块${g}`
                    break;
                }
            }
            map.push(<li onClick={this.EVENT_CLICK_LANDBTN.bind(this, li[i].LandId)} key={g} data-id={li[i].LandId}>{name}</li>)
        }
        return map;
    }
 
    render() {
        let th = this;
        let stateData=th.state;
        return <section>
            <NewProjectCountView all={this.props.location} />
            <section>
                <h3 className="boxGroupTit">
                    <p>
                        <span>地块信息</span>
                    </p>
                </h3>

                <div>
                    <DynamicTable pid="DynamicTabl1" DynamicData={this.state.CountData} CallBack={this.BIND_COUNT_DATACALLBACK.bind(this)} />
                </div>
                <div>
                    <ul className="BIND_LAND_BTN">
                        {this.BIND_LAND_BTN()}
                    </ul>
                    <DynamicTable readOnly="true" pid={this.state.pid} DynamicData={this.state.propsDATA} CallBack={this.BIND_CALLBACK.bind(this)} />
                </div>
            </section>
        </section>

    }
}
export default OverviewProject;