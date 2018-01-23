import "babel-polyfill";  //兼容ie
import iss from "../js/iss.js";
import React, {Component, Children} from 'react';
import {Spin, Tabs, Row, Col, Button, Select, Modal, Table, Popconfirm, message} from 'antd';
import {WrapperTreeTable, WrapperSelect} from '../common';
import {Overview} from '../services';
import {knife} from '../utils';

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
        supperShow:true,//最高关闭阻断
        loading: false,
        dataKey: this.props.location.query.dataKey || "", /*项目id或分期版本id*/
        mode: this.props.location.query.isProOrStage == "1" ? "Project" : this.props.location.query.isProOrStage == "2" ? "Stage" : "",//显示模式，项目或者分期
        editable: false,//是否可编辑
        dynamicTable: {
            versionId:"",//新增的通过这个参数去获取数据发起审批相关
            DynamicDate:"",//title显示
            SupplyVersionId:"",//在弹出时需要获取的id
            dynamicHeaderData: [{
                "field": "Name",
                "align": "left",
                "name": "签约",
                "width": 250,
                "edit": null,
                "exec": null,
                "regExps": null,
                "titleUserd": null,
                "tig": null,
                "children": null
                }, {
                "field": "QP",
                "align": "center",
                "name": "全盘",
                "width": 0,
                "edit": null,
                "exec": null,
                "regExps": null,
                "titleUserd": null,
                "tig": null,
                "children": [{
                    "field": "FullSales",
                    "align": "center",
                    "name": "总可售面积",
                    "width": 0,
                    "edit": null,
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }, {
                    "field": "FullValue",
                    "align": "center",
                    "name": "总货值",
                    "width": 0,
                    "edit": null,
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }, {
                    "field": "FullBuilding",
                    "align": "center",
                    "name": "总套数",
                    "width": 0,
                    "edit": null,
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }]
                }, {
                "field": "YQY",
                "align": "center",
                "name": "截止当月1日零点期初库存(已签约)",
                "width": 0,
                "edit": null,
                "exec": null,
                "regExps": null,
                "titleUserd": null,
                "tig": null,
                "children": [{
                    "field": "ContractAreaCanBeSold",
                    "align": "center",
                    "name": "可售面积",
                    "width": 0,
                    "edit": null,
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }, {
                    "field": "ContractAmountOfMoney",
                    "align": "center",
                    "name": "金额",
                    "width": 0,
                    "edit": null,
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }, {
                    "field": "ContractHouseCount",
                    "align": "center",
                    "name": "套数",
                    "width": 0,
                    "edit": null,
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }]
                }, {
                "field": "CH",
                "align": "center",
                "name": "截止当月1日零点期初库存(存货)",
                "width": 0,
                "edit": null,
                "exec": null,
                "regExps": null,
                "titleUserd": null,
                "tig": null,
                "children": [{
                    "field": "BeginAreaCanBeSold",
                    "align": "center",
                    "name": "期初存货可售面积",
                    "width": 140,
                    "edit": null,
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }, {
                    "field": "BeginValue",
                    "align": "center",
                    "name": "期初存货货值",
                    "width": 120,
                    "edit": null,
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }, {
                    "field": "More18AreaCanBeSold",
                    "align": "center",
                    "name": "18个月以上可售面积",
                    "width": 140,
                    "edit": null,
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }, {
                    "field": "More18Value",
                    "align": "center",
                    "name": "18个月以上货值",
                    "width": 120,
                    "edit": null,
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }, {
                    "field": "Between1218AreaCanBeSold",
                    "align": "center",
                    "name": "12-18个月可售面积",
                    "width": 140,
                    "edit": null,
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }, {
                    "field": "Between1218Value",
                    "align": "center",
                    "name": "12-18个月货值",
                    "width": 120,
                    "edit": null,
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }, {
                    "field": "Between612AreaCanBeSold",
                    "align": "center",
                    "name": "6-12个月可售面积",
                    "width": 130,
                    "edit": null,
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }, {
                    "field": "Between612Value",
                    "align": "center",
                    "name": "6-12个月货值",
                    "width": 0,
                    "edit": null,
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }, {
                    "field": "Between06AreaCanBeSold",
                    "align": "center",
                    "name": "0-6个月可售面积",
                    "width": 140,
                    "edit": null,
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }, {
                    "field": "Between06Value",
                    "align": "center",
                    "name": "0-6个月货值",
                    "width": 0,
                    "edit": null,
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }]
                }, {
                "field": "FIRSEYEAR1MONTH",
                "align": "center",
                "name": "2018年1月签约",
                "width": 0,
                "edit": null,
                "exec": null,
                "regExps": null,
                "titleUserd": null,
                "tig": null,
                "children": [{
                    "field": "Y101Area",
                    "align": "center",
                    "name": "可售面积",
                    "width": 0,
                    "edit": "+w",
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }, {
                    "field": "Y101Value",
                    "align": "center",
                    "name": "货值",
                    "width": 0,
                    "edit": "+w",
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }, {
                    "field": "Y101Housecount",
                    "align": "center",
                    "name": "套数",
                    "width": 0,
                    "edit": "+w",
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }]
                }, {
                "field": "FIRSEYEAR2MONTH",
                "align": "center",
                "name": "2018年2月签约",
                "width": 0,
                "edit": null,
                "exec": null,
                "regExps": null,
                "titleUserd": null,
                "tig": null,
                "children": [{
                    "field": "Y102Area",
                    "align": "center",
                    "name": "可售面积",
                    "width": 0,
                    "edit": "+w",
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }, {
                    "field": "Y102Value",
                    "align": "center",
                    "name": "货值",
                    "width": 0,
                    "edit": "+w",
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }, {
                    "field": "Y102Housecount",
                    "align": "center",
                    "name": "套数",
                    "width": 0,
                    "edit": "+w",
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }]
                }, {
                "field": "FIRSEYEAR3MONTH",
                "align": "center",
                "name": "2018年3月签约",
                "width": 0,
                "edit": null,
                "exec": null,
                "regExps": null,
                "titleUserd": null,
                "tig": null,
                "children": [{
                    "field": "Y103Area",
                    "align": "center",
                    "name": "可售面积",
                    "width": 0,
                    "edit": "+w",
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }, {
                    "field": "Y103Value",
                    "align": "center",
                    "name": "货值",
                    "width": 0,
                    "edit": "+w",
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }, {
                    "field": "Y103Housecount",
                    "align": "center",
                    "name": "套数",
                    "width": 0,
                    "edit": "+w",
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }]
                }, {
                "field": "FIRSEYEAR4MONTH",
                "align": "center",
                "name": "2018年4月签约",
                "width": 0,
                "edit": null,
                "exec": null,
                "regExps": null,
                "titleUserd": null,
                "tig": null,
                "children": [{
                    "field": "Y104Area",
                    "align": "center",
                    "name": "可售面积",
                    "width": 0,
                    "edit": "+w",
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }, {
                    "field": "Y104Value",
                    "align": "center",
                    "name": "货值",
                    "width": 0,
                    "edit": "+w",
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }, {
                    "field": "Y104Housecount",
                    "align": "center",
                    "name": "套数",
                    "width": 0,
                    "edit": "+w",
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }]
                }, {
                "field": "FIRSEYEAR5MONTH",
                "align": "center",
                "name": "2018年5月签约",
                "width": 0,
                "edit": null,
                "exec": null,
                "regExps": null,
                "titleUserd": null,
                "tig": null,
                "children": [{
                    "field": "Y105Area",
                    "align": "center",
                    "name": "可售面积",
                    "width": 0,
                    "edit": "+w",
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }, {
                    "field": "Y105Value",
                    "align": "center",
                    "name": "货值",
                    "width": 0,
                    "edit": "+w",
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }, {
                    "field": "Y105Housecount",
                    "align": "center",
                    "name": "套数",
                    "width": 0,
                    "edit": "+w",
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }]
                }, {
                "field": "FIRSEYEAR6MONTH",
                "align": "center",
                "name": "2018年6月签约",
                "width": 0,
                "edit": null,
                "exec": null,
                "regExps": null,
                "titleUserd": null,
                "tig": null,
                "children": [{
                    "field": "Y106Area",
                    "align": "center",
                    "name": "可售面积",
                    "width": 0,
                    "edit": "+w",
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }, {
                    "field": "Y106Value",
                    "align": "center",
                    "name": "货值",
                    "width": 0,
                    "edit": "+w",
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }, {
                    "field": "Y106Housecount",
                    "align": "center",
                    "name": "套数",
                    "width": 0,
                    "edit": "+w",
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }]
                }, {
                "field": "FIRSEYEAR7MONTH",
                "align": "center",
                "name": "2018年7月签约",
                "width": 0,
                "edit": null,
                "exec": null,
                "regExps": null,
                "titleUserd": null,
                "tig": null,
                "children": [{
                    "field": "Y107Area",
                    "align": "center",
                    "name": "可售面积",
                    "width": 0,
                    "edit": "+w",
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }, {
                    "field": "Y107Value",
                    "align": "center",
                    "name": "货值",
                    "width": 0,
                    "edit": "+w",
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }, {
                    "field": "Y107Housecount",
                    "align": "center",
                    "name": "套数",
                    "width": 0,
                    "edit": "+w",
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }]
                }, {
                "field": "FIRSEYEAR8MONTH",
                "align": "center",
                "name": "2018年8月签约",
                "width": 0,
                "edit": null,
                "exec": null,
                "regExps": null,
                "titleUserd": null,
                "tig": null,
                "children": [{
                    "field": "Y108Area",
                    "align": "center",
                    "name": "可售面积",
                    "width": 0,
                    "edit": "+w",
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }, {
                    "field": "Y108Value",
                    "align": "center",
                    "name": "货值",
                    "width": 0,
                    "edit": "+w",
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }, {
                    "field": "Y108Housecount",
                    "align": "center",
                    "name": "套数",
                    "width": 0,
                    "edit": "+w",
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }]
                }, {
                "field": "FIRSEYEAR9MONTH",
                "align": "center",
                "name": "2018年9月签约",
                "width": 0,
                "edit": null,
                "exec": null,
                "regExps": null,
                "titleUserd": null,
                "tig": null,
                "children": [{
                    "field": "Y109Area",
                    "align": "center",
                    "name": "可售面积",
                    "width": 0,
                    "edit": "+w",
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }, {
                    "field": "Y109Value",
                    "align": "center",
                    "name": "货值",
                    "width": 0,
                    "edit": "+w",
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }, {
                    "field": "Y109Housecount",
                    "align": "center",
                    "name": "套数",
                    "width": 0,
                    "edit": "+w",
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }]
                }, {
                "field": "FIRSEYEAR10MONTH",
                "align": "center",
                "name": "2018年10月签约",
                "width": 0,
                "edit": null,
                "exec": null,
                "regExps": null,
                "titleUserd": null,
                "tig": null,
                "children": [{
                    "field": "Y110Area",
                    "align": "center",
                    "name": "可售面积",
                    "width": 0,
                    "edit": "+w",
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }, {
                    "field": "Y110Value",
                    "align": "center",
                    "name": "货值",
                    "width": 0,
                    "edit": "+w",
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }, {
                    "field": "Y110Housecount",
                    "align": "center",
                    "name": "套数",
                    "width": 0,
                    "edit": "+w",
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }]
                }, {
                "field": "FIRSEYEAR11MONTH",
                "align": "center",
                "name": "2018年11月签约",
                "width": 0,
                "edit": null,
                "exec": null,
                "regExps": null,
                "titleUserd": null,
                "tig": null,
                "children": [{
                    "field": "Y111Area",
                    "align": "center",
                    "name": "可售面积",
                    "width": 0,
                    "edit": "+w",
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }, {
                    "field": "Y111Value",
                    "align": "center",
                    "name": "货值",
                    "width": 0,
                    "edit": "+w",
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }, {
                    "field": "Y111Housecount",
                    "align": "center",
                    "name": "套数",
                    "width": 0,
                    "edit": "+w",
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }]
                }, {
                "field": "FIRSEYEAR12MONTH",
                "align": "center",
                "name": "2018年12月签约",
                "width": 0,
                "edit": null,
                "exec": null,
                "regExps": null,
                "titleUserd": null,
                "tig": null,
                "children": [{
                    "field": "Y112Area",
                    "align": "center",
                    "name": "可售面积",
                    "width": 0,
                    "edit": "+w",
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }, {
                    "field": "Y112Value",
                    "align": "center",
                    "name": "货值",
                    "width": 0,
                    "edit": "+w",
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }, {
                    "field": "Y112Housecount",
                    "align": "center",
                    "name": "套数",
                    "width": 0,
                    "edit": "+w",
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }]
                }, {
                "field": "SECONDYEAR1MONTH",
                "align": "center",
                "name": "2019年1月签约",
                "width": 0,
                "edit": null,
                "exec": null,
                "regExps": null,
                "titleUserd": null,
                "tig": null,
                "children": [{
                    "field": "Y201Area",
                    "align": "center",
                    "name": "可售面积",
                    "width": 0,
                    "edit": "+w",
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }, {
                    "field": "Y201Value",
                    "align": "center",
                    "name": "货值",
                    "width": 0,
                    "edit": "+w",
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }, {
                    "field": "Y201Housecount",
                    "align": "center",
                    "name": "套数",
                    "width": 0,
                    "edit": "+w",
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }]
                }, {
                "field": "SECONDYEAR2MONTH",
                "align": "center",
                "name": "2019年2月签约",
                "width": 0,
                "edit": null,
                "exec": null,
                "regExps": null,
                "titleUserd": null,
                "tig": null,
                "children": [{
                    "field": "Y202Area",
                    "align": "center",
                    "name": "可售面积",
                    "width": 0,
                    "edit": "+w",
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }, {
                    "field": "Y202Value",
                    "align": "center",
                    "name": "货值",
                    "width": 0,
                    "edit": "+w",
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }, {
                    "field": "Y202Housecount",
                    "align": "center",
                    "name": "套数",
                    "width": 0,
                    "edit": "+w",
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }]
                }, {
                "field": "SECONDYEAR3MONTH",
                "align": "center",
                "name": "2019年3月签约",
                "width": 0,
                "edit": null,
                "exec": null,
                "regExps": null,
                "titleUserd": null,
                "tig": null,
                "children": [{
                    "field": "Y203Area",
                    "align": "center",
                    "name": "可售面积",
                    "width": 0,
                    "edit": "+w",
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }, {
                    "field": "Y203Value",
                    "align": "center",
                    "name": "货值",
                    "width": 0,
                    "edit": "+w",
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }, {
                    "field": "Y203Housecount",
                    "align": "center",
                    "name": "套数",
                    "width": 0,
                    "edit": "+w",
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }]
                }, {
                "field": "SECONDYEAR4MONTH",
                "align": "center",
                "name": "2019年4月签约",
                "width": 0,
                "edit": null,
                "exec": null,
                "regExps": null,
                "titleUserd": null,
                "tig": null,
                "children": [{
                    "field": "Y204Area",
                    "align": "center",
                    "name": "可售面积",
                    "width": 0,
                    "edit": "+w",
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }, {
                    "field": "Y204Value",
                    "align": "center",
                    "name": "货值",
                    "width": 0,
                    "edit": "+w",
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }, {
                    "field": "Y204Housecount",
                    "align": "center",
                    "name": "套数",
                    "width": 0,
                    "edit": "+w",
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }]
                }, {
                "field": "SECONDYEAR5MONTH",
                "align": "center",
                "name": "2019年5月签约",
                "width": 0,
                "edit": null,
                "exec": null,
                "regExps": null,
                "titleUserd": null,
                "tig": null,
                "children": [{
                    "field": "Y205Area",
                    "align": "center",
                    "name": "可售面积",
                    "width": 0,
                    "edit": "+w",
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }, {
                    "field": "Y205Value",
                    "align": "center",
                    "name": "货值",
                    "width": 0,
                    "edit": "+w",
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }, {
                    "field": "Y205Housecount",
                    "align": "center",
                    "name": "套数",
                    "width": 0,
                    "edit": "+w",
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }]
                }, {
                "field": "SECONDYEAR6MONTH",
                "align": "center",
                "name": "2019年6月签约",
                "width": 0,
                "edit": null,
                "exec": null,
                "regExps": null,
                "titleUserd": null,
                "tig": null,
                "children": [{
                    "field": "Y206Area",
                    "align": "center",
                    "name": "可售面积",
                    "width": 0,
                    "edit": "+w",
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }, {
                    "field": "Y206Value",
                    "align": "center",
                    "name": "货值",
                    "width": 0,
                    "edit": "+w",
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }, {
                    "field": "Y206Housecount",
                    "align": "center",
                    "name": "套数",
                    "width": 0,
                    "edit": "+w",
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }]
                }, {
                "field": "SECONDYEAR7MONTH",
                "align": "center",
                "name": "2019年7月签约",
                "width": 0,
                "edit": null,
                "exec": null,
                "regExps": null,
                "titleUserd": null,
                "tig": null,
                "children": [{
                    "field": "Y207Area",
                    "align": "center",
                    "name": "可售面积",
                    "width": 0,
                    "edit": "+w",
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }, {
                    "field": "Y207Value",
                    "align": "center",
                    "name": "货值",
                    "width": 0,
                    "edit": "+w",
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }, {
                    "field": "Y207Housecount",
                    "align": "center",
                    "name": "套数",
                    "width": 0,
                    "edit": "+w",
                    "exec": null,
                    "regExps": null,
                    "titleUserd": null,
                    "tig": null,
                    "children": null
                }]
            }],//动态调整版头部
            dynamicDataSource: [],//动态调整版数据
            dynamicEdit: false, //动态调整是否可编辑
            dynamicEditButtonShow: false,
            loading: false,
            defaultHeight: 200
        },
        planTable: { //同上
            planHeaderData: [],
            planDataSource: [],
            planEdit: false,
            loading: true
        },
        version: { //版本
            
            currentVersion: "",//当前版本
            versionData: [], //版本数据
            versionShow: false //是否显示版本
        },
        dialog: { //弹窗
            ModalVisible: false,
            dialogContent: [],//弹出窗口content
            dataSource: [], //数据
            columns: [
                {dataIndex:"SupplyDate",title:"日期",width:80,key:"SupplyDate"},
                {dataIndex:"SourceSaleArea",title:"可售面积（㎡）",width:80,key:"SourceSaleArea"},
                {dataIndex:"SourceMonery",title:"货值（万元）",width:80,key:"SourceMonery"},
                {dataIndex:"SourceNumber",title:"套数（套）",width:80,key:"SourceNumber"},
            ] //表头
        }


    };
    //版本信息私有数据
    version = { //版本
        currentVersion: "",//当前版本
        versionData: [], //版本数据
        versionShow: false //是否显示版本
    };

    //protected 数据
    dynamicTable = {           //动态表格私有仓储
        versionId:"",          //新增的通过这个参数去获取数据发起审批相关
        DynamicDate:"",        //titile显示
        TitleList:[],          //在inof中获取表头数据
        SupplyVersionId:"",    //在弹出时需要获取的id
        DynamicId: "",         //新加入的id，用此id获取动态调整版数据
        Permission: "",        //新加入是否可以编辑
        Status: "",            //新加入当前阶段,接口0 编制中 10提交 -1 退回，只有0可以编辑提交驳回
        Permission:"edit",     //瑞涛添加通过是否为edit判断是否可以编辑
        VersionList: [],       //新加入不知道是什么
        StartYear: "",         //新加入起始年份
        number: 0,             //死循环记录
        dynamicRender: {
            "showName": (text, record) => {
            let {LEVELS,children}=record;
           return children? <span>{text}</span>:<a href="javascript:;" onClick={this.clickOpenDialog.bind(this, text, record)}>{text}</a>
        }

        },                           //动态编辑表格
        status: "",                  //接口0 编制中 10提交 -1 退回，只有0可以编辑提交驳回
        startYear: "",               //起始年
        signAContractVersionId: "",  //调整版本id
        saveData: {}                 //保存数据临时存储
    }
    antdTableScrollLock = null;//用来触发卸载原生事件

    componentDidMount() {
        let {dataKey} = this.state;
        
        this.pageInt()
        
     
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
        const {dataKey} = this.state;
        const {location} = nextProps;
        const nextDataKey = location.query.dataKey || "";
        let nextMode = location.query.isProOrStage || "";
        nextMode = nextMode == "1" ? "Project" : nextMode == "2" ? "Stage" : "";
        //切换路由之后，重新获取数据

        if (dataKey != nextDataKey) {
            this.setState({
                    supperShow:true,
                    loading: true,
                    dataKey: nextDataKey,
                    mode: nextMode,
                    activeTapKey: "plan-quota",
                }, arg => {
                    if (nextDataKey) {
                        this.pageInt()
                    }
                }
            );
        }
    }
    pageInt=()=>{
        this.getFetData()
    }

    /**
     * 初始化数据
     */
    setStartData = () => {
        let {dynamicTable, planTable, version,dialog} = this.state;
        dynamicTable = {...dynamicTable, dynamicDataSource: [], dynamicEditButtonShow: false}
        planTable = {...planTable, planDataSource: []}
        version = {...version, versionData: [], versionShow: false}
        dialog = {...dialog,ModalVisible:false}
        this.setState({
            dynamicTable,
            planTable,
            version,
            dialog
        });
    }

    /**
     * 获取动态数据，获取签约计划数据，获取版本数
     */
    getFetData = () => {
        console.log("props",this.props)
        let {dataKey, mode} = this.state;
        let {versionId}=this.dynamicTable;
        this.dynamicTable.saveData = {};
        versionId = versionId||"";
        //获取基础数据=瑞涛
        return Overview.GetSignSummary({
            nodeId:this.props.location.state.id,
            nodeLevel:this.props.location.state.level_id
        })
        .then(arg => {  //进行错误判断
            var obj = this.state.dynamicTable
            arg.DynamicDataList.forEach((el,ind)=>{
                el.children = el.Children
                el.key = ind+1
            });
            obj.dynamicDataSource = arg.DynamicDataList
            
            this.setState({
                dynamicTable:obj
            })
        }).catch(err => {

            err && iss.error(err);
            this.setState({
                loading: false
            })
        })

    }
    /**
     * 获取动态数据、比对数据并锁定表格
     */
    PromiseAllAndLockScroll = params => {
        //获取动态调整表格数据
        let dynamicTable = this.getDynamicData();
        //获取比对版数据   
        let planTable = this.getPlanData();

        return Promise.all([dynamicTable, planTable])
                      .then(arg => {
            //获取弹窗数据如果需要，因为张权说要给一个获取的id不知道依赖在哪里，先放到这,估计需要从动态表获取
            this.bindScrollLock();
                             })
                    .catch(error => {
            let {message}=error
            iss.error(message);
            this.setState({
                loading: false,
            });
            
        })
    }

    /**
     * 获取动态调整版数据
     * return promise
     */
    getDynamicData = () => {
        let {dynamicTable, dataKey, mode,supperShow} = this.state;
        let {DynamicId} = this.dynamicTable;

        //dynamicHeaderData:[],//动态调整版头部 dynamicDataSource:[],//动态调整版数据
        //瑞涛版数据
        
        return Payment.IGetSignDataByVersionId({DynamicId, mode})
        .then(dynamicDataSource => {
            
            let {Permission,TitleList:dynamicHeaderData,DynamicDate} = this.dynamicTable;
            let  newData = {
                    DynamicDate,
                    dynamicHeaderData,
                    dynamicDataSource,
                    dynamicEdit: false,
                    dynamicEditButtonShow:Boolean(Permission ==`edit`&& dynamicDataSource["length"]),
                },
                dynamicTable = {...this.state.dynamicTable, ...newData};
                
            this.setState({dynamicTable, loading: false});
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
    }
    /**
     * 获取当前版本下比对版本数据
     * currentVersion 当前版本 返回Promise
     */
    getCurrentVersionPlanData = currentVersion => {
        let {mode} = this.state;
        return Payment.IGetSignDataByVersionId({DynamicId: currentVersion, mode}); //获取数据

    }
    /**
     * 获取计划版数据
     * return promise 884dd5a6-ff48-4628-f4fa-294472d49b37
     */
    getPlanData = () => {

        let {planTable, version, dynamicTable, dataKey, mode} = this.state;
        let {dynamicHeaderData} = dynamicTable;
        let {versionData} = this.version;
        // dataKey = "4100835d-2464-2f9e-5086-bc46a8af14f4";
        //dynamicHeaderData:[],//动态调整版头部 dynamicDataSource:[],//动态调整版数据
        let currentVersion = this.getCurrentVertion(versionData);

        //瑞涛获取数据版本
        return Payment.IGetSignDataByVersionId({DynamicId: currentVersion, mode})
            .then((planDataSource) => {
                let newData = { //table数据
                        dynamicHeaderData,
                        planDataSource,
                        // planEditButtonShow:Boolean(planDataSource&&planDataSource.length)
                    },
                    newVersion = { //版本数据
                        currentVersion,
                        versionData,
                        versionShow: true
                    }
                planTable = {...planTable, ...newData};
                version = {...version, ...newVersion};

                this.setState({planTable, version});

            })
    }

    /**
     * 是否编辑行
     * 递归查询此处如果数据有问题容易出现bug目前先不用
     */
    setDynamicRender(text, record, index) {


        /* if (this.dynamicTable.number += 1, this.dynamicTable.number > 1000) {
            console.log("强制判断如果列数据大于1000或死循环强制推出防止如果后台数据有误造成的死循环");
            return
        }

        dynamicColum.forEach(arg => {
            if (arg.children) {
                this.setDynamicRender(arg.children);
            } else {
                this.dynamicTable.dynamicRender[arg.field] = this.setDynamicColumns;
            }
        }) */

    }

    /**
     * 动态编辑数据
     */
    setDynamicColumns(text, value, index) {

        return text;
    }

    handleEdit = () => {
        Overview.SignExprot({
            nodeId:this.props.location.state.id,
            nodeLevel:this.props.location.state.level_id
        })
        .then((planDataSource) => {
            console.log(planDataSource)
        })
    };

  
    /**
     * 返回数据
     */
    filterSaveData = da => {
        da.map(arg => {
            if (arg.children && arg.children.length) {
                this.filterSaveData(arg.children)
            } else if(!arg.children) {
                //console.log(`${arg.GROUPNAME}=>${arg.PROJECTNAME}=>${arg.TYPENAME}`)
               // debugger
                for (let key in arg) {
                    let reg = /^Y\d{3}/ig,mon=key.substr(2, 2),reg3=/Y3\d{2}Q\w/,yearNum=key.substr(1,1);
                     if(yearNum=="3"&&!reg3.test(key)){ //用来处理第三年非带Q字段不获取-瑞涛版
                        continue 
                    } 
                    if (reg.test(key) && arg[key] !== "") {
                        let {StartYear} = this.dynamicTable;
                        StartYear = eval(StartYear + "-1+" + yearNum)
                        let _da = {
                            dataType: key.substr(4),
                            titlename: `${StartYear}-${mon}-01`,
                            productTypeID: arg["showId"] || "",
                            GROUPID: arg["GROUPID"],
                            val: arg[key]
                        }
                        this.dynamicTable.saveData[_da.titlename + "-" + key + "-" + arg.key] = _da;
                    }
                }

            }
        })
    }


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
     * 弹出点击取消
     */
    clickModalCancel = () => {
        let dialog = {...this.state.dialog,ModalVisible: false}
        this.setState({dialog})
    }
    /**
     * 弹出确定
     */
    clickModalOk = () => {
        let dialog = {...this.state.dialog,ModalVisible: false}
        this.setState({dialog})
    }
    renderContent = (arg) => {
        let {dialogContent} = this.state.dialog;

    }

    clickOpenDialog(text, row, index) {
        let {dialog}=this.state;
        let {SupplyVersionId:supplyid}=this.dynamicTable;
        let {columns}=dialog;
        //supplyid,producttypeid
        let {PRODUCTTYPEID:producttypeid}=row;
        
        Payment.ISingSupplyData({supplyid,producttypeid})
               .then(dialogContent=>{
                    dialog = {...dialog,columns,dialogContent,ModalVisible: true};
                    this.setState({
                        dialog
                    })
               })
               .catch(err=>{
                   iss.error(err);
               })
        
       

    }

    /**
     * 版本下拉菜单事件
     */
    selectChangeVersion = params => {
        // let _da= this.getCurrentVertion(params);
        let versionId = params; // _da.length? _da[0].id:"";
        let {version, planTable} = this.state;
        let {dynamicHeaderData} = this.state.dynamicTable
        version = {...version, currentVersion: params}
        if (versionId) {

            this.getCurrentVersionPlanData(versionId)
                .then((planDataSource) => {
                    let {planTable} = this.state;
                    let newData = {
                        dynamicHeaderData,
                        planDataSource
                    }
                    planTable = {...planTable, ...newData};
                    this.setState({
                        planTable,
                        version
                    })

                })
                .catch(error => {
                    iss.error(error);
                })
        } else {
            planTable = {...planTable, planDataSource: []};
            this.setState({planTable, version})
        }

    }

    /**
     * 动态调整table
     */
    renderHistoryData = () => {
        console.log(this.props)
        let {versionData, versionId, editable, dynamicTable, loading,supperShow} = this.state;
        let {dynamicHeaderData, dynamicDataSource, dynamicEdit, dynamicEditButtonShow, defaultHeight,DynamicDate} = dynamicTable;
        dynamicEditButtonShow = (supperShow&&dynamicEditButtonShow);//保存后不能编辑
        return (
            <article className="toTable signPage">
                <header className="bottom-header-bar">
                    <Row>
                        <Col span={12}>
                            <span className="header-title">签约计划{DynamicDate}动态调整版（面积：平方米，货值：万元）</span>
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
                    loading={loading}
                    size="small"
                    defaultHeight={defaultHeight}
                    //  onDataChange={this.onDataChangeDynamic}
                    headerData={dynamicHeaderData || []}
                    editState={dynamicEdit}
                    editMode="LastLevel"
                    dataSource={dynamicDataSource || []}
                    columnRender={this.dynamicTable.dynamicRender}
                />
            </article>
        );
    };
    /**
     * 比对table
     */
    renderCurrentData = () => {
        
        const {planTable, dynamicTable, version} = this.state;
        const {planHeaderData, planDataSource} = planTable;
        const {versionData, versionShow, versionId, currentVersion} = version;
        const {dynamicHeaderData, defaultHeight,DynamicDate} = dynamicTable;
        return (
            <article className="pkTable mgT10 signPage">
                <header className="top-header-bar">
                    <Row>
                        <Col span={12}>
                            <span className="header-title">签约计划考核版（面积：平方米，货值：万元）</span>
                        </Col>
                        <Col span={12} className="action-section">
                            <WrapperSelect className={versionShow ? "select-version" : "hide"} labelText="版本:"
                                           dataSource={versionData}
                                           value={currentVersion}
                                           defaultHeight={defaultHeight}
                                           onChange={this.selectChangeVersion}></WrapperSelect>
                        </Col>
                    </Row>
                </header>
                <WrapperTreeTable
                    headerData={dynamicHeaderData || []}
                    dataSource={planDataSource || []}/>
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