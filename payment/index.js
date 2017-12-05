import "babel-polyfill";  //兼容ie
import iss from "../js/iss.js";
import React, {Component} from 'react';
import {Spin, Menu, Table, Input, Dropdown, Icon, Tabs, Row, Col, Button, Select} from 'antd';
import {WrapperTreeTable} from '../common';
import {AreaService} from '../services';

require("../css/antd.min.css");
require("../css/payment.css");
require("../css/tools-processBar.less");
require("../css/button.less");
require("../area/areaCss/areaManage.less");

class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [{
                key: 1,
                payment: '项目1—分期1-地块1',
                totalArea: '1',
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
                    payment: '1组团',
                    totalArea: '1',
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
                        payment: '叠拼别墅',
                        totalArea: '1',
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
                    payment: '未分配车位',
                    totalArea: '1',
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
                        payment: '可售楼栋',
                        totalArea: '1',
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
            title: '签约',
            dataIndex: 'payment',
            key: 'payment',
            width: 200,
            fixed: 'left'
        }, {
            title: '截止当月1日零点期初库存',
            children: [{
                title: '总建筑面积',
                key: "totalArea",
                dataIndex: 'totalArea',
                width: 100,
                render: (text, record) => this.EditInput(text, record, 'totalArea'),
            }, {
                title: '已签约',
                children: [{
                    title: '可售面积',
                    dataIndex: 'saleableArea',
                    key: 'saleableArea',
                    width: 100,
                    render: (text, record) => this.EditInput(text, record, 'saleableArea'),
                }, {
                    title: '金额',
                    dataIndex: 'money',
                    key: 'money',
                    width: 100,
                    render: (text, record) => this.EditInput(text, record, 'money'),
                }, {
                    title: '套数',
                    dataIndex: 'setNumber',
                    key: 'setNumber',
                    width: 100,
                    render: (text, record) => this.EditInput(text, record, 'setNumber'),
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

    //下拉菜单
    selectChange = () => {

    }
    tableSelect = () => {
        const Option = Select.Option;
        return (
            <div>
                <Select defaultValue="年初供货计划" style={{width: 120}} onChange={this.selectChange()}>
                    <Option value="jack">年初供货计划</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled">Disabled</Option>
                    <Option value="Yiminghe">yiminghe</Option>
                </Select>
            </div>
        )
    }

    //编辑input框
    handleChange = (value, key, column) => {
        const newData = [...this.state.data];
        this.DataFilter(newData, key, value, column)
        this.setState({data: newData});
    }

    // 过滤
    DataFilter = (data, key, value, column) => {
        data.forEach((val, ind) => {
            if (val == key) {
                val[column] = value;
            } else {
                if (val.children) {
                    this.DataFilter(val.children, key, value, column)
                }
            }
        })
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
    // input框
    EditInput = (val, key, column) => {
        //console.log(val)
        if (this.state.editstatu) {
            return (
                <div>
                    {<Input style={{margin: '-5px 0'}} type="text" defaultValue={val}
                            onChange={e => this.handleChange(e.target.value, key, column)}/>}
                </div>
            )
        } else {
            return val
        }
    }

    //保存
    saveClick = () => {
        var statu = !this.state.editstatu
        this.setState({
            editstatu: statu
        })
    }
    //取消
    cancalClick = () => {
        var statu = !this.state.editstatu,
            oldData = this.oldData;
        this.setState({
            editstatu: statu,
            data: oldData
        })
    }
    //编辑
    editClick = () => {
        var statu = !this.state.editstatu
        //this.oldData = this.state.data;
        //console.log(this.oldData)
        this.setState({
            editstatu: statu
        })
    }
    //表格
    paymentTable = () => {
        //this.addWidth(columns)
        return (
            <div className="tableBox">
                <Table columns={this.columns} pagination={false} bordered scroll={{x: this.scrollWidth, y: "100%"}}
                       dataSource={this.state.data}/>
            </div>

        );
    }
    /*渲染button*/
    renderHeader = () => {
        if (this.state.editstatu) {
            return (
                <div>
                    <h2 className="paymentTitle">签约</h2>
                    <h3 className="boxGroupTit">
                        <p>
                            <span>签约计划版（面积：平方米，货值：万元）</span>
                        </p>
                        <div>
                            <div className="areaTopbtn jhBtn-wrap">
                                <button type="button" className="jh_btn jh_btn22 jh_btn_add"
                                        onClick={this.cancalClick.bind(this)}>取消
                                </button>
                                <button type="button" className="jh_btn jh_btn22 jh_btn_add"
                                        onClick={this.saveClick.bind(this)}>保存
                                </button>
                                <button type="button" className="jh_btn jh_btn22 jh_btn_apro credit-card">版本</button>
                                <button className="">{this.tableSelect()}</button>
                            </div>
                        </div>
                    </h3>
                </div>
            );
        } else {
            return (
                <div>
                    <h2 className="paymentTitle">签约</h2>
                    <h3 className="boxGroupTit">
                        <p>
                            <span>签约计划版（面积：平方米，货值：万元）</span>
                        </p>
                        <div>
                            <div className="areaTopbtn jhBtn-wrap">
                                <button type="button" className="jh_btn jh_btn22 jh_btn_add"
                                        onClick={this.editClick.bind(this)}>编辑
                                </button>
                                <button type="button" className="jh_btn jh_btn22 jh_btn_apro credit-card">版本</button>
                                <button className="">{this.tableSelect()}</button>
                            </div>
                        </div>
                    </h3>
                </div>
            );
        }

    };

    render() {

        return (
            <WrapperTreeTable></WrapperTreeTable>
        );

        // return (
        //     <div className="processBar">
        //         <Row>
        //             <Col span={24}>
        //                 <article>
        //                     {this.renderHeader()}
        //                 </article>
        //             </Col>
        //         </Row>
        //         <Row>
        //             <Col span={24}>
        //                 <article>
        //                     {this.paymentTable()}
        //                 </article>
        //             </Col>
        //         </Row>
        //     </div>
        // );
    }
}

export default Index;