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
        // batchDate: "",//批量设置的日期
        filterGroup: "",//筛选组团
        filterFormat: "",//筛选业态
        filterBuilding: "",//筛选楼栋
        bordered: false
    };

    innerSupplyData = [];

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
            .then(arg => {
                this.setState({
                    bordered: true
                })
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
            if (!row["SupplyDate"] || row["mode"] == "Summary") {
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
            .then(() => {
                iss.info("保存成功!");
                this.props.onHideModal && this.props.onHideModal("reload");
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
        const {supplyData, filterGroup} = this.state;
        const options = [];
        const dataSource = [{id: "", name: "全部组团"}];
        supplyData.forEach(item => {
            if (!dataSource.some(s => s.id === item["GROUPID"])) {
                dataSource.push({
                    id: item["GROUPID"],
                    name: item["GROUPNAME"],
                });
            }

        });
        dataSource.forEach(item => {
            options.push(<Option key={item.id} value={item.id}>{item.name}</Option>);
        });

        return (
            <Select value={filterGroup} style={{width: 120}}
                    onChange={this.handleSelectChange.bind(this, "filterGroup")}>
                {options}
            </Select>
        );
    };

    getFormatHeader = () => {
        const {supplyData, filterFormat} = this.state;
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
            <Select value={filterFormat} style={{width: 120}}
                    onChange={this.handleSelectChange.bind(this, "filterFormat")}>
                {options}
            </Select>
        );
    };

    getBuildHeader = () => {
        const {supplyData, filterBuilding} = this.state;
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
            <Select value={filterBuilding} style={{width: 120}}
                    onChange={this.handleSelectChange.bind(this, "filterBuilding")}>
                {options}
            </Select>
        );
    };

    setAlignCenter = (name) => {
        return <span className="header-center">{name}</span>;
    };

    formatToFixed = (value) => {
        if (!!value && !isNaN(value) && value.toString().indexOf(".") > -1) {
            return parseFloat(value).toFixed(2)
        }
        return value;
    };

    /**
     * 根据筛选条件, 筛选数据源
     * filterGroup: "",//筛选组团
     * filterFormat: "",//筛选业态
     * filterBuilding: "",//筛选楼栋
     */
    getFilterSupplyData = () => {
        const {currentYear, filterGroup, filterFormat, filterBuilding, supplyData} = this.state;
        const {switchYear} = this.props.baseInfo;

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

        const areaRow = {
            ID: iss.guid(),
            GROUPNAME: "可售面积汇总(㎡): ",
            SupplyDate: "",
            mode: "Summary",
        };

        const moneryRow = {
            ID: iss.guid(),
            GROUPNAME: "可售货值汇总(万元): ",
            SupplyDate: "",
            mode: "Summary",
        };

        let totalAreaSummary = 0;
        let totalMonerySummary = 0;

        const index = switchYear.indexOf(currentYear);
        if (index < 2) {
            for (let i = 1; i <= 12; i++) {
                let areaSummary = this.getAreaSummary("month", filterSupplyData, currentYear, i);
                let monerySummary = this.getMonerySummary("month", filterSupplyData, currentYear, i);
                totalAreaSummary = this.FloatAdd(totalAreaSummary, areaSummary);
                totalMonerySummary = this.FloatAdd(totalMonerySummary, monerySummary);
                areaRow[`${currentYear}-${i}`] = areaSummary;
                moneryRow[`${currentYear}-${i}`] = monerySummary;
            }
        } else if (index === 2) {
            for (let i = 1; i <= 4; i++) {
                let areaSummary = this.getAreaSummary("quarter", filterSupplyData, currentYear, i);
                let monerySummary = this.getMonerySummary("quarter", filterSupplyData, currentYear, i);
                totalAreaSummary = this.FloatAdd(totalAreaSummary, areaSummary);
                totalMonerySummary = this.FloatAdd(totalMonerySummary, monerySummary);
                areaRow[`${currentYear}-quarter-${i}`] = areaSummary;
                moneryRow[`${currentYear}-quarter-${i}`] = monerySummary;
            }
        } else {
            let areaSummary = this.getAreaSummary("year", filterSupplyData, currentYear);
            let monerySummary = this.getMonerySummary("year", filterSupplyData, currentYear);
            totalAreaSummary = this.FloatAdd(totalAreaSummary, areaSummary);
            totalMonerySummary = this.FloatAdd(totalMonerySummary, monerySummary);
            areaRow[`future-year`] = areaSummary;
            moneryRow[`future-year`] = monerySummary;
        }

        if (filterSupplyData.length > 0) {
            filterSupplyData.push(areaRow);
            filterSupplyData.push(moneryRow);
        }

        areaRow.GROUPNAME = areaRow.GROUPNAME + totalAreaSummary;
        moneryRow.GROUPNAME = moneryRow.GROUPNAME + totalMonerySummary;

        this.innerSupplyData = filterSupplyData;
        return filterSupplyData;
    };

    FloatAdd = (arg1, arg2) => {
        var r1, r2, m;
        try {
            r1 = arg1.toString().split(".")[1].length
        } catch (e) {
            r1 = 0
        }
        try {
            r2 = arg2.toString().split(".")[1].length
        } catch (e) {
            r2 = 0
        }
        m = Math.pow(10, Math.max(r1, r2));
        return (arg1 * m + arg2 * m) / m;
    };

    fillMonthColor = (year, month) => {
        return (text, record) => {
            if (record["mode"] === "Summary")
                return text;
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

    getAreaSummary = (mode, filterSupplyData, currentYear, num) => {
        let summary = 0;
        filterSupplyData.forEach(row => {
            const strDate = row["SupplyDate"];
            if (!strDate) {
                return;
            }
            const date = new Date(strDate);
            if (mode == "month") {
                if (date.getFullYear() != currentYear || (date.getMonth() + 1) != num) {
                    return;
                }
                summary = this.FloatAdd(summary.toFixed(2), parseFloat(row["SourceSaleArea"]));
            } else if (mode == "quarter") {
                const month = date.getMonth() + 1;
                if (date.getFullYear() == currentYear) {
                    if (month > (num - 1) * 3 && month <= num * 3) {
                        summary = this.FloatAdd(summary.toFixed(2), parseFloat(row["SourceSaleArea"]));
                    }
                }
            } else if (mode == "year") {
                if (date.getFullYear() >= currentYear) {
                    summary = this.FloatAdd(summary.toFixed(2), parseFloat(row["SourceSaleArea"]));
                }
            }
        });

        return summary.toFixed(2);
    };
    getMonerySummary = (mode, filterSupplyData, currentYear, num) => {
        let summary = 0;
        filterSupplyData.forEach(row => {
            const strDate = row["SupplyDate"];
            if (!strDate) {
                return;
            }
            const date = new Date(strDate);
            if (mode == "month") {
                if (date.getFullYear() != currentYear || (date.getMonth() + 1) != num) {
                    return;
                }
                summary = this.FloatAdd(summary.toFixed(2), parseFloat(row["SourceMonery"]));


            } else if (mode == "quarter") {
                const month = date.getMonth() + 1;
                if (date.getFullYear() == currentYear) {
                    if (month > (num - 1) * 3 && month <= num * 3) {
                        summary = this.FloatAdd(summary.toFixed(2), parseFloat(row["SourceMonery"]));
                    }
                }
            } else if (mode == "year") {
                if (date.getFullYear() >= currentYear) {
                    summary = this.FloatAdd(summary.toFixed(2), parseFloat(row["SourceMonery"]));
                }
            }
        });
        return summary.toFixed(2);
    };

    fillQuarterColor = (year, quarter) => {
        return (text, record) => {
            if (record["mode"] === "Summary")
                return text;
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
            if (record["mode"] === "Summary")
                return text;
            const strDate = record["SupplyDate"];
            if (strDate) {
                const date = new Date(strDate);
                if (date.getFullYear() >= year) {
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
                dataIndex: 'GROUPNAME',
                key: 'GROUPNAME',
                width: 140,
                fixed: !lastYear ? 'left' : false,
                render: (text, row, index) => {
                    if (index < this.innerSupplyData.length - 2) {
                        return text;
                    }
                    return {
                        children: <div className="summary">{text}</div>,
                        props: {
                            colSpan: 3,
                        },
                    };
                }
            },
            {
                title: this.getFormatHeader(),
                dataIndex: 'PRODUCTTYPENAME',
                key: 'PRODUCTTYPENAME',
                width: 140,
                fixed: !lastYear ? 'left' : false,
                render: this.renderColumnContent.bind(this)
            },
            {
                title: this.getBuildHeader(),
                dataIndex: 'BUILDNAME',
                key: 'BUILDNAME',
                width: 140,
                fixed: !lastYear ? 'left' : false,
                render: this.renderColumnContent.bind(this)
            },
            {
                title: this.setAlignCenter("可售面积(m²)"),
                dataIndex: 'SourceSaleArea',
                key: 'SourceSaleArea',
                width: 100,
                render: (text, row, index) => {
                    let formatText = this.formatToFixed(text);
                    if (index < this.innerSupplyData.length - 2) {
                        return formatText;
                    }
                    return {
                        children: <span></span>,
                        props: {
                            colSpan: 3,
                        },
                    };
                }
            },
            {
                title: this.setAlignCenter("可售货值(万元)"),
                dataIndex: 'SourceMonery',
                key: 'SourceMonery',
                width: 100,
                render: this.renderColumnContent.bind(this)
            },
            {
                title: this.setAlignCenter("计划预证时间"),
                dataIndex: 'PlanSaleDate',
                key: 'PlanSaleDate',
                width: 100,
                render: this.renderColumnContent.bind(this)
            },
            {
                title: this.setAlignCenter("供货日期"),
                dataIndex: 'SupplyDate',
                key: 'SupplyDate',
                render: (text, record) => {
                    if (record["mode"] === "Summary")
                        return text;
                    return <DatePicker allowClear={false} onChange={this.handleRowDataChange.bind(this, record)}
                                       disabled={record["IsSaleLincenseStr"] === "Yes"}
                                       disabledDate={this.disabledDate.bind(this, record)}
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
                    width: 80,
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
     * 切换年
     * @param e
     */
    handleChangeYear = (e) => {
        this.setState({
            currentYear: e.target.value
        });
    };

    // handleDateChange = (value, dateString) => {
    //     this.setState({
    //         batchDate: dateString,
    //     });
    // };

    /**
     * 是否禁用日期
     * @param row
     * @param current
     * @returns {*|boolean}
     */
    disabledDate = (row, current) => {
        //1.已经有实际取证时间，不能修改供货日期
        //2.修改住宅业态的时候,不能修改到系统当前时间之前，不能晚于预售证时间. 修改非住宅业态的时候,只要不修改到系统当前时间之前都行
        //3.没有计划时间不分业态, 只能选择今天和今天之后的日期

        if (!current) {
            return true;
        }

        if (row["PlanSaleDate"] === "无") {
            //没有计划时间不分业态, 禁用昨天和昨天之前的日期
            return current.valueOf() < (Date.now() - 24 * 60 * 60 * 1000);
        }

        if (row["IsResidence"] != "Yes") {
            //非主业态(非住宅业态), 禁用昨天和昨天之前的日期
            return current.valueOf() < (Date.now() - 24 * 60 * 60 * 1000);
        }

        if (row["IsResidence"] === "Yes") {
            //主业态(住宅业态), 禁用昨天和昨天之前的日期 和 禁用预售证之后的日期
            return current.valueOf() > (new Date(row["PlanSaleDate"]).valueOf()) ||
                current.valueOf() < (Date.now() - 24 * 60 * 60 * 1000);
        }
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

    renderColumnContent = (value, row, index) => {
        let formatValue = this.formatToFixed(value);
        const obj = {
            children: formatValue,
            props: {},
        };
        if (index === this.innerSupplyData.length - 1 || index === this.innerSupplyData.length - 2) {
            obj.props.colSpan = 0;
        }
        return obj;
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
                    switchYear.map((year, index) => {
                        let displayYear = year + "年";
                        if (index === 3) {
                            displayYear += "及以后";
                        }
                        return <Radio.Button key={year} value={year}>{displayYear}</Radio.Button>;
                    })
                }
            </Radio.Group>
        );
    };

    renderContent = () => {
        const {currentMonth, currentYear, bordered} = this.state;
        const {switchMonth, switchYear, isCheck} = this.props.baseInfo;
        const lastYear = switchYear.indexOf(currentYear) === 3 ? true : false;
        const filterSupplyData = this.getFilterSupplyData();
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
                    <div className="switch-year">
                        {this.renderSwitchYear()}
                    </div>
                </div>
                <div className="adjust-table">
                    <Table
                        rowKey="ID"
                        bordered={bordered}
                        dataSource={filterSupplyData}
                        columns={columns}
                        size="small"
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
                width={1200}
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