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
                TotalArea: '232344535',
                TotalSaleArea: '343345444',
                TotalMonery: '34454544',
                TotalBuildingArea: '345434.04',
                SuppliedSaleArea: '3454324.05',
                SuppliedMonery: '345424',
                SuppliedNumber: '2454432',
                StockInitInvSaleaArea: '235324',
                StockInitInvMonery: '234232',
                Stock18MonthSaleArea: '393923',
                Stock18MonthMonery: '2873723',
                Stock12MonthSaleArea: '28342747',
                Stock12MonthMonery:'2828273',
                Stock6MonthSaleArea:'2382847',
                Stock6MonthMonery:'2384274',
                StockMonthSaleArea:'3432434',
                StockMonthMonery:'232234',
                children: [{
                    key: 11,
                    Name: '1组团',
                    TotalArea: '122343',
                    TotalSaleArea: '1343',
                    TotalMonery: '123244',
                    TotalBuildingArea: '52324',
                    SuppliedSaleArea: '643434',
                    SuppliedMonery: '7343',
                    SuppliedNumber: '83434',
                    StockInitInvSaleaArea: '93434',
                    StockInitInvMonery: '1344340',
                    Stock18MonthSaleArea: '3434443',
                    Stock18MonthMonery: '34343434',
                    Stock12MonthSaleArea: '103344',
                    Stock12MonthMonery:'233434',
                    Stock6MonthSaleArea:'343434',
                    Stock6MonthMonery:'23434',
                    StockMonthSaleArea:'343434',
                    StockMonthMonery:'2334343',
                    children: [{
                        key: 111,
                        Name: '叠拼别墅',
                        TotalArea: '2234243',
                        TotalSaleArea: '334434',
                        TotalMonery: '4343434',
                        TotalBuildingArea: '53434',
                        SuppliedSaleArea: '63434',
                        SuppliedMonery: '743434',
                        SuppliedNumber: '8343432',
                        StockInitInvSaleaArea: '9465465',
                        StockInitInvMonery: '1056234',
                        Stock18MonthSaleArea: '1143546',
                        Stock18MonthMonery: '1243522',
                        Stock12MonthSaleArea: '1454560',
                        Stock12MonthMonery:'43546',
                        Stock6MonthSaleArea:'43545',
                        Stock6MonthMonery:'345435',
                        StockMonthSaleArea:'345435',
                        StockMonthMonery:'24354353',
                    }],
                }, {
                    key: 12,
                    Name: '未分配车位',
                    TotalArea: '345435',
                    TotalSaleArea: '3345435',
                    TotalMonery: '4345345',
                    TotalBuildingArea: '5345435',
                    SuppliedSaleArea: '345436',
                    SuppliedMonery: '743543',
                    SuppliedNumber: '843543',
                    StockInitInvSaleaArea: '345439',
                    StockInitInvMonery: '13454350',
                    Stock18MonthSaleArea: '145431',
                    Stock18MonthMonery: '1435432',
                    Stock12MonthSaleArea: '1435430',
                    Stock12MonthMonery:'2435343',
                    Stock6MonthSaleArea:'3435344',
                    Stock6MonthMonery:'4355342',
                    StockMonthSaleArea:'3345434',
                    StockMonthMonery:'24353453',
                    children: [{
                        key: 112,
                        Name: '可售楼栋',
                        TotalArea: '24353452',
                        TotalSaleArea: '3435435',
                        TotalMonery: '434545',
                        TotalBuildingArea: '4354355',
                        SuppliedSaleArea: '45356',
                        SuppliedMonery: '454337',
                        SuppliedNumber: '3454554',
                        StockInitInvSaleaArea: '45459',
                        StockInitInvMonery: '145450',
                        Stock18MonthSaleArea: '145351',
                        Stock18MonthMonery: '145352',
                        Stock12MonthSaleArea: '1435430',
                        Stock12MonthMonery:'3454323',
                        Stock6MonthSaleArea:'34354354',
                        Stock6MonthMonery:'2454',
                        StockMonthSaleArea:'345434',
                        StockMonthMonery:'245453',
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
                            <b>供货计划版（面积：平方米，货值：万元）</b>
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
                            <b>供货动态调整版（面积：平方米，货值：万元）</b>
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