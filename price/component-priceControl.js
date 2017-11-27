/**
 * 价格
 */
import React from 'react';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
import ProcessBar from "../components/tools-processBar.js";
import ExchangeButton from "../components/tools-exchangeButton.js";
import { Spin, Tabs, Row, Col, Button, Select, Table } from 'antd';
import { AreaConstants } from '../constants';
import { AreaService } from '../services';
const { AreaManageStep, Legend } = AreaConstants;
const TabPane = Tabs.TabPane;
const { Option } = Select;
require("../css/tools-processBar.less");
require("../css/button.less");
require("../area/areaCss/areaManage.less");
 require("./price/price.less"); 
class PriceControl extends React.Component {


    //  this.bindTab();
    state = {
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
        dataKey: this.props.location.query.dataKey || "", /*项目id或分期版本id*/
        mode: this.props.location.query.isProOrStage == "1" ? "Project" : "Stage",//显示模式，项目或者分期
        stepData: [],//阶段
        gridData: [],//表格数据
        version: [],//版本
        step: -2,//阶段
        stepName: "",//阶段名称
        curVersion: "",//当前版本
        status:""//当前版本状态
    };

    priceColumns = [];//价格table表头
    priceData = [];//价格数据


    componentWillMount() {
        // render之前
        // sessionStorage['pricestep'] = "1";
    }
    /**
     * 在组件接收到一个新的prop时被调用,这个方法在初始化render时不会被调用
     * param nextProps 下一阶段的props
     */
    componentWillReceiveProps(nextProps) {
        const { dataKey, mode } = this.state;
        const { location } = nextProps;
        const nextDataKey = location.query.dataKey || "";
        let nextMode = location.query.isProOrStage || "";
        nextMode = nextMode == "1" ? "Project" : "Stage";

        //切换路由之后，重新获取数据

        if (dataKey != nextDataKey
            || mode != nextMode) {
            this.setState({
                dataKey: nextDataKey,
                mode: nextMode,
            }
            );
            this.loadStep(nextDataKey, nextMode);
        }
    }

    componentDidMount() {
        this.loadStep();
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
                        } else {
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
            }
        });
    }
    /**
  * 加载步骤
  */
    loadStep = (dataKey, mode) => {
        if (dataKey === undefined) {
            dataKey = this.state.dataKey;
            mode = this.state.mode;
        }

        if (!dataKey) {
            return;
        }

        //临时存储当前的step
        let step = undefined;
        let versionId = undefined;
        this.setState({
            loading: true,
            versionId: "",
        });

        /**
         * 先获取阶段数据 => 然后根据阶段获取版本数据 => 最后获取 规划方案指标和面积数据
         */
        AreaService.getStep(dataKey, mode)
            .then(stepData => {
                step = stepData[0];
                this.setState({
                    stepData,
                    step: step,
                });

                if (step) {
                    return AreaService.getVersion(step, dataKey, mode);
                }
                return Promise.reject("未获取到阶段数据！");
            })
            .then(versionData => {
                versionId = this.getDefaultVersionId(versionData);
                this.setState({
                    versionData,
                    versionId,
                });
                this.loadData(true, step, mode, dataKey, versionId);
            })
            .catch(error => {
                console.log("发生错误", error);
                iss.error(error);
            })
    };
    /**
     * 获取默认显示的版本Id
     * @param versionData
     * @returns {*}
     */
    getDefaultVersionId = (versionData) => {
        if (!versionData || !Array.isArray(versionData) || versionData.length === 0) {
            return "";
        }

        return versionData[0]["id"];
    };
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
    /**
  * 渲染步骤的颜色状态
  */
    renderStepLend = () => {
        return Legend.map((el, ind) => {
            return (
                <li key={ind} data-guid={el.guid} className={el.class}>{el.text}</li>
            );
        });
    };
    /**
    * 渲染步骤UI
    */
    renderStepList = () => { //阶段
        let { step, stepData } = this.state;
        let len = stepData.length;
        return stepData.map((item, ind) => {
            return (
                <li key={item.guid} style={{ zIndex: len - ind }} className={item.guid == step.guid ? "active" : ""}
                    onClick={this.handleStepClick(item)}><span className={item.className}></span>{item.name}</li>
            );
        });
    };
    /**
    * 处理步骤切换
    * 根据阶段获取版本数据 => 再获取 规划方案指标和面积数据
    */
    handleStepClick = (newStep) => {
        return () => {
            const { step, dataKey, mode } = this.state;
            if (newStep.code === step.code) return;
            let versionId = undefined;
            this.BIND_CALLBACK(newStep);



        };
    };
    /* 事件 */
    BIND_CALLBACK(data, ev) {
        this.state.step = data.guid;
        this.state.stepName = data.text;
        $('.priceTapTitle').html(data.text + "价格");
        this.initDataParamers("GetVersions");

    }
    /* 绑定button */
    BIND_Button = arg => {
        return <ul className="BTN_GROUP">
            <li className="">
            <button type="button" className="jh_btn jh_btn22 jh_btn_add" onClick={this.createNewPriceVersion.bind(this)}>生成新版本</button>
            </li>
            <li className=""></li>
            <li className=""><span>当前版本：</span><Select className="ipt90">{}</Select></li>
            <li className=""><span>状态：</span><span id="statusText">编制中</span></li>
        </ul>
    }
    render() {
        var th = this;
        let versionlist = this.state.version.map((da, ind) => {
            return <option key={ind} value={da.value} data-status={da.status}>{da.text}</option>
        })
        return <article><section className="processBar">
            <header className="price" >
                <Spin size="large" spinning={false}>
                    <Row>
                        <Col span={12}>
                            <ul className="processBar-header">
                                {this.renderStepLend()}
                            </ul>
                        </Col>
                    </Row>
                    <Row gutter={0}>
                        <Col>
                            <ul className="processBar-List">
                                {
                                    this.renderStepList()
                                }
                            </ul>
                        </Col>

                    </Row>
                </Spin>
            </header>
        </section>
            <section>
                <article className="index-supply mgT20 clearboth">
                    <section className="supply-ys">
                        <Tabs tabBarExtraContent={this.BIND_Button()}>
                            <TabPane tab="价格管理" key="plan-quota" >

                                <Spin spinning={false}>
                                    <div>
                                        <Table border columns={this.priceColumns} dataSource={this.priceData}></Table>
                                    </div>

                                </Spin>

                            </TabPane>
                        </Tabs>
                        {/*    <header className="HeaderBar">
                            <h5>
                                <span className="price-left priceTapTitle">投决会价格</span>
                                <ul className="price-right opers">
                                    <li className="jh-icons ahover price-createpriceversion"><a className="btn-refish" href="javascript:;" onClick={this.createNewPriceVersion.bind(this)}>生成新版本</a></li>
                                    <li className="jh-icons jh-vtop price-editsave"><ExchangeButton data-unique="price" edit="true" callback={this.BIND_CALLBACK2.bind(this)} /></li>
                                    <li className="haveversion"><span>当前版本：</span><select id="version" onChange={this.changeVersion.bind(this)}>{versionlist}</select></li>
                                    <li className="haveversion uncursor"><span>状态：</span><span id="statusText">编制中</span></li>
                                    <li className="noversion uncursor"><span>暂无版本</span></li>
                                </ul>
                            </h5>
                        </header>
                        <table className="formTable" id="table-ys" width="100%">
                        </table> */}
                    </section>
                </article>
            </section>
        </article>
    }
}

export default PriceControl;