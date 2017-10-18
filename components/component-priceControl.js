import React from 'react';
/**
 * 价格
 */
import ReactDOM from 'react-dom';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
import ProcessBar from "./tools-processBar.js";
import ExchangeButton from "./tools-exchangeButton.js";

class PriceControl extends React.Component {
    constructor(arg) {
        super(arg);
        this.bindTab();
        this.state = {
            actionUrl: {
                "GetDataGridTitle": "/Common/GetDataGridTitle",//由组获取指标
                "GetPriceList": "/Price/GetPriceList",//获取价格表格数据
                "GetVersions": "/Common/GetVersionListByBusinessId",//获取版本列表
                "CreatePriceVersion": "/Price/CreatePriceVersion",//创建价格管理版本
            },
            title: {//表格标题
                frozenColumns: [],//固定列
                columns: []//滚动列
            },
            gridData: [],//表格数据
            version: [],//版本
            step: -2,//阶段
            stepName: "",//阶段名称
            curVersion: ""//当前版本
        };
    }
    componentWillMount() {
        // render之前
        // sessionStorage['pricestep'] = "1";
    }
    componentDidMount() {
        // render之后
        let th = this;
        this.initDataParamers("GetVersions");
        th.icon = $(".icon-bar");
        window.onresize = arg => {
            th.icon.trigger("EVENT_TOGGLEBAR");
        }
    }
    setVersionStatus(status) {
        var _text = status == 0 ? "编制中" : status == 1 ? "审批中" : "已审批";
        $("#statusText").html(_text);
    }
    initDataParamers(type) {
        var _url = "";
        var _data;
        var _afterfn;
        var _th = this;
        switch (type) {
            case "GetDataGridTitle": {
                _url = _th.state.actionUrl.GetDataGridTitle;
                _th.loadData(_url, {
                    "columns": "PriceTitleColumns",
                    "frozenColumns": "PriceTitleFrozenColumns"
                }, function (result) {
                    _th.state.title.frozenColumns = result.frozenColumns;
                    _th.state.title.columns = result.columns;
                    _th.initDataParamers("GetPriceList");
                });
            }; break;
            case "GetPriceList": {
                _url = _th.state.actionUrl.GetPriceList;
                _th.loadData(_url, {
                    "stageversionid": _th.state.curVersion,
                    "step": _th.state.step
                }, function (result) {
                    _th.state.gridData = result;
                    setTimeout(arg => {
                        //绑定datagruid1
                        _th.bind_table()
                    }, 500);
                });
            }; break;
            case "GetVersions": {
                _url = _th.state.actionUrl.GetVersions;
                _th.loadData(_url, {
                    //"stageversionid": "111F08DBE35B4B90A9288CFC7FBEB924",
                    "versionId": iss.id.id,
                    "projectlevel": 2,
                    "step": _th.state.step,
                    "dataType": 3//1分期
                }, function (result) {
                    var _vd = [];
                    var _tdta = result;
                    var _inx = 0;
                    if (_tdta != null && _tdta.length > 0) {
                        $('.haveversion,.price-editsave').show();
                        $('.noversion').hide();
                        _inx = _tdta.length;
                        for (var i = 0; i < _inx; i++) {
                            var _t = {
                                "guid": i,
                                "value": _tdta[i].ID,
                                "text": "V" + (_tdta[i].STATUS == 99 ? _tdta[i].VERSIONCODE + " " + new Date(_tdta[i].APPROVETIME).Format("yyyy-MM-dd") : _tdta[i].VERSIONCODE),
                                "status": _tdta[i].STATUS
                            };
                            _vd.push(_t);
                        }
                        _th.state.curVersion = _tdta[0].ID;
                        if (_tdta[0].STATUS != 99) {
                            $(".price-createpriceversion").hide();
                        }else{
                            $(".price-createpriceversion").show();
                        }
                        _th.setVersionStatus(_tdta[0].STATUS);
                        _th.initDataParamers("GetDataGridTitle");
                    } else {
                        // _vd = [{
                        //     "guid": -1,
                        //     "value": -1,
                        //     "text": '无版本',
                        //     "status": -1
                        // }];
                        _vd = [];
                        $('.haveversion,.price-editsave').hide();
                        $('.noversion').show();
                        _th.initDataParamers("GetDataGridTitle");
                    }
                    _th.setState({
                        version: _vd
                    });
                });
            }; break;
            default:
        }
    }
    loadData(url, data, afterfn) {
        $.ajax({
            url: url,
            type: "POST",
            dataType: "JSON",
            data: data,
            success: function (result) {
                if (result.errorcode != 200) {
                    iss.Alert({
                        "title": "提示",
                        "content": result.message,
                        "width": 300
                    });
                } else {
                    if (typeof afterfn == "function") {
                        afterfn(result.rows);
                    }
                }
            },
            error: function (ex) {
                console.log(ex);
            }
        });
    }
    bind_table() {
        let table = this.table_ys = $("#table-ys");
        table.datagrid({
            width: "auto",
            nowrap: true,
            fitColumns: true,
            // rownumbers: true,
            singleSelect: true,
            frozenColumns: this.state.title.frozenColumns,
            columns: this.state.title.columns,
            data: this.state.gridData
        });
    }
    createNewPriceVersion() {
        var th = this;
        $.ajax({
            url: this.state.actionUrl.CreatePriceVersion,
            type: "POST",
            dataType: "JSON",
            data: {
                //"stageversionid": "111F08DBE35B4B90A9288CFC7FBEB924",
                "versionId": iss.id.id,
                "projectlevel": 2,
                "step": this.state.step
            },
            success: function (result) {
                if (result.errorcode != 200) {
                    iss.Alert({
                        "title": "提示",
                        "content": result.message,
                        "width": 300
                    });
                } else {
                    th.initDataParamers("GetVersions");
                }
            },
            error: function (ex) {
                console.log(ex);
            }
        });
    }
    changeVersion(ts, e) {
        this.state.curVersion = ts.target.value;
        $("#statusText").html(this.setVersionStatus($('#version option:selected').attr("data-status")));
        this.initDataParamers("GetPriceList");
    }
    bindTab(prop) {
        $(".JH-Content").removeClass("CLASS_AGENTY");
    }
    BIND_CALLBACK2(data) {
        debugger

    }
    /* 事件 */
    BIND_CALLBACK(data, ev) {
        this.state.step = data.guid;
        this.state.stepName = data.text;
        $('.priceTapTitle').html(data.text + "价格");
        this.initDataParamers("GetVersions");
        // iss.hashHistory.push("priceInvestment", { "state": "001" });
        // iss.hashHistory.push({
        //     pathname: "priceInvestment", state: { "state": data.guid }
        // });
        // let el = $(ev.target);
        // el.parent().find("li").removeClass("active");
        // setTimeout(() => { el.addClass("active") });
        // switch (data.tap) {
        //     case "priceInvestment": iss.hashHistory.push("component-priceControl-Investment", { "state": "001" }); break;
        //     case "priceProductlocat": iss.hashHistory.push("component-priceControl-Productlocat", { "state": "002" }); break;
        //     case "priceProjectlocat": iss.hashHistory.push("component-priceControl-Projectlocat", { "state": "003" }); break;
        //     case "priceStartup": iss.hashHistory.push("component-priceControl-Startup", { "state": "004" }); break;
        //     case "priceCertificate": iss.hashHistory.push("component-priceControl-Certificate", { "state": "005" }); break;
        //     case "priceDecision": iss.hashHistory.push("component-priceControl-Decision", { "state": "006" }); break;
        //     case "pricePresell": iss.hashHistory.push("component-priceControl-Presell", { "state": "007" }); break;
        //     case "priceContract": iss.hashHistory.push("component-priceControl-Contract", { "state": "008" }); break;
        //     case "priceDeliver": iss.hashHistory.push("component-priceControl-Deliver", { "state": "009" }); break;
        // }
    }
    render() {
        var th = this;
        let versionlist = this.state.version.map((da, ind) => {
            return <option key={ind} value={da.value} data-status={da.status}>{da.text}</option>
        })
        return <article><section>
            <header className="price" >
                <ProcessBar edit="true" callback={this.BIND_CALLBACK.bind(this)} />
                <div className="price-right">
                    <i className="addIcon"></i>
                    {/* <a className="btn-refish" href="javascript:;">生成新版本</a> */}
                </div>
                <i className="clearboth"></i>
            </header>
        </section>
            <section>
                <React-tools-tab className="React-tools-tab" id="React-tools-tab"></React-tools-tab>
                <article className="index-supply mgT20 clearboth">
                    <section className="supply-ys">
                        <header className="HeaderBar">
                            <h5>
                                <span className="price-left priceTapTitle">投决会价格</span>
                                <ul className="price-right opers">
                                    <li className="jh-icons ahover price-createpriceversion"><a className="btn-refish" href="javascript:;" onClick={this.createNewPriceVersion.bind(this)}>生成新版本</a></li>
                                    <li className="jh-icons jh-vtop price-editsave"><ExchangeButton data-unique="price" edit="true" callback={this.BIND_CALLBACK2.bind(this)} /></li>
                                    {/* <li className="jh-icons"><i className="jh-icon jh-icons-export"></i><span>导出EXCEL</span></li> */}
                                    <li className="haveversion"><span>当前版本：</span><select id="version" onChange={this.changeVersion.bind(this)}>{versionlist}</select></li>
                                    <li className="haveversion uncursor"><span>状态：</span><span id="statusText">编制中</span></li>
                                    <li className="noversion uncursor"><span>暂无版本</span></li>
                                </ul>
                            </h5>
                        </header>
                        <table className="formTable" id="table-ys" width="100%">
                        </table>
                    </section>
                </article>
            </section>
        </article>
    }
}

