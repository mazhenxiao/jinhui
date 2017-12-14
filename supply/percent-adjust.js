/**
 *  楼栋供货--动态调整
 */

import "babel-polyfill";  //兼容ie
import iss from "../js/iss.js";
import React, {Component} from 'react';
import {Spin, Row, Col, Button, Table, Modal, Checkbox, DatePicker, Select, Radio} from 'antd';
import {WrapperSelect, WrapperTreeTable} from '../common';
import {SupplyService} from "../services";
import moment from 'moment';
import "../css/button.less";
import "./css/supply.less";

const dataSource = [{
    key: '1',
    zutuan: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号'
}, {
    key: '2',
    zutuan: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号'
}];

const defaultHeight = 400;

class PercentAdjust extends Component {

    static propTypes = {
        onHideModal: React.PropTypes.func,//对外接口 操作完成时 关闭模态窗口
    };

    static defaultProps = {
        onHideModal: () => {
        },
    };

    state = {
        loading: false,
        currentMonth: "",
        currentYear: 0,
        supplyData: [],
        batchDate: "",//批量设置的日期
    };

    componentWillMount() {
        const {currentMonth, currentYear} = this.props.baseInfo;
        this.setState({
            currentMonth,
            currentYear,
        });
    };


    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        this.setState({
            loading: true,
        });
        SupplyService.getBuildingSupplyData()
            .then(({supplyData}) => {
                this.setState({
                    loading: false,
                    supplyData,
                });
            })
            .catch(error => {
                this.setState({
                    loading: false,
                });
                iss.error(error);
            })
    };

    handleSelectChange = () => {
        //TODO
    };

    handleSave = () => {
        //TODO
        this.props.onHideModal && this.props.onHideModal();
    };

    handleCancel = () => {
        this.props.onHideModal && this.props.onHideModal();
    };

    setAlignCenter = (name) => {
        return <span className="header-center">{name}</span>;
    };

    /**
     * 动态获取列信息
     */
    getColumns = () => {

        const columns = [
            {
                title: this.setAlignCenter("业态"),
                dataIndex: 'zutuan',
                key: 'zutuan',
                width: 140,
            },
            {
                title: this.setAlignCenter("可售面积(㎡)"),
                dataIndex: 'yetai',
                key: 'age',
                width: 120,
            },
            {
                title: this.setAlignCenter("可售货值(万元)"),
                dataIndex: 'loudong',
                key: 'loudong',
                width: 120,
            },
            {
                title: this.setAlignCenter("供货比例(%)"),
                dataIndex: 'mianji',
                key: 'mianji',
                width: 120,
            },
            {
                title: this.setAlignCenter("已选可售面积(㎡)"),
                dataIndex: 'huozhi',
                key: 'huozhi',
                width: 120,
            },
            {
                title: this.setAlignCenter("已选可售货值(万元)"),
                dataIndex: 'shijian',
                key: 'shijian',
                width: 120,
            },
            {
                title: this.setAlignCenter("供货日期"),
                dataIndex: 'riqi',
                key: 'riqi',
                render: (text, record) => {
                    return <DatePicker></DatePicker>;
                },
                width: 120,
            }
        ];

        return columns;
    };

    /**
     * 批量设置供货日期
     */
    handleBatchSetDate = () => {
        //TODO 批量设置供货日期
        this.setState({
            batchDate: "",
        });
    };

    handleDateChange = (value, dateString) => {
        this.setState({
            batchDate: dateString,
        });
    };

    handleSelectChange = (key) => {
        return (value) => {
            this.setState({
                [key]: value
            });
        };
    };

    renderContent = () => {
        const {batchDate, currentMonth, currentYear} = this.state;
        const {switchMonth, switchYear} = this.props.baseInfo;
        const lastYear = switchYear.indexOf(currentYear) === 3 ? true : false;
        const columns = this.getColumns();
        const scrollX = columns.scrollX;
        return (
            <div className="building-adjust">
                <div className="adjust-header">
                    <div className="select-month">
                        <WrapperSelect labelText="调整月份:" onChange={this.handleSelectChange("currentMonth")}
                                       showDefault={false} dataSource={switchMonth}
                                       value={currentMonth}></WrapperSelect>
                    </div>
                    <div className="chk-wrapper">
                        <Checkbox disabled={true} className="chk">考核版</Checkbox>
                    </div>
                    <div className="date-picker-wrapper">
                        <DatePicker onChange={this.handleDateChange} allowClear={false}
                                    value={batchDate ? moment(batchDate, 'YYYY-MM-DD') : null}></DatePicker>
                    </div>
                    <div className="batch-set-date">
                        <Button onClick={this.handleBatchSetDate}>设置供货日期</Button>
                    </div>
                </div>
                <div className="adjust-table">
                    <Table
                        bordered={true}
                        dataSource={dataSource}
                        columns={columns}
                        size="middle"
                        scroll={!lastYear ? {x: (scrollX), y: defaultHeight} : {}}
                        pagination={false}
                    />
                </div>
            </div>
        );
    };

    render() {

        const {loading} = this.state;
        return (
            <Modal
                title={"供货计划动态调整--按楼栋"}
                visible={true}
                onCancel={this.handleCancel}
                maskClosable={false}
                width="90%"
                footer={[
                    <Button key="save" type="primary" size="large" onClick={this.handleSave}>
                        保存
                    </Button>,
                    <Button key="cancel" type="primary" size="large" onClick={this.handleCancel}>
                        取消
                    </Button>,
                ]}>
                <Spin size="large" spinning={loading}>
                    {this.renderContent()}
                </Spin>
            </Modal>
        );
    };
}

export default PercentAdjust;