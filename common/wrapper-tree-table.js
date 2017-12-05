import React, {Component} from 'react';
import {Button, Table, Input} from 'antd';
import {shallowCompare} from '../utils/index';

/**
 * 列默认宽度
 * @type {number}
 */
const defaultWidth = 100;

const numberReg = /^\d{1,8}(?:\.\d{0,2})?$/;

const dataSource = [{
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
}];

const headerData = [
    {
        title: '签约',
        dataIndex: 'payment',
        key: 'payment',
        width: 200,
        fixed: 'left'
    },
    {
        title: '截止当月1日零点期初库存',
        children: [
            {
                title: '总建筑面积',
                key: "totalArea",
                dataIndex: 'totalArea',
                width: 100,
            },
            {
                title: '已签约',
                children: [
                    {
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
            },
            {
                title: '存货',
                children: [
                    {
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
            }, {
                title: '金额',
                dataIndex: 'monthMoney1',
                key: 'monthMoney1',
                width: 100,
            }, {
                title: '套数',
                dataIndex: 'monthSetNumber1',
                key: 'monthSetNumber1',
                width: 100,
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
    }];

class WrapperTreeTable extends Component {

    static propTypes = {
        headerData: React.PropTypes.array,//表头数据
        dataSource: React.PropTypes.array,//表格数据源
        rowKey: React.PropTypes.string,//主键
        defaultHeight: React.PropTypes.number,//表格自定义高度
        columnRender: React.PropTypes.object,//自定义render
        onDataChange: React.PropTypes.func,//文本框数据修改
        editAble: React.PropTypes.bool,//单元格是否可编辑
        fixedAble: React.PropTypes.bool,//固定列是否可用
    };

    static defaultProps = {
        headerData: headerData,
        dataSource: dataSource,
        rowKey: "id",
        defaultHeight: 400,
        columnRender: null,
        editAble: false,
        fixedAble: false,
    };

    handleInputChange = (record, key, column) => {
        return (e) => {
            let value = e.target.value;
            if (!numberReg.test(value)) {
                value = 0;
            }
            record[key] = value;
            this.props.onDataChange && this.props.onDataChange(record.KEY, key, value);
            this.forceUpdate();
        };
    };

    getColumns = (headerData) => {
        const {columnRender, editAble, fixedAble} = this.props;
        let columnArray = [];
        columnArray.scrollX = 0;

        headerData.forEach((headerItem, index) => {
            const column = {
                title: headerItem.name || "汇总名称",
                dataIndex: headerItem.field,
                key: headerItem.field,
            };

            //默认固定第一列
            if (fixedAble && index === 0) {
                column.fixed = "left";
            }

            //render
            if (columnRender && columnRender[headerItem.field]) {
                column.render = columnRender[headerItem.field];
            }

            if (editAble) {
                column.render = (text, record) => {
                    if (headerItem.edit !== "+w") {
                        return text;
                    }

                    return <Input onChange={this.handleInputChange(record, headerItem.field, headerItem)}
                                  value={text}/>;
                };
            }
            if (headerItem.children && Array.isArray(headerItem.children) && headerItem.children.length > 0) {
                column.children = this.getChildColumns(columnArray, headerItem);
            }
            else {
                if (headerItem.width && headerItem.width > 0) {
                    column.width = headerItem.width;
                } else {
                    column.width = defaultWidth;
                }
                columnArray.scrollX += column.width;
            }
            columnArray.push(column);
        });
        return columnArray;
    };

    /**
     * 递归获取下级列头信息
     * @param columnArray
     * @param item
     * @returns {Array}
     */
    getChildColumns = (columnArray, item) => {
        const children = [];
        item.children.forEach(childHeaderItem => {
            const childColumn = {
                title: childHeaderItem.name,
                dataIndex: childHeaderItem.field,
                key: childHeaderItem.field,
                width: defaultWidth,
            };

            childColumn.render = (text, record) => {
                if (childHeaderItem.edit !== "+w") {
                    return text;
                }

                return <Input onChange={this.handleInputChange(record, childHeaderItem.field)} value={text}/>;
            };

            if (childHeaderItem.children && Array.isArray(childHeaderItem.children) && childHeaderItem.children.length > 0) {
                childHeaderItem.children = this.getChildColumns(columnArray, childHeaderItem);
            }
            else {
                if (childHeaderItem.width && childHeaderItem.width > 0) {
                    childColumn.width = childHeaderItem.width;
                } else {
                    childColumn.width = defaultWidth;
                }
                columnArray.scrollX += childColumn.width;
            }
            children.push(childColumn);
        });
        return children;
    };

    render() {

        const {headerData, dataSource, rowKey, defaultHeight} = this.props;
        let tableColumns = [];
        if (dataSource && dataSource.length > 0) {
            tableColumns = this.getColumns(headerData);
        }

        return (
            <Table
                rowKey={rowKey}
                columns={tableColumns}
                dataSource={dataSource}
                bordered={true}
                size="middle"
                scroll={{x: tableColumns.scrollX, y: defaultHeight}}
                pagination={false}
            />
        );
    }
}

export default WrapperTreeTable