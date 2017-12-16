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

    fillMonthColor = (year, month) => {
        return (text, record) => {
            const strDate = record["riqi"];
            if (strDate) {
                const date = new Date(strDate);
                if (date.getFullYear() == year && (date.getMonth() + 1) == month) {
                    return <span className="select-block"></span>;
                }
            }

            return <span className="no-select-block"></span>;
        };
    };

    fillQuarterColor = (year, quarter) => {
        return (text, record) => {
            const strDate = record["riqi"];
            if (strDate) {
                const date = new Date(strDate);
                const month = date.getMonth() + 1;
                if (date.getFullYear() == year) {
                    if (month > (quarter - 1) * 3 && month <= quarter * 3)
                        return <span className="select-block"></span>;
                }
            }
            return <span className="no-select-block"></span>;
        };
    };

    fillYearColor = (year) => {
        return (text, record) => {
            const strDate = record["riqi"];
            if (strDate) {
                const date = new Date(strDate);
                if (date.getFullYear() == year) {
                    return <span className="select-block"></span>;
                }
            }
            return <span className="no-select-block"></span>;
        };
    };

    /**
     * 动态获取列信息
     */
    getColumns = () => {
        const {switchYear} = this.props.baseInfo;
        const {currentYear} = this.state;
        const lastYear = switchYear.indexOf(currentYear) === 3 ? true : false;

        const columns = [
            {
                title: this.getGroupHeader(),
                dataIndex: 'zutuan',
                key: 'zutuan',
                width: 140,
                fixed: !lastYear ? 'left' : false,
            },
            {
                title: this.getFormatHeader(),
                dataIndex: 'yetai',
                key: 'age',
                width: 140,
                fixed: !lastYear ? 'left' : false,
            },
            {
                title: this.getBuildHeader(),
                dataIndex: 'loudong',
                key: 'loudong',
                width: 140,
                fixed: !lastYear ? 'left' : false,
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
                    return <DatePicker allowClear={false} onChange={this.handleRowDataChange(record)}
                                       value={text ? moment(text, 'YYYY-MM-DD') : null}></DatePicker>;
                },
                width: 120,
            }
        ];

        const index = switchYear.indexOf(currentYear);
        if (index < 2) {
            for (let i = 1; i <= 12; i++) {
                columns.push({
                    title: this.setAlignCenter(`${i}月`),
                    dataIndex: `${currentYear}-${i}`,
                    key: `${currentYear}-${i}`,
                    width: 60,
                    render: this.fillMonthColor(currentYear, i),
                });
            }
        } else if (index === 2) {
            for (let i = 1; i <= 4; i++) {
                columns.push({
                    title: this.setAlignCenter(`第${i}季度`),
                    dataIndex: `${currentYear}-quarter-${i}`,
                    key: `${currentYear}-quarter-${i}`,
                    width: 100,
                    render: this.fillQuarterColor(currentYear, i),
                });
            }
        } else {
            columns.push({
                title: this.setAlignCenter(`${currentYear}年及以后`),
                dataIndex: `future-year`,
                key: `future-year`,
                render: this.fillYearColor(currentYear),
            });
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
        const {batchDate, supplyData} = this.state;

        if (!batchDate) {
            iss.error("请先选择日期!");
            return;
        }

        if (supplyData.length === 0) {
            iss.error("暂无数据!");
            return;
        }

        supplyData.forEach(row => {
            row["riqi"] = batchDate;
        });

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

    handleRowDataChange = (row) => {
        return (value, dateString) => {
            row["riqi"] = dateString;
            this.forceUpdate();
        };
    };

    handleSelectChange = (key) => {
        return (value) => {
            this.setState({
                [key]: value
            });
        };
    };

    renderSwitchYear = () => {
        const {switchYear} = this.props.baseInfo;
        const {currentYear} = this.state;
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
        const {batchDate, currentMonth, currentYear, supplyData} = this.state;
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
                    <div className="switch-year">
                        {this.renderSwitchYear()}
                    </div>
                </div>
                <div className="adjust-table">
                    <Table
                        bordered={true}
                        dataSource={supplyData}
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

export default BuildingAdjust;