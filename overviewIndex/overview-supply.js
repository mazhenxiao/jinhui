//签约
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
                supply: '项目1—分期1-地块1',
                saleableArea: '22',
                money: '3',
                setNumber: '4',
                beginPeriodArea: '5',
                beginPeriodValue: '6',
                overArea: '7',
                monthSaleableArea1: '8',
                monthMoney1: '9',
                monthSetNumber1: '10',
                monthSaleableArea2: '11',
                monthMoney2: '12',
                monthSetNumber2: '10',
                children: [{
                    key: 11,
                    supply: '1组团',
                    saleableArea: '2',
                    money: '3',
                    setNumber: '4',
                    beginPeriodArea: '5',
                    beginPeriodValue: '6',
                    overArea: '7',
                    monthSaleableArea1: '8',
                    monthMoney1: '9',
                    monthSetNumber1: '10',
                    monthSaleableArea2: '11',
                    monthMoney2: '12',
                    monthSetNumber2: '10',
                    children: [{
                        key: 111,
                        supply: '叠拼别墅',
                        saleableArea: '2',
                        money: '3',
                        setNumber: '4',
                        beginPeriodArea: '5',
                        beginPeriodValue: '6',
                        overArea: '7',
                        monthSaleableArea1: '8',
                        monthMoney1: '9',
                        monthSetNumber1: '10',
                        monthSaleableArea2: '11',
                        monthMoney2: '12',
                        monthSetNumber2: '10',
                    }],
                }, {
                    key: 12,
                    supply: '未分配车位',
                    saleableArea: '2',
                    money: '3',
                    setNumber: '4',
                    beginPeriodArea: '5',
                    beginPeriodValue: '6',
                    overArea: '7',
                    monthSaleableArea1: '8',
                    monthMoney1: '9',
                    monthSetNumber1: '10',
                    monthSaleableArea2: '11',
                    monthMoney2: '12',
                    monthSetNumber2: '10',
                    children: [{
                        key: 112,
                        supply: '可售楼栋',
                        saleableArea: '2',
                        money: '3',
                        setNumber: '4',
                        beginPeriodArea: '5',
                        beginPeriodValue: '6',
                        overArea: '7',
                        monthSaleableArea1: '8',
                        monthMoney1: '9',
                        monthSetNumber1: '10',
                        monthSaleableArea2: '11',
                        monthMoney2: '12',
                        monthSetNumber2: '10',
                    }],
                }],
            }],
            loading: false,
            editstatu: false
        }
        this.columns = [{
            title: '供货',
            dataIndex: 'supply',
            key: 'supply',
            width: 200,
            fixed: 'left'
        }, {title: '已签约',
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
        }, { title: '',
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
        }, {title: '',
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
    supplyTable = () => {
        //this.addWidth(columns)
        return (
            <div className="tableBox">
                <Table columns={this.columns} pagination={false} bordered scroll={{x: this.scrollWidth, y: "100%"}}
                       dataSource={this.state.data}/>
            </div>

        );
    }
    /*渲染button*/
    


    render() {
        return (
            <div className="processBar">
                
                <Row>
                    <Col span={24}>
                        <article>
                            {this.supplyTable()}
                        </article>
                    </Col>
                </Row>
            </div>
        );

    }
}

export default OverviewSupply;