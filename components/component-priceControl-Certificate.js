/* 价格管理-工规证 */
import React from 'react';
import "babel-polyfill";  //兼容ie
import IndexTab from "../components/component-priceControl";//标签

class PriceCertificate extends React.Component {
    constructor(arg) {
        super(arg);
        // this.props.location.state;
        iss.hashHistory.listen((local) => {
            console.log(arguments)
            // next();
        })
        this.state = {
            actionUrl: {
                "GetDataGridTitle": "/Common/GetDataGridTitle",//由组获取指标
                "GetPriceList": "/Price/GetPriceList",//获取价格表格数据
                "GetVersions": "/Common/GetVersionListByBusinessId"//获取版本列表
            },
            title: {//表格标题
                frozenColumns: [],//固定列
                columns: []//滚动列
            },
            gridData: [],//表格数据
            version: [],//版本
            curVersion: ""//当前版本
        };
    }
    componentWillMount() {
        // render之前
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
    Event_Change_Version(data, ev) {
        // let el = $(ev.target);
        // el.parent().find("li").removeClass("active");
        // setTimeout(() => { el.addClass("active") });
    }
    addTodo(text) {

    }
    setVersionStatus(status) {
        var _text = status == 1 ? "编制中" : status == 2 ? "审批中" : "已审批";
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
                    "step": 1
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
                    "versionId": "111F08DBE35B4B90A9288CFC7FBEB924",
                    // "versionId": iss.id.id,
                    "dataType": sessionStorage['pricestep']
                }, function (result) {
                    var _vd = [];
                    var _tdta = result;
                    var _inx = 0;
                    if (_tdta != null && _tdta.length > 1) {
                        _inx = _tdta.length;
                        for (var i = 0; i < _inx; i++) {
                            var _t = {
                                "guid": i,
                                "value": _tdta[i].ID,
                                "text": _tdta[i].STATUS == 3 ? (_tdta[i].VERSIONCODE + " " + new Date(_tdta[i].APPROVETIME).Format("yyyy-MM-dd")) : _tdta[i].VERSIONCODE,
                                "status": _tdta[i].STATUS
                            };
                            _vd.push(_t);
                        }
                        _th.state.curVersion = _tdta[0].ID;
                        _th.setState({
                            version: _vd
                        });
                        _th.setVersionStatus(_tdta[0].STATUS);
                        _th.initDataParamers("GetDataGridTitle");
                    }
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
                        "title": "取数失败",
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
            rownumbers: true,
            singleSelect: true,
            frozenColumns: this.state.title.frozenColumns,
            columns: this.state.title.columns,
            data: this.state.gridData
        });
    }
    changeVersion(ts, e) {
        this.state.curVersion = ts.target.value;
        $("#statusText").html(this.setVersionStatus($('#version option:selected').attr("data-status")));
        this.initDataParamers("GetPriceList");
    }
    render() {
        let versionlist = this.state.version.map((da, ind) => {
            return <option key={ind} value={da.value} data-status={da.status}>{da.text}</option>
        })
        return <div>
            <React-tools-tab className="React-tools-tab" id="React-tools-tab"></React-tools-tab>
            <IndexTab parent={this.props} />

            <article className="index-supply mgT20 clearboth">
                <section className="supply-ys">
                    <header className="HeaderBar">
                        <h5>
                            <span className="price-left">投决会价格</span>
                            <ul className="price-right opers">
                                <li className="jh-icons"><a className="btn-refish" href="javascript:;">生成新版本</a></li>
                                <li className="jh-icons"><i className="jh-icon jh-icons-edit"></i><span>编辑</span></li>
                                {/* <li className="jh-icons"><i className="jh-icon jh-icons-export"></i><span>导出EXCEL</span></li> */}
                                <li><span>当前版本：</span><select id="version" onChange={this.changeVersion.bind(this)}>{versionlist}</select></li>
                                <li><span>状态：</span><span id="statusText">编制中</span></li>
                            </ul>
                        </h5>
                    </header>
                    <table className="formTable" id="table-ys" width="100%">
                    </table>
                </section>
            </article>
        </div>
    }
}
export default PriceCertificate;