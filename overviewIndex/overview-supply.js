import "babel-polyfill";  //兼容ie
import iss from "../js/iss.js";
import React, {Component, Children} from 'react';
import {Spin, Tabs, Row, Col, Button, Select, Modal, Table, Popconfirm, message} from 'antd';
import {WrapperTreeTable, WrapperSelect} from '../common';
import {Overview} from '../services';
import {knife} from '../utils';
import appConfig from '../app.config';
import "../css/antd.min.css";
import "../css/payment.css";
import "../css/tools-processBar.less";
import "../css/button.less";
import "../area/areaCss/areaManage.less";
import "../payment/css/sign.less";
import '../source/jquery-easyui-1.5.2/themes/bootstrap/dialog.css';
import '../source/jquery-easyui-1.5.2/themes/gray/dialog.css';
import '../source/jquery-easyui-1.5.2/themes/default/dialog.css';
import '../common/css/view.css';

const TabPane = Tabs.TabPane;

class SignIndex extends Component {

    state = {
        supperShow: true,//最高关闭阻断
        loading: true,
        dataKey: "", /*项目id或分期版本id*/
        editable: false,//是否可编辑
        dynamicHeaderData:[],
        planDataSource:[],
        dynamicDataSource:[],
        defaultHeight:200
    };


    antdTableScrollLock = null;//用来触发卸载原生事件

    componentDidMount() {
        const {nodeId, nodeLevel} = this.props;
        this.getFetData(nodeId, nodeLevel);
        this.bindScrollLock()
    }

    componentWillUnmount() {
        if (this.antdTableScrollLock) {
            this.antdTableScrollLock.remove();//注销双向绑定
        }
    }

    /**
     * 在组件接收到一个新的prop时被调用,这个方法在初始化render时不会被调用
     * param nextProps 下一阶段的props
     */
    componentWillReceiveProps(nextProps) {
        const {nodeId, nodeLevel} = this.props;
        if (nodeId != nextProps.nodeId) {
            this.getFetData(nextProps.nodeId, nextProps.nodeLevel)
        }
    }

    /**
     * 获取动态数据，获取签约计划数据，获取版本数
     */
    getFetData = (nodeId, nodeLevel) => {
        if (!nodeId || !nodeLevel) {
            return;
        }

        this.setState({
            loading: true,
        });
        return Overview.GetSupplySummary({
            nodeId,
            nodeLevel
        })
            .then(arg => {  //进行错误判断
                this.setState({
                    dynamicDataSource: arg.DynamicDataList,
                    dynamicHeaderData:arg.TitleList,
                    planDataSource:arg.HistoryDataList,
                    loading: false
                })
            }).catch(err => {
                err && iss.error(err);
                this.setState({
                    loading: false
                })
            })

    }
    /**
     * 返回当前id
     * AList 返回当前版本
     */
    getCurrentVertion = AList => {
        if (typeof AList == "string") {
            return this.state.version.versionData.filter(arg => arg.id == AList);

        } else {
            return AList && AList.length ? AList[0].id : ""
        }
    };


    handleEdit = () => {
        const {nodeId, nodeLevel} = this.props;
        Overview.SupplyExprot({
            nodeId,
            nodeLevel
        })
            .then((data) => {
                window.location.href = appConfig.domain+"/Exprot/DownLoadExcelFile/?fileName=" + data.File
            })
    };

    /**
     * 绑定双向滚动
     */
    bindScrollLock() {

        let toTable = document.querySelector(".toTable .ant-table-body"),
            pkTable = document.querySelector(".pkTable .ant-table-body");
        if (toTable && pkTable) {
            toTable.scrollTop = toTable.scrollLeft = 0;
            pkTable.scrollTop = pkTable.scrollLeft = 0;
            this.antdTableScrollLock = knife.AntdTable_ScrollLock(toTable, pkTable);
        }
    }



    /**
     * 动态调整table
     */
    renderHistoryData = () => {
        let {defaultHeight,dynamicHeaderData, dynamicDataSource} = this.state;
        
        return (
            <article className="toTable signPage">
                <header className="bottom-header-bar">
                    <Row>
                        <Col span={12}>
                            <span className="header-title">供货计划动态调整版（面积：平方米，货值：万元）</span>
                        </Col>
                        <Col span={12}>
                            <div className="RT">
                                <button className="jh_btn jh_btn22 jh_btn_edit"
                                        onClick={this.handleEdit}>导出
                                </button>
                            </div>
                        </Col>
                    </Row>
                </header>

                <WrapperTreeTable
                    headerData={dynamicHeaderData || []}
                    dataSource={dynamicDataSource || []}
                    defaultHeight={defaultHeight}
                />
            </article>
        );
    };
    /**
     * 比对table
     */
    renderCurrentData = () => {

        const {defaultHeight,dynamicHeaderData,planDataSource} = this.state;
        return (
            <article className="pkTable mgT10 signPage">
                <header className="top-header-bar">
                    <Row>
                        <Col span={24}>
                            <span className="header-title">供货计划考核版（面积：平方米，货值：万元）</span>
                        </Col>
                    </Row>
                </header>
                <WrapperTreeTable
                    headerData={dynamicHeaderData || []}
                    dataSource={planDataSource || []}
                    defaultHeight={defaultHeight}
                />
            </article>
        );
    };


    render() {
        return (
            <div className="sign-wrapper">
                <Spin size="large" spinning={this.state.loading} tip="加载中请稍后。。。">
                    <article>
                        <Row>
                            {this.renderHistoryData()}
                        </Row>
                        <Row>
                            {this.renderCurrentData()}
                        </Row>
                    </article>
                </Spin>
            </div>
        );
    }
}

export default SignIndex;