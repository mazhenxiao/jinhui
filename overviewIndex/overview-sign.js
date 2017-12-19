//签约
import "babel-polyfill";  //兼容ie
import iss from "../js/iss.js";
import React, {Component} from 'react';
import {Spin, Menu, Table, Input, Dropdown, Icon, Tabs, Row, Col, Button, Select} from 'antd';
import {WrapperTreeTable} from '../common';
import {AreaService} from '../services';

require("../css/antd.min.css");
require("../css/payment.css");
require("../area/areaCss/areaManage.less");

class OverviewSign extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [{
                key: 1,
                sign: '项目1—分期1-地块1',
                totalArea: '34543',
                saleableArea: '22342',
                money: '12323',
                setNumber: '24345',
                beginPeriodArea: '23435',
                beginPeriodValue: '12634',
                overArea: '12734',
                monthSaleableArea1: '12823',
                monthMoney1: '12239',
                monthSetNumber1: '10123',
                monthSaleableArea2: '12301',
                monthMoney2: '10002',
                monthSetNumber2: '11230',
                children: [{
                    key: 11,
                    sign: '1组团',
                    totalArea: '1124',
                    saleableArea: '2234',
                    money: '3324',
                    setNumber: '4125',
                    beginPeriodArea: '1235',
                    beginPeriodValue: '1236',
                    overArea: '1237',
                    monthSaleableArea1: '8123',
                    monthMoney1: '9123',
                    monthSetNumber1: '1023',
                    monthSaleableArea2: '1231',
                    monthMoney2: '1022',
                    monthSetNumber2: '1270',
                    children: [{
                        key: 111,
                        sign: '叠拼别墅',
                        totalArea: '1121',
                        saleableArea: '2236',
                        money: '3434',
                        setNumber: '4123',
                        beginPeriodArea: '1235',
                        beginPeriodValue: '6123',
                        overArea: '7123',
                        monthSaleableArea1: '1238',
                        monthMoney1: '1349',
                        monthSetNumber1: '1210',
                        monthSaleableArea2: '1211',
                        monthMoney2: '1212',
                        monthSetNumber2: '2310',
                    }],
                }, {
                    key: 12,
                    sign: '未分配车位',
                    totalArea: '1234',
                    saleableArea: '2123',
                    money: '3123',
                    setNumber: '4334',
                    beginPeriodArea: '5344',
                    beginPeriodValue: '6244',
                    overArea: '1347',
                    monthSaleableArea1: '3458',
                    monthMoney1: '3459',
                    monthSetNumber1: '2310',
                    monthSaleableArea2: '2311',
                    monthMoney2: '2312',
                    monthSetNumber2: '2310',
                    children: [{
                        key: 112,
                        sign: '可售楼栋',
                        totalArea: '1234',
                        saleableArea: '2234',
                        money: '1233',
                        setNumber: '2344',
                        beginPeriodArea: '1235',
                        beginPeriodValue: '1236',
                        overArea: '1347',
                        monthSaleableArea1: '1248',
                        monthMoney1: '1249',
                        monthSetNumber1: '1210',
                        monthSaleableArea2: '1211',
                        monthMoney2: '1132',
                        monthSetNumber2: '1230',
                    }],
                }],
            }],
            loading: false,
            editstatu: false
        }
        this.columns = [{
            title: '签约',
            dataIndex: 'sign',
            key: 'sign',
            width: 200,
            fixed: 'left'
        }, {
            title: '截止当月1日零点期初库存',
            children: [{
                title: '总建筑面积',
                key: "totalArea",
                dataIndex: 'totalArea',
                width: 100,
            }, {
                title: '已签约',
                children: [{
                    title: '可售面积',
                    dataIndex: 'saleableArea',
                    key: 'saleableArea',
                    width: 100,
                }, {
                    title: '金额',
                    dataIndex: 'money',
                    key: 'money',
                    width: 100,
                }, {
                    title: '套数',
                    dataIndex: 'setNumber',
                    key: 'setNumber',
                    width: 100,
                }]
            }, {
                title: '存货',
                children: [{
                    title: '期初存货可售面积',
                    dataIndex: 'beginPeriodArea',
                    key: 'beginPeriodArea',
                    width: 100,
                }, {
                    title: '期初存货货值',
                    dataIndex: 'beginPeriodValue',
                    key: 'beginPeriodValue',
                    width: 100,
                }, {
                    title: '18个月以上可售面积',
                    dataIndex: 'overArea',
                    key: 'overArea',
                    width: 100,
                }]
            }]
        }, {
            title: '当年-1月',
            key: 2222,
            children: [{
                title: '',
                children: [{
                    title: '可售面积',
                    dataIndex: 'monthSaleableArea1',
                    key: 'monthSaleableArea1',
                    width: 100,
                    //render: (text, record) => this.renderColumns(text, record, 'monthSaleableArea1')
                }, {
                    title: '金额',
                    dataIndex: 'monthMoney1',
                    key: 'monthMoney1',
                    width: 100,
                    //render: (text, record) => this.renderColumns(text, record, 'monthMoney1')
                }, {
                    title: '套数',
                    dataIndex: 'monthSetNumber1',
                    key: 'monthSetNumber1',
                    width: 100,
                    // render: (text, record) => this.renderColumns(text, record, 'monthSetNumber1')
                }]
            }]
        }, {
            title: '当年-2月',
            key: 222,
            children: [{
                title: '',
                children: [{
                    title: '可售面积',
                    dataIndex: 'monthSaleableArea2',
                    key: 'monthSaleableArea2',
                    width: 100,
                }, {
                    title: '金额',
                    dataIndex: 'monthMoney2',
                    key: 'monthMoney2',
                    width: 100,
                }, {
                    title: '套数',
                    dataIndex: 'monthSetNumber2',
                    key: 'monthSetNumber2',
                    width: 100,
                }]
            }]
        }],
            this.oldData = this.state.data,
            this.scrollWidth = 0;
    }

    componentWillMount() {
        this.addWidth(this.columns)
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
    paymentTable1 = () => {
        //this.addWidth(columns)
        return (
            <div className="">
                <Table columns={this.columns} pagination={false} bordered scroll={{x: this.scrollWidth, y: "100%"}}
                       dataSource={this.state.data}/>
            </div>

        );
    }

    paymentTable2 = () => {
        //this.addWidth(columns)
        return (
            <div className="">
                <Table columns={this.columns} pagination={false} bordered scroll={{x: this.scrollWidth, y: "100%"}}
                       dataSource={this.state.data}/>
            </div>

        );
    }
    /*渲染button*/
    

    render() {
        return (
            <div className="stateNodeBox">
            <Row>
                <Col span={24}>
                    <b>签约计划版（面积：平方米，货值：万元）</b>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <article>
                        {this.paymentTable1()}
                    </article>
                </Col>
            </Row>
            <Row style={{marginTop:"20px"}}>
                <Col span={24}>
                    <b>签约动态调整版（面积：平方米，货值：万元）</b>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <article>
                        {this.paymentTable2()}
                    </article>
                </Col>
            </Row>
        </div>
        );

    }
}

export default OverviewSign;