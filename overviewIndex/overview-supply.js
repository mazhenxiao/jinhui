//供货
import "babel-polyfill";  //兼容ie
import iss from "../js/iss.js";
import React, {Component} from 'react';
import {Spin, Menu, Table, Input, Dropdown, Icon, Tabs, Row, Col, Button, Select} from 'antd';
import {WrapperTreeTable} from '../common';

require("../css/antd.min.css");
require("../css/payment.css");
require("../area/areaCss/areaManage.less");

class OverviewSupply extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [{
                key: 1,
                Name: '项目1—分期1-地块1',
                TotalArea: '22',
                TotalSaleArea: '3',
                TotalMonery: '4',
                TotalBuildingArea: '5',
                SuppliedSaleArea: '6',
                SuppliedMonery: '7',
                SuppliedNumber: '8',
                StockInitInvSaleaArea: '9',
                StockInitInvMonery: '10',
                Stock18MonthSaleArea: '11',
                Stock18MonthMonery: '12',
                Stock12MonthSaleArea: '10',
                Stock12MonthMonery:'23',
                Stock6MonthSaleArea:'34',
                Stock6MonthMonery:'2',
                StockMonthSaleArea:'34',
                StockMonthMonery:'23',
                children: [{
                    key: 11,
                    Name: '1组团',
                    TotalArea: '22',
                    TotalSaleArea: '3',
                    TotalMonery: '4',
                    TotalBuildingArea: '5',
                    SuppliedSaleArea: '6',
                    SuppliedMonery: '7',
                    SuppliedNumber: '8',
                    StockInitInvSaleaArea: '9',
                    StockInitInvMonery: '10',
                    Stock18MonthSaleArea: '11',
                    Stock18MonthMonery: '12',
                    Stock12MonthSaleArea: '10',
                    Stock12MonthMonery:'23',
                    Stock6MonthSaleArea:'34',
                    Stock6MonthMonery:'2',
                    StockMonthSaleArea:'34',
                    StockMonthMonery:'23',
                    children: [{
                        key: 111,
                        Name: '叠拼别墅',
                        TotalArea: '22',
                        TotalSaleArea: '3',
                        TotalMonery: '4',
                        TotalBuildingArea: '5',
                        SuppliedSaleArea: '6',
                        SuppliedMonery: '7',
                        SuppliedNumber: '8',
                        StockInitInvSaleaArea: '9',
                        StockInitInvMonery: '10',
                        Stock18MonthSaleArea: '11',
                        Stock18MonthMonery: '12',
                        Stock12MonthSaleArea: '10',
                        Stock12MonthMonery:'23',
                        Stock6MonthSaleArea:'34',
                        Stock6MonthMonery:'2',
                        StockMonthSaleArea:'34',
                        StockMonthMonery:'23',
                    }],
                }, {
                    key: 12,
                    Name: '未分配车位',
                    TotalArea: '22',
                    TotalSaleArea: '3',
                    TotalMonery: '4',
                    TotalBuildingArea: '5',
                    SuppliedSaleArea: '6',
                    SuppliedMonery: '7',
                    SuppliedNumber: '8',
                    StockInitInvSaleaArea: '9',
                    StockInitInvMonery: '10',
                    Stock18MonthSaleArea: '11',
                    Stock18MonthMonery: '12',
                    Stock12MonthSaleArea: '10',
                    Stock12MonthMonery:'23',
                    Stock6MonthSaleArea:'34',
                    Stock6MonthMonery:'2',
                    StockMonthSaleArea:'34',
                    StockMonthMonery:'23',
                    children: [{
                        key: 112,
                        Name: '可售楼栋',
                        TotalArea: '22',
                        TotalSaleArea: '3',
                        TotalMonery: '4',
                        TotalBuildingArea: '5',
                        SuppliedSaleArea: '6',
                        SuppliedMonery: '7',
                        SuppliedNumber: '8',
                        StockInitInvSaleaArea: '9',
                        StockInitInvMonery: '10',
                        Stock18MonthSaleArea: '11',
                        Stock18MonthMonery: '12',
                        Stock12MonthSaleArea: '10',
                        Stock12MonthMonery:'23',
                        Stock6MonthSaleArea:'34',
                        Stock6MonthMonery:'2',
                        StockMonthSaleArea:'34',
                        StockMonthMonery:'23',
                    }],
                }],
            }],
            loading: false,
            editstatu: false
        }
        this.columns = [{
            title: '供货',
            dataIndex: 'Name',
            width: 250,
            className:"CM",
            fixed:"left"
        },
        {
            title: '全盘',
            className:"CM",
            children:[
                {
                    title: '总建筑面积',
                    dataIndex: 'TotalArea',
                    width: 80,
                    className:"CM"
                },
                {
                    title: '总可售面积',
                    dataIndex: 'TotalSaleArea',
                    width: 80,
                    className:"CM"
                },
                {
                    title: '总货值',
                    dataIndex: 'TotalMonery',
                    width: 80,
                    className:"CM"
                }
            ]
        },
        {
            title: '截止当月1日零点期初库存',
            className:"CM",
            children: [
                {
                    title: '总建筑面积',
                    dataIndex: 'TotalBuildingArea',
                    width: 80,
                    className:"CM"
                },
                {
                    title: '已供货',
                    className:"CM",
                    children: [
                        {
                            title: '可售面积',
                            dataIndex: 'SuppliedSaleArea',
                            width: 80,
                            className:"CM"
                        },
                        {
                            title: '金额',
                            dataIndex: 'SuppliedMonery',
                            width: 80,
                            className:"CM"
                        },
                        {
                            title: '套数',
                            dataIndex: 'SuppliedNumber',
                            width: 80,
                            className:"CM"

                        }
                    ]
                },
                {
                    title: '存货',
                    className:"CM",
                    children: [
                        {
                            title: '期初存货可售面积',
                            dataIndex: 'StockInitInvSaleaArea',
                            width: 80,
                            className:"CM"
                        },
                        {
                            title: '期初存货货值',
                            dataIndex: 'StockInitInvMonery',
                            width: 80,
                            className:"CM"
                        },
                        {
                            title: '18个月以上可售面积',
                            dataIndex: 'Stock18MonthSaleArea',
                            width: 80,
                            className:"CM"
                        },
                        {
                            title: '18个月以上货值',
                            dataIndex: 'Stock18MonthMonery',
                            width: 80,
                            className:"CM"
                        },
                        {
                            title: '12-18个月可售面积',
                            dataIndex: 'Stock12MonthSaleArea',
                            width: 80,
                            className:"CM"
                        },
                        {
                            title: '12-18个月货值',
                            dataIndex: 'Stock12MonthMonery',
                            width: 80,
                            className:"CM"
                        },
                        {
                            title: '6-12个月可售面积',
                            dataIndex: 'Stock6MonthSaleArea',
                            width: 80,
                            className:"CM"
                        },
                        {
                            title: '6-12个月货值',
                            dataIndex: 'Stock6MonthMonery',
                            width: 80,
                            className:"CM"
                        },
                        {
                            title: '0-6个月可售面积',
                            dataIndex: 'StockMonthSaleArea',
                            width: 80,
                            className:"CM"
                        },
                        {
                            title: '0-6个月货值',
                            dataIndex: 'StockMonthMonery',
                            width: 80,
                            className:"CM"
                        }
                    ]
                }
            ]
        }],
            this.oldData = this.state.data,
            this.scrollWidth = 0;
    }

    componentWillMount() {
        this.addWidth(this.columns)
       
    }
    componentDidMount(){
    }

    //设置宽度
    addWidth = (data) => {
        var th = this;
        data.forEach((val, ind) => {
            if (val.width) {
                this.scrollWidth += val.width
            } else if (val.children) {
                th.addWidth(val.children)
            }
        })
    }
   
    
    //表格
    supplyTablePlan = () => {
        //this.addWidth(columns)
        return (
            <div id={"tablePlan"}>
                <Table columns={this.columns} pagination={false} bordered scroll={{x: this.scrollWidth, y: "100%"}}
                       dataSource={this.state.data}/>
            </div>

        );
    }
    supplyTableAdjust = () => {
        //this.addWidth(columns)
        return (
            <div id={"tableAdjust"}>
                <Table columns={this.columns} pagination={false} bordered scroll={{x: this.scrollWidth, y: "100%"}}
                       dataSource={this.state.data}/>
            </div>

        );
    }
    


    render() {
        return (<div className="stateNodeBox">
                    <Row>
                        <Col span={24}>
                            <span>计划版（面积：平方米，货值：万元）</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <article>
                                {this.supplyTablePlan()}
                            </article>
                        </Col>
                    </Row>
                    <Row style={{marginTop:"20px"}}>
                        <Col span={24}>
                            <span>动态调整版（面积：平方米，货值：万元）</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <article>
                                {this.supplyTableAdjust()}
                            </article>
                        </Col>
                    </Row>
            </div>
        );

    }
}

export default OverviewSupply;