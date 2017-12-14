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

class BuildingAdjust extends Component {

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

    getGroupHeader = () => {
        const options = [];
        const groupDataSource = [{id: "", name: "全部组团"}, {id: "111", name: "1111"}];
        groupDataSource.forEach(item => {
            options.push(<Option key={item.id} value={item.id}>{item.name}</Option>);
        });

        return (
            <Select defaultValue="" style={{width: 120}}>
                {options}
            </Select>
        );
    };

    getFormatHeader = () => {
        const options = [];
        const groupDataSource = [{id: "", name: "全部业态"}, {id: "111", name: "2222"}];
        groupDataSource.forEach(item => {
            options.push(<Option key={item.id} value={item.id}>{item.name}</Option>);
        });

        return (
            <Select defaultValue="" style={{width: 120}}>
                {options}
            </Select>
        );
    };

    getBuildHeader = () => {
        const options = [];
        const groupDataSource = [{id: "", name: "全部楼栋"}, {id: "111", name: "3333"}];
        groupDataSource.forEach(item => {
            options.push(<Option key={item.id} value={item.id}>{item.name}</Option>);
        });

        return (
            <Select defaultValue="" style={{width: 120}}>
                {options}
            </Select>
        );
    };

    setAlignCenter = (name) => {
        return <span className="header-center">{name}</span>;
    };

    /**
     * 动态获取列信息
     */
    getColumns = () => {

        const {currentYear, switchYear} = this.state;

        const columns = [
            {
                title: this.getGroupHeader(),
                // title: "zutuan",
                dataIndex: 'zutuan',
                key: 'zutuan',
                width: 140,
                fixed: 'left',
            },
            {
                title: this.getFormatHeader(),
                // title: "yetai",
                dataIndex: 'yetai',
                key: 'age',
                width: 140,
                fixed: 'left',
            },
            {
                title: this.getBuildHeader(),
                // title: "loudong",
                dataIndex: 'loudong',
                key: 'loudong',
                width: 140,
                fixed: 'left',
            },
            {
                title: this.setAlignCenter("可售面积(m²)"),
                dataIndex: 'mianji',
                key: 'mianji',
                width: 120,
            },
            {
                title: this.setAlignCenter("可售货值(万元)"),
                dataIndex: 'huozhi',
                key: 'huozhi',
                width: 120,
            },
            {
                title: this.setAlignCenter("计划预证时间"),
                dataIndex: 'shijian',
                key: 'shijian',
                width: 120,
            },
            {
                title: this.setAlignCenter("供货日期"),
                dataIndex: 'riqi',
                key: 'riqi',
                render: (text, record) => {
                    return <DatePicker allowClear={false}></DatePicker>;
                },
                width: 120,
            }
        ];

        const index = switchYear.indexOf(currentYear) + 1;
        if (index <= 2) {
            for (let i = 1; i <= 12; i++) {
                columns.push({
                    title: this.setAlignCenter(`${i}月`),
                    dataIndex: `month${i}`,
                    key: `month${i}`,
                    width: 120,
                });
            }
        } else {
            for (let i = 1; i <= 4; i++) {
                columns.push({
                    title: this.setAlignCenter(`第${i}季度`),
                    dataIndex: `quarter${i}`,
                    key: `quarter${i}`,
                    width: 120,
                });
            }
        }

        columns.scrollX = 0;
        columns.forEach(column => {
            columns.scrollX += column.width;
        });


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
        const scrollX = columns.scrollX;
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
                        <DatePicker onChange={this.handleDateChange} allowClear={false}
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
                        scroll={{x: (scrollX), y: defaultHeight}}
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

export default BuildingAdjust;