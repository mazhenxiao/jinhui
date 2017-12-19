//回款
import "babel-polyfill";  //兼容ie
import iss from "../js/iss.js";
import React, {Component} from 'react';
import {Spin, Menu, Table, Input, Dropdown, Icon, Tabs, Row, Col, Button, Select} from 'antd';
import {WrapperTreeTable} from '../common';
import {AreaService} from '../services';

require("../css/antd.min.css");
require("../css/payment.css");
require("../css/button.less");
require("../area/areaCss/areaManage.less");

class OverviewPayment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{
                key: 1,
                payment: '项目1',
                thisYearMoney: '209976',
                january:"2345",
                february:"2345",
                march:"3245",
                april:"1238",
                may:"2134",
                june:"8776",
                july:"876",
                august:"2345",
                september:"876",
                october:"345",
                november:"3456",
                december:"3484",
            },{
                key: 2,
                payment: '项目2',
                thisYearMoney: '209976',
                january:"2345",
                february:"2345",
                march:"3245",
                april:"1238",
                may:"2134",
                june:"8776",
                july:"876",
                august:"2345",
                september:"876",
                october:"345",
                november:"3456",
                december:"3484",
            },{
                key: 3,
                payment: '项目3',
                thisYearMoney: '209976',
                january:"2345",
                february:"2345",
                march:"3245",
                april:"1238",
                may:"2134",
                june:"8776",
                july:"876",
                august:"2345",
                september:"876",
                october:"345",
                november:"3456",
                december:"3484",
            },{
                key: 4,
                payment: '项目4',
                thisYearMoney: '209976',
                january:"2345",
                february:"2345",
                march:"3245",
                april:"1238",
                may:"2134",
                june:"8776",
                july:"876",
                august:"2345",
                september:"876",
                october:"345",
                november:"3456",
                december:"3484",
            },{
                key: 5,
                payment: '项目5',
                thisYearMoney: '209976',
                january:"2345",
                february:"2345",
                march:"3245",
                april:"1238",
                may:"2134",
                june:"8776",
                july:"876",
                august:"2345",
                september:"876",
                october:"345",
                november:"3456",
                december:"3484",
            },{
                key: 6,
                payment: '项目2',
                thisYearMoney: '209976',
                january:"2345",
                february:"2345",
                march:"3245",
                april:"1238",
                may:"2134",
                june:"8776",
                july:"876",
                august:"2345",
                september:"876",
                october:"345",
                november:"3456",
                december:"3484",
            },{
                key: 7,
                payment: '项目3',
                thisYearMoney: '209976',
                january:"2345",
                february:"2345",
                march:"3245",
                april:"1238",
                may:"2134",
                june:"8776",
                july:"876",
                august:"2345",
                september:"876",
                october:"345",
                november:"3456",
                december:"3484",
            },{
                key: 8,
                payment: '项目4',
                thisYearMoney: '209976',
                january:"2345",
                february:"2345",
                march:"3245",
                april:"1238",
                may:"2134",
                june:"8776",
                july:"876",
                august:"2345",
                september:"876",
                october:"345",
                november:"3456",
                december:"3484",
            },{
                key: 9,
                payment: '项目5',
                thisYearMoney: '209976',
                january:"2345",
                february:"2345",
                march:"3245",
                april:"1238",
                may:"2134",
                june:"8776",
                july:"876",
                august:"2345",
                september:"876",
                october:"345",
                november:"3456",
                december:"3484",
            }],
            loading: false,
            editstatu: false
        }
        this.columns = [{
                    title: '回款(万元)',
                    dataIndex: 'payment',
                    key: 'payment',
                    width: 200,
                    fixed: 'left'
                }, {title: '本年已回款金额',
                    key: "thisYearMoney",
                    dataIndex: 'thisYearMoney',
                    width: 150,
                
                }, {title: '1月',
                    key: "january",
                    dataIndex: 'january',
                    width: 100,
                }, {
                    title: '2月',
                    key: "february",
                    dataIndex: 'february',
                    width: 100,
                }, {
                    title: '3月',
                    key: "march",
                    dataIndex: 'march',
                    width: 100,
                }, {
                    title: '4月',
                    key: "april",
                    dataIndex: 'april',
                    width: 100,
                }, {
                    title: '5月',
                    key: "may",
                    dataIndex: 'may',
                    width: 100,
                }, {
                    title: '6月',
                    key: "june",
                    dataIndex: 'june',
                    width: 100,
                }, {
                    title: '7月',
                    key: "july",
                    dataIndex: 'july',
                    width: 100,
                }, {
                    title: '8月',
                    key: "august",
                    dataIndex: 'august',
                    width: 100,
                }, {
                    title: '9月',
                    key: "september",
                    dataIndex: 'september',
                    width: 100,
                }, {
                    title: '10月',
                    key: "october",
                    dataIndex: 'october',
                    width: 100,
                }, {
                    title: '11月',
                    key: "november",
                    dataIndex: 'november',
                    width: 100,
                }, {
                    title: '12月',
                    key: "december",
                    dataIndex: 'december',
                    width: 100,
            }],
            this.oldData = this.state.data,
            this.scrollWidth = 0;
    }

    componentWillMount() {
        this.addWidth(this.columns)
    }

    //下拉菜单
   

    //编辑input框
   
    // 过滤
    
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
    

    //保存
   
    //编辑
    
    //表格
    paymentTable = () => {
        //this.addWidth(columns)
        return (
            <div className="">
                <Table columns={this.columns} pagination={false} bordered scroll={{x: this.scrollWidth, y: "200"}}
                       dataSource={this.state.data}/>
            </div>

        );
    }
    /*渲染button*/
   

    render() {


        return (<div className="stateNodeBox">
                    <Row>
                        <Col span={24}>
                            <b>回款计划版（货值：万元）</b>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <article>
                                {this.paymentTable()}
                            </article>
                        </Col>
                    </Row>
                    <Row style={{marginTop:"20px"}}>
                        <Col span={24}>
                            <b>回款动态调整版（货值：万元）</b>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <article>
                                {this.paymentTable()}
                            </article>
                        </Col>
                    </Row>
            </div>
        );
    }
   
}

export default OverviewPayment;