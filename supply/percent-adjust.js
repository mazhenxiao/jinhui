/**
 *  楼栋供货--动态调整
 */

import "babel-polyfill";  //兼容ie
import iss from "../js/iss.js";
import React, {Component} from 'react';
import {Spin, Row, Col, Button, Table, Modal, Checkbox, DatePicker, Select, InputNumber} from 'antd';
import {WrapperSelect, WrapperTreeTable} from '../common';
import {SupplyService} from "../services";
import moment from 'moment';
import "../css/button.less";
import "./css/supply.less";

const Option = Select.Option;

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

    /**
     * 修改的数据
     * @type {Array}
     */
    changeDataArray = [];

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
        const {dataKey, mode} = this.props;
        this.setState({
            loading: true,
        });
        SupplyService.getSupplyData(dataKey, mode)
            .then(({supplyId, supplyData}) => {
                this.setState({
                    loading: false,
                    supplyId,
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

    handleSave = () => {
        const {supplyId, currentMonth, supplyData} = this.state;
        const {dataKey, mode} = this.props;
        this.setState({
            loading: true,
        });

        SupplyService.saveSupplyData(dataKey, mode, supplyId, currentMonth, this.changeDataArray)
            .then(res => {
                if (res.message === "成功") {
                    iss.info("保存成功!");
                    this.props.onHideModal && this.props.onHideModal("reload");
                } else {
                    return Promise.reject("保存失败");
                }
            })
            .catch(error => {
                this.setState({
                    loading: false,
                });
                iss.error(error);
            });
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
                dataIndex: 'PRODUCTTYPENAME',
                key: 'PRODUCTTYPENAME',
                width: 140,
            },
            {
                title: this.setAlignCenter("可售面积(㎡)"),
                dataIndex: 'SourceSaleArea',
                key: 'SourceSaleArea',
                width: 120,
            },
            {
                title: this.setAlignCenter("可售货值(万元)"),
                dataIndex: 'SourceMonery',
                key: 'SourceMonery',
                width: 120,
            },
            {
                title: this.setAlignCenter("供货比例(%)"),
                dataIndex: 'SourceNumber',
                key: 'SourceNumber',
                width: 120,
                render: (text, record, index) => {
                    return <InputNumber min={0} max={100} value={text}
                                        formatter={value => `${value}%`}
                                        parser={value => value.replace('%', '')}
                                        onChange={this.handlePercentChange.bind(this, record)}/>
                },
            },
            {
                title: this.setAlignCenter("已选可售面积(㎡)"),
                dataIndex: 'SaleArea',
                key: 'SaleArea',
                width: 120,
            },
            {
                title: this.setAlignCenter("已选可售货值(万元)"),
                dataIndex: 'Monery',
                key: 'Monery',
                width: 120,
            },
            {
                title: this.setAlignCenter("供货日期"),
                dataIndex: 'SupplyDate',
                key: 'SupplyDate',
                render: (text, record) => {
                    return <DatePicker allowClear={false} onChange={this.handleRowDataChange.bind(this, record)}
                                       value={text ? moment(text, 'YYYY-MM-DD') : null}></DatePicker>;
                },
                width: 120,
            },
            {
                title: this.setAlignCenter("操作"),
                dataIndex: 'id',
                key: 'id',
                width: 100,
                render: (text, record, index) => {
                    return (
                        <div className="format-operation">
                            <a href="javascript:;" onClick={this.handleAddFormat.bind(this, record, index)}>添加</a>
                            <a href="javascript:;" onClick={this.handleDeleteFormat.bind(this, record, index)}>删除</a>
                        </div>
                    );
                }
            },
        ];

        return columns;
    };

    /**
     * 供货比例改变事件
     * @param record
     * @param nextValue
     */
    handlePercentChange = (record, nextValue) => {
        const {supplyData} = this.state;
        //同名称的业态
        const formatGroup = supplyData.filter(item => item["PRODUCTTYPENAME"].trim() === record["PRODUCTTYPENAME"]);
        //TODO 校验
        let sumPercent = 0;
        formatGroup.forEach(row => {
            if (record.ID === row.ID) {
                sumPercent += parseInt(nextValue);
            } else {
                sumPercent += parseInt(row.SourceNumber) || 0;
            }
        });
        if (sumPercent > 100) {
            iss.error(`业态 [${record["PRODUCTTYPENAME"]}] 供货比例不能超过100%!`);
            return;
        }
        record["SourceNumber"] = nextValue;
        this.forceUpdate();
    };

    handleAddFormat = (record, index) => {
        const {supplyData} = this.state;
        const nextSupplyData = [...supplyData];
        const newRow = {
            ...record,
            SourceNumber: 0,
            ID: iss.guid(),
        };
        nextSupplyData.splice(index + 1, 0, newRow);
        this.setState({
            supplyData: nextSupplyData
        });
        iss.info("添加成功!");
    };

    handleDeleteFormat = (record, index) => {
        const {supplyData} = this.state;
        //同名称的业态
        const formatGroup = supplyData.filter(item => item["PRODUCTTYPENAME"].trim() === record["PRODUCTTYPENAME"]);
        if (formatGroup.length === 1) {
            iss.error(`业态 [${record["PRODUCTTYPENAME"]}] 只剩下最后一条, 不能删除!`);
            return;
        }

        const nextSupplyData = [...supplyData];
        nextSupplyData.splice(index, 1);
        this.setState({
            supplyData: nextSupplyData
        });
        iss.info("删除成功!");
    };

    handleDateChange = (value, dateString) => {
        this.setState({
            batchDate: dateString,
        });
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
            row["SupplyDate"] = batchDate;
            const changeData = this.changeDataArray.filter(item => item["PRODUCTTYPEREFID"] === row["PRODUCTTYPEREFID"])[0];
            //保存变更的供货日期
            if (changeData) {
                changeData.SupplyDate = batchDate;
            } else {
                this.changeDataArray.push({
                    PRODUCTTYPEREFID: row["PRODUCTTYPEREFID"],
                    SupplyDate: batchDate,
                    BUILDID: row["BUILDID"],
                    PRODUCTTYPEID: row["PRODUCTTYPEID"],
                });
            }
        });

        iss.info("批量设置供货日期成功!");

        this.setState({
            batchDate: "",
        });
    };

    handleRowDataChange = (row, value, dateString) => {
        console.log("row", row, dateString);
        //修改源数据
        row["SupplyDate"] = dateString;
        //记录要修改的数据, 保存时使用
        const changeData = this.changeDataArray.filter(item => item["PRODUCTTYPEREFID"] === row["PRODUCTTYPEREFID"])[0];
        //保存变更的供货日期
        if (changeData) {
            changeData.SupplyDate = dateString;
        } else {
            this.changeDataArray.push({
                PRODUCTTYPEREFID: row["PRODUCTTYPEREFID"],
                SupplyDate: dateString,
                BUILDID: row["BUILDID"],
                PRODUCTTYPEID: row["PRODUCTTYPEID"],
            });
        }
        console.log("row", row);
        this.forceUpdate();
    };

    handleSelectChange = (key, value) => {
        this.setState({
            [key]: value
        });
    };

    renderContent = () => {
        const {batchDate, currentMonth, currentYear, supplyData} = this.state;
        const {switchMonth, switchYear, isCheck} = this.props.baseInfo;
        const lastYear = switchYear.indexOf(currentYear) === 3 ? true : false;
        const columns = this.getColumns();
        const scrollX = columns.scrollX;

        return (
            <div className="building-adjust">
                <div className="adjust-header">
                    <div className="select-month">
                        <WrapperSelect labelText="调整月份:" onChange={this.handleSelectChange.bind(this, "currentMonth")}
                                       showDefault={false} dataSource={switchMonth}
                                       value={currentMonth}></WrapperSelect>
                    </div>
                    <div className="chk-wrapper">
                        <Checkbox disabled={true} className="chk" checked={isCheck}>考核版</Checkbox>
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
                        rowKey="ID"
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