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
        filterGroup: "",//筛选组团
        filterFormat: "",//筛选业态
        filterBuilding: "",//筛选楼栋
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

        const changeDataArray = [];
        supplyData.forEach(row => {
            if (!row["SupplyDate"]) {
                return;
            }
            changeDataArray.push({
                PRODUCTTYPEREFID: row["PRODUCTTYPEREFID"],
                SupplyDate: row["SupplyDate"],
                BUILDID: row["BUILDID"],
                PRODUCTTYPEID: row["PRODUCTTYPEID"],
            });
        });

        SupplyService.saveSupplyData(dataKey, mode, supplyId, currentMonth, changeDataArray)
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

    getGroupHeader = () => {
        const {supplyData} = this.state;
        const options = [];
        const dataSource = [{id: "", name: "全部组团"}];
        supplyData.forEach(item => {
            dataSource.push({
                id: item["GROUPID"],
                name: item["GROUPNAME"],
            });
        });
        dataSource.forEach(item => {
            options.push(<Option key={item.id} value={item.id}>{item.name}</Option>);
        });

        return (
            <Select defaultValue="" style={{width: 120}} onChange={this.handleSelectChange.bind(this, "filterGroup")}>
                {options}
            </Select>
        );
    };

    getFormatHeader = () => {
        const {supplyData} = this.state;
        const options = [];
        const dataSource = [{id: "", name: "全部业态"}];
        supplyData.forEach(item => {
            dataSource.push({
                id: item["PRODUCTTYPEID"],
                name: item["PRODUCTTYPENAME"],
            });
        });
        dataSource.forEach(item => {
            options.push(<Option key={item.id} value={item.id}>{item.name}</Option>);
        });

        return (
            <Select defaultValue="" style={{width: 120}} onChange={this.handleSelectChange.bind(this, "filterFormat")}>
                {options}
            </Select>
        );
    };

    getBuildHeader = () => {
        const {supplyData} = this.state;
        const options = [];
        const dataSource = [{id: "", name: "全部楼栋"}];
        supplyData.forEach(item => {
            dataSource.push({
                id: item["BUILDID"],
                name: item["BUILDNAME"],
            });
        });
        dataSource.forEach(item => {
            options.push(<Option key={item.id} value={item.id}>{item.name}</Option>);
        });

        return (
            <Select defaultValue="" style={{width: 120}}
                    onChange={this.handleSelectChange.bind(this, "filterBuilding")}>
                {options}
            </Select>
        );
    };

    setAlignCenter = (name) => {
        return <span className="header-center">{name}</span>;
    };

    fillMonthColor = (year, month) => {
        return (text, record) => {
            const strDate = record["SupplyDate"];
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
            const strDate = record["SupplyDate"];
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
            const strDate = record["SupplyDate"];
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

        const columns = [
            {
                title: this.getGroupHeader(),
                dataIndex: 'GROUPNAME',
                key: 'GROUPNAME',
                width: 140,
            },
            {
                title: this.getFormatHeader(),
                dataIndex: 'PRODUCTTYPENAME',
                key: 'PRODUCTTYPENAME',
                width: 140,
            },
            {
                title: this.getBuildHeader(),
                dataIndex: 'BUILDNAME',
                key: 'BUILDNAME',
                width: 140,
            },
            {
                title: this.setAlignCenter("可售面积(m²)"),
                dataIndex: 'SourceSaleArea',
                key: 'SourceSaleArea',
                width: 100,
            },
            {
                title: this.setAlignCenter("可售货值(万元)"),
                dataIndex: 'SourceMonery',
                key: 'SourceMonery',
                width: 100,
            },
            {
                title: this.setAlignCenter("计划预证时间"),
                dataIndex: 'PlanSaleDate',
                key: 'PlanSaleDate',
                width: 100,
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
                    width: 90,
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

        const filterSupplyData = this.getFilterSupplyData();

        if (filterSupplyData.length === 0) {
            iss.error("当前筛选条件下 没有数据!");
            return;
        }

        filterSupplyData.forEach(row => {
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
        this.forceUpdate();
    };

    handleSelectChange = (key, value) => {
        this.setState({
            [key]: value
        });
    };

    /**
     * 根据筛选条件, 筛选数据源
     * filterGroup: "",//筛选组团
     * filterFormat: "",//筛选业态
     * filterBuilding: "",//筛选楼栋
     */
    getFilterSupplyData = () => {
        const {filterGroup, filterFormat, filterBuilding, supplyData} = this.state;
        let filterSupplyData = [...supplyData];
        if (filterGroup) {
            filterSupplyData = filterSupplyData.filter(item => item["GROUPID"] === filterGroup);
        }
        if (filterFormat) {
            filterSupplyData = filterSupplyData.filter(item => item["PRODUCTTYPEID"] === filterFormat);
        }
        if (filterBuilding) {
            filterSupplyData = filterSupplyData.filter(item => item["BUILDID"] === filterBuilding);
        }
        return filterSupplyData;
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
        const {switchMonth, switchYear, isCheck} = this.props.baseInfo;
        const lastYear = switchYear.indexOf(currentYear) === 3 ? true : false;
        const columns = this.getColumns();
        const scrollX = columns.scrollX;

        const filterSupplyData = this.getFilterSupplyData();

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
                    <div className="switch-year">
                        {this.renderSwitchYear()}
                    </div>
                </div>
                <div className="adjust-table">
                    <Table
                        rowKey="ID"
                        bordered={true}
                        dataSource={filterSupplyData}
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