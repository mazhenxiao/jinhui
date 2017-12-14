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

const Option = Select.Option;

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
        currentYear: 2017,
        switchYear: [2017, 2018, 2019, 2020],
        supplyData: [],
        batchDate: "",
    };

    componentDidMount() {
        // this.loadData();
    }

    loadData = () => {
        this.setState({
            loading: true,
        });
        SupplyService.getBuildingSupplyData()
            .then(({currentYear, switchYear, supplyData}) => {
                this.setState({
                    loading: false,
                    currentYear,
                    switchYear,
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
                width: 100,
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

    /**
     * 切换年
     * @param e
     */
    handleChangeYear = (e) => {
        this.setState({
            currentYear: e.target.value
        });
    };

    handleDateChange = (value, dateString) => {
        this.setState({
            batchDate: dateString,
        });
    };

    renderSwitchYear = () => {
        const {currentYear, switchYear} = this.state;
        if (!currentYear) {
            return null;
        }
        return (
            <Radio.Group value={currentYear} onChange={this.handleChangeYear}>
                {
                    switchYear.map(year => {
                        return <Radio.Button key={year} value={year}>{year}</Radio.Button>;
                    })
                }
            </Radio.Group>
        );
    };

    renderContent = () => {
        const {batchDate} = this.state;
        const columns = this.getColumns();
        return (
            <div className="building-adjust">
                <div className="adjust-header">
                    <div className="select-month">
                        <WrapperSelect labelText="调整月份:" showDefault={false}></WrapperSelect>
                    </div>
                    <div className="chk-wrapper">
                        <Checkbox disabled={true} className="chk">考核版</Checkbox>
                    </div>
                    <div className="date-picker-wrapper">
                        <DatePicker onChange={this.handleDateChange}
                                    value={batchDate ? moment(batchDate, 'YYYY-MM-DD') : null}></DatePicker>
                    </div>
                    <div className="batch-set-date">
                        <Button onClick={this.handleBatchSetDate}>设置供货日期</Button>
                    </div>
                    <div className="switch-year">
                        {this.renderSwitchYear()}
                    </div>
                </div>
                <div className="adjust-table">
                    <Table
                        bordered={true}
                        dataSource={dataSource}
                        columns={columns}
                        size="middle"
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
                title={"供货计划动态调整--按比例"}
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