export default PriceControl;




// import React from 'react';
// /**
//  * 首页导航条
//  * index  identity  supply  所需
//  */
// import ReactDOM from 'react-dom';
// import "../js/iss.js";
// import "babel-polyfill";  //兼容ie
// import ProcessBar from "./tools-processBar.js";

// class PriceControl extends React.Component {
//     constructor(arg) {
//         super(arg);
//         this.bindTab();
//         this.state = {};
//     }
//     componentWillMount() {
//         // render之前
//         sessionStorage['pricestep'] = "1";
//     }
//     bindTab(prop) {
//         $(".JH-Content").removeClass("CLASS_AGENTY");
//     }
//     /* 事件 */
//     BIND_CALLBACK(data, ev) {
//         sessionStorage['pricestep'] = data.guid;
//         // iss.hashHistory.push("priceInvestment", { "state": "001" });
//         // iss.hashHistory.push({
//         //     pathname: "priceInvestment", state: { "state": data.guid }
//         // });
//         // let el = $(ev.target);
//         // el.parent().find("li").removeClass("active");
//         // setTimeout(() => { el.addClass("active") });
//         switch (data.tap) {
//             case "priceInvestment": iss.hashHistory.push("component-priceControl-Investment", { "state": "001" }); break;
//             case "priceProductlocat": iss.hashHistory.push("component-priceControl-Productlocat", { "state": "002" }); break;
//             case "priceProjectlocat": iss.hashHistory.push("component-priceControl-Projectlocat", { "state": "003" }); break;
//             case "priceStartup": iss.hashHistory.push("component-priceControl-Startup", { "state": "004" }); break;
//             case "priceCertificate": iss.hashHistory.push("component-priceControl-Certificate", { "state": "005" }); break;
//             case "priceDecision": iss.hashHistory.push("component-priceControl-Decision", { "state": "006" }); break;
//             case "pricePresell": iss.hashHistory.push("component-priceControl-Presell", { "state": "007" }); break;
//             case "priceContract": iss.hashHistory.push("component-priceControl-Contract", { "state": "008" }); break;
//             case "priceDeliver": iss.hashHistory.push("component-priceControl-Deliver", { "state": "009" }); break;
//         }
//     }
//     render() {
//         var th = this;
//         return <header className="price" >
//             <ProcessBar edit="true" callback={this.BIND_CALLBACK.bind(this)} />
//             <div className="price-right">
//                 <i className="addIcon"></i>
//                 <a className="btn-refish" href="javascript:;">生成新版本</a>
//             </div>
//             <i className="clearboth"></i>
//         </header>

//     }
// }

// export default PriceControl;






// import React from 'react';
// /**
//  * 首页导航条
//  * index  identity  supply  所需
//  */
// import ReactDOM from 'react-dom';
// import "../js/iss.js";
// import "babel-polyfill";  //兼容ie
// import ProcessBar from "./tools-processBar.js";

// class PriceControl extends React.Component {
//     constructor(arg) {
//         super(arg);
//         this.bindTab();
//         this.state = {};
//     }
//     componentWillMount() {
//         // render之前
//         sessionStorage['pricestep'] = "1";
//     }
//     bindTab(prop) {
//         $(".JH-Content").removeClass("CLASS_AGENTY");
//     }
//     /* 事件 */
//     BIND_CALLBACK(da) {
//         sessionStorage['pricestep'] = da.guid;
//         var th = this;
//         switch (da.tap) {
//             case "priceInvestment":
//             case "priceProductlocat": 
//             case "priceProjectlocat":
//             case "priceStartup": 
//             case "priceCertificate":
//             case "priceDecision": 
//             case "pricePresell": 
//             case "priceContract": 
//             case "priceDeliver": th.BIND_URL1(da); break;
//         }
//         // switch (data.tap) {
//         //     case "priceInvestment": iss.hashHistory.push("component-priceControl-Investment", { "state": "001" }); break;
//         //     case "priceProductlocat": iss.hashHistory.push("component-priceControl-Productlocat", { "state": "002" }); break;
//         //     case "priceProjectlocat": iss.hashHistory.push("component-priceControl-Projectlocat", { "state": "003" }); break;
//         //     case "priceStartup": iss.hashHistory.push("component-priceControl-Startup", { "state": "004" }); break;
//         //     case "priceCertificate": iss.hashHistory.push("component-priceControl-Certificate", { "state": "005" }); break;
//         //     case "priceDecision": iss.hashHistory.push("component-priceControl-Decision", { "state": "006" }); break;
//         //     case "pricePresell": iss.hashHistory.push("component-priceControl-Presell", { "state": "007" }); break;
//         //     case "priceContract": iss.hashHistory.push("component-priceControl-Contract", { "state": "008" }); break;
//         //     case "priceDeliver": iss.hashHistory.push("component-priceControl-Deliver", { "state": "009" }); break;
//         // }
//     }
//     BIND_URL1(da) {
//         require.ensure([], function (require) {
//             let PriceManagementTabel = require('../components/component-priceControl-Management.js').default;
//             ReactDOM.render(<PriceManagementTabel data={da} />, document.querySelector("#priceManagement"));
//         }, "component-priceControl-Management");
//     }
//     render() {
//         var th = this;
//         return <article className="price" >
//             <section>
//                 <ProcessBar edit="true" callback={this.BIND_CALLBACK.bind(this)} />
//                 <div className="price-right">
//                     <i className="addIcon"></i>
//                     <a className="btn-refish" href="javascript:;">生成新版本</a>
//                 </div>
//                 <i className="clearboth"></i>
//             </section>
//             <section>
//                 <section className="mgT10" id="priceManagement">

//                 </section>
//             </section>
//         </article>
//     }
// }

// export default PriceControl